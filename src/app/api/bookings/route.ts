import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const createSchema = z.object({
  roomId: z.string().cuid(),
  moveInDate: z.string().datetime(),
})

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const parsed = createSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 422 })
  }

  const { roomId, moveInDate } = parsed.data
  const studentId = (session.user as any).id

  const room = await prisma.room.findUnique({ where: { id: roomId } })
  if (!room || room.availableUnits < 1) {
    return NextResponse.json({ error: 'Room unavailable' }, { status: 400 })
  }

  const booking = await prisma.booking.create({
    data: { studentId, roomId, moveInDate: new Date(moveInDate), amountDue: room.pricePerMonth },
  })
  return NextResponse.json(booking, { status: 201 })
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const user = session.user as any
  const where = user.role === 'STUDENT' ? { studentId: user.id } : undefined

  const bookings = await prisma.booking.findMany({
    where,
    include: {
      room: { include: { hostel: true } },
      student: { select: { name: true, email: true } },
    },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(bookings)
}
