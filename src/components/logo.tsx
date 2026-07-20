import Image from 'next/image'
import { cn } from '@/lib/utils'

export default function Logo({ className, size = 28 }: { className?: string; size?: number }) {
  return (
    <span className={cn('inline-flex items-center gap-2 font-black tracking-tight text-slate-900', className)}>
      <span
        className="text-primary shrink-0"
        style={{ width: size, height: size }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none" width={size} height={size}>
          <path d="M20 4L4 16v20h10V24h12v12h10V16L20 4z" fill="currentColor" opacity="0.15"/>
          <path d="M20 4L4 16v20h10V24h12v12h10V16L20 4z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round"/>
          <circle cx="28" cy="28" r="8" fill="white"/>
          <path d="M28 21c-2.5 0-5 .9-5 .9v4.6c0 2.8 2.1 5.4 5 6.5 2.9-1.1 5-3.7 5-6.5v-4.6S30.5 21 28 21z" fill="currentColor" opacity="0.9"/>
          <path d="M25.5 28l1.8 1.8 3.2-3.2" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
      SafeStay
    </span>
  )
}
