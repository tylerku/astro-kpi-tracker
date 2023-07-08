import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  
  const isAccessTokenExpired = () => {
    const expires_in = request.cookies.get('expires_in')?.value
    const expires_in_number = Number(expires_in)
    const tokenIsExpired = expires_in_number && expires_in_number < Date.now() 
    return tokenIsExpired
  }

  const accessToken = request.cookies.get('accessToken')?.value
  const refreshToken = request.cookies.get('refreshToken')?.value

  //TODO: Remove false from the if condition
  if (accessToken && !isAccessTokenExpired()) {
    return NextResponse.next()
  }

  if (refreshToken) {
    const nextResponse = NextResponse.redirect(`${request.nextUrl.protocol}//${request.nextUrl.host}/auth/refresh?redirectPath=${request.nextUrl.pathname}`)
    return nextResponse
  }

  return NextResponse.redirect(`${request.nextUrl.protocol}//${request.nextUrl.host}`)
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/home/:path*',
}