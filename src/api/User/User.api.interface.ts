import { User } from '../../models'

export default interface UserAPI {
  getUserByAuthProviderId(authProviderId: string): Promise<User | undefined>
  createUser(user: Omit<User, 'id'>): Promise<User | undefined>
}