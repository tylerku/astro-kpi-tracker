// pages/api/auth/callback.ts (Server-side)

import { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';
import cookies from 'cookies';
import moment from 'moment'
import googleAPIService from '../../../../services/GoogleAPIService'
import userService from '@/services/UserService';
import { User } from '@/models';
import tokenService from '@/services/TokenService/TokenService'; // Hypothetical token service
import { PrismaClient } from '@prisma/client';
import crmService from '@/services/CRMService';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    const { code } = req.body;
    if (!code) { return res.status(400).json({ error: 'No code provided' }); }
    const auth = await crmService.getAuthCredentials({code});

    const accessToken = auth.accessToken;
    const refreshToken = auth.refreshToken;
    const expires_in = auth.expiresIn;
    const accessTokenExpDate = new Date(Date.now() + expires_in * 1000);

    // Save tokens into the Crm table using Prisma
    
    // Set accessToken as a cookie
    cookies(req, res).set('crmAccessToken', accessToken, {
      path: '/',
      expires: accessTokenExpDate,
      sameSite: 'strict',
      httpOnly: true,
    });

    res.status(200).json({ message: 'GHL callback successful' });
  } catch (error) {
    console.error('Error during OAuth2 GHL callback:', error);
    res.status(500).json({ error: 'OAuth2 callback failed' });
  };
};
