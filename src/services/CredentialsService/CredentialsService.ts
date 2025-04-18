import credentials, { ICredentialsAPI } from '@/api/credentials';
import { ICredentialsService } from '@/services/CredentialsService';
import { APIKeyCredentials, OAuth2Credentials, Credentials, AuthProvider, CredentialsType } from '@/models/auth';
import crypto from 'crypto';
import { IGoHighLevelAPI } from '@/api/crm';
import { IOAuth2API, OAuth2CredentialsRequestParams } from '@/api/OAuth2.interface';

export default class CredentialsService implements ICredentialsService {
  private credentialsAPI: ICredentialsAPI;
  private ghlAPI: IGoHighLevelAPI & IOAuth2API; 

  constructor(credentialsAPI: ICredentialsAPI, ghlAPI: IGoHighLevelAPI & IOAuth2API) {
    this.credentialsAPI = credentialsAPI;
    this.ghlAPI = ghlAPI;
  }
  
  upsertOAuth2Credentials = async (userId: string, provider: AuthProvider, credentials: OAuth2Credentials): Promise<void> => {
    const expiration = new Date(credentials.expiration).toISOString();
    this.credentialsAPI.upsertCredentials({
      userId,
      authProviderUserId: credentials.userId,
      provider,
      value: {
        accessToken: credentials.accessToken,
        refreshToken: credentials.refreshToken,
        expiration: expiration 
      },
      type: CredentialsType.OAUTH2,
      revoked: false,
      createdAt: new Date(),
      updatedAt: new Date() 
    })
  }

  createAPIKeyCredentials = async (userId: string): Promise<void> => {
    const apiKey = crypto.randomBytes(32).toString('hex');
    const value: APIKeyCredentials = {
      apiKey
    }
    this.credentialsAPI.upsertCredentials({
      userId,
      authProviderUserId: userId,
      provider: AuthProvider.INTERNAL,
      value: { ...value },
      type: CredentialsType.API_KEY,
      revoked: false,
      createdAt: new Date(),
      updatedAt: new Date()
    })
  };

  getOAuthAccessToken = async (userId: string, provider: AuthProvider): Promise<string | null> => {
    const creds = await this.credentialsAPI.getCredentialsByUserIdAndProvider(userId, provider);
    if (!creds) {
      return null;
    }
    let auth = creds.value as unknown as OAuth2Credentials;
    const expiration = new Date(auth.expiration)
    const now = new Date();
    if (expiration < now) {
      auth = await this.refreshAccessToken(auth.refreshToken, userId, provider);
    }
    return auth.accessToken;
  }

  getOAuth2CredentialByUserId = async (userId: string, provider: AuthProvider): Promise<OAuth2Credentials | null> => {
    const creds = await this.credentialsAPI.getCredentialsByUserIdAndProvider(userId, provider);
    return creds?.value as unknown as OAuth2Credentials
  }
  
  getOAuth2CredentialByProviderId = async (providerId: string, provider: AuthProvider): Promise<OAuth2Credentials | null> => {
    const creds = await this.credentialsAPI.getCredentialsByProviderIdAndProvider(providerId, provider);
    return creds?.value as unknown as OAuth2Credentials
  }

  getAPIKeyCredential = async (apiKey: string): Promise<APIKeyCredentials | null> => {
    const creds = await this.credentialsAPI.getCredentialsByApiKey(apiKey);
    return creds?.value as unknown as APIKeyCredentials
  }

  getUserIdByAPIKey = async (apiKey: string): Promise<string | null> => {
    const creds = await this.credentialsAPI.getCredentialsByApiKey(apiKey);
    return creds?.userId || null;
  }

  private refreshAccessToken = async (refreshToken: string, userId: string, provider: AuthProvider): Promise<OAuth2Credentials> => {
    switch (provider) {
      case AuthProvider.GHL:
        const auth = await this.ghlAPI.getAuthCredentials({ refreshToken });
        await this.upsertOAuth2Credentials(userId, provider, auth);
        return auth;
      default:
        throw new Error(`Unsupported provider: ${provider}`);
    }
  }
}