import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Star, Clock } from 'lucide-react'
import type { HostelWithDetails } from '@/types'

const genderLabel: Record<string, string> = { MALE: 'Male only', FEMALE: 'Female only', MIXED: 'Mixed' }

export default function HostelCard({ hostel, minutesToCampus }: { hostel: HostelWithDetails; minutesToCampus?: number }) {
  const cover = hostel.images.find((i) => i.isCover) ?? hostel.images[0]
  const minPrice = hostel.rooms.length ? Math.min(...hostel.rooms.map((r) => r.pricePerMonth)) : null
  const avgRating = hostel.reviews.length
    ? (hostel.reviews.reduce((s, r) => s + r.rating, 0) / hostel.reviews.length).toFixed(1)
    : null

  return (
    <Link href={`/hostels/${hostel.id}`} className="group block">
      <div className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200">

        {/* Image */}
        <div className="relative h-48 bg-gray-100">
          {cover ? (
            <Image src={cover.url} alt={hostel.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-3xl text-gray-300">🏠</div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {minutesToCampus && (
            <div className="absolute top-2.5 left-2.5 flex items-center gap-1 bg-white text-gray-800 text-[0.68rem] font-medium px-2 py-1 rounded-md shadow-sm">
              <Clock className="w-3 h-3 text-gray-500" />
              {minutesToCampus} min to campus
            </div>
          )}

          {hostel.verified && (
            <div className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-teal-600 text-white text-[0.65rem] font-semibold px-2 py-1 rounded-md">
              ✓ Verified
            </div>
          )}

          {avgRating && (
            <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1 bg-white text-gray-800 text-xs font-semibold px-2 py-1 rounded-md shadow-sm">
              <Star className="w-3 h-3 fill-gray-800 text-gray-800" />
              {avgRating}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 space-y-2.5">
          <div>
            <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-1">{hostel.name}</h3>
            <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
              <MapPin className="w-3 h-3 shrink-0" />
              {hostel.campus.name}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[0.65rem] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
              {genderLabel[hostel.gender] ?? hostel.gender}
            </span>
            <span className="text-xs text-gray-400">{hostel.rooms.length} room type{hostel.rooms.length !== 1 ? 's' : ''}</span>
          </div>

          <div className="pt-1 border-t border-gray-100">
            {minPrice ? (
              <p className="text-sm">
                <span className="font-bold text-gray-900">KES {minPrice.toLocaleString()}</span>
                <span className="text-gray-400 text-xs">/mo</span>
              </p>
            ) : (
              <p className="text-xs text-gray-400">No rooms listed</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
