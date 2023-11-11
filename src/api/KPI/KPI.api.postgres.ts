import { DailyKPI } from '@/models';
import KPIAPI from './KPI.api.interface';
import { queries, PostgreSQLTimezone } from '@/database/postgres';
import { IDatabase } from '@/database';

export default class PostgresKPIAPI implements KPIAPI {

  database: IDatabase;

  constructor(database: IDatabase) {
    this.database = database;
  }

  async getTodaysKPIs(userId: number): Promise<DailyKPI[]> {
    try {
      const query1 = queries.dailyKPI.getUsersDailyKPIs(userId)
      const res1 = await this.database.query(query1)
      const kpis = res1.rows.map((dailyKPI: DailyKPI) => {
        return {
          ...dailyKPI,
          goal: Number(dailyKPI.goal),
        } as DailyKPI
      })
      const query2 = queries.dailyKPIEntry.getTodaysMostRecentDailyKPIEntries(PostgreSQLTimezone.MST, kpis.map(kpi => kpi.id))
      const res2 = await this.database.query(query2)
      const dailyKPIEntries = res2.rows
      const result = kpis.map(kpi => {
        const value = dailyKPIEntries.find(entry => entry.daily_kpi_id === kpi.id)?.value
        return {
          ...kpi,
          value: value ? Number(value) : 0,
        } as DailyKPI
      })
      return result
    } catch (error) {
      console.error(error)
      return []
    }
  }

  async getThisWeeksKPIs(userId: number): Promise<Record<string, DailyKPI[]>> {
    try {

    } catch(error) {
      console.error(error)
      return {}
    }
  }
}