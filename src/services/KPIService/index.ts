import DailyKPIService from './KPIService'
import postgresDailyKPIAPI from '@/api/KPI'

const dailyKPIService = new DailyKPIService(postgresDailyKPIAPI)
export default dailyKPIService