// pages/api/auth/callback.ts (Server-side)

import { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';
import cookies from 'cookies';
import moment from 'moment'
import {googleAPIService} from '../../../services'


export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    const { code } = req.body;

    console.log('got here A:', code)
    const tokens = await googleAPIService.getTokensFromAuthCode(code)
    console.log('got here B: ', tokens)
    const accessToken = tokens.access_token;
    const refreshToken = tokens.refresh_token;
    const expires_in = tokens.expiry_date ? String(tokens.expiry_date) : null;
    console.log('got here C')
    googleAPIService.setAuthCredentials({
      access_token: accessToken,
      refresh_token: refreshToken
    })
    console.log('got here D')

    const accessTokenExpDate = new Date(tokens.expiry_date ?? 0)
    cookies(req, res).set('accessToken', accessToken, {
      path: '/',
      expires: accessTokenExpDate,
      sameSite: 'strict',
      httpOnly: true,
    });
    cookies(req, res).set('refreshToken', refreshToken, {
      path: '/',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
      sameSite: 'strict',
      httpOnly: true,
    });
    cookies(req, res).set('expires_in', expires_in, {
      path: '/',
      expires: accessTokenExpDate,
      sameSite: 'strict',
      httpOnly: true,
    });

    res.status(200).json({ success: true, accessToken, refreshToken}); // Replace with your desired response
  } catch (error) {
    console.error('Error during OAuth2 callback:', error);
    res.status(500).json({ error: 'OAuth2 callback failed' });
  }
};
