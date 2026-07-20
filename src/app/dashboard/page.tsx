import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  const ownerId = (session?.user as any)?.id

  const [hostels, bookings] = await Promise.all([
    prisma.hostel.count({ where: { ownerId } }),
    prisma.booking.count({ where: { room: { hostel: { ownerId } } } }),
  ])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="border rounded-lg p-4">
          <p className="text-sm text-gray-500">Listings</p>
          <p className="text-3xl font-bold">{hostels}</p>
        </div>
        <div className="border rounded-lg p-4">
          <p className="text-sm text-gray-500">Bookings</p>
          <p className="text-3xl font-bold">{bookings}</p>
        </div>
      </div>
    </div>
  )
}
