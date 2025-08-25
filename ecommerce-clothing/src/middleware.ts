import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const adminPaths = ['/admin', '/admin/products', '/admin/categories']
  if (adminPaths.some(p => request.nextUrl.pathname.startsWith(p))) {
    const header = request.headers.get('x-admin')
    const pass = process.env.ADMIN_PASSWORD
    if (pass && header !== pass) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}

