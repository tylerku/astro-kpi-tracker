import { DailyKPI } from '@/models'

export default interface IKPIAPI {
  getTodaysKPIs: (userId: number) => Promise<DailyKPI[]>
  getThisWeeksKPIs: (userId: number) => Promise<Record<string, DailyKPI[]>>
}