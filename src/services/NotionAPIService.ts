
export default class NotionAPIService {
  private static instance: NotionAPIService;
  constructor() {

  }

  getNumberKPI = async (name: string) => {
    try {
      // make request to notion api here 
      const notionApiSecret = process.env.NOTION_API_SECRET;
      const notionDatabaseId = process.env.NOTION_KPI_DB_ID;
      const { Client } = require('@notionhq/client');
      const notion = new Client({ auth: notionApiSecret });
      
      // get todays date in a variable in ISO 8601 format 
      const todayDate = new Date().toISOString().split('T')[0];
      
      const response = await notion.databases.query({
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

      const numberValue = response.results[0].properties[`${name}`].number ?? 0;
      return numberValue;

    } catch (error) {
      console.log('Error getting todays KPIs: ', error);
    }
  }
}