import { Pool, PoolConfig } from 'pg';

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
export default pool;