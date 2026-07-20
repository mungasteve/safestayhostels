'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'

const schema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  address: z.string().min(5),
  campusId: z.string().min(1),
  gender: z.enum(['MALE', 'FEMALE', 'MIXED']),
  latitude: z.string().regex(/^-?\d+(\.\d+)?$/, 'Invalid'),
  longitude: z.string().regex(/^-?\d+(\.\d+)?$/, 'Invalid'),
})

type FormData = z.infer<typeof schema>

export default function NewListingPage() {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: FormData) {
    const res = await fetch('/api/hostels', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, latitude: parseFloat(data.latitude), longitude: parseFloat(data.longitude) }),
    })
    if (res.ok) router.push('/dashboard/listings')
  }

  return (
    <div className="max-w-lg space-y-4">
      <h1 className="text-2xl font-bold">New listing</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {(['name', 'description', 'address', 'campusId'] as const).map((field) => (
          <div key={field}>
            <input
              {...register(field)}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              className="border rounded px-3 py-2 w-full"
            />
            {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]?.message}</p>}
          </div>
        ))}
        <select {...register('gender')} className="border rounded px-3 py-2 w-full">
          <option value="MIXED">Mixed</option>
          <option value="MALE">Male only</option>
          <option value="FEMALE">Female only</option>
        </select>
        <div className="grid grid-cols-2 gap-3">
          <input {...register('latitude')} placeholder="Latitude" className="border rounded px-3 py-2" />
          <input {...register('longitude')} placeholder="Longitude" className="border rounded px-3 py-2" />
        </div>
        <button type="submit" disabled={isSubmitting} className="w-full bg-black text-white py-2 rounded disabled:opacity-50">
          {isSubmitting ? 'Saving…' : 'Create listing'}
        </button>
      </form>
    </div>
  )
}
