import { NextApiRequest, NextApiResponse } from 'next';
import kpiService from '@/services/KPIService';
import userService from '@/services/UserService';
import notionService from '@/services/NotionAPIService'
import { TIMEZONE } from '@/models';

export default async function GET(
  request: NextApiRequest,
  response: NextApiResponse,
){
    if (!request.body.customData.astro_user_id) {
      return response.status(400).json({
        errorMessage: 'No astro_user_id provided',
      }); 
    }
    if (!request.body.customData.kpi_name) {
      return response.status(400).json({
        errorMessage: 'No kpi_name provided',
      });
    }

    /*
    // 1. Get the user tied to the passed in ID
    const user = await userService.getUserById(request.body.customData.astro_user_id)
    const userId = user && !isNaN(Number(user.id)) ? Number(user!.id) : undefined
    if (!userId) {
      return response.status(400).json({
        errorMessage: 'Invalid user.id detected',
      }); 
    }

    // 2. Get the KPI to updated 
    const kpiDefinitions = await kpiService.getKPIsForUser(userId)
    const kpi = kpiDefinitions.find(kpi => kpi.name === request.body.customData.kpi_name)
    if (!kpi) {
      return response.status(400).json({
        errorMessage: 'No kpi found for the provided kpi_name',
      });
    }
    const todaysEntries = await kpiService.getTodaysKPIs(userId, TIMEZONE.MST)
    const kpiToIncrement = todaysEntries.find(entry => entry.definitionId === kpi.definitionId)
    if (!kpiToIncrement) {
      return response.status(400).json({
        errorMessage: 'No kpi found for the provided kpi_name',
      });
    }

    // 3. Increment the KPI
    const incrementedKPI = await kpiService.incrementKPI({...kpiToIncrement})
    */

    // 4. Increment the KPI in Notion
    const useNotion = true
    if (useNotion) {
      try {
        // TODO: Create a lock on database 
        await incrementNotionKpi(request.body.customData.kpi_name)
      } catch (error) {
        return response.status(400).json({
          errorMessage: error,
        });
      }
    }
    

    return response.status(200).json({
        message: 'ran successfuly',
    });
}


const incrementNotionKpi = async (kpiName: string) => {
  const kpis = await notionService.getTodaysKPIs([kpiName], {})
  if (kpis.length !== 1 || !kpis[0]) {
    throw new Error('No kpi found for the provided kpi_name')
  }
  const kpiToUpdate = kpis[0]
  await notionService.updateTodaysKPI(kpiName, kpiToUpdate.value + 1)
  console.log('Updated notion KPI', kpiName, 'to', kpiToUpdate.value + 1)
}