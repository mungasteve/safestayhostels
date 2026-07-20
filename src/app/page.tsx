import Link from 'next/link'
import Image from 'next/image'
import Logo from '@/components/logo'
import {
  ShieldCheck, MapPin, CreditCard, Star, ArrowRight,
  Mail, Phone, CheckCircle2, MoveRight, Clock,
} from 'lucide-react'

const features = [
  { icon: ShieldCheck, title: 'Verified listings', desc: 'Every hostel is physically inspected before going live. No ghost listings, no scams.' },
  { icon: MapPin, title: 'Campus-first search', desc: 'Filter by university. See walk time to your campus gate on every listing.' },
  { icon: CreditCard, title: 'Secure payments', desc: 'Pay via M-Pesa or card. Funds held in escrow until you confirm move-in.' },
  { icon: Star, title: 'Honest reviews', desc: 'Only students who completed a booking can leave a review.' },
]

const testimonials = [
  { name: 'Amina Wanjiku', campus: 'University of Nairobi', text: 'I found my room in under 10 minutes. The photos matched exactly what I saw on arrival — that never happens with Facebook groups.', avatar: '/avatar-1.jpg' },
  { name: 'Brian Otieno', campus: 'Kenyatta University', text: 'Paid via M-Pesa and got a confirmation instantly. Moved in the next morning. The whole process felt professional for once.', avatar: '/avatar-2.jpg' },
  { name: 'Cynthia Muthoni', campus: 'Strathmore University', text: "The campus filter is the feature I didn't know I needed. Found an en-suite 6 minutes from my faculty and booked it the same day.", avatar: '/avatar-3.jpg' },
]

const rooms = [
  { img: '/room-single.jpg', type: 'Single Room', desc: 'Private room, shared facilities', price: 'From KES 4,500/mo' },
  { img: '/room-shared.jpg', type: 'Shared Room', desc: '2–4 beds, split the cost', price: 'From KES 2,500/mo' },
  { img: '/room-ensuite.jpg', type: 'En-suite', desc: 'Private room, private bathroom', price: 'From KES 8,000/mo' },
  { img: '/room-bedsitter.jpg', type: 'Bedsitter', desc: 'Self-contained unit', price: 'From KES 10,000/mo' },
]

