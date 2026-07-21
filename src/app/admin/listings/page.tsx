export const dynamic = 'force-dynamic'

import { prisma } from '@/lib/prisma'
import type { Prisma } from '@prisma/client'

type HostelRow = Prisma.HostelGetPayload<{
  include: { owner: { select: { name: true; email: true } }; campus: true }
}>

export default async function AdminListingsPage() {
  const hostels = await prisma.hostel.findMany({
    where: { status: 'PENDING' },
    include: { owner: { select: { name: true, email: true } }, campus: true },
    orderBy: { createdAt: 'desc' },
  }) as HostelRow[]

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Pending listings</h1>
      <div className="space-y-3">
        {hostels.length === 0 && <p className="text-gray-500">No pending listings.</p>}
        {hostels.map((h: HostelRow) => (
          <div key={h.id} className="border rounded-lg p-4 flex justify-between items-center">
            <div>
              <p className="font-medium">{h.name}</p>
              <p className="text-sm text-gray-500">{h.campus.name} · by {h.owner.name}</p>
            </div>
            <div className="flex gap-2">
              <button className="bg-green-600 text-white px-3 py-1 rounded text-sm">Approve</button>
              <button className="bg-red-500 text-white px-3 py-1 rounded text-sm">Suspend</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
