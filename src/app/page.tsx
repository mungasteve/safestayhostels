import Link from 'next/link'
import Image from 'next/image'
import Logo from '@/components/logo'
import { cn } from '@/lib/utils'
import {
  ShieldCheck, MapPin, CreditCard, Star, ArrowRight,
  Search, ClipboardList, DoorOpen, Mail, Phone, CheckCircle2,
} from 'lucide-react'

const btn = (extra: string) =>
  cn('inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-200 select-none', extra)

const features = [
  { icon: ShieldCheck, title: 'Verified listings', desc: 'Every hostel is manually reviewed before going live. No scams, no surprises.' },
  { icon: MapPin, title: 'Campus-first search', desc: 'Filter by university to find accommodation within walking distance of your classes.' },
  { icon: CreditCard, title: 'Secure payments', desc: 'Pay via M-Pesa or card. Funds are held safely until you confirm move-in.' },
  { icon: Star, title: 'Verified reviews', desc: 'Only students who completed a booking can leave a review. 100% authentic.' },
]

const steps = [
  { icon: Search, step: '01', title: 'Search', desc: 'Browse verified hostels near your campus. Filter by price, gender and room type.' },
  { icon: ClipboardList, step: '02', title: 'Book', desc: 'Select your room, pick a move-in date and confirm your booking in minutes.' },
  { icon: CreditCard, step: '03', title: 'Pay', desc: 'Pay securely via M-Pesa or card. Instant confirmation sent to your phone.' },
  { icon: DoorOpen, step: '04', title: 'Move in', desc: 'Show your booking confirmation to the owner and move in on your chosen date.' },
]

const testimonials = [
  { name: 'Amina Wanjiku', campus: 'University of Nairobi', text: 'Found my room in under 10 minutes. The photos were accurate and the owner was professional. SafeStay is a game changer.', avatar: '/avatar-1.jpg' },
  { name: 'Brian Otieno', campus: 'Kenyatta University', text: 'I was skeptical at first but the verification process gave me confidence. Paid via M-Pesa and moved in the next day.', avatar: '/avatar-2.jpg' },
  { name: 'Cynthia Muthoni', campus: 'Strathmore University', text: 'The filter by campus feature saved me so much time. Found an en-suite room 5 minutes from my faculty.', avatar: '/avatar-3.jpg' },
]

const rooms = [
  { img: '/room-single.jpg', type: 'Single Room', desc: 'Private room, shared facilities', price: 'From KES 4,500/mo', tag: 'Best value' },
  { img: '/room-shared.jpg', type: 'Shared Room', desc: '2–4 beds, shared facilities', price: 'From KES 2,500/mo', tag: 'Budget' },
  { img: '/room-ensuite.jpg', type: 'En-suite', desc: 'Private room with own bathroom', price: 'From KES 8,000/mo', tag: 'Most popular' },
  { img: '/room-bedsitter.jpg', type: 'Bedsitter', desc: 'Self-contained unit', price: 'From KES 10,000/mo', tag: 'Premium' },
]

export default function HomePage() {
  return (
    <div className="flex flex-col">

      {/* ── HERO ── */}
      <section className="relative h-[90vh] min-h-[620px] flex items-center overflow-hidden">
        <Image src="/hero-bg.jpg" alt="Student hostel" fill priority className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/60 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
          <div className="max-w-lg space-y-7">
            <h1 className="text-5xl md:text-[3.75rem] font-black tracking-tight text-white leading-[1.06]">
              Your key to<br />
              <span className="text-primary">safe student</span><br />
              living
            </h1>
            <p className="text-slate-300 text-[1.05rem] leading-[1.75]">
              Verified, affordable hostels near your campus. Book in minutes, pay securely, move in with confidence.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/hostels" className={btn('bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20')}>
                Find a hostel <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/login" className={btn('bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-sm')}>
                Sign in
              </Link>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2.5 pt-1">
              {['No hidden fees', 'M-Pesa & card', 'Verified owners', 'Free to browse'].map((p) => (
                <span key={p} className="flex items-center gap-1.5 text-slate-300 text-sm">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ROOM TYPES ── */}
      <section className="bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-8 py-20">
          <div className="mb-10">
            <p className="text-[0.7rem] font-bold text-primary uppercase tracking-[0.18em] mb-2">Room types</p>
            <h2 className="text-[1.75rem] font-bold text-slate-900">Find the right room for you</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {rooms.map(({ img, type, desc, price, tag }) => (
              <Link href="/hostels" key={type} className="group block rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-52">
                  <Image src={img} alt={type} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                  <span className="absolute top-3 left-3 bg-primary text-white text-[0.65rem] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">{tag}</span>
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
              <p className="text-[0.7rem] font-bold text-primary uppercase tracking-[0.18em] mb-3">About SafeStay</p>
              <h2 className="text-[2rem] font-black leading-[1.2] text-slate-900">Safe, affordable housing for every student</h2>
            </div>
            <p className="text-slate-500 leading-[1.8] text-[0.95rem]">
              SafeStay was built to solve a real problem — students spending weeks searching for accommodation, only to find unsafe or overpriced options. We partner with verified hostel owners to bring you a curated, trustworthy marketplace.
            </p>
            <p className="text-slate-500 leading-[1.8] text-[0.95rem]">
              Every listing is manually reviewed. Every payment is secured. Every review is from a real student.
            </p>
            <Link href="/hostels" className={btn('bg-primary text-white hover:bg-primary/90 w-fit mt-2')}>
              Browse hostels <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl p-5 border border-slate-100 bg-white hover:border-primary/25 hover:shadow-sm transition-all">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-semibold text-sm text-slate-900 mb-1.5">{title}</h3>
                <p className="text-xs text-slate-500 leading-[1.7]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="bg-slate-950 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-8 py-24">
          <div className="mb-16">
            <p className="text-[0.7rem] font-bold text-primary uppercase tracking-[0.18em] mb-3">How it works</p>
            <h2 className="text-[2rem] font-black text-white">Booked in 4 simple steps</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {steps.map(({ icon: Icon, step, title, desc }) => (
              <div key={step} className="flex flex-col gap-4">
                <div className="flex items-end gap-3">
                  <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-[3.5rem] font-black text-white/[0.06] leading-none pb-1">{step}</span>
                </div>
                <h3 className="font-bold text-white text-[0.95rem]">{title}</h3>
                <p className="text-sm text-slate-400 leading-[1.75]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="max-w-7xl mx-auto px-8 py-24">
        <div className="mb-12">
          <p className="text-[0.7rem] font-bold text-primary uppercase tracking-[0.18em] mb-3">Student reviews</p>
          <h2 className="text-[2rem] font-black text-slate-900">What students say</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(({ name, campus, text, avatar }) => (
            <div key={name} className="bg-white rounded-2xl border border-slate-100 p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-5">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-[0.875rem] text-slate-600 leading-[1.8] flex-1">"{text}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="relative w-9 h-9 rounded-full overflow-hidden bg-slate-100 shrink-0">
                  <Image src={avatar} alt={name} fill className="object-cover" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-slate-900">{name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{campus}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-7xl mx-auto px-8 pb-24">
        <div className="bg-primary rounded-3xl px-12 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2.5 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-black text-white">Ready to find your next home?</h2>
            <p className="text-white/65 text-sm leading-relaxed max-w-sm">Browse verified student hostels and book your room today.</p>
          </div>
          <Link href="/hostels" className={btn('bg-white text-primary hover:bg-white/90 shadow-lg shrink-0')}>
            Browse hostels <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="border-t bg-slate-50 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-8 py-20">
          <div className="mb-10">
            <p className="text-[0.7rem] font-bold text-primary uppercase tracking-[0.18em] mb-3">Contact</p>
            <h2 className="text-[1.75rem] font-bold text-slate-900">Get in touch</h2>
            <p className="text-slate-500 text-sm mt-2">Have a question? We'd love to hear from you.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md">
            {[
              { icon: Mail, label: 'Email us', value: 'JackstarKombo@gmail.com' },
              { icon: Phone, label: 'Call us', value: '+254 704 535 727' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-4 bg-white rounded-2xl border border-slate-100 px-5 py-4 flex-1 shadow-sm">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-slate-900">{label}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-slate-900 text-slate-400">
        <div className="max-w-7xl mx-auto px-8 pt-16 pb-10">

          {/* Top grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">

            {/* Brand */}
            <div className="col-span-2 md:col-span-1 space-y-4">
              <div className="text-white">
                <Logo size={26} className="text-white [&_svg]:text-primary" />
              </div>
              <p className="text-sm leading-relaxed text-slate-500">
                Verified student accommodation near your campus. Safe, affordable, trusted.
              </p>
              <div className="flex flex-col gap-1.5 text-sm">
                <a href="mailto:JackstarKombo@gmail.com" className="hover:text-white transition-colors">JackstarKombo@gmail.com</a>
                <a href="tel:+254704535727" className="hover:text-white transition-colors">+254 704 535 727</a>
              </div>
            </div>

            {/* Explore */}
            <div className="space-y-4">
              <p className="text-xs font-bold text-white uppercase tracking-[0.15em]">Explore</p>
              <ul className="space-y-2.5 text-sm">
                <li><Link href="/hostels" className="hover:text-white transition-colors">Browse hostels</Link></li>
                <li><Link href="/#how-it-works" className="hover:text-white transition-colors">How it works</Link></li>
                <li><Link href="/#about" className="hover:text-white transition-colors">About us</Link></li>
                <li><Link href="/#contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Account */}
            <div className="space-y-4">
              <p className="text-xs font-bold text-white uppercase tracking-[0.15em]">Account</p>
              <ul className="space-y-2.5 text-sm">
                <li><Link href="/login" className="hover:text-white transition-colors">Sign in</Link></li>
                <li><Link href="/register" className="hover:text-white transition-colors">Create account</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
              </ul>
            </div>

            {/* Legal */}
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

          {/* Bottom bar */}
          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-600">
            <p>© {new Date().getFullYear()} SafeStay. All rights reserved.</p>
            <p>Made with ❤️ for students in Kenya</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
