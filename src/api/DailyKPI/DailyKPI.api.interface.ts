import { DailyKPI } from '@/models'

export default interface IDailyKPI {
  getTodaysKPIs: (userId: number) => Promise<DailyKPI[]>
}