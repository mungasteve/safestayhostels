'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'

const schema = z.object({
  moveInDate: z.string().min(1, 'Required'),
})

type FormData = z.infer<typeof schema>

export default function BookingForm({ roomId, price }: { roomId: string; price: number }) {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: FormData) {
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roomId, moveInDate: data.moveInDate }),
    })
    if (res.ok) {
      const booking = await res.json()
      router.push(`/booking/${roomId}?bookingId=${booking.id}`)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Move-in date</label>
        <input type="date" {...register('moveInDate')} className="border rounded px-3 py-2 w-full" />
        {errors.moveInDate && <p className="text-red-500 text-xs mt-1">{errors.moveInDate.message}</p>}
      </div>
      <p className="text-sm">Amount due: <strong>KES {price.toLocaleString()}</strong></p>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-black text-white py-2 rounded disabled:opacity-50"
      >
        {isSubmitting ? 'Booking…' : 'Book now'}
      </button>
    </form>
  )
}
