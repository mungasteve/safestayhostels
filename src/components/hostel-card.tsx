import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Star, Clock } from 'lucide-react'
import type { HostelWithDetails } from '@/types'

const genderLabel: Record<string, string> = { MALE: 'Male only', FEMALE: 'Female only', MIXED: 'Mixed' }
const genderStyle: Record<string, string> = {
  MALE: 'bg-blue-50 text-blue-700 border-blue-100',
  FEMALE: 'bg-pink-50 text-pink-700 border-pink-100',
  MIXED: 'bg-purple-50 text-purple-700 border-purple-100',
}

export default function HostelCard({ hostel, minutesToCampus }: { hostel: HostelWithDetails; minutesToCampus?: number }) {
  const cover = hostel.images.find((i) => i.isCover) ?? hostel.images[0]
  const minPrice = hostel.rooms.length ? Math.min(...hostel.rooms.map((r) => r.pricePerMonth)) : null
  const avgRating = hostel.reviews.length
    ? (hostel.reviews.reduce((s, r) => s + r.rating, 0) / hostel.reviews.length).toFixed(1)
    : null

  return (
    <Link href={`/hostels/${hostel.id}`} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden border border-[#DDD8CC] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

        {/* Image */}
        <div className="relative h-52 bg-[#EDE8DC]">
          {cover ? (
            <Image src={cover.url} alt={hostel.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl">🏠</div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* Campus time chip — the signature element */}
          {minutesToCampus && (
            <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/95 backdrop-blur-sm text-[#132339] text-[0.7rem] font-semibold px-2.5 py-1 rounded-full shadow-sm">
              <Clock className="w-3 h-3 text-[#C99A43]" />
              {minutesToCampus} min to campus
            </div>
          )}

          {/* Verified badge */}
          {hostel.verified && (
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-[#4C7A6B] text-white text-[0.65rem] font-bold px-2.5 py-1 rounded-full">
              ✓ Verified
            </div>
          )}

          {/* Rating */}
          {avgRating && (
            <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-white/95 backdrop-blur-sm text-[#132339] text-xs font-semibold px-2 py-1 rounded-full shadow-sm">
              <Star className="w-3 h-3 fill-[#C99A43] text-[#C99A43]" />
              {avgRating}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-[#132339] text-[0.95rem] leading-snug line-clamp-1">{hostel.name}</h3>
            <div className="flex items-center gap-1 text-xs text-[#6B6251] mt-1">
              <MapPin className="w-3 h-3 shrink-0" />
              {hostel.campus.name}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className={`text-[0.65rem] font-semibold px-2 py-0.5 rounded-full border ${genderStyle[hostel.gender] ?? 'bg-gray-50 text-gray-600 border-gray-100'}`}>
              {genderLabel[hostel.gender] ?? hostel.gender}
            </span>
            <span className="text-xs text-[#6B6251]">{hostel.rooms.length} room type{hostel.rooms.length !== 1 ? 's' : ''}</span>
          </div>

          <div className="pt-1 border-t border-[#EDE8DC]">
            {minPrice ? (
              <p className="text-sm">
                <span className="font-bold text-[#C99A43] text-base">KES {minPrice.toLocaleString()}</span>
                <span className="text-[#6B6251] text-xs">/mo</span>
              </p>
            ) : (
              <p className="text-xs text-[#6B6251]">No rooms listed</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
