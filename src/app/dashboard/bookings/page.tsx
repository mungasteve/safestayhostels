import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import type { Booking, Room, Hostel } from '@prisma/client'

type BookingRow = Booking & {
  student: { name: string; email: string }
  room: Room & { hostel: Pick<Hostel, 'name'> }
}

export default async function DashboardBookingsPage() {
  const session = await getServerSession(authOptions)
  const ownerId = (session?.user as any)?.id

  const bookings = await prisma.booking.findMany({
    where: { room: { hostel: { ownerId } } },
    include: {
      student: { select: { name: true, email: true } },
      room: { include: { hostel: { select: { name: true } } } },
    },
    orderBy: { createdAt: 'desc' },
  }) as BookingRow[]

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Bookings</h1>
      <div className="space-y-3">
        {bookings.map((b: BookingRow) => (
          <div key={b.id} className="border rounded-lg p-4 flex justify-between items-center">
            <div>
              <p className="font-medium">{b.student.name}</p>
              <p className="text-sm text-gray-500">{b.room.hostel.name} · {b.room.type}</p>
              <p className="text-sm text-gray-500">Move in: {new Date(b.moveInDate).toLocaleDateString()}</p>
            </div>
            <div className="text-right">
              <span className={`text-xs px-2 py-1 rounded-full ${
                b.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' :
                b.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                'bg-gray-100 text-gray-600'
              }`}>{b.status}</span>
              <p className="text-sm mt-1">KES {b.amountPaid.toLocaleString()} / {b.amountDue.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
