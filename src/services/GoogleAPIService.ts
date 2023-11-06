import { User } from '@/models';
import { Auth, google } from 'googleapis'

type GoogleUserInfo = Omit<User, 'id'>

interface GoogleConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}

export interface GoogleAPIRequestAuthParams {
  refresh_token: string
  access_token: string
}

class GoogleAPIService {
  private static instance: GoogleAPIService;
  auth: Auth.OAuth2Client;
  sheets: any;
  private spreadsheetId: string;
  private defaultScope = [
    'https://www.googleapis.com/auth/spreadsheets', // Add any additional scopes you require
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'
  ];

  constructor() {
    this.auth = this.getAuth();
    this.sheets = google.sheets({ version: 'v4', auth: this.auth });
    this.spreadsheetId = '1xffbOZag_E_3CmOkj-hO8riQTzvBX3HZ-aZkFU9feXU';
  }

  getTokensFromAuthCode = async (code: string) => {
    const { tokens } = await this.auth.getToken(code);
    return tokens;
  }

  setSpreadsheetId = (id: string) => {
    this.spreadsheetId = id
  }
  
  incrementCell = async (cell: string, authParams: GoogleAPIRequestAuthParams) => {   
    try {
      this.auth.setCredentials(authParams)
      const sheets = google.sheets({ version: 'v4', auth: this.auth });
      const res = await sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: cell,
        auth: this.auth
      })
      const currentValue = parseInt(res.data.values?.[0][0] ?? 0);
      const newValue = currentValue + 1;
      const r = await sheets.spreadsheets.values.update({
        spreadsheetId: this.spreadsheetId,
        range: cell,
        valueInputOption: 'USER_ENTERED',
        auth: this.auth,
        includeValuesInResponse: true,
        requestBody: {
          values: [[newValue]],
        },
      });
      return r.data.updatedData?.values?.[0][0]
    } catch (err) {
      console.error('Increment Cell Error: ', err);
    }
  };

  getCellValue = async (cell: string, authParams: GoogleAPIRequestAuthParams) => {
    try {
      this.auth.setCredentials(authParams)
      const sheets = google.sheets({ version: 'v4', auth: this.auth });
      return await sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: cell,
        auth: this.auth
      })
    } catch (err) {
      console.error('Get Cell Value Error: ', err);
    }
  }

  getUserInfo = async (accessToken: string): Promise<GoogleUserInfo | undefined> => {
    try {
      const resp = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      const userInfoData = await resp.json()
      const authProviderId = userInfoData.sub
      const email = userInfoData.email
      const firstName = userInfoData.given_name
      const lastName = userInfoData.family_name
      return {
        authProviderId,
        email,
        firstName,
        lastName,
      } as GoogleUserInfo
    } catch(error) {
      console.error('Error getting user info: ', error);
    }
    
  }

  /**
   * This gets the GoogleAuth object that is used to make requests to the Google Sheets API
   * 
   * @param accessToken 
   * @returns GoogleAuth object
   */
  // private getAuthParam = (accessToken: string) => {
  //   try {
  //     this.auth.setCredentials({
  //       access_token: accessToken
  //     })
  //     return new google.auth.GoogleAuth({
  //       scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  //       authClient: this.auth 
  //     })
  //   } catch (error) {
  //     console.log('Error getting the GoogleAuth object: ', error);
  //   }
  // };

  private getConnectionUrl = (auth: Auth.OAuth2Client): string => {
    return auth.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: this.defaultScope,
    });
  };

  getGoogleAuthUrl = (): string => {
    const auth = this.getAuth();
    return this.getConnectionUrl(auth);
  };

  setAuthCredentials = (creds: Auth.Credentials) => {
    this.auth.setCredentials(creds)
  }

  private getAuth = (): Auth.OAuth2Client => {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = process.env.GOOGLE_OAUTH_REDIRECT_URI;
    return new google.auth.OAuth2(
      clientId,
      clientSecret,
      redirectUri 
    );
  }

}

export default new GoogleAPIService()