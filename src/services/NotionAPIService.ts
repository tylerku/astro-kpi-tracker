import {Client} from '@notionhq/client';
import { DatabaseObjectResponse, PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import moment from 'moment';

export type notionKPI = {
  key: string,
  value: number,
  goal: number
}

class NotionAPIService {

  notionSDK: Client

  constructor() {
    const notionApiSecret = process.env.NOTION_API_SECRET;
    this.notionSDK = new Client({ auth: notionApiSecret });
  }

  getTodaysKPIs = async (kpiNames: string[], kpiGoals: Record<string, number>): Promise<notionKPI[]> => {
    try {
      const notionDatabaseId = process.env.NOTION_KPI_DB_ID ?? '';
      moment.tz.setDefault('America/Denver')
      const today = moment().format('YYYY-MM-DD');
      const response = await this.notionSDK.databases.query({
        database_id: notionDatabaseId,
        filter: {
          or: [
            {
              property: 'Date',
              date: {
                equals: today,
              },
            }
          ],
        }
      });

      const result: PageObjectResponse | DatabaseObjectResponse = response.results[0] as PageObjectResponse
      if (!result) return []
      const kpiValuesPromises = kpiNames.map(async (name) => {
        const object = result.properties[`${name}`] as {id: string, type: string, number: number}
        return {
          key: name,
          value: object.number as number ?? 0,
          goal: kpiGoals[name] ?? 0
        } as notionKPI
      })

      const kpiValues = await Promise.all(kpiValuesPromises)
      return kpiValues;
    } catch (error) {
      console.log('Error getting todays KPIs: ', error);
      throw error
    }
  
    return []
  }

  getThisWeeksKPIs = async (kpiNames: string[], kpiGoals: Record<string, number>): Promise<Record<string, notionKPI[]>> => {
    try {
      const notionDatabaseId = process.env.NOTION_KPI_DB_ID ?? '';
      const response = await this.notionSDK.databases.query({
        database_id: notionDatabaseId,
        filter: {
          or: [
            {
              property: 'Date',
              date: {
                this_week: {},
              },
            }
          ],
        }
      });
      const result: PageObjectResponse[] = response.results as PageObjectResponse[]
      if (!result) return {}
      const thisWeeksKPIs: Record<string, notionKPI[]> = {} 
      result.forEach((page) => {
        const dateObj = page.properties["Date"] as any
        const date = dateObj.date.start
        thisWeeksKPIs[date] = [] as notionKPI[]
        kpiNames.forEach((name) => {
          const object = page.properties[`${name}`] as {id: string, type: string, number: number}
          const kpi = {
            key: name,
            value: object.number as number ?? 0,
            goal: kpiGoals[name] ?? 0
          } as notionKPI
          thisWeeksKPIs[date].push(kpi)
        }) 
      })
      return thisWeeksKPIs
    } catch (error) {
      console.log('Error getting todays KPIs: ', error);
      throw(error)
    }
  }

  updateTodaysKPI = async (kpiName: string, kpiValue: number) => {
    const notionDatabaseId = process.env.NOTION_KPI_DB_ID ?? '';
    const today = moment().format('YYYY-MM-DD'); 
    const response = await this.notionSDK.databases.query({
      database_id: notionDatabaseId,
      filter: {
        or: [
          {
            property: 'Date',
            date: {
              equals: today,
            },
          }
        ],
      }
    });

    const page = response.results[0] as PageObjectResponse
    const updatedProperties = {
      [kpiName]: {
        number: kpiValue,
      }
    }
    const updateResponse = await this.notionSDK.pages.update({
      page_id: page.id,
      properties: updatedProperties
    });
    return updateResponse
  }
}

export default new NotionAPIService()