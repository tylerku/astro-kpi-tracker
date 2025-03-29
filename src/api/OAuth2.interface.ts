import { OAuth2Credentials } from "@/models/auth";

export interface OAuth2CredentialsRequestParams {
  code?: string;
  refreshToken?: string;
}

export interface IOAuth2API {
  getAuthCredentials(params: OAuth2CredentialsRequestParams): Promise<OAuth2Credentials>;
  getOAuth2URL(): string;
}