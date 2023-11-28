import { DailyKPI, TIMEZONE } from '@/models';
import KPIAPI from './KPI.api.interface';
import { queries } from '@/database/postgres';
import { IDatabase } from '@/database';
import moment from 'moment-timezone';

type KPIDefinition = {
  id: string,
  user_id: string,
  name: string,
  data_type: string,
  goal: number,
}

type KPIEntry = {
  id: string,
  daily_kpi_id: string,
  timestamp: string,
  action: string,
  value: number
}

export default class PostgresKPIAPI implements KPIAPI {

  database: IDatabase;

  constructor(database: IDatabase) {
    this.database = database;
  }

  async getTodaysKPIs(userId: number, userTimezone: TIMEZONE): Promise<DailyKPI[]> {
    try {
      const query1 = queries.dailyKPI.getUsersDailyKPIs(userId)
      const res1 = await this.database.query(query1)
      const kpis = res1.rows.map((dailyKPI: any) => {
        return {
          ...dailyKPI,
          definitionId: dailyKPI.id,
          goal: Number(dailyKPI.goal)
        } as DailyKPI
      })
      const query2 = queries.dailyKPIEntry.getTodaysMostRecentDailyKPIEntries(userTimezone, kpis.map(kpi => kpi.definitionId ?? ''))
      const res2 = await this.database.query(query2)
      const dailyKPIEntries = res2.rows
      const result = kpis.map(kpi => {
        const value = dailyKPIEntries.find(entry => entry.daily_kpi_id === kpi.definitionId)?.value
        return {
          ...kpi,
          value: value ? Number(value) : 0,
        } as DailyKPI
      })
      return result
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async getThisWeeksKPIs(userId: number, userTimezone: TIMEZONE): Promise<Record<string, DailyKPI[]>> {
    try {
      const query1 = queries.dailyKPI.getUsersDailyKPIs(userId)
      const res1 = await this.database.query(query1) 
      const kpis: KPIDefinition[] = res1.rows
      const kpisIDs = kpis.map((dailyKPI: any) => dailyKPI.id)
      
      const query2 = queries.dailyKPIEntry.getUsersWeeklyKPIs(userTimezone, kpisIDs)
      const res2 = await this.database.query(query2)
      const weeklyKPIEntries: any[] = res2.rows
      console.log('weeklyKPIEntries: ', weeklyKPIEntries)
      const result: Record<string, DailyKPI[]> = {}

      weeklyKPIEntries.forEach(item => {
        const dateObj = item.day as Date
        const key = moment(dateObj).format('YYYY-MM-DD')
        if (!result[key]) {
          result[key] = [];
        }
        console.log('item: ', item)
        const kpiIndex = kpis.findIndex(kpi => kpi.id === item.daily_kpi_id)
        const kpi = kpis[kpiIndex]
        result[key].push({
          entryId: item.id,
          definitionId: kpi.id,
          dataType: kpi.data_type,
          current: item.value,
          timestamp: item.timestamp,
          name: kpi.name,
          goal: kpi.goal
        });
      });

      console.log('results1: ', result)
      // add an empty array for each day of the week if there is no key for that day of the week yet in the results object 
      const today = moment().tz(userTimezone)
      const startOfWeek = today.clone().startOf('week').add(1, 'd')
      const endOfWeek = today.clone().endOf('week')
      let day = startOfWeek
      while (day <= endOfWeek) {
        const currentDay = day.format('YYYY-MM-DD')
        if (!result[currentDay] || result[currentDay].length === 0) {
          result[currentDay] = []
        }
        day = day.clone().add(1, 'd')
      }

      console.log('results2: ', result)

      // where empty, add daily kpi objects with current value as 0 for each kpi for each day of the week
      for (const [date, kpiArray] of Object.entries(result)) {
        kpis.forEach(kpiDefinition => {
          const kpi = kpiArray.find(k => k.definitionId === kpiDefinition.id)
          if (!kpi) {
            kpiArray.push({
              definitionId: kpiDefinition.id,
              entryId: undefined,
              timestamp: '',
              goal: kpiDefinition.goal,
              name: kpiDefinition.name,
              dataType: kpiDefinition.data_type,
              current: 0,
            })
          }
        })
      }
      return result
    } catch(error) {
      console.error(error)
      throw error
    }
  }

  async incrementKPI(kpi: DailyKPI): Promise<DailyKPI> {
    const tz = TIMEZONE.MST
    const mstTimestamp = moment().tz(tz).format('YYYY-MM-DD HH:mm:ss.SSSZ');
    console.log('mstTimestamp: ', mstTimestamp)
    const uploadData: DailyKPI = {
      ...kpi,
      timestamp: mstTimestamp,
      current: kpi.current + 1,
    }
    const query = queries.dailyKPIEntry.insertDailyKPIEntry(uploadData)
    console.log('query: ', query)
    const res = await this.database.query(query)
    const resultKPI = res.rows[0]
    console.log('resultKPI: ', resultKPI)
    return resultKPI
  }
}