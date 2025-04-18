import { TIMEZONE, DailyKPI } from '@/models';
import IKPIAPI from './KPI.api.interface';
import moment from 'moment-timezone';

export default class KPIAPI implements IKPIAPI {


  constructor() {
  }

  getKPIsForUser = async (userId: number) => {
    return [] 
    // return await this.database.getDailyKPIsByUser(userId)
  }

  getTodaysKPIs = async (userId: number, userTimezone: TIMEZONE) => {
    // const kpiDefinitions = await this.database.getDailyKPIsByUser(userId)
    // const kpiDefinitionIDs = kpiDefinitions.map((kpi) => kpi.definitionId ?? '')
    // const latestKPIEntries = await this.database.getTodaysLatestKPIEntries(kpiDefinitionIDs, userTimezone)
    // const result = kpiDefinitions.map(kpi => {
    //   const kpiEntry = latestKPIEntries.find(entry => entry.definitionId === kpi.definitionId)
    //   return {
    //     ...kpi,
    //     current: kpiEntry?.current ? Number(kpiEntry.current) : 0,
    //     timestamp: kpiEntry?.timestamp
    //   } as DailyKPI
    // })
    // return result
    return [];
  }

  getThisWeeksKPIs = async (userId: number, userTimezone: TIMEZONE) => {
    return {}
    // try {
    //   const kpiDefinitions = await this.database.getDailyKPIsByUser(userId)
    //   const kpiDefinitionIDs = kpiDefinitions.map((kpi) => kpi.definitionId ?? '')

    //   const weeksKPIEntries = await this.database.getWeeksLatestDailyKPIEntries(kpiDefinitionIDs, TIMEZONE.MST)
    //   const result: Record<string, DailyKPI[]> = {}

    //   weeksKPIEntries.forEach(item => {
    //     const dateObj = new Date(item.timestamp)
    //     const key = moment(dateObj).format('YYYY-MM-DD')
    //     if (!result[key]) {
    //       result[key] = [];
    //     }

    //     const kpiDefinition = kpiDefinitions.find(kpiDefinition => kpiDefinition.definitionId === item.definitionId)
    //     result[key].push({
    //       entryId: item.entryId,
    //       definitionId: kpiDefinition?.definitionId,
    //       dataType: kpiDefinition?.dataType,
    //       current: Number(item.current),
    //       timestamp: item.timestamp,
    //       name: kpiDefinition?.name,
    //       goal: kpiDefinition?.goal
    //     } as DailyKPI);
    //   });

    //   // add an empty array for each day of the week if there is no key for that day of the week yet in the results object 
    //   const today = moment().tz(userTimezone)
    //   const startOfWeek = today.clone().startOf('week').add(1, 'd')
    //   const endOfWeek = today.clone().endOf('week')
    //   let day = startOfWeek
    //   while (day <= endOfWeek) {
    //     const currentDay = day.format('YYYY-MM-DD')
    //     if (!result[currentDay] || result[currentDay].length === 0) {
    //       result[currentDay] = []
    //     }
    //     day = day.clone().add(1, 'd')
    //   }

    //   // where empty, add daily kpi objects with current value as 0 for each kpi for each day of the week
    //   for (const [date, kpiArray] of Object.entries(result)) {
    //     kpiDefinitions.forEach(kpiDefinition => {
    //       const kpi = kpiArray.find(k => k.definitionId === kpiDefinition.definitionId)
    //       if (!kpi) {
    //         kpiArray.push({
    //           definitionId: kpiDefinition.definitionId,
    //           entryId: undefined,
    //           timestamp: '',
    //           goal: kpiDefinition.goal,
    //           name: kpiDefinition.name,
    //           dataType: kpiDefinition.dataType,
    //           current: 0,
    //         })
    //       }
    //     })
    //   }
    //   return result
    // } catch (error) {
    //   console.error(error)
    //   throw error
    // }
  }

  incrementKPI = async (kpi: DailyKPI) => {
    // return this.database.upsertKPI({ ...kpi, current: kpi.current + 1 }, 'increment')
    return {} as DailyKPI;
  }

  decrementKPI = async (kpi: DailyKPI) => {
    // return this.database.upsertKPI({ ...kpi, current: kpi.current - 1 }, 'decrement')
    return {} as DailyKPI;
  }
}