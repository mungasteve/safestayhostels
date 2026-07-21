import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ArrowRight, Search, ShieldCheck, MapPin, CreditCard, Star } from 'lucide-react'

const CAMPUSES = [
  'University of Nairobi',
  'Kenyatta University',
  'Strathmore University',
  'Mount Kenya University',
]

const rooms = [
  { img: '/room-single.jpg', type: 'Single Room', price: 'From KES 4,500/mo' },
  { img: '/room-shared.jpg', type: 'Shared Room', price: 'From KES 2,500/mo' },
  { img: '/room-ensuite.jpg', type: 'En-suite', price: 'From KES 8,000/mo' },
  { img: '/room-bedsitter.jpg', type: 'Bedsitter', price: 'From KES 10,000/mo' },
]

const testimonials = [
  { name: 'Amina W.', campus: 'University of Nairobi', rating: 5, text: 'Found my room in under 10 minutes. Photos matched exactly what I saw on arrival.' },
  { name: 'Brian O.', campus: 'Kenyatta University', rating: 5, text: 'Paid via M-Pesa and got confirmation instantly. Moved in the next morning.' },
  { name: 'Cynthia M.', campus: 'Strathmore University', rating: 4, text: 'Campus filter saved me a lot of time. Found an en-suite near my faculty.' },
]

export default function HomePage() {
  async function searchAction(formData: FormData) {
    'use server'
    const q = formData.get('q') as string
    redirect(`/hostels${q ? `?search=${encodeURIComponent(q)}` : ''}`)
  }

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

      {/* ── ROOM TYPES ───────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Room types</h2>
            <Link href="/hostels" className="text-xs text-gray-400 hover:text-gray-700 transition-colors">View all →</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
            {rooms.map(({ img, type, price }) => (
              <Link href="/hostels" key={type} className="group block rounded-lg overflow-hidden">
                <div className="relative h-32 sm:h-40 bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={type} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)' }} />
                  <div className="absolute bottom-0 left-0 p-2.5 text-white">
                    <p className="font-semibold text-xs leading-tight">{type}</p>
                    <p className="text-[11px] text-white/60 mt-0.5">{price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY SAFESTAY ─────────────────────────────────────────── */}
      <section id="about" className="bg-gray-50 scroll-mt-16">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Built for students who've been burned before</h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-3">
                Finding student housing in Kenya was broken — Facebook groups full of scams, agents demanding cash upfront, photos that looked nothing like the actual room.
              </p>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">
                Every listing on SafeStay is physically inspected before it goes live. Every payment is held in escrow until you confirm move-in. Every review is from a student who actually lived there.
              </p>
              <Link href="/hostels" className="inline-flex items-center gap-1.5 bg-gray-900 text-white hover:bg-gray-800 px-4 py-2 rounded-lg text-xs font-semibold transition-colors">
                Browse hostels <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { icon: ShieldCheck, title: 'Verified listings', desc: 'Physically inspected before going live.' },
                { icon: MapPin, title: 'Campus-first', desc: 'Walk time shown on every listing.' },
                { icon: CreditCard, title: 'Secure payments', desc: 'Escrow until you confirm move-in.' },
                { icon: Star, title: 'Honest reviews', desc: 'Only from students who booked.' },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="p-3.5 rounded-lg border border-gray-200 bg-white">
                  <Icon className="w-3.5 h-3.5 text-gray-500 mb-2" strokeWidth={1.5} />
                  <p className="font-semibold text-xs text-gray-900 mb-0.5">{title}</p>
                  <p className="text-[11px] text-gray-400 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────── */}
      <section id="how-it-works" className="bg-white scroll-mt-16">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-8">How it works</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { n: '1', title: 'Search by campus', body: 'Enter your university and filter by room type, gender policy, and budget.' },
              { n: '2', title: 'Browse listings', body: 'Real photos, confirmed prices, verified owner. No agents, no surprises.' },
              { n: '3', title: 'Pay securely', body: 'M-Pesa or card. Deposit held in escrow until you confirm move-in.' },
              { n: '4', title: 'Move in', body: 'Show your confirmation at the gate. Leave a review for the next student.' },
            ].map(({ n, title, body }) => (
              <div key={n} className="flex gap-3">
                <span className="text-xs font-bold text-gray-200 mt-0.5 w-4 shrink-0">{n}</span>
                <div>
                  <p className="font-semibold text-sm text-gray-900 mb-1">{title}</p>
                  <p className="text-xs text-gray-400 leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────── */}
      <section className="bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-8">What students say</h2>
          <div className="divide-y divide-gray-100">
            {testimonials.map(({ name, campus, rating, text }) => (
              <div key={name} className="py-5 flex gap-4 items-start">
                <div className="flex gap-0.5 mt-0.5 shrink-0">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-2.5 h-2.5 ${i < rating ? 'fill-gray-800 text-gray-800' : 'fill-gray-200 text-gray-200'}`} />
                  ))}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-600 leading-relaxed mb-1.5">"{text}"</p>
                  <p className="text-xs text-gray-400">{name} · {campus}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="bg-gray-950 rounded-xl px-7 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-white">Find your room today</h2>
              <p className="text-gray-500 text-xs mt-1">Browse verified hostels near your campus.</p>
            </div>
            <Link
              href="/hostels"
              className="inline-flex items-center gap-1.5 bg-white text-gray-900 hover:bg-gray-100 px-4 py-2 rounded-lg text-xs font-semibold transition-colors shrink-0"
            >
              Browse hostels <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────── */}
      <section id="contact" className="bg-gray-50 scroll-mt-16">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-1">Get in touch</h2>
          <p className="text-gray-400 text-xs mb-6">Questions about a listing or booking? We respond within a few hours.</p>
          <div className="flex flex-col sm:flex-row gap-2.5 max-w-xs">
            <a href="mailto:hello@safestayhostels.com" className="flex items-center gap-2.5 border border-gray-200 rounded-lg px-3.5 py-2.5 hover:border-gray-300 transition-colors">
              <span className="text-sm">✉</span>
              <div>
                <p className="font-medium text-xs text-gray-900">Email</p>
                <p className="text-[11px] text-gray-400">hello@safestayhostels.com</p>
              </div>
            </a>
            <a href="https://wa.me/254704535727" className="flex items-center gap-2.5 border border-gray-200 rounded-lg px-3.5 py-2.5 hover:border-gray-300 transition-colors">
              <span className="text-sm">📱</span>
              <div>
                <p className="font-medium text-xs text-gray-900">WhatsApp</p>
                <p className="text-[11px] text-gray-400">+254 704 535 727</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <footer className="bg-gray-950">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-8 border-b border-gray-800">
            <div className="col-span-2 md:col-span-1 space-y-2.5">
              <p className="font-bold text-white text-sm">SafeStay</p>
              <p className="text-xs text-gray-500 leading-relaxed">Verified student accommodation near your campus.</p>
              <div className="space-y-1 text-xs text-gray-500">
                <a href="mailto:hello@safestayhostels.com" className="block hover:text-white transition-colors">hello@safestayhostels.com</a>
                <a href="https://wa.me/254704535727" className="block hover:text-white transition-colors">+254 704 535 727</a>
              </div>
            </div>
            {[
              { heading: 'Explore', links: [{ href: '/hostels', label: 'Browse hostels' }, { href: '/#how-it-works', label: 'How it works' }, { href: '/#about', label: 'About' }, { href: '/#contact', label: 'Contact' }] },
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
