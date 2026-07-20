import Link from 'next/link'
import Image from 'next/image'
import Logo from '@/components/logo'
import { ArrowRight, Mail, Phone, Star } from 'lucide-react'

const testimonials = [
  { name: 'Amina Wanjiku', campus: 'University of Nairobi', text: 'Found my room in under 10 minutes. The photos matched exactly what I saw on arrival — that never happens with Facebook groups.', avatar: '/avatar-1.jpg' },
  { name: 'Brian Otieno', campus: 'Kenyatta University', text: 'Paid via M-Pesa and got a confirmation instantly. Moved in the next morning. The whole process felt professional for once.', avatar: '/avatar-2.jpg' },
  { name: 'Cynthia Muthoni', campus: 'Strathmore University', text: "The campus filter saved me so much time. Found an en-suite 6 minutes from my faculty and booked it the same day.", avatar: '/avatar-3.jpg' },
]

const rooms = [
  { img: '/room-single.jpg', type: 'Single Room', price: 'From KES 4,500/mo' },
  { img: '/room-shared.jpg', type: 'Shared Room', price: 'From KES 2,500/mo' },
  { img: '/room-ensuite.jpg', type: 'En-suite', price: 'From KES 8,000/mo' },
  { img: '/room-bedsitter.jpg', type: 'Bedsitter', price: 'From KES 10,000/mo' },
]

export default function HomePage() {
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
            <div className="flex gap-3 pt-1">
              <Link href="/hostels" className="inline-flex items-center gap-2 bg-white text-gray-900 hover:bg-gray-100 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors">
                Browse hostels <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/register" className="inline-flex items-center gap-2 border border-white/25 text-white hover:bg-white/10 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors">
                Create account
              </Link>
            </div>
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
              { n: '1', title: 'Search by campus', body: 'Enter your university. Filter by gender policy, room type, and budget. See walk time to your gate on every result.' },
              { n: '2', title: 'Book directly', body: 'Verified photos, confirmed prices. Pick your room and move-in date. No agent, no back-and-forth.' },
              { n: '3', title: 'Pay securely', body: 'M-Pesa or card. Your payment is held until you confirm you\'ve moved in. No cash to strangers.' },
              { n: '4', title: 'Move in', body: 'Show your confirmation at the gate. Move in on your date. Leave a review for the next student.' },
            ].map(({ n, title, body }) => (
              <div key={n} className="space-y-3">
                <span className="text-xs font-bold text-gray-400 tracking-widest">{n.padStart(2, '0')}</span>
                <h3 className="font-semibold text-gray-900">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-10">What students say</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map(({ name, campus, text, avatar }) => (
            <div key={name} className="border border-gray-200 rounded-xl p-6 flex flex-col gap-4">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-gray-900 text-gray-900" />
                ))}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed flex-1">"{text}"</p>
              <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-100 shrink-0">
                  <Image src={avatar} alt={name} fill className="object-cover" />
                </div>
                <div>
                  <p className="font-medium text-sm text-gray-900">{name}</p>
                  <p className="text-xs text-gray-400">{campus}</p>
                </div>
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
              { icon: Mail, label: 'Email', value: 'JackstarKombo@gmail.com', href: 'mailto:JackstarKombo@gmail.com' },
              { icon: Phone, label: 'WhatsApp', value: '+254 704 535 727', href: 'tel:+254704535727' },
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

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-500">
        <div className="max-w-6xl mx-auto px-6 pt-12 pb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-10 border-b border-gray-800">
            <div className="col-span-2 md:col-span-1 space-y-3">
              <div className="text-white"><Logo size={22} /></div>
              <p className="text-sm leading-relaxed">Verified student accommodation near your campus.</p>
              <div className="flex flex-col gap-1 text-sm">
                <a href="mailto:JackstarKombo@gmail.com" className="hover:text-white transition-colors">JackstarKombo@gmail.com</a>
                <a href="tel:+254704535727" className="hover:text-white transition-colors">+254 704 535 727</a>
              </div>
            </div>
            {[
              { heading: 'Explore', links: [{ href: '/hostels', label: 'Browse hostels' }, { href: '/#how-it-works', label: 'How it works' }, { href: '/#about', label: 'About' }, { href: '/#contact', label: 'Contact' }] },
              { heading: 'Account', links: [{ href: '/login', label: 'Sign in' }, { href: '/register', label: 'Create account' }, { href: '/dashboard', label: 'Dashboard' }] },
              { heading: 'Legal', links: [{ href: '/terms', label: 'Terms' }, { href: '/privacy', label: 'Privacy' }, { href: '/cookies', label: 'Cookies' }, { href: '/faq', label: 'FAQ' }] },
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