export default function HomePage() {
  return (
    <div className="flex flex-col bg-white text-gray-900">

      {/* ── HERO ── */}
      <section className="relative h-[88vh] min-h-[580px] flex items-center overflow-hidden">
        <Image src="/hero-bg.jpg" alt="Student hostel" fill priority className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/88 via-gray-950/55 to-transparent" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
          <div className="max-w-lg space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1.5 text-xs text-white/80 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0" />
              6 verified hostels live across Nairobi
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.1]">
              Find student housing<br />near your campus
            </h1>
            <p className="text-white/65 text-base leading-relaxed">
              Verified hostels, transparent pricing, secure payments. No agents, no deposits lost to strangers.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <Link
                href="/hostels"
                className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
              >
                Browse hostels <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors backdrop-blur-sm"
              >
                Create account
              </Link>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-2 pt-1">
              {['No hidden fees', 'M-Pesa & card', 'Verified owners', 'Free to browse'].map((p) => (
                <span key={p} className="flex items-center gap-1.5 text-white/55 text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div className="border-b border-gray-100 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap gap-8">
          {[
            { value: '6', label: 'Verified hostels' },
            { value: '4', label: 'Campuses covered' },
            { value: 'KES 2,500', label: 'Lowest price/mo' },
            { value: '100%', label: 'Inspected listings' },
          ].map(({ value, label }) => (
            <div key={label} className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-gray-900">{value}</span>
              <span className="text-sm text-gray-500">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── ROOM TYPES ── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Room types</h2>
          <p className="text-gray-500 text-sm mt-1">Every type available across our listed hostels</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {rooms.map(({ img, type, desc, price }) => (
            <Link href="/hostels" key={type} className="group block rounded-xl overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200">
              <div className="relative h-44">
                <Image src={img} alt={type} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-3 left-3 text-white">
                  <p className="font-semibold text-sm">{type}</p>
                  <p className="text-xs text-white/65 mt-0.5">{desc}</p>
                  <p className="text-xs font-medium text-white/90 mt-1">{price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── WHY SAFESTAY ── */}
      <section id="about" className="bg-gray-50 border-y border-gray-100 scroll-mt-16">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">Built for students who've been burned before</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Finding student housing in Kenya was broken — Facebook groups full of scams, agents demanding cash upfront, photos that looked nothing like the actual room.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                SafeStay is a verified marketplace. Every listing is physically inspected. Every payment is protected. Every review comes from a student who actually lived there.
              </p>
              <Link href="/hostels" className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 text-sm font-semibold transition-colors mt-2">
                Browse hostels <MoveRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {features.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="bg-white rounded-xl p-4 border border-gray-200">
                  <Icon className="w-4 h-4 text-teal-600 mb-3" />
                  <h3 className="font-semibold text-sm text-gray-900 mb-1">{title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-6 py-16 scroll-mt-16">
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900">How it works</h2>
          <p className="text-gray-500 text-sm mt-1">From search to move-in, in one afternoon</p>
        </div>
        <div className="grid md:grid-cols-2 gap-px bg-gray-200 rounded-xl overflow-hidden border border-gray-200">
          {[
            {
              n: '1',
              title: 'Search by campus',
              body: 'Enter your university. Filter by gender policy, room type, and budget. Every result shows the exact walk time to your campus gate.',
            },
            {
              n: '2',
              title: 'Book the room directly',
              body: 'Verified photos, confirmed prices, real amenities. Pick your room and move-in date. No agent call, no back-and-forth.',
            },
            {
              n: '3',
              title: 'Pay securely',
              body: 'M-Pesa or card. Your payment is held in escrow — the owner only receives it after you confirm you\'ve moved in.',
            },
            {
              n: '4',
              title: 'Move in with confirmation',
              body: 'Show your booking confirmation at the gate. Move in on your chosen date. Leave an honest review for the next student.',
            },
          ].map(({ n, title, body }) => (
            <div key={n} className="bg-white p-8 space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center shrink-0">{n}</span>
                <h3 className="font-semibold text-gray-900">{title}</h3>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed pl-10">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900">What students say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map(({ name, campus, text, avatar }) => (
              <div key={name} className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col gap-4">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-gray-900 text-gray-900" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed flex-1">"{text}"</p>
                <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-100 shrink-0">
                    <Image src={avatar} alt={name} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-gray-900">{name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{campus}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="bg-gray-900 rounded-2xl px-10 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <h2 className="text-xl font-bold text-white">Ready to find your room?</h2>
            <p className="text-gray-400 text-sm">6 verified hostels live now. New listings added weekly.</p>
          </div>
          <Link
            href="/hostels"
            className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors shrink-0"
          >
            Browse hostels <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="border-t border-gray-100 scroll-mt-16">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Get in touch</h2>
            <p className="text-gray-500 text-sm mt-1">Questions about a listing or booking? We respond within a few hours.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 max-w-sm">
            {[
              { icon: Mail, label: 'Email', value: 'JackstarKombo@gmail.com', href: 'mailto:JackstarKombo@gmail.com' },
              { icon: Phone, label: 'Phone / WhatsApp', value: '+254 704 535 727', href: 'tel:+254704535727' },
            ].map(({ icon: Icon, label, value, href }) => (
              <a key={label} href={href} className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 flex-1 hover:border-gray-300 transition-colors">
                <Icon className="w-4 h-4 text-gray-400 shrink-0" />
                <div>
                  <p className="font-medium text-sm text-gray-900">{label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{value}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-900 text-gray-400">
        <div className="max-w-6xl mx-auto px-6 pt-12 pb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-10 border-b border-gray-800">
            <div className="col-span-2 md:col-span-1 space-y-3">
              <div className="text-white">
                <Logo size={24} />
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Verified student accommodation near your campus.
              </p>
              <div className="flex flex-col gap-1 text-sm">
                <a href="mailto:JackstarKombo@gmail.com" className="hover:text-white transition-colors">JackstarKombo@gmail.com</a>
                <a href="tel:+254704535727" className="hover:text-white transition-colors">+254 704 535 727</a>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-xs font-semibold text-white uppercase tracking-wider">Explore</p>
              <ul className="space-y-2 text-sm">
                <li><Link href="/hostels" className="hover:text-white transition-colors">Browse hostels</Link></li>
                <li><Link href="/#how-it-works" className="hover:text-white transition-colors">How it works</Link></li>
                <li><Link href="/#about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/#contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div className="space-y-3">
              <p className="text-xs font-semibold text-white uppercase tracking-wider">Account</p>
              <ul className="space-y-2 text-sm">
                <li><Link href="/login" className="hover:text-white transition-colors">Sign in</Link></li>
                <li><Link href="/register" className="hover:text-white transition-colors">Create account</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
              </ul>
            </div>
            <div className="space-y-3">
              <p className="text-xs font-semibold text-white uppercase tracking-wider">Legal</p>
              <ul className="space-y-2 text-sm">
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of service</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy policy</Link></li>
                <li><Link href="/cookies" className="hover:text-white transition-colors">Cookie policy</Link></li>
                <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-600">
            <p>© {new Date().getFullYear()} SafeStay. All rights reserved.</p>
            <p>Nairobi, Kenya</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
