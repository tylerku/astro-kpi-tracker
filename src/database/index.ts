import postgresDB from './postgres';
import supabaseDB from './supabase'
import IDatabase, { QueryResult } from './database.interface'

export { postgresDB, supabaseDB }
export type { IDatabase, QueryResult };
