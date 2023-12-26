import KPIService from './KPIService'
import { KPIAPI } from '@/api/KPI'

const kpiService = new KPIService(KPIAPI)
export default kpiService