import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event
  try {
    event = getStripe().webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'payment_intent.succeeded') {
    const intent = event.data.object as any
    const bookingId = intent.metadata.bookingId

    await prisma.$transaction([
      prisma.payment.update({
        where: { transactionRef: intent.id },
        data: { status: 'SUCCESS' },
      }),
      prisma.booking.update({
        where: { id: bookingId },
        data: { status: 'CONFIRMED', amountPaid: intent.amount / 100 },
      }),
    ])
  }

  return NextResponse.json({ received: true })
}
