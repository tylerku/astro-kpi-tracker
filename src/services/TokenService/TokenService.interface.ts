import { OAuth2Credentials } from "@/models/auth"


export default interface ITokenService {
  /**
   * 
   * @param credentials OAuth2 credientials returns from GHL after user authenticates 
   * @returns 
   */
  saveGhlCredentials: (credentials: OAuth2Credentials) => Promise<void>

  /**
   * Get
   * @param crm 
   * @returns 
   */
  getGhlTokens: (userId: string) => Promise<OAuth2Credentials | null>

}