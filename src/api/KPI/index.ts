import IKPIAPI from './KPI.api.interface';
import PostgresKPIAPI from './KPI.api.postgres'
import { postgresDB } from '@/database'

const postgresKPIAPI = new PostgresKPIAPI(postgresDB)

export default postgresKPIAPI
export type { IKPIAPI }