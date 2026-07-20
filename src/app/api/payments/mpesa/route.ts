import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { authOptions } from '@/lib/auth'
import { stkPush } from '@/lib/mpesa'
import { prisma } from '@/lib/prisma'

const schema = z.object({
  bookingId: z.string().cuid(),
  phone: z.string().regex(/^2547\d{8}$/, 'Phone must be in format 2547XXXXXXXX'),
})

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 422 })
  }

  const { bookingId, phone } = parsed.data
  const studentId = (session.user as any).id

  const booking = await prisma.booking.findUnique({ where: { id: bookingId } })
  if (!booking) return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
  if (booking.studentId !== studentId) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const result = await stkPush({ phone, amount: booking.amountDue, bookingId })

  await prisma.payment.create({
    data: {
      bookingId,
      provider: 'MPESA',
      amount: booking.amountDue,
      transactionRef: result.CheckoutRequestID,
    },
  })

  return NextResponse.json(result)
}
