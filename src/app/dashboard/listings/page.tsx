export const dynamic = 'force-dynamic'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import type { Prisma } from '@prisma/client'

type HostelRow = Prisma.HostelGetPayload<{
  include: { campus: true; _count: { select: { rooms: true; reviews: true } } }
}>

export default async function ListingsPage() {
  const session = await getServerSession(authOptions)
  const ownerId = (session?.user as any)?.id

  const hostels = await prisma.hostel.findMany({
    where: { ownerId },
    include: { campus: true, _count: { select: { rooms: true, reviews: true } } },
    orderBy: { createdAt: 'desc' },
  }) as HostelRow[]

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My listings</h1>
        <Link href="/dashboard/listings/new" className="bg-black text-white px-4 py-2 rounded text-sm">
          + New listing
        </Link>
      </div>
      <div className="space-y-3">
        {hostels.map((h: HostelRow) => (
          <div key={h.id} className="border rounded-lg p-4 flex justify-between items-center">
            <div>
              <p className="font-medium">{h.name}</p>
              <p className="text-sm text-gray-500">{h.campus.name} · {h.status}</p>
            </div>
            <p className="text-sm">{h._count.rooms} rooms</p>
          </div>
        ))}
      </div>
    </div>
  )
}
