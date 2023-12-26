import { User } from '@/models';
import postgresQueries from '@/database/postgres/queries';
import { IDatabase, supabaseDB } from '@/database';
import UserAPI from './User.api.interface';
import { SupabaseClient } from '@supabase/supabase-js';

class SupabaseKPIAPI implements UserAPI {
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

export default new SupabaseKPIAPI()