export default interface OAuth2Credentials {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}