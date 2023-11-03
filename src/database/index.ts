import pool from "./postgres.database";
import IDatabase, { QueryResult } from './database.interface';
import {INSERT_NEW_TIME_BLOCK} from './queries'

interface DatabaseConnection {
  query: (string: string) => Promise<QueryResult<any>>;
}

class Database implements IDatabase {
  db: DatabaseConnection;

  constructor() {
    this.db = pool;
  }

  query = async (queryString: string): Promise<QueryResult<any>> => {
    if (!this.db) throw new Error('Database connection not established');
    const result = await this.db.query(queryString);
    return result;
  }

  insertNewTimeBlock = async (userId: number): Promise<QueryResult<any>> => {
    const result = await this.db.query(INSERT_NEW_TIME_BLOCK(userId))
    return result
  }
} 

export type {IDatabase}
export default new Database()