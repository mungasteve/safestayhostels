import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const steps = [
  {
    n: '01',
    title: 'Search by campus',
    body: 'Enter your university — UoN, KU, Strathmore, USIU, Daystar, Kisii, Maseno and more. Every listing is tagged to a campus and shows the walking distance to the main gate.',
  },
  {
    n: '02',
    title: 'Browse verified listings',
    body: 'Every hostel on SafeStay has been physically visited before it goes live. The photos are real, the prices are confirmed, and the owner\'s identity is verified. Filter by room type, gender policy, and budget.',
  },
  {
    n: '03',
    title: 'Book and pay securely',
    body: 'Pick your room and move-in date, then pay via M-Pesa or card. Your deposit is held in escrow — it only reaches the owner after you confirm you\'ve moved in and everything matches what was advertised.',
  },
  {
    n: '04',
    title: 'Move in and leave a review',
    body: 'Show your booking confirmation at the gate on move-in day. Once you\'re settled, leave an honest review. Every review on SafeStay is from a student who completed a real booking.',
  },
]

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <Link href="/" className="text-xs text-gray-400 hover:text-gray-700 transition-colors mb-8 block">← Back home</Link>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">How SafeStay works</h1>
        <p className="text-sm text-gray-500 mb-12">
          From search to move-in — no agents, no cash upfront, no surprises.
        </p>

        <div className="space-y-10">
          {steps.map(({ n, title, body }) => (
            <div key={n} className="flex gap-5">
              <span className="text-xs font-mono font-bold text-gray-200 mt-1 w-6 shrink-0">{n}</span>
              <div>
                <h2 className="font-semibold text-gray-900 mb-2">{title}</h2>
                <p className="text-sm text-gray-500 leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100">
          <Link
            href="/hostels"
            className="inline-flex items-center gap-2 bg-gray-900 text-white hover:bg-gray-800 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
          >
            Browse hostels <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
