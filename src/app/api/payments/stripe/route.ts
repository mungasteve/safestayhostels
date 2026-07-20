import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { authOptions } from '@/lib/auth'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'

const schema = z.object({ bookingId: z.string().cuid() })

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Invalid request' }, { status: 422 })

  const { bookingId } = parsed.data
  const studentId = (session.user as any).id

  const booking = await prisma.booking.findUnique({ where: { id: bookingId } })
  if (!booking) return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
  if (booking.studentId !== studentId) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const intent = await stripe.paymentIntents.create({
    amount: Math.round(booking.amountDue * 100),
    currency: 'kes',
    metadata: { bookingId },
  })

  await prisma.payment.create({
    data: {
      bookingId,
      provider: 'STRIPE',
      amount: booking.amountDue,
      transactionRef: intent.id,
    },
  })

  return NextResponse.json({ clientSecret: intent.client_secret })
}
