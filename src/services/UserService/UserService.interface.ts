import { User } from '@/models/User'

export interface IUserService {
  getUserByAuthProviderId(authProviderId: string): Promise<User | undefined>
  getUserById(id: string): Promise<User | undefined>
  createUser(user: Omit<User, 'id'>): Promise<User>
}