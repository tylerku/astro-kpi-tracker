import { User } from '@/models';
import UserAPI from './User.api.interface';
import postgresQueries from '@/database/postgres/queries';
import { postgresDB, IDatabase } from '@/database';

class PostgresUserAPI implements UserAPI {

  database: IDatabase;

  constructor(database: IDatabase = postgresDB) {
    this.database = database;
  }

  async getUserByAuthProviderId(authProviderId: string): Promise<User | undefined> {
    try {
      // TODO: Sanitize input
      const res = await this.database.query(postgresQueries.users.findUserWithAuthProviderId(authProviderId))
      if (res.rows.length === 0) return undefined
      return res.rows[0]
    } catch (error) {
      console.error(error)
      return undefined
    }
  }

  async createUser(user: User): Promise<User | undefined> {
    try {
      const query = postgresQueries.users.createUser(user.firstName, user.lastName, user.authProviderId, user.email)
      const res = await this.database.query(query)
      console.log('res: ', res)
      if (res.rows.length === 0) return undefined
      return res.rows[0]
    } catch (error: any) {
      console.error('Failed to create user: ', error)
      console.log('error code: ', error.code)
      return undefined
    }
  }
}

export default new PostgresUserAPI(postgresDB)