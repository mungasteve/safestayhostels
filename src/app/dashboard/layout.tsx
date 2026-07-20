import Link from 'next/link'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-48 border-r p-4 space-y-2 text-sm">
        <Link href="/dashboard" className="block font-semibold">Overview</Link>
        <Link href="/dashboard/listings" className="block">Listings</Link>
        <Link href="/dashboard/bookings" className="block">Bookings</Link>
      </aside>
      <div className="flex-1 p-6">{children}</div>
    </div>
  )
}
