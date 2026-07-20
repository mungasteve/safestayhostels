import { Suspense } from 'react'
import FilterBar from '@/components/filter-bar'
import HostelCard from '@/components/hostel-card'
import { Skeleton } from '@/components/ui/skeleton'
import { prisma } from '@/lib/prisma'
import { HostelStatus, Gender, RoomType, Prisma } from '@prisma/client'
import type { HostelWithDetails } from '@/types'

async function getHostels(params: Record<string, string>): Promise<HostelWithDetails[]> {
  const { campusId, gender, roomType, minPrice, maxPrice, search } = params

  const where: Prisma.HostelWhereInput = {
    status: HostelStatus.LIVE,
    ...(campusId && { campusId }),
    ...(gender && { gender: gender as Gender }),
    ...(search && { name: { contains: search, mode: 'insensitive' } }),
    ...(roomType || minPrice || maxPrice
      ? {
          rooms: {
            some: {
              ...(roomType && { type: roomType as RoomType }),
              ...(minPrice && { pricePerMonth: { gte: Number(minPrice) } }),
              ...(maxPrice && { pricePerMonth: { lte: Number(maxPrice) } }),
            },
          },
        }
      : {}),
  }

  return prisma.hostel.findMany({
    where,
    include: {
      owner: { select: { id: true, name: true, avatarUrl: true } },
      campus: true,
      images: { where: { isCover: true }, take: 1 },
      rooms: { select: { id: true, type: true, pricePerMonth: true, availableUnits: true } },
      reviews: { select: { id: true, rating: true, comment: true } },
      _count: { select: { favorites: true } },
    },
    orderBy: { createdAt: 'desc' },
  }) as Promise<HostelWithDetails[]>
}

function CardSkeleton() {
  return (
    <div className="rounded-xl border overflow-hidden">
      <Skeleton className="h-48 w-full" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
      </div>
    </div>
  )
}

export default async function HostelsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>
}) {
  const params = await searchParams
  const hostels = await getHostels(params)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h1 className="text-2xl font-bold text-gray-900">Find a hostel</h1>
          <p className="text-gray-500 text-sm mt-1">Browse verified student accommodation near your campus</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6 space-y-5">
        <Suspense>
          <FilterBar />
        </Suspense>

        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {hostels.length} {hostels.length === 1 ? 'hostel' : 'hostels'} found
          </p>
        </div>

        {hostels.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <span className="text-6xl mb-4">🏠</span>
            <h3 className="text-lg font-semibold mb-1">No hostels found</h3>
            <p className="text-muted-foreground text-sm">Try adjusting your filters or search term</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {hostels.map((h) => (
              <HostelCard key={h.id} hostel={h} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
