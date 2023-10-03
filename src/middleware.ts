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

  // If the user has an access token and it's not expired, allow the request
  if (accessToken && !isAccessTokenExpired()) {
    return NextResponse.next()
  }

  // If the user has a refresh token, redirect to the refresh page
  if (refreshToken) {
    const nextResponse = NextResponse.redirect(`${request.nextUrl.protocol}//${request.nextUrl.host}/auth/refresh?redirectPath=${request.nextUrl.pathname}`)
    return nextResponse
  }

  return NextResponse.redirect(`${request.nextUrl.protocol}//${request.nextUrl.host}`)
}

export const config = {
  matcher: ['/home/:path*', '/about/:path*'],
}