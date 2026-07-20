import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, Star } from 'lucide-react'
import type { HostelWithDetails } from '@/types'

const genderColor: Record<string, string> = {
  MALE: 'bg-blue-100 text-blue-700',
  FEMALE: 'bg-pink-100 text-pink-700',
  MIXED: 'bg-purple-100 text-purple-700',
}

export default function HostelCard({ hostel }: { hostel: HostelWithDetails }) {
  const cover = hostel.images.find((i) => i.isCover) ?? hostel.images[0]
  const minPrice = hostel.rooms.length
    ? Math.min(...hostel.rooms.map((r) => r.pricePerMonth))
    : null
  const avgRating = hostel.reviews.length
    ? (hostel.reviews.reduce((s: number, r) => s + r.rating, 0) / hostel.reviews.length).toFixed(1)
    : null

  return (
    <Link href={`/hostels/${hostel.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 p-0">
        <div className="relative h-48 bg-muted">
          {cover ? (
            <Image src={cover.url} alt={hostel.name} fill className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
              <span className="text-4xl">🏠</span>
            </div>
          )}
          <div className="absolute top-3 left-3">
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${genderColor[hostel.gender] ?? 'bg-gray-100 text-gray-700'}`}>
              {hostel.gender}
            </span>
          </div>
          {hostel.verified && (
            <div className="absolute top-3 right-3">
              <Badge className="bg-green-600 text-white text-xs">✓ Verified</Badge>
            </div>
          )}
        </div>
        <CardContent className="p-4 space-y-2">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-semibold text-sm leading-tight line-clamp-1">{hostel.name}</h3>
            {avgRating && (
              <div className="flex items-center gap-1 shrink-0 text-xs text-muted-foreground">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                {avgRating}
              </div>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="w-3 h-3" />
            {hostel.campus.name}
          </div>
          <div className="flex items-center justify-between pt-1">
            {minPrice ? (
              <p className="text-sm font-bold">
                KES {minPrice.toLocaleString()}<span className="font-normal text-muted-foreground text-xs">/mo</span>
              </p>
            ) : (
              <p className="text-xs text-muted-foreground">No rooms listed</p>
            )}
            <span className="text-xs text-muted-foreground">{hostel.rooms.length} room type{hostel.rooms.length !== 1 ? 's' : ''}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
