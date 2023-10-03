import {Client} from '@notionhq/client';
import { DatabaseObjectResponse, PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

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
      const todayDate = new Date().toISOString().split('T')[0];
      const response = await this.notionSDK.databases.query({
        database_id: notionDatabaseId,
        filter: {
          or: [
            {
              property: 'Date',
              date: {
                equals: todayDate,
              },
            }
          ],
        }
      });

      const result: PageObjectResponse | DatabaseObjectResponse = response.results[0] as PageObjectResponse
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
    }
  
    return []
  }

  updateTodaysKPI = async (kpiName: string, kpiValue: number) => {
    const notionDatabaseId = process.env.NOTION_KPI_DB_ID ?? '';
    const todayDate = new Date().toISOString().split('T')[0];

    const response = await this.notionSDK.databases.query({
      database_id: notionDatabaseId,
      filter: {
        or: [
          {
            property: 'Date',
            date: {
              equals: todayDate,
            },
          }
        ],
      }
    });

    const page = response.results[0] as PageObjectResponse
    const property = page.properties[`${kpiName}`];

    const updatedProperties = {
      [kpiName]: {
        number: kpiValue,
      }
    }
    console.log('updatedProperties: ', updatedProperties)
    const updateResponse = await this.notionSDK.pages.update({
      page_id: page.id,
      properties: updatedProperties
    });
    return updateResponse
  }
}

export default new NotionAPIService()