import { IUserAPI } from '@/api/User'
import { User } from '@/models'
import { IUserService } from './UserService.interface'

export default class UserService implements IUserService {
  api: IUserAPI

  constructor(api: IUserAPI) {
    this.api = api
  }

  async getUserByAuthProviderId(authProviderId: string): Promise<User | undefined> {
    return await this.api.getUserByAuthProviderId(authProviderId)
  }

  async getUserById(id: string): Promise<User | undefined> {
    return await this.api.getUserById(id)
  }

  async createUser(user: Omit<User, 'id'>): Promise<User> {
    return await this.api.createUser(user)
  }
}