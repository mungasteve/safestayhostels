export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MapPin, Clock, ArrowLeft } from 'lucide-react'
import { prisma } from '@/lib/prisma'

// Map URL slugs → campus IDs
const SLUG_TO_CAMPUS: Record<string, string> = {
  'university-of-nairobi': 'campus-uon',
  'kenyatta-university': 'campus-ku',
  'technical-university-of-kenya': 'campus-tuk',
  'jkuat': 'campus-jkuat',
  'mount-kenya-university': 'campus-mku',
  'usiu-africa': 'campus-usiu',
  'daystar-university': 'campus-daystar',
  'multimedia-university': 'campus-mmu',
  'kisii-university': 'campus-kisii',
  'maseno-university': 'campus-maseno',
}

const genderLabel: Record<string, string> = { MALE: 'Male only', FEMALE: 'Female only', MIXED: 'Mixed' }
const genderColor: Record<string, string> = {
  MALE: 'bg-blue-50 text-blue-700',
  FEMALE: 'bg-pink-50 text-pink-700',
  MIXED: 'bg-gray-100 text-gray-600',
}

export default async function CampusPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const campusId = SLUG_TO_CAMPUS[slug]
  if (!campusId) notFound()

  const campus = await prisma.campus.findUnique({
    where: { id: campusId },
    include: {
      hostels: {
        where: { status: 'LIVE' },
        orderBy: { minutesToCampus: 'asc' },
        include: {
          images: { where: { isCover: true }, take: 1 },
          rooms: { orderBy: { pricePerMonth: 'asc' }, take: 1 },
        },
      },
    },
  })

  if (!campus) notFound()

  const male = campus.hostels.filter(h => h.gender === 'MALE' || h.gender === 'MIXED')
  const female = campus.hostels.filter(h => h.gender === 'FEMALE' || h.gender === 'MIXED')

  function HostelGrid({ hostels }: { hostels: typeof campus.hostels }) {
    if (!hostels.length) return <p className="text-sm text-gray-400">No listings yet.</p>
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {hostels.map(h => {
          const cover = h.images[0]?.url
          const minPrice = h.rooms[0]?.pricePerMonth
          return (
            <Link
              key={h.id}
              href={`/hostels/${h.id}`}
              className="group block rounded-xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all"
            >
              <div className="relative h-44 bg-gray-100">
                {cover && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={cover} alt={h.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                )}
                {h.verified && (
                  <span className="absolute top-2.5 left-2.5 bg-teal-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                    Verified
                  </span>
                )}
                <span className={`absolute top-2.5 right-2.5 text-[10px] font-semibold px-2 py-0.5 rounded-full ${genderColor[h.gender]}`}>
                  {genderLabel[h.gender]}
                </span>
              </div>
              <div className="p-3.5">
                <p className="font-semibold text-sm text-gray-900 truncate">{h.name}</p>
                <div className="flex items-center gap-3 mt-1.5 text-[11px] text-gray-400">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{h.address}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{h.minutesToCampus} min</span>
                </div>
                {minPrice && (
                  <p className="mt-2 text-xs font-semibold text-gray-900">
                    From KES {minPrice.toLocaleString()}<span className="font-normal text-gray-400">/mo</span>
                  </p>
                )}
              </div>
            </Link>
          )
        })}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#0f172a] text-white px-6 py-10">
        <div className="max-w-5xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white mb-4 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold">{campus.name}</h1>
          <p className="text-gray-400 text-sm mt-1">{campus.city} · {campus.hostels.length} listing{campus.hostels.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-900 mb-4">Male &amp; Mixed</h2>
          <HostelGrid hostels={male} />
        </section>
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-900 mb-4">Female &amp; Mixed</h2>
          <HostelGrid hostels={female} />
        </section>
      </div>
    </div>
  )
}
