import { NextApiRequest, NextApiResponse } from 'next';
import cookies from 'cookies';
import crmService from '@/services/CRMService';
import {AuthProvider, OAuth2Credentials} from '@/models/auth';
import credentialsService from '@/services/CredentialsService';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    const { code, userId } = req.body;
    if (!code) { return res.status(400).json({ error: 'No code provided' }); }

    const credentials = await crmService.getAuthCredentials({code}); 
    credentialsService.upsertOAuth2Credentials(userId, AuthProvider.GHL, credentials);

    // Set accessToken as a cookie
    cookies(req, res).set('crmAccessToken', credentials.accessToken, {
      path: '/',
      expires: credentials.expiration,
      sameSite: 'strict',
      httpOnly: true,
    });
    res.status(200).json({ message: 'GHL callback successful' });
  } catch (error) {
    console.error('Error during OAuth2 GHL callback:', error);
    res.status(500).json({ error: 'OAuth2 callback failed' });
  };
};
