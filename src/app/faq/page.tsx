const faqs = [
  { q: 'Is SafeStay free to use?', a: 'Yes. Browsing and searching for hostels is completely free. You only pay when you book a room.' },
  { q: 'How do I know a hostel is safe?', a: 'Every hostel on SafeStay is manually reviewed and verified by our team before it goes live. We also only show reviews from students who have completed a booking.' },
  { q: 'What payment methods are accepted?', a: 'We accept M-Pesa and card payments (Visa, Mastercard). All payments are processed securely.' },
  { q: 'Can I cancel my booking?', a: 'Cancellation policies vary by hostel. Check the individual listing\'s policy before booking. Contact us if you need help resolving a dispute.' },
  { q: 'How do I contact a hostel owner?', a: 'Once your booking is confirmed, you will receive the owner\'s contact details via email and SMS.' },
  { q: 'I\'m a hostel owner. How do I list my property?', a: 'Create an account and select "Owner" as your role. You can then submit your hostel for review from your dashboard.' },
]

export default function FAQPage() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-20">
      <p className="text-xs font-bold text-primary uppercase tracking-[0.18em] mb-3">Support</p>
      <h1 className="text-3xl font-black text-slate-900 mb-2">Frequently Asked Questions</h1>
      <p className="text-slate-500 text-sm mb-12">Everything you need to know about SafeStay.</p>
      <div className="space-y-6">
        {faqs.map(({ q, a }) => (
          <div key={q} className="border border-slate-100 rounded-2xl p-6 bg-white shadow-sm">
            <h2 className="font-bold text-sm text-slate-900 mb-2">{q}</h2>
            <p className="text-sm text-slate-500 leading-[1.8]">{a}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
