import { DailyKPI, TIMEZONE, User } from '@/models'

export default interface IKPIAPI {
  getKPIsForUser(userId: number): Promise<DailyKPI[]>
  getTodaysKPIs: (userId: number, userTimezone: TIMEZONE) => Promise<DailyKPI[]>
  getThisWeeksKPIs: (userId: number, userTimezone: TIMEZONE) => Promise<Record<string, DailyKPI[]>>
  incrementKPI: (kpi: DailyKPI) => Promise<DailyKPI>
  decrementKPI: (kpi: DailyKPI) => Promise<DailyKPI>
}