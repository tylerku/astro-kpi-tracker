import KPIService from './KPIService'
import { kpiAPI } from '@/api/KPI'

const kpiService = new KPIService(kpiAPI)
export default kpiService