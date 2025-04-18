import { IUserAPI } from '@/api/User'
import { User } from '@/models'
import { IUserService } from './UserService.interface'
import { ICredentialsAPI } from '@/api/credentials'
import crypto from 'crypto';
import { APIKeyCredentials, AuthProvider, CredentialsType } from '@/models/auth';

export default class UserService implements IUserService {
  userAPI: IUserAPI
  credentialsAPI: ICredentialsAPI

  constructor(userAPI: IUserAPI, credentialsAPI: ICredentialsAPI) {
    this.userAPI = userAPI;
    this.credentialsAPI = credentialsAPI;
  }

  async getUserByAuthProviderId(authProviderId: string): Promise<User | undefined> {
    return await this.userAPI.getUserByAuthProviderId(authProviderId)
  }

  async getUserById(id: string): Promise<User | undefined> {
    return await this.userAPI.getUserById(id)
  }

  async createUser(userData: Omit<User, 'id'>): Promise<User> {
    const user = await this.userAPI.createUser(userData)
    const apiKey = crypto.randomBytes(32).toString('hex');
    const value: APIKeyCredentials = {
      apiKey
    }
    await this.credentialsAPI.upsertCredentials({
      userId: user.id,
      authProviderUserId: user.id,
      provider: AuthProvider.INTERNAL,
      value: { ...value },
      type: CredentialsType.API_KEY,
      revoked: false,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    return user;
  }
}