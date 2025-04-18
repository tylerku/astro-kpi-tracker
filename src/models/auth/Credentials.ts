export interface OAuth2Credentials {
  accessToken: string;
  refreshToken: string;
  expiration: Date;
  scope?: string;
  tokenType?: string;
  userId: string;
  locationId?: string;
  companyId?: string;
}

export interface APIKeyCredentials {
  apiKey: string;
}


export type { Credentials } from '@prisma/client';
export { CredentialsType, AuthProvider } from '@prisma/client';