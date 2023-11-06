import { Pool, PoolConfig } from 'pg';
import IDatabase, { QueryResult } from '../database.interface';

interface DatabaseConnection {
  query: (string: string) => Promise<QueryResult<any>>;
}

class PostgresDatabase implements IDatabase {
  db: DatabaseConnection;

  constructor() {
    const config: PoolConfig = {
      user: process.env.AWS_RDS_DB_USER,
      host: process.env.AWS_RDS_DB_URL,
      database: process.env.AWS_RDS_DB_NAME,
      password: process.env.AWS_RDS_DB_PASSWORD,
      port: 5432,
      ssl: {
        rejectUnauthorized: false
      }
    }
    const pool = new Pool(config);
    this.db = pool;
  }

  query = async (queryString: string): Promise<QueryResult<any>> => {
    if (!this.db) throw new Error('Database connection not established');
    const result = await this.db.query(queryString);
    return result;
  }
} 

export default new PostgresDatabase()