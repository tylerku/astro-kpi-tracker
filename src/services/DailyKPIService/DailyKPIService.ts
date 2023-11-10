import { IDailyKPIAPI } from '@/api/DailyKPI'
import { DailyKPI } from '@/models'

export default class KPIService {
  api: IDailyKPIAPI

  constructor(api: IDailyKPIAPI) {
    this.api = api
  }

  getTodaysKPIs(userId: number): Promise<DailyKPI[]> {
    return this.api.getTodaysKPIs(userId)
  }
}