export default function CookiesPage() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-20">
      <p className="text-xs font-bold text-primary uppercase tracking-[0.18em] mb-3">Legal</p>
      <h1 className="text-3xl font-black text-slate-900 mb-2">Cookie Policy</h1>
      <p className="text-slate-500 text-sm mb-12">Last updated: January 2025</p>
      <div className="space-y-8 text-sm text-slate-600 leading-[1.8]">
        <section>
          <h2 className="text-base font-bold text-slate-900 mb-3">What are cookies?</h2>
          <p>Cookies are small text files stored on your device when you visit a website. They help us remember your preferences and improve your experience.</p>
        </section>
        <section>
          <h2 className="text-base font-bold text-slate-900 mb-3">How we use cookies</h2>
          <p>We use essential cookies to keep you signed in and remember your session. We do not use advertising or tracking cookies.</p>
        </section>
        <section>
          <h2 className="text-base font-bold text-slate-900 mb-3">Managing cookies</h2>
          <p>You can disable cookies in your browser settings. Note that disabling cookies may affect the functionality of the platform, including staying signed in.</p>
        </section>
      </div>
    </div>
  )
}
