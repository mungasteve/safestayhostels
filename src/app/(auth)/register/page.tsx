'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['STUDENT', 'OWNER']),
})

type FormData = z.infer<typeof schema>

export default function RegisterPage() {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { role: 'STUDENT' },
  })

  async function onSubmit(data: FormData) {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (res.ok) router.push('/login')
  }

  return (
    <div className="max-w-sm mx-auto mt-20 px-4">
      <h1 className="text-2xl font-bold mb-6">Create account</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register('name')} placeholder="Full name" className="border rounded px-3 py-2 w-full" />
        <input {...register('email')} type="email" placeholder="Email" className="border rounded px-3 py-2 w-full" />
        <input {...register('password')} type="password" placeholder="Password" className="border rounded px-3 py-2 w-full" />
        <select {...register('role')} className="border rounded px-3 py-2 w-full">
          <option value="STUDENT">Student</option>
          <option value="OWNER">Hostel owner</option>
        </select>
        <button type="submit" disabled={isSubmitting} className="w-full bg-black text-white py-2 rounded disabled:opacity-50">
          {isSubmitting ? 'Creating…' : 'Create account'}
        </button>
      </form>
    </div>
  )
}
