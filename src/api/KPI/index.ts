import IKPIAPI from './KPI.api.interface';
import SupabaseKPIAPI from './KPI.api.supabase'

const KPIAPI = new SupabaseKPIAPI()
export { KPIAPI }
export type { IKPIAPI }