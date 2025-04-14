import { DailyKPI, TIMEZONE, User } from '@/models'

interface IDatabase {
  getUserByAuthProviderId(authProviderId: string): Promise<User | undefined>
  getUserById(id: number): Promise<User | undefined>
  createUser(user: Omit<User, 'id'>): Promise<User>
  getDailyKPIsByUser: (userId: number) => Promise<DailyKPI[]>
  getTodaysLatestKPIEntries: (kpiIDs: string[], timezone: TIMEZONE) => Promise<DailyKPI[]>
  getWeeksLatestDailyKPIEntries: (kpiUDs: string[], timezone: TIMEZONE) => Promise<DailyKPI[]>
  upsertKPI: (kpi: DailyKPI, action: string) => Promise<DailyKPI>
}

export default IDatabase