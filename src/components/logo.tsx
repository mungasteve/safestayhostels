import { cn } from '@/lib/utils'

export default function Logo({ className, size = 28 }: { className?: string; size?: number }) {
  const fontSize = Math.round(size * 0.52)
  return (
    <span className={cn('inline-flex items-center gap-2 font-bold tracking-tight text-gray-900', className)}>
      <span
        className="inline-flex items-center justify-center rounded-lg bg-gray-900 text-white shrink-0 font-black"
        style={{ width: size, height: size, fontSize: Math.round(size * 0.58), letterSpacing: '-0.02em' }}
      >
        S
      </span>
      <span style={{ fontSize, letterSpacing: '-0.02em' }}>SafeStay</span>
    </span>
  )
}
