import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import axios from 'axios'
import cookies from 'cookies'
import { google } from 'googleapis'
import { getGoogleAuth, googleConfig } from './googleConfig'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  
  const isAccessTokenExpired = () => {
    // expires_in is in the future
    const expires_in = request.cookies.get('expires_in')?.value
    const expires_in_number = Number(expires_in)
    const tokenIsExpired = expires_in_number && expires_in_number < Date.now() 
    return tokenIsExpired
  }

  const accessToken = request.cookies.get('acessToken')?.value
  const refreshToken = request.cookies.get('refreshToken')?.value
  if (accessToken && !isAccessTokenExpired()) {
    return NextResponse.next()
  }

  if (refreshToken) {
    // refresh accessToken with refresh token
    try {
      const auth = getGoogleAuth()
      const refreshRequest = await auth.refreshAccessToken()
      const newAccessToken = refreshRequest.credentials.access_token
      const newExpiresIn = refreshRequest.credentials.expiry_date


    } catch(error) {
      console.error('Failed to get new access token by using refresh token')
    }
    
  }

  return NextResponse.redirect(`${request.nextUrl.protocol}//${request.nextUrl.host}`)
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/home/:path*',
}