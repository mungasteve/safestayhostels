import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const { pathname, origin } = req.nextUrl
    const role = req.nextauth.token?.role

    if (pathname.startsWith('/admin') && role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', origin))
    }
    if (pathname.startsWith('/dashboard') && role !== 'OWNER' && role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', origin))
    }
    return NextResponse.next()
  },
  { callbacks: { authorized: ({ token }) => !!token } }
)

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/booking/:path*'],
}
