'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { LayoutDashboard, ShieldCheck, Menu, X } from 'lucide-react'
import Logo from '@/components/logo'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/hostels', label: 'Properties' },
  { href: '/how-it-works', label: 'How it works' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const { data: session } = useSession()
  const role = (session?.user as any)?.role
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href.split('#')[0]) && href.split('#')[0] !== '/'

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-6 flex h-14 items-center justify-between gap-8">

        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Logo size={26} />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-0.5 flex-1">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'px-3.5 py-2 rounded-lg text-sm transition-colors',
                isActive(href)
                  ? 'text-gray-900 font-semibold'
                  : 'text-gray-500 hover:text-gray-900'
              )}
            >
              {label}
            </Link>
          ))}
          {role === 'OWNER' && (
            <Link
              href="/dashboard"
              className={cn(
                'px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5',
                pathname.startsWith('/dashboard')
                  ? 'text-gray-900 font-semibold'
                  : 'text-gray-500 hover:text-gray-900'
              )}
            >
              <LayoutDashboard className="w-3.5 h-3.5" /> Dashboard
            </Link>
          )}
          {role === 'ADMIN' && (
            <Link
              href="/admin"
              className={cn(
                'px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5',
                pathname.startsWith('/admin')
                  ? 'text-gray-900 font-semibold'
                  : 'text-gray-500 hover:text-gray-900'
              )}
            >
              <ShieldCheck className="w-3.5 h-3.5" /> Admin
            </Link>
          )}
        </nav>

        {/* Desktop auth */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          {session ? (
            <>
              <span className="text-sm text-slate-500 max-w-36 truncate">{session.user?.name}</span>
              <Button variant="outline" size="sm" onClick={() => signOut()} className="text-xs">Sign out</Button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 rounded-lg text-sm font-semibold bg-gray-900 text-white hover:bg-gray-800 transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-0.5">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={cn(
                'block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive(href) ? 'text-gray-900 bg-gray-50' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              )}
            >
              {label}
            </Link>
          ))}
          {role === 'OWNER' && (
            <Link href="/dashboard" onClick={() => setOpen(false)} className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50">
              <LayoutDashboard className="w-4 h-4" /> Dashboard
            </Link>
          )}
          {role === 'ADMIN' && (
            <Link href="/admin" onClick={() => setOpen(false)} className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50">
              <ShieldCheck className="w-4 h-4" /> Admin
            </Link>
          )}
          <div className="pt-2 mt-1 border-t border-gray-100 flex gap-2">
            {session ? (
              <Button variant="outline" size="sm" className="w-full text-xs" onClick={() => signOut()}>Sign out</Button>
            ) : (
              <>
                <Link href="/login" onClick={() => setOpen(false)} className="flex-1 text-center px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors">Sign in</Link>
                <Link href="/register" onClick={() => setOpen(false)} className="flex-1 text-center px-4 py-2 rounded-lg text-sm font-semibold bg-gray-900 text-white hover:bg-gray-800 transition-colors">Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
