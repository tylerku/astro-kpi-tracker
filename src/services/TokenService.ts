interface TokenData {
  userId: string;
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: Date;
  refreshTokenExpiresAt: Date;
}

class TokenService {
  saveTokens = async (tokenData: TokenData): Promise<void> => {
    /*
    * Save the tokens to the database or any other storage
    * You can use any database library or ORM of your choice
    */

  }

  getTokens = async (userId: string): Promise<TokenData> => {
    return {} as TokenData
  }

  deleteTokens = async (userId: string): Promise<void> => {
    
  }

  updateTokens = async (userId: string, tokenData: TokenData): Promise<void> => {
    return
  }
};

export default new TokenService();
