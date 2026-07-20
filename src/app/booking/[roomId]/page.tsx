'use client'

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function BookingPaymentPage({ params }: { params: Promise<{ roomId: string }> }) {
  const searchParams = useSearchParams()
  const bookingId = searchParams.get('bookingId')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  async function payWithMpesa() {
    setLoading(true)
    await fetch('/api/payments/mpesa', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookingId, phone }),
    })
    setDone(true)
    setLoading(false)
  }

  async function payWithStripe() {
    setLoading(true)
    const res = await fetch('/api/payments/stripe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookingId }),
    })
    const { clientSecret } = await res.json()
    // Redirect to Stripe hosted page or mount Elements — clientSecret ready
    console.log('Stripe clientSecret:', clientSecret)
    setLoading(false)
  }

  if (done) return <p className="text-center mt-20 text-green-600">STK push sent! Check your phone.</p>

  return (
    <div className="max-w-sm mx-auto mt-20 px-4 space-y-6">
      <h1 className="text-2xl font-bold">Complete payment</h1>

      <div className="border rounded-lg p-4 space-y-3">
        <h2 className="font-semibold">Pay via M-Pesa</h2>
        <input
          type="tel"
          placeholder="2547XXXXXXXX"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        />
        <button
          onClick={payWithMpesa}
          disabled={loading || !phone}
          className="w-full bg-green-600 text-white py-2 rounded disabled:opacity-50"
        >
          {loading ? 'Processing…' : 'Pay with M-Pesa'}
        </button>
      </div>

      <div className="border rounded-lg p-4">
        <h2 className="font-semibold mb-3">Pay via Card (Stripe)</h2>
        <button
          onClick={payWithStripe}
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded disabled:opacity-50"
        >
          {loading ? 'Processing…' : 'Pay with Card'}
        </button>
      </div>
    </div>
  )
}
