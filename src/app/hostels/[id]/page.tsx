import Image from 'next/image'
import { notFound } from 'next/navigation'
import BookingForm from '@/components/booking-form'
import { prisma } from '@/lib/prisma'
import type { HostelImage, Room, Review } from '@prisma/client'

export default async function HostelDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const hostel = await prisma.hostel.findUnique({
    where: { id },
    include: {
      owner: { select: { id: true, name: true, avatarUrl: true } },
      campus: true,
      images: true,
      rooms: true,
      reviews: { include: { student: { select: { name: true, avatarUrl: true } } } },
    },
  })

  if (!hostel) notFound()

  const avgRating = hostel.reviews.length
    ? (hostel.reviews.reduce((s, r) => s + r.rating, 0) / hostel.reviews.length).toFixed(1)
    : null

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="grid grid-cols-2 gap-2 rounded-xl overflow-hidden h-72">
        {hostel.images.slice(0, 4).map((img: HostelImage) => (
          <div key={img.id} className="relative bg-gray-100">
            <Image src={img.url} alt={hostel.name} fill className="object-cover" />
          </div>
        ))}
      </div>

      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">{hostel.name}</h1>
          <p className="text-gray-500">{hostel.campus.name} · {hostel.address}</p>
          <p className="text-sm mt-1">{hostel.gender} · {hostel.amenities.join(', ')}</p>
        </div>
        {avgRating && <span className="text-lg font-semibold">⭐ {avgRating}</span>}
      </div>

      <p className="text-gray-700">{hostel.description}</p>

      <div>
        <h2 className="text-xl font-semibold mb-3">Available rooms</h2>
        <div className="space-y-3">
          {hostel.rooms.map((room: Room) => (
            <div key={room.id} className="border rounded-lg p-4 flex justify-between items-center">
              <div>
                <p className="font-medium">{room.type}</p>
                <p className="text-sm text-gray-500">{room.availableUnits} units available</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">KES {room.pricePerMonth.toLocaleString()}/mo</p>
                {room.availableUnits > 0 && (
                  <div className="mt-2">
                    <BookingForm roomId={room.id} price={room.pricePerMonth} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {hostel.reviews.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-3">Reviews</h2>
          <div className="space-y-3">
            {hostel.reviews.map((review: Review & { student: { name: string } }) => (
              <div key={review.id} className="border rounded-lg p-4">
                <div className="flex justify-between">
                  <span className="font-medium">{review.student?.name}</span>
                  <span>{'⭐'.repeat(review.rating)}</span>
                </div>
                <p className="text-gray-600 text-sm mt-1">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
