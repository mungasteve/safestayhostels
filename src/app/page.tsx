import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Search, MapPin, Clock } from 'lucide-react'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

const CAMPUSES = [
  'University of Nairobi',
  'Kenyatta University',
  'Strathmore University',
  'Mount Kenya University',
]

export default async function HomePage() {
  async function searchAction(formData: FormData) {
    'use server'
    const q = formData.get('q') as string
    redirect(`/hostels${q ? `?search=${encodeURIComponent(q)}` : ''}`)
  }

  const featured = await prisma.hostel.findMany({
    where: { status: 'LIVE' },
    orderBy: { createdAt: 'desc' },
    take: 3,
    include: {
      campus: true,
      images: { where: { isCover: true }, take: 1 },
      rooms: { orderBy: { pricePerMonth: 'asc' }, take: 1 },
    },
  })

  return (
    <div className="bg-white text-gray-900">

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section
        className="relative flex flex-col justify-end min-h-[88vh] px-6 pb-16 overflow-hidden"
        style={{ background: '#0f172a' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-bg.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center opacity-40"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #0f172a 35%, transparent 100%)' }} />

        <div className="relative z-10 max-w-2xl mx-auto w-full">
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-[1.1] tracking-tight mb-4">
            Find student housing<br />near your campus
          </h1>
          <p className="text-gray-400 text-base mb-8">
            Verified hostels. Transparent pricing. Secure payments.
          </p>
          <form action={searchAction} className="flex gap-2 mb-5">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                name="q"
                list="campus-list"
                placeholder="Search by campus or hostel name…"
                className="w-full h-11 pl-10 pr-4 rounded-lg bg-white text-gray-900 text-sm placeholder:text-gray-400 border-0 outline-none"
              />
              <datalist id="campus-list">
                {CAMPUSES.map(c => <option key={c} value={c} />)}
              </datalist>
            </div>
            <button
              type="submit"
              className="h-11 px-5 rounded-lg bg-teal-600 text-white text-sm font-semibold hover:bg-teal-700 transition-colors shrink-0"
            >
              Search
            </button>
          </form>
          <div className="flex flex-wrap gap-x-5 gap-y-1.5">
            {['No hidden fees', 'M-Pesa & card', 'Verified owners', 'Free to browse'].map(t => (
              <span key={t} className="text-xs text-gray-500">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ──────────────────────────────────────────── */}
      <div className="border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-4 flex flex-wrap gap-x-8 gap-y-2 text-xs text-gray-400">
          {['Listings physically inspected', 'Payments held in escrow', 'M-Pesa & card accepted', 'Verified owners only'].map(t => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>

      {/* ── FEATURED HOSTELS ─────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Recently listed</h2>
          <Link href="/hostels" className="text-xs text-gray-400 hover:text-gray-700 transition-colors">Browse all →</Link>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {featured.map(hostel => {
            const cover = hostel.images[0]?.url
            const minPrice = hostel.rooms[0]?.pricePerMonth
            return (
              <Link
                key={hostel.id}
                href={`/hostels/${hostel.id}`}
                className="group block rounded-xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all"
              >
                <div className="relative h-44 bg-gray-100">
                  {cover && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={cover}
                      alt={hostel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  {hostel.verified && (
                    <span className="absolute top-2.5 left-2.5 bg-teal-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                      Verified
                    </span>
                  )}
                </div>
                <div className="p-3.5">
                  <p className="font-semibold text-sm text-gray-900 truncate">{hostel.name}</p>
                  <div className="flex items-center gap-3 mt-1.5 text-[11px] text-gray-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />{hostel.campus.name}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />{hostel.minutesToCampus} min
                    </span>
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
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <footer className="bg-gray-950 mt-8">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-8 border-b border-gray-800">
            <div className="col-span-2 md:col-span-1 space-y-2.5">
              <p className="font-bold text-white text-sm">SafeStay</p>
              <p className="text-xs text-gray-500 leading-relaxed">Verified student accommodation near your campus.</p>
              <div className="space-y-1 text-xs text-gray-500">
                <a href="mailto:Safestayhostels26@gmail.com" className="block hover:text-white transition-colors">Safestayhostels26@gmail.com</a>
                <a href="https://wa.me/254704535727" className="block hover:text-white transition-colors">+254 704 535 727</a>
              </div>
            </div>
            {[
              { heading: 'Explore', links: [{ href: '/hostels', label: 'Browse hostels' }, { href: '/how-it-works', label: 'How it works' }, { href: '/about', label: 'About' }, { href: '/contact', label: 'Contact' }] },
              { heading: 'Account', links: [{ href: '/login', label: 'Sign in' }, { href: '/register', label: 'Create account' }] },
              { heading: 'Legal', links: [{ href: '/terms', label: 'Terms' }, { href: '/privacy', label: 'Privacy' }, { href: '/faq', label: 'FAQ' }] },
            ].map(({ heading, links }) => (
              <div key={heading} className="space-y-2.5">
                <p className="text-[10px] font-semibold text-white uppercase tracking-wider">{heading}</p>
                <ul className="space-y-1.5">
                  {links.map(({ href, label }) => (
                    <li key={href}><Link href={href} className="text-xs text-gray-500 hover:text-white transition-colors">{label}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-5 flex justify-between text-[11px] text-gray-700">
            <p>© {new Date().getFullYear()} SafeStay</p>
            <p>Nairobi, Kenya</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
