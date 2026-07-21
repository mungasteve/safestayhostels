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
  { name: 'Amina W.', campus: 'University of Nairobi', rating: 5, text: 'Found my room in under 10 minutes. Photos matched exactly what I saw on arrival — that never happens with Facebook groups.' },
  { name: 'Brian O.', campus: 'Kenyatta University', rating: 5, text: 'Paid via M-Pesa and got confirmation instantly. Moved in the next morning. Felt professional for once.' },
  { name: 'Cynthia M.', campus: 'Strathmore University', rating: 4, text: 'Campus filter saved me a lot of time. Found an en-suite near my faculty. Would have liked more photos but overall solid.' },
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
        className="relative flex flex-col justify-end min-h-[92vh] px-6 pb-16 overflow-hidden"
        style={{ background: '#0f172a' }}
      >
        {/* Background image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-bg.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center opacity-40"
        />
        {/* Gradient */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #0f172a 30%, transparent 100%)' }} />

        <div className="relative z-10 max-w-2xl mx-auto w-full">
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-[1.1] tracking-tight mb-4">
            Find student housing<br />near your campus
          </h1>
          <p className="text-gray-400 text-lg mb-8">
            Verified hostels. Transparent pricing. Secure payments.
          </p>

          {/* Search */}
          <form action={searchAction} className="flex gap-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                name="q"
                list="campus-list"
                placeholder="Search by campus or hostel name…"
                className="w-full h-12 pl-10 pr-4 rounded-xl bg-white text-gray-900 text-sm placeholder:text-gray-400 border-0 outline-none focus:ring-2 focus:ring-white/20"
              />
              <datalist id="campus-list">
                {CAMPUSES.map(c => <option key={c} value={c} />)}
              </datalist>
            </div>
            <button
              type="submit"
              className="h-12 px-6 rounded-xl bg-white text-gray-900 text-sm font-semibold hover:bg-gray-100 transition-colors shrink-0"
            >
              Search
            </button>
          </form>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {['No hidden fees', 'M-Pesa & card accepted', 'Verified owners only', 'Free to browse'].map(t => (
              <span key={t} className="text-xs text-gray-500">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROOM TYPES ───────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Room types</h2>
          <Link href="/hostels" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {rooms.map(({ img, type, price }) => (
            <Link href="/hostels" key={type} className="group block rounded-xl overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
              <div className="relative h-36 sm:h-44 overflow-hidden bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt={type} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)' }} />
                <div className="absolute bottom-0 left-0 p-3 text-white">
                  <p className="font-semibold text-sm leading-tight">{type}</p>
                  <p className="text-xs text-white/60 mt-0.5">{price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── WHY SAFESTAY ─────────────────────────────────────────── */}
      <section id="about" className="border-t border-gray-100 scroll-mt-16">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Built for students who've been burned before</h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-3">
                Finding student housing in Kenya was broken — Facebook groups full of scams, agents demanding cash upfront, photos that looked nothing like the actual room.
              </p>
              <p className="text-gray-500 text-sm leading-relaxed">
                Every listing on SafeStay is physically inspected before it goes live. Every payment is held in escrow until you confirm move-in. Every review is from a student who actually lived there.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: ShieldCheck, title: 'Verified listings', desc: 'Physically inspected before going live. No ghost listings.' },
                { icon: MapPin, title: 'Campus-first', desc: 'Filter by university. Walk time shown on every listing.' },
                { icon: CreditCard, title: 'Secure payments', desc: 'M-Pesa or card. Escrow until you confirm move-in.' },
                { icon: Star, title: 'Honest reviews', desc: 'Only from students who completed a booking.' },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="p-4 rounded-xl border border-gray-200 bg-gray-50">
                  <Icon className="w-4 h-4 text-gray-700 mb-2" strokeWidth={1.5} />
                  <p className="font-semibold text-sm text-gray-900 mb-1">{title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────── */}
      <section id="how-it-works" className="border-t border-gray-100 scroll-mt-16">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-10">How it works</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { n: '01', title: 'Search by campus', body: 'Enter your university. Filter by gender policy, room type, and budget.' },
              { n: '02', title: 'Book directly', body: 'Verified photos, confirmed prices. Pick your room and move-in date. No agent.' },
              { n: '03', title: 'Pay securely', body: "M-Pesa or card. Held in escrow until you confirm you've moved in." },
              { n: '04', title: 'Move in', body: 'Show your confirmation at the gate. Leave a review for the next student.' },
            ].map(({ n, title, body }) => (
              <div key={n} className="space-y-2">
                <p className="text-xs font-mono text-gray-300">{n}</p>
                <p className="font-semibold text-gray-900 text-sm">{title}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────── */}
      <section className="border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">What students say</h2>
            <span className="text-xs text-gray-400">Early access</span>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {testimonials.map(({ name, campus, rating, text }) => (
              <div key={name} className="border border-gray-200 rounded-xl p-5 flex flex-col gap-3">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-3 h-3 ${i < rating ? 'fill-gray-900 text-gray-900' : 'fill-gray-200 text-gray-200'}`} />
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed flex-1">"{text}"</p>
                <div className="pt-3 border-t border-gray-100">
                  <p className="font-medium text-sm text-gray-900">{name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{campus}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <div className="bg-gray-950 rounded-2xl px-8 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div>
              <h2 className="text-xl font-bold text-white">Find your room today</h2>
              <p className="text-gray-500 text-sm mt-1">Browse verified hostels near your campus.</p>
            </div>
            <Link
              href="/hostels"
              className="inline-flex items-center gap-2 bg-white text-gray-900 hover:bg-gray-100 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors shrink-0"
            >
              Browse hostels <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────── */}
      <section id="contact" className="border-t border-gray-100 scroll-mt-16">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Get in touch</h2>
          <p className="text-gray-500 text-sm mb-6">Questions about a listing or booking? We respond within a few hours.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-sm">
            <a href="mailto:hello@safestayhostels.com" className="flex-1 flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 hover:border-gray-300 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 text-xs">✉</div>
              <div>
                <p className="font-medium text-sm text-gray-900">Email</p>
                <p className="text-xs text-gray-500">hello@safestayhostels.com</p>
              </div>
            </a>
            <a href="https://wa.me/254704535727" className="flex-1 flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 hover:border-gray-300 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 text-xs">📱</div>
              <div>
                <p className="font-medium text-sm text-gray-900">WhatsApp</p>
                <p className="text-xs text-gray-500">+254 704 535 727</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <footer className="border-t border-gray-100 bg-gray-950">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-10 border-b border-gray-800">
            <div className="col-span-2 md:col-span-1 space-y-3">
              <p className="font-bold text-white">SafeStay</p>
              <p className="text-sm text-gray-500 leading-relaxed">Verified student accommodation near your campus.</p>
              <div className="space-y-1 text-sm text-gray-500">
                <a href="mailto:hello@safestayhostels.com" className="block hover:text-white transition-colors">hello@safestayhostels.com</a>
                <a href="https://wa.me/254704535727" className="block hover:text-white transition-colors">+254 704 535 727</a>
              </div>
            </div>
            {[
              { heading: 'Explore', links: [{ href: '/hostels', label: 'Browse hostels' }, { href: '/#how-it-works', label: 'How it works' }, { href: '/#about', label: 'About' }, { href: '/#contact', label: 'Contact' }] },
              { heading: 'Account', links: [{ href: '/login', label: 'Sign in' }, { href: '/register', label: 'Create account' }] },
              { heading: 'Legal', links: [{ href: '/terms', label: 'Terms' }, { href: '/privacy', label: 'Privacy' }, { href: '/cookies', label: 'Cookies' }, { href: '/faq', label: 'FAQ' }] },
            ].map(({ heading, links }) => (
              <div key={heading} className="space-y-3">
                <p className="text-xs font-semibold text-white uppercase tracking-wider">{heading}</p>
                <ul className="space-y-2">
                  {links.map(({ href, label }) => (
                    <li key={href}><Link href={href} className="text-sm text-gray-500 hover:text-white transition-colors">{label}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-6 flex justify-between text-xs text-gray-700">
            <p>© {new Date().getFullYear()} SafeStay</p>
            <p>Nairobi, Kenya</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
