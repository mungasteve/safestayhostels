import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { HostelStatus, Prisma, Gender, RoomType } from '@prisma/client'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const campusId = searchParams.get('campusId') ?? undefined
  const gender = searchParams.get('gender') as Gender | null
  const roomType = searchParams.get('roomType') as RoomType | null
  const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined
  const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined
  const search = searchParams.get('search') ?? undefined

  const where: Prisma.HostelWhereInput = {
    status: HostelStatus.LIVE,
    ...(campusId && { campusId }),
    ...(gender && { gender }),
    ...(search && { name: { contains: search, mode: 'insensitive' } }),
    ...(roomType || minPrice !== undefined || maxPrice !== undefined
      ? {
          rooms: {
            some: {
              ...(roomType && { type: roomType }),
              ...(minPrice !== undefined && { pricePerMonth: { gte: minPrice } }),
              ...(maxPrice !== undefined && { pricePerMonth: { lte: maxPrice } }),
            },
          },
        }
      : {}),
  }

  const hostels = await prisma.hostel.findMany({
    where,
    include: {
      campus: true,
      images: { where: { isCover: true }, take: 1 },
      rooms: { select: { type: true, pricePerMonth: true, availableUnits: true } },
      reviews: { select: { rating: true } },
      _count: { select: { favorites: true } },
    },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(hostels)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || (session.user as any).role !== 'OWNER') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const body = await req.json()
  const hostel = await prisma.hostel.create({
    data: { ...body, ownerId: (session.user as any).id, status: HostelStatus.DRAFT },
  })
  return NextResponse.json(hostel, { status: 201 })
}
