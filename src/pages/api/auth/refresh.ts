import { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';
import { getGoogleAuth, googleConfig } from '../../../googleConfig';
import cookies from 'cookies';
import moment from 'moment'
import { IncomingHttpHeaders } from 'http';


export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  
  const getRefreshTokenFromAuthHeaders = (headers: IncomingHttpHeaders) => {
    const authHeader = headers['authorization'] as string 
    const refreshTokenFromHeader = authHeader.substring(7, authHeader.length)
    return refreshTokenFromHeader
  }
  
  try {
    console.log('refresh route reached')
    console.log('old refresh token: ', req.headers['authorization'])
    const auth = getGoogleAuth()

    const oldRefreshtoken = getRefreshTokenFromAuthHeaders(req.headers)
    auth.setCredentials({refresh_token: oldRefreshtoken})
    const refreshRequest = await auth.refreshAccessToken()
    
    const accessToken = refreshRequest.credentials.access_token
    const expires_in = refreshRequest.credentials.expiry_date
    const refreshToken = refreshRequest.credentials.refresh_token

    console.log('accessToken:', accessToken)
    console.log('refreshToken:', refreshToken)
    console.log('expires_in:', expires_in)

    const expiresDate = expires_in ? new Date(expires_in) : undefined
    cookies(req, res).set('accessToken', accessToken, {
      path: '/',
      expires: expiresDate,
      sameSite: 'strict',
      httpOnly: true,
    });
    cookies(req, res).set('refreshToken', refreshToken, {
      path: '/',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
      sameSite: 'strict',
      httpOnly: true,
    });
    cookies(req, res).set('expires_in', String(expires_in), {
      path: '/',
      expires: expiresDate,
      sameSite: 'strict',
      httpOnly: true,
    });
    console.log('returnning to flow...')
    return res.status(200).json({ success: true, accessToken, refreshToken}); // Replace with your desired response
  } catch (error) {
    console.error('Error during OAuth2 refresh:', error);
    return res.status(500).json({ error: 'OAuth2 refresh failed' });
  }
};
