import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (request.cookies.get('accessToken')) {
    // refresh accessToken with refresh token
    // save the new accessToken and refresh Token in cookies
    return NextResponse.next()
  }
  return NextResponse.redirect(`${request.nextUrl.protocol}//${request.nextUrl.host}`)
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/home/:path*',
}