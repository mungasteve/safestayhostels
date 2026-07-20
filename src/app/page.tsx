import Link from 'next/link'
import Image from 'next/image'
import Logo from '@/components/logo'
import { cn } from '@/lib/utils'
import {
  ShieldCheck, MapPin, CreditCard, Star, ArrowRight,
  Mail, Phone, CheckCircle2, MoveRight,
} from 'lucide-react'

const btn = (extra: string) =>
  cn('inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-200 select-none', extra)

const features = [
  { icon: ShieldCheck, title: 'Verified listings', desc: 'Every hostel is physically inspected before going live. No ghost listings, no scams.' },
  { icon: MapPin, title: 'Campus-first search', desc: 'Filter by university. See walk time and matatu distance to your campus gate.' },
  { icon: CreditCard, title: 'Secure payments', desc: 'Pay via M-Pesa or card. Funds are held in escrow until you confirm move-in.' },
  { icon: Star, title: 'Honest reviews', desc: 'Only students who completed a booking can review. No fake 5-stars.' },
]

const testimonials = [
  { name: 'Amina Wanjiku', campus: 'University of Nairobi', text: 'I found my room in under 10 minutes. The photos matched exactly what I saw on arrival — that never happens with Facebook groups.', avatar: '/avatar-1.jpg' },
  { name: 'Brian Otieno', campus: 'Kenyatta University', text: 'Paid via M-Pesa and got a confirmation instantly. Moved in the next morning. The whole process felt professional for once.', avatar: '/avatar-2.jpg' },
  { name: 'Cynthia Muthoni', campus: 'Strathmore University', text: 'The campus filter is the feature I didn\'t know I needed. Found an en-suite 6 minutes from my faculty and booked it the same day.', avatar: '/avatar-3.jpg' },
]

const rooms = [
  { img: '/room-single.jpg', type: 'Single Room', desc: 'Your own space, shared facilities', price: 'From KES 4,500/mo', tag: 'Best value' },
  { img: '/room-shared.jpg', type: 'Shared Room', desc: '2–4 beds, split the cost', price: 'From KES 2,500/mo', tag: 'Budget' },
  { img: '/room-ensuite.jpg', type: 'En-suite', desc: 'Private room, private bathroom', price: 'From KES 8,000/mo', tag: 'Most popular' },
  { img: '/room-bedsitter.jpg', type: 'Bedsitter', desc: 'Self-contained, fully independent', price: 'From KES 10,000/mo', tag: 'Premium' },
]

