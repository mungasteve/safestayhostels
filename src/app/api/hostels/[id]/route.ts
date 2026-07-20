import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const hostel = await prisma.hostel.findUnique({
    where: { id },
    include: {
      owner: { select: { id: true, name: true, avatarUrl: true } },
      campus: true,
      images: true,
      rooms: true,
      reviews: { include: { student: { select: { name: true, avatarUrl: true } } } },
    },
  })
  if (!hostel) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(hostel)
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await getServerSession(authOptions)
  const hostel = await prisma.hostel.findUnique({ where: { id } })
  if (!hostel) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const user = session?.user as any
  if (!user || (user.role !== 'ADMIN' && hostel.ownerId !== user.id)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const body = await req.json()
  const updated = await prisma.hostel.update({ where: { id }, data: body })
  return NextResponse.json(updated)
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await getServerSession(authOptions)
  const hostel = await prisma.hostel.findUnique({ where: { id } })
  if (!hostel) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const user = session?.user as any
  if (!user || (user.role !== 'ADMIN' && hostel.ownerId !== user.id)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  await prisma.hostel.delete({ where: { id } })
  return new NextResponse(null, { status: 204 })
}
