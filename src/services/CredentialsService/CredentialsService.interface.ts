import { APIKeyCredentials, OAuth2Credentials, AuthProvider } from '@/models/auth';

export default interface ICredentialsService {
  upsertOAuth2Credentials: (userId: string, provider: AuthProvider, credentials: OAuth2Credentials) => Promise<void>;
  createAPIKeyCredentials: (userId: string) => Promise<void>;
  getOAuthAccessToken: (userId: string, provider: AuthProvider) => Promise<string | null>;
  getOAuth2CredentialByUserId: (userId: string, provider: AuthProvider) => Promise<OAuth2Credentials | null>;
  getOAuth2CredentialByProviderId: (providerId: string, provider: AuthProvider) => Promise<OAuth2Credentials | null>;
  getAPIKeyCredential: (apiKey: string) => Promise<APIKeyCredentials | null>;
  getUserIdByAPIKey: (apiKey: string) => Promise<string | null>;
}