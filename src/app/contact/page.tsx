import Link from 'next/link'
import { Mail, MessageCircle, MapPin } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <Link href="/" className="text-xs text-gray-400 hover:text-gray-700 transition-colors mb-8 block">← Back home</Link>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">Get in touch</h1>
        <p className="text-sm text-gray-500 mb-10">
          Questions about a listing, booking, or listing your property? We respond within a few hours.
        </p>

        <div className="space-y-3">
          <a
            href="mailto:Safestayhostels26@gmail.com"
            className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 group-hover:bg-gray-200 transition-colors">
              <Mail className="w-4 h-4 text-gray-600" />
            </div>
            <div>
              <p className="font-semibold text-sm text-gray-900">Email us</p>
              <p className="text-xs text-gray-500 mt-0.5">Safestayhostels26@gmail.com</p>
            </div>
          </a>

          <a
            href="https://wa.me/254704535727"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 group-hover:bg-gray-200 transition-colors">
              <MessageCircle className="w-4 h-4 text-gray-600" />
            </div>
            <div>
              <p className="font-semibold text-sm text-gray-900">WhatsApp</p>
              <p className="text-xs text-gray-500 mt-0.5">+254 704 535 727 — fastest response</p>
            </div>
          </a>

          <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50">
            <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 text-gray-400" />
            </div>
            <div>
              <p className="font-semibold text-sm text-gray-900">Based in Nairobi, Kenya</p>
              <p className="text-xs text-gray-500 mt-0.5">Serving universities across Nairobi, Kisii & Maseno</p>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-gray-100">
          <p className="text-xs text-gray-400 mb-3">Are you a hostel owner?</p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 bg-gray-900 text-white hover:bg-gray-800 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors"
          >
            List your property
          </Link>
        </div>
      </div>
    </div>
  )
}
