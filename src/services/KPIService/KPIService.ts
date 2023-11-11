import { IKPIAPI } from '@/api/KPI'
import { DailyKPI } from '@/models'

export default class KPIService {
  api: IKPIAPI

  constructor(api: IKPIAPI) {
    this.api = api
  }

  getTodaysKPIs(userId: number): Promise<DailyKPI[]> {
    return this.api.getTodaysKPIs(userId)
  }

  getThisWeeksKPIs(userId: number): Promise<Record<string, DailyKPI[]>> {
    return this.api.getThisWeeksKPIs(userId)
  }
}