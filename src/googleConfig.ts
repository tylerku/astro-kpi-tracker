import { google, Auth } from 'googleapis';

interface GoogleConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}

const googleConfig: GoogleConfig = {
  clientId: process.env.GOOGLE_CLIENT_ID || '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  redirectUri: process.env.GOOGLE_OAUTH_CALLBACK_URI || '', // Update with your callback URL
};

const defaultScope = [
  'https://www.googleapis.com/auth/spreadsheets', // Add any additional scopes you require
];

const getConnectionUrl = (auth: Auth.OAuth2Client): string => {
  return auth.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: defaultScope,
  });
};

const getGoogleAuthUrl = (): string => {
  const auth = getGoogleAuth();
  return getConnectionUrl(auth);
};

const getGoogleAuth = (): Auth.OAuth2Client => {
  return new google.auth.OAuth2(
    googleConfig.clientId,
    googleConfig.clientSecret,
    googleConfig.redirectUri
  );
}

export { getGoogleAuthUrl, getGoogleAuth, googleConfig };
