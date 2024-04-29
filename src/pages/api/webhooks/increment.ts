import { NextApiRequest, NextApiResponse } from 'next';
import kpiService from '@/services/KPIService';
import userService from '@/services/UserService';
import notionService from '@/services/NotionAPIService'
import { TIMEZONE } from '@/models';

export default async function GET(
  request: NextApiRequest,
  response: NextApiResponse,
){
    // 1. Get the user tied to the passed in ID
    console.log(
      'body: ', request.body
    )
    if (!request.body.customData.astro_user_id) {
      return response.status(400).json({
        errorMessage: 'No astro_user_id provided',
      }); 
    }

    const user = await userService.getUserById(request.body.customData.astro_user_id)
    
    // 2. Get all KPI definitions for the user
    const userId = user && !isNaN(Number(user.id)) ? Number(user!.id) : undefined
    if (!userId) {
      return response.status(400).json({
        errorMessage: 'Invalid user.id detected',
      }); 
    }

    const kpis = await kpiService.getKPIsForUser(userId)

    // find the kpi that matches the request.body.customData.kpi_name
    if (!request.body.customData.kpi_name) {
      return response.status(400).json({
        errorMessage: 'No kpi_name provided',
      });
    }
    const kpi = kpis.find(kpi => kpi.name === request.body.customData.kpi_name)
    if (!kpi) {
      return response.status(400).json({
        errorMessage: 'No kpi found for the provided kpi_name',
      });
    }

    const todaysEntries = await kpiService.getTodaysKPIs(userId, TIMEZONE.MST)
    const kpiToIncrement = todaysEntries.find(entry => entry.definitionId === kpi.definitionId)

    // 3. Increment the KPI
    if (!kpiToIncrement) {
      return response.status(400).json({
        errorMessage: 'No kpi found for the provided kpi_name',
      });
    }

    // 4. Increment the KPI in Notion
    const useNotion = true // turn this off later if I want
    if (useNotion) {
      try {
        await incrementNotionKpi(request.body.customData.kpi_name)
      } catch (error) {
        return response.status(400).json({
          errorMessage: error,
        });
      }
    }
    const incrementedKPI = await kpiService.incrementKPI({...kpiToIncrement})

    return response.status(200).json({
        message: 'test ran successfuly',
        kpi: { ...incrementedKPI }
    });
}


const incrementNotionKpi = async (kpiName: string) => {
  const kpis = await notionService.getTodaysKPIs([kpiName], {'Agent Conversations': 50})
  if (kpis.length !== 1 || !kpis[0]) {
    throw new Error('No kpi found for the provided kpi_name')
  }
  const kpiToUpdate = kpis[0]
  await notionService.updateTodaysKPI('Agent Conversations', kpiToUpdate.value + 1)
}