import KPIService from './KPIService'
import postgresKPIAPI from '@/api/KPI'

const kpiService = new KPIService(postgresKPIAPI)
export default kpiService