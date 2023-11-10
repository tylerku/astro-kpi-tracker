import DailyKPIService from './DailyKPIService'
import postgresDailyKPIAPI from '@/api/DailyKPI'

const dailyKPIService = new DailyKPIService(postgresDailyKPIAPI)
export default dailyKPIService