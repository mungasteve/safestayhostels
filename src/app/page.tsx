import Link from 'next/link'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { ArrowRight, Mail, Phone, Star, Search } from 'lucide-react'

const testimonials = [
  { name: 'Amina W.', campus: 'University of Nairobi', rating: 5, text: 'Found my room in under 10 minutes. The photos matched exactly what I saw on arrival — that never happens with Facebook groups.' },
  { name: 'Brian O.', campus: 'Kenyatta University', rating: 5, text: 'Paid via M-Pesa and got a confirmation instantly. Moved in the next morning. The whole process felt professional for once.' },
  { name: 'Cynthia M.', campus: 'Strathmore University', rating: 4, text: "The campus filter saved me a lot of time. Found an en-suite near my faculty. Would have liked more photos on the listing but overall solid." },
]

const rooms = [
  { img: '/room-single.jpg', type: 'Single Room', price: 'From KES 4,500/mo' },
  { img: '/room-shared.jpg', type: 'Shared Room', price: 'From KES 2,500/mo' },
  { img: '/room-ensuite.jpg', type: 'En-suite', price: 'From KES 8,000/mo' },
  { img: '/room-bedsitter.jpg', type: 'Bedsitter', price: 'From KES 10,000/mo' },
]

const CAMPUSES = [
  'University of Nairobi',
  'Kenyatta University',
  'Strathmore University',
  'Mount Kenya University',
]

export default function HomePage() {
  async function searchAction(formData: FormData) {
    'use server'
    const campus = formData.get('campus') as string
    const params = new URLSearchParams()
    if (campus) params.set('search', campus)
    redirect(`/hostels?${params.toString()}`)
  }

  return (
    <div className="flex flex-col bg-white text-gray-900">

      {/* HERO */}
      <section className="relative h-[85vh] min-h-[560px] flex items-end overflow-hidden">
        <Image src="/hero-bg.jpg" alt="Student hostel" fill priority className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-950/30 to-transparent" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 pb-16 w-full">
          <div className="max-w-xl space-y-5">
            <h1 className="text-4xl md:text-[2.75rem] font-bold text-white leading-[1.15] tracking-tight">
              Student housing near your campus
            </h1>
            <p className="text-white/60 text-base leading-relaxed">
              Verified hostels, transparent pricing, secure payments.
            </p>

            {/* Campus search */}
            <form action={searchAction} className="flex gap-2 max-w-md">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  name="campus"
                  list="campus-list"
                  placeholder="Your university or campus…"
                  className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-white text-gray-900 text-sm border-0 outline-none placeholder:text-gray-400"
                />
                <datalist id="campus-list">
                  {CAMPUSES.map((c) => <option key={c} value={c} />)}
                </datalist>
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors shrink-0"
              >
                Search
              </button>
            </form>

            <p className="text-white/40 text-xs">
              Or{' '}
              <Link href="/hostels" className="underline underline-offset-2 hover:text-white/70 transition-colors">
                browse all hostels
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ROOM TYPES */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Room types</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {rooms.map(({ img, type, price }) => (
            <Link href="/hostels" key={type} className="group block rounded-xl overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200">
              <div className="relative h-40">
                <Image src={img} alt={type} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
                <div className="absolute bottom-3 left-3 text-white">
                  <p className="font-semibold text-sm">{type}</p>
                  <p className="text-xs text-white/65 mt-0.5">{price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="border-t border-gray-100 scroll-mt-16">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="max-w-2xl space-y-5">
            <h2 className="text-2xl font-bold text-gray-900">Why SafeStay</h2>
            <p className="text-gray-500 leading-relaxed">
              Finding student housing in Kenya was broken — Facebook groups full of scams, agents demanding cash upfront, photos that looked nothing like the actual room.
            </p>
            <p className="text-gray-500 leading-relaxed">
              Every listing on SafeStay is physically inspected before it goes live. Every payment is held in escrow until you confirm move-in. Every review is from a student who actually lived there.
            </p>
          </div>

          <div className="mt-12 grid sm:grid-cols-2 md:grid-cols-4 gap-6 border-t border-gray-100 pt-12">
            {[
              { title: 'Verified listings', desc: 'Physically inspected before going live.' },
              { title: 'Campus-first search', desc: 'Filter by university, see walk time to your gate.' },
              { title: 'Secure payments', desc: 'M-Pesa or card. Escrow until you move in.' },
              { title: 'Honest reviews', desc: 'Only from students who completed a booking.' },
            ].map(({ title, desc }) => (
              <div key={title}>
                <p className="font-semibold text-sm text-gray-900">{title}</p>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="bg-gray-50 border-y border-gray-100 scroll-mt-16">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-12">How it works</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { n: '01', title: 'Search by campus', body: 'Enter your university. Filter by gender policy, room type, and budget. See walk time to your gate on every result.' },
              { n: '02', title: 'Book directly', body: 'Verified photos, confirmed prices. Pick your room and move-in date. No agent, no back-and-forth.' },
              { n: '03', title: 'Pay securely', body: "M-Pesa or card. Your payment is held until you confirm you've moved in. No cash to strangers." },
              { n: '04', title: 'Move in', body: 'Show your confirmation at the gate. Move in on your date. Leave a review for the next student.' },
            ].map(({ n, title, body }) => (
              <div key={n} className="space-y-3">
                <span className="text-xs font-bold text-gray-300 tracking-widest">{n}</span>
                <h3 className="font-semibold text-gray-900">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex items-baseline justify-between mb-10">
          <h2 className="text-2xl font-bold text-gray-900">What students say</h2>
          <p className="text-xs text-gray-400">Early access users</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map(({ name, campus, rating, text }) => (
            <div key={name} className="border border-gray-200 rounded-xl p-6 flex flex-col gap-4">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${i < rating ? 'fill-gray-900 text-gray-900' : 'fill-gray-200 text-gray-200'}`}
                  />
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
      </section>

      {/* CTA */}
      <section className="border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Find your room</h2>
            <p className="text-gray-500 text-sm mt-1">Browse verified hostels near your campus.</p>
          </div>
          <Link href="/hostels" className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors shrink-0">
            Browse hostels <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="bg-gray-50 border-t border-gray-100 scroll-mt-16">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Get in touch</h2>
          <p className="text-gray-500 text-sm mb-8">Questions about a listing or booking? We respond within a few hours.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md">
            {[
              { icon: Mail, label: 'Email', value: 'hello@safestayhostels.com', href: 'mailto:hello@safestayhostels.com' },
              { icon: Phone, label: 'WhatsApp', value: '+254 704 535 727', href: 'https://wa.me/254704535727' },
            ].map(({ icon: Icon, label, value, href }) => (
              <a key={label} href={href} className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3 flex-1 hover:border-gray-300 transition-colors">
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

      {/* FOOTER — no Dashboard link (auth-aware footer is in FooterClient) */}
      <footer className="bg-gray-900 text-gray-500">
        <div className="max-w-6xl mx-auto px-6 pt-12 pb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-10 border-b border-gray-800">
            <div className="col-span-2 md:col-span-1 space-y-3">
              <p className="text-white font-semibold text-sm">SafeStay</p>
              <p className="text-sm leading-relaxed">Verified student accommodation near your campus.</p>
              <div className="flex flex-col gap-1 text-sm">
                <a href="mailto:hello@safestayhostels.com" className="hover:text-white transition-colors">hello@safestayhostels.com</a>
                <a href="https://wa.me/254704535727" className="hover:text-white transition-colors">+254 704 535 727</a>
              </div>
            </div>
            {[
              {
                heading: 'Explore',
                links: [
                  { href: '/hostels', label: 'Browse hostels' },
                  { href: '/#how-it-works', label: 'How it works' },
                  { href: '/#about', label: 'About' },
                  { href: '/#contact', label: 'Contact' },
                ],
              },
              {
                heading: 'Account',
                links: [
                  { href: '/login', label: 'Sign in' },
                  { href: '/register', label: 'Create account' },
                ],
              },
              {
                heading: 'Legal',
                links: [
                  { href: '/terms', label: 'Terms' },
                  { href: '/privacy', label: 'Privacy' },
                  { href: '/cookies', label: 'Cookies' },
                  { href: '/faq', label: 'FAQ' },
                ],
              },
            ].map(({ heading, links }) => (
              <div key={heading} className="space-y-3">
                <p className="text-xs font-semibold text-white uppercase tracking-wider">{heading}</p>
                <ul className="space-y-2 text-sm">
                  {links.map(({ href, label }) => (
                    <li key={href}><Link href={href} className="hover:text-white transition-colors">{label}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-6 flex justify-between items-center text-xs text-gray-700">
            <p>© {new Date().getFullYear()} SafeStay</p>
            <p>Nairobi, Kenya</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
