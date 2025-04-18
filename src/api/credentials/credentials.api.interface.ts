import { OAuth2Credentials, Credentials, AuthProvider } from '@/models/auth';

export interface CredentialParams extends Omit<Credentials, 'id'> {
  userId: string | null;
}

export default interface ICredentialsAPI {
  upsertCredentials(credentials: CredentialParams): Promise<Credentials>;
  getCredentialsByApiKey(apiKey: string): Promise<Credentials | null>;
  getCredentialsByUserIdAndProvider(userId: string, provider: AuthProvider): Promise<Credentials | null>;
  getCredentialsByProviderIdAndProvider(providerId: string, provider: AuthProvider): Promise<Credentials | null>;
}