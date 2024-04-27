import { IKPIAPI } from '@/api/KPI'
import { DailyKPI, TIMEZONE } from '@/models'

export default class KPIService {
  api: IKPIAPI

  constructor(api: IKPIAPI) {
    this.api = api
  }

  getKPIsForUser(userId: number): Promise<DailyKPI[]> {
    return this.api.getKPIsForUser(userId)
  }

  getTodaysKPIs(userId: number, timezone: TIMEZONE): Promise<DailyKPI[]> {
    return this.api.getTodaysKPIs(userId, timezone)
  }

  getThisWeeksKPIs(userId: number, timezone: TIMEZONE): Promise<Record<string, DailyKPI[]>> {
    return this.api.getThisWeeksKPIs(userId, timezone)
  }

  incrementKPI(kpi: DailyKPI): Promise<DailyKPI> {
    return this.api.incrementKPI(kpi)
  }
}