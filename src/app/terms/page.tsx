export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-20">
      <p className="text-xs font-bold text-primary uppercase tracking-[0.18em] mb-3">Legal</p>
      <h1 className="text-3xl font-black text-slate-900 mb-2">Terms of Service</h1>
      <p className="text-slate-500 text-sm mb-12">Last updated: January 2025</p>
      <div className="prose prose-slate max-w-none space-y-8 text-sm text-slate-600 leading-[1.8]">
        <section>
          <h2 className="text-base font-bold text-slate-900 mb-3">1. Acceptance of Terms</h2>
          <p>By accessing or using SafeStay, you agree to be bound by these Terms of Service. If you do not agree, please do not use our platform.</p>
        </section>
        <section>
          <h2 className="text-base font-bold text-slate-900 mb-3">2. Use of the Platform</h2>
          <p>SafeStay is a marketplace connecting students with hostel owners. We do not own or manage any of the listed properties. You are responsible for verifying the suitability of any accommodation before booking.</p>
        </section>
        <section>
          <h2 className="text-base font-bold text-slate-900 mb-3">3. Bookings and Payments</h2>
          <p>All bookings are subject to availability and confirmation by the hostel owner. Payments are processed securely via M-Pesa or card. SafeStay is not liable for disputes between students and hostel owners.</p>
        </section>
        <section>
          <h2 className="text-base font-bold text-slate-900 mb-3">4. Cancellations and Refunds</h2>
          <p>Cancellation and refund policies are set by individual hostel owners. Please review the policy of each listing before booking.</p>
        </section>
        <section>
          <h2 className="text-base font-bold text-slate-900 mb-3">5. Contact</h2>
          <p>For any questions regarding these terms, contact us at JackstarKombo@gmail.com or +254 704 535 727.</p>
        </section>
      </div>
    </div>
  )
}