export default function HomePage() {
  return (
    <div className="flex flex-col bg-[#F7F3EA]">

      {/* ── HERO ── */}
      <section className="relative h-[90vh] min-h-[620px] flex items-center overflow-hidden">
        <Image src="/hero-bg.jpg" alt="Student hostel" fill priority className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#132339]/92 via-[#132339]/60 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
          <div className="max-w-xl space-y-7">
            <h1 className="text-5xl md:text-[3.75rem] font-black tracking-tight text-white leading-[1.06]">
              Student housing<br />
              <span style={{ color: '#C99A43' }}>without the stress</span>
            </h1>
            <p className="text-white/75 text-[1.05rem] leading-[1.8]">
              Verified hostels near your campus. Browse, book, and pay securely — no agents, no deposits lost to strangers.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/hostels" className={btn('text-[#132339] hover:opacity-90 shadow-lg')} style={{ background: '#C99A43' }}>
                Browse hostels <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/register" className={btn('bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-sm')}>
                Create account
              </Link>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2.5 pt-1">
              {['No hidden fees', 'M-Pesa & card', 'Verified owners', 'Free to browse'].map((p) => (
                <span key={p} className="flex items-center gap-1.5 text-white/65 text-sm">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: '#C99A43' }} />
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ROOM TYPES ── */}
      <section className="bg-white border-y border-[#DDD8CC]">
        <div className="max-w-7xl mx-auto px-8 py-20">
          <div className="mb-10">
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] mb-2" style={{ color: '#C99A43' }}>Room types</p>
            <h2 className="text-[1.75rem] font-bold text-[#132339]">Find the right room for you</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {rooms.map(({ img, type, desc, price, tag }) => (
              <Link href="/hostels" key={type} className="group block rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-52">
                  <Image src={img} alt={type} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                  <span className="absolute top-3 left-3 text-[#132339] text-[0.65rem] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide" style={{ background: '#C99A43' }}>{tag}</span>
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="font-bold text-sm leading-tight">{type}</p>
                    <p className="text-[0.7rem] text-white/65 mt-1">{desc}</p>
                    <p className="text-[0.75rem] font-semibold text-white/90 mt-1.5">{price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="max-w-7xl mx-auto px-8 py-24 scroll-mt-16">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div>
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] mb-3" style={{ color: '#C99A43' }}>About SafeStay</p>
              <h2 className="text-[2rem] font-black leading-[1.2] text-[#132339]">Built for students who've been burned before</h2>
            </div>
            <p className="text-[#6B6251] leading-[1.8] text-[0.95rem]">
              SafeStay started because finding student housing in Kenya was broken — Facebook groups full of scams, agents demanding cash upfront, photos that looked nothing like the actual room.
            </p>
            <p className="text-[#6B6251] leading-[1.8] text-[0.95rem]">
              We built a marketplace where every listing is physically verified, every payment is protected, and every review comes from a student who actually lived there.
            </p>
            <Link href="/hostels" className={btn('text-white hover:opacity-90 w-fit mt-2')} style={{ background: '#132339' }}>
              Browse hostels <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl p-5 border border-[#DDD8CC] bg-white hover:border-[#C99A43]/40 hover:shadow-sm transition-all">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4" style={{ background: '#F7F3EA' }}>
                  <Icon className="w-4 h-4" style={{ color: '#132339' }} />
                </div>
                <h3 className="font-semibold text-sm text-[#132339] mb-1.5">{title}</h3>
                <p className="text-xs text-[#6B6251] leading-[1.7]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="scroll-mt-16" style={{ background: '#132339' }}>
        <div className="max-w-7xl mx-auto px-8 py-24">
          <div className="mb-16">
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] mb-3" style={{ color: '#C99A43' }}>How it works</p>
            <h2 className="text-[2rem] font-black text-white">From search to move-in, in one afternoon</h2>
            <p className="text-white/50 text-sm mt-3 max-w-lg">No agents. No back-and-forth. No cash handed to strangers. Here's exactly what happens when you book on SafeStay.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-white/10 rounded-2xl overflow-hidden">

            {/* Step 1 */}
            <div className="bg-[#132339] p-10 space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-[0.65rem] font-bold tracking-widest uppercase" style={{ color: '#C99A43' }}>Step 01</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>
              <h3 className="text-xl font-bold text-white">Search by campus, not by luck</h3>
              <p className="text-white/55 text-sm leading-[1.8]">
                Enter your university. Filter by gender policy, room type, and budget. Every result shows the walk time to your campus gate — not a vague "nearby" label.
              </p>
              <Link href="/hostels" className="inline-flex items-center gap-1.5 text-sm font-semibold mt-2" style={{ color: '#C99A43' }}>
                Start searching <MoveRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Step 2 */}
            <div className="p-10 space-y-4" style={{ background: '#0e1c2e' }}>
              <div className="flex items-center gap-4">
                <span className="text-[0.65rem] font-bold tracking-widest uppercase" style={{ color: '#C99A43' }}>Step 02</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>
              <h3 className="text-xl font-bold text-white">Book the room, not a viewing</h3>
              <p className="text-white/55 text-sm leading-[1.8]">
                Every listing has verified photos, real amenities, and a confirmed price. Pick your room, choose your move-in date, and submit your booking — no agent call required.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-10 space-y-4" style={{ background: '#0e1c2e' }}>
              <div className="flex items-center gap-4">
                <span className="text-[0.65rem] font-bold tracking-widest uppercase" style={{ color: '#C99A43' }}>Step 03</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>
              <h3 className="text-xl font-bold text-white">Pay securely — M-Pesa or card</h3>
              <p className="text-white/55 text-sm leading-[1.8]">
                Your payment is held in escrow. The owner only receives it after you confirm you've moved in. If something's wrong, you're protected. No more cash handed to strangers at the gate.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-[#132339] p-10 space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-[0.65rem] font-bold tracking-widest uppercase" style={{ color: '#C99A43' }}>Step 04</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>
              <h3 className="text-xl font-bold text-white">Move in with your confirmation</h3>
              <p className="text-white/55 text-sm leading-[1.8]">
                Show your booking confirmation to the owner. Move in on your chosen date. After settling in, leave an honest review so the next student knows what to expect.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="max-w-7xl mx-auto px-8 py-24">
        <div className="mb-12">
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] mb-3" style={{ color: '#C99A43' }}>Student reviews</p>
          <h2 className="text-[2rem] font-black text-[#132339]">What students say</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(({ name, campus, text, avatar }) => (
            <div key={name} className="bg-white rounded-2xl border border-[#DDD8CC] p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-5">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5" style={{ fill: '#C99A43', color: '#C99A43' }} />
                ))}
              </div>
              <p className="text-[0.875rem] text-[#6B6251] leading-[1.8] flex-1">"{text}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-[#EDE8DC]">
                <div className="relative w-9 h-9 rounded-full overflow-hidden bg-[#EDE8DC] shrink-0">
                  <Image src={avatar} alt={name} fill className="object-cover" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-[#132339]">{name}</p>
                  <p className="text-xs text-[#6B6251] mt-0.5">{campus}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-7xl mx-auto px-8 pb-24">
        <div className="rounded-3xl px-12 py-16 flex flex-col md:flex-row items-center justify-between gap-8" style={{ background: '#132339' }}>
          <div className="space-y-2.5 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-black text-white">Ready to find your room?</h2>
            <p className="text-white/50 text-sm leading-relaxed max-w-sm">6 verified hostels live now across Nairobi. New listings added weekly.</p>
          </div>
          <Link href="/hostels" className={btn('text-[#132339] hover:opacity-90 shadow-lg shrink-0')} style={{ background: '#C99A43' }}>
            Browse hostels <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="border-t border-[#DDD8CC] bg-white scroll-mt-16">
        <div className="max-w-7xl mx-auto px-8 py-20">
          <div className="mb-10">
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] mb-3" style={{ color: '#C99A43' }}>Contact</p>
            <h2 className="text-[1.75rem] font-bold text-[#132339]">Get in touch</h2>
            <p className="text-[#6B6251] text-sm mt-2">Questions about a listing, a booking, or the platform? We respond within a few hours.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md">
            {[
              { icon: Mail, label: 'Email', value: 'JackstarKombo@gmail.com', href: 'mailto:JackstarKombo@gmail.com' },
              { icon: Phone, label: 'Phone / WhatsApp', value: '+254 704 535 727', href: 'tel:+254704535727' },
            ].map(({ icon: Icon, label, value, href }) => (
              <a key={label} href={href} className="flex items-center gap-4 bg-[#F7F3EA] rounded-2xl border border-[#DDD8CC] px-5 py-4 flex-1 hover:border-[#C99A43]/50 transition-colors">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: '#132339' }}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-[#132339]">{label}</p>
                  <p className="text-xs text-[#6B6251] mt-0.5">{value}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#0e1c2e' }} className="text-white/40">
        <div className="max-w-7xl mx-auto px-8 pt-16 pb-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">

            <div className="col-span-2 md:col-span-1 space-y-4">
              <div className="text-white">
                <Logo size={26} />
              </div>
              <p className="text-sm leading-relaxed text-white/35">
                Verified student accommodation near your campus. Safe, affordable, trusted.
              </p>
              <div className="flex flex-col gap-1.5 text-sm">
                <a href="mailto:JackstarKombo@gmail.com" className="hover:text-white transition-colors">JackstarKombo@gmail.com</a>
                <a href="tel:+254704535727" className="hover:text-white transition-colors">+254 704 535 727</a>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-xs font-bold text-white uppercase tracking-[0.15em]">Explore</p>
              <ul className="space-y-2.5 text-sm">
                <li><Link href="/hostels" className="hover:text-white transition-colors">Browse hostels</Link></li>
                <li><Link href="/#how-it-works" className="hover:text-white transition-colors">How it works</Link></li>
                <li><Link href="/#about" className="hover:text-white transition-colors">About us</Link></li>
                <li><Link href="/#contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div className="space-y-4">
              <p className="text-xs font-bold text-white uppercase tracking-[0.15em]">Account</p>
              <ul className="space-y-2.5 text-sm">
                <li><Link href="/login" className="hover:text-white transition-colors">Sign in</Link></li>
                <li><Link href="/register" className="hover:text-white transition-colors">Create account</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
              </ul>
            </div>

            <div className="space-y-4">
              <p className="text-xs font-bold text-white uppercase tracking-[0.15em]">Legal</p>
              <ul className="space-y-2.5 text-sm">
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of service</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy policy</Link></li>
                <li><Link href="/cookies" className="hover:text-white transition-colors">Cookie policy</Link></li>
                <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/25">
            <p>© {new Date().getFullYear()} SafeStay. All rights reserved.</p>
            <p>Nairobi, Kenya</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
