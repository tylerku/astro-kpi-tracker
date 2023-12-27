import { User } from '@/models';
import { IDatabase, supabaseDB } from '@/database';
import IUserAPI from './User.api.interface';

export default class UserAPI implements IUserAPI {
  database: IDatabase;

  constructor() {
    this.database = supabaseDB
  }

  async getUserByAuthProviderId(authProviderId: string): Promise<User | undefined> {
    return await this.database.getUserByAuthProviderId(authProviderId)
  }

  async createUser(user: User): Promise<User | undefined> {
    return await this.database.createUser(user)
  }
}