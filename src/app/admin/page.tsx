export const dynamic = 'force-dynamic'

import { prisma } from '@/lib/prisma'

export default async function AdminPage() {
  const [users, hostels, bookings] = await Promise.all([
    prisma.user.count(),
    prisma.hostel.count(),
    prisma.booking.count(),
  ])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin overview</h1>
      <div className="grid grid-cols-3 gap-4">
        {[['Users', users], ['Hostels', hostels], ['Bookings', bookings]].map(([label, count]) => (
          <div key={label as string} className="border rounded-lg p-4">
            <p className="text-sm text-gray-500">{label}</p>
            <p className="text-3xl font-bold">{count}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
