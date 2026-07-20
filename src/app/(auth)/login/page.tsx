'use client'

import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

type FormData = { email: string; password: string }

export default function LoginPage() {
  const router = useRouter()
  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<FormData>()

  async function onSubmit(data: FormData) {
    const res = await signIn('credentials', { ...data, redirect: false })
    if (res?.ok) router.push('/')
  }

  return (
    <div className="max-w-sm mx-auto mt-20 px-4">
      <h1 className="text-2xl font-bold mb-6">Sign in</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register('email', { required: true })} type="email" placeholder="Email" className="border rounded px-3 py-2 w-full" />
        <input {...register('password', { required: true })} type="password" placeholder="Password" className="border rounded px-3 py-2 w-full" />
        <button type="submit" disabled={isSubmitting} className="w-full bg-black text-white py-2 rounded disabled:opacity-50">
          {isSubmitting ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
      <button onClick={() => signIn('google')} className="w-full border py-2 rounded mt-3">
        Continue with Google
      </button>
    </div>
  )
}
