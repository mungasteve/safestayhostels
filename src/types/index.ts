import type { Hostel, Room, User, Campus, HostelImage, Review } from '@prisma/client'

export type HostelWithDetails = Hostel & {
  owner: Pick<User, 'id' | 'name' | 'avatarUrl'>
  campus: Campus
  images: HostelImage[]
  rooms: Pick<Room, 'id' | 'type' | 'pricePerMonth' | 'availableUnits'>[]
  reviews: Pick<Review, 'id' | 'rating' | 'comment'>[]
  _count?: { favorites: number }
}

export type HostelFilters = {
  campusId?: string
  gender?: string
  roomType?: string
  minPrice?: number
  maxPrice?: number
  amenities?: string[]
  search?: string
}
