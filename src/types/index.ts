import type { Prisma } from '@prisma/client'

export type HostelWithDetails = Prisma.HostelGetPayload<{
  include: {
    owner: { select: { id: true; name: true; avatarUrl: true } }
    campus: true
    images: true
    rooms: { select: { id: true; type: true; pricePerMonth: true; availableUnits: true } }
    reviews: { select: { id: true; rating: true; comment: true } }
    _count: { select: { favorites: true } }
  }
}>

export type HostelFilters = {
  campusId?: string
  gender?: string
  roomType?: string
  minPrice?: number
  maxPrice?: number
  amenities?: string[]
  search?: string
}
