import { DailyKPI, TIMEZONE } from '@/models'

export default interface IKPIAPI {
  getTodaysKPIs: (userId: number, userTimezone: TIMEZONE) => Promise<DailyKPI[]>
  getThisWeeksKPIs: (userId: number, userTimezone: TIMEZONE) => Promise<Record<string, DailyKPI[]>>
  incrementKPI: (kpi: DailyKPI) => Promise<DailyKPI>
  decrementKPI: (kpi: DailyKPI) => Promise<DailyKPI>
}