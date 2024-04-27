import { IUserAPI } from '@/api/User'
import { User } from '@/models'

export default class UserService {
  api: IUserAPI

  constructor(api: IUserAPI) {
    this.api = api
  }

  async getUserByAuthProviderId(authProviderId: string): Promise<User | undefined> {
    return await this.api.getUserByAuthProviderId(authProviderId)
  }

  async getUserById(id: number): Promise<User | undefined> {
    return await this.api.getUserById(id)
  }

  async createUser(user: Omit<User, 'id'>): Promise<User | undefined> {
    return await this.api.createUser(user)
  }
}