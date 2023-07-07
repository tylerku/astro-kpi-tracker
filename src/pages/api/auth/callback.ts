// pages/api/auth/callback.ts (Server-side)

import { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';
import { googleConfig } from '../../../googleConfig';
import cookies from 'cookies';


export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    const { code } = req.body;

    const auth = new google.auth.OAuth2(
      googleConfig.clientId,
      googleConfig.clientSecret,
      googleConfig.redirectUri
    );

    const { tokens } = await auth.getToken(code);
    const accessToken = tokens.access_token;
    const refreshToken = tokens.refresh_token;

    // console.log('accessToken:', accessToken)
    // console.log('refreshToken:', refreshToken)
    cookies(req, res).set('accessToken', accessToken, {
      path: '/',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      sameSite: 'strict',
      httpOnly: true,
    });
    cookies(req, res).set('refreshToken', refreshToken, {
      path: '/',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      sameSite: 'strict',
      httpOnly: true,
    });

    // Use the access token and refresh token as needed

    res.status(200).json({ success: true, accessToken, refreshToken}); // Replace with your desired response
  } catch (error) {
    console.error('Error during OAuth2 callback:', error);
    res.status(500).json({ error: 'OAuth2 callback failed' });
  }
};
