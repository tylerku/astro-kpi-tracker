import { NextApiRequest, NextApiResponse } from 'next';
import kpiService from '@/services/KPIService';
import userService from '@/services/UserService';

export default async function GET(
  request: NextApiRequest,
  response: NextApiResponse,
){
    console.log('test: ', request.body)



    // 1. Get the user tied to the passed in ID
    if (!request.body.astro_user_id) {
      return response.status(400).json({
        body: 'No astro_user_id provided',
      }); 
    }

    const user = await userService.getUserById(request.body.astro_user_id)
    console.log('user found: ', user)
    
    // 2. Get all KPI definitions for the user
    // check if user.id can be converted to a number safely
    const userId = user && !isNaN(Number(user.id)) ? Number(user!.id) : undefined
    if (!userId) {
      return response.status(400).json({
        body: 'Invalid user.id detected',
      }); 
    }

    const kpis = await kpiService.getKPIsForUser(userId)
    console.log('kpis found: ', kpis)

    // find the kpi that matches the request.body.kpi_name
    const kpi = kpis.find(kpi => kpi.name === request.body.kpi_name)
    console.log('kpi found: ', kpi)


    /*

    kpiService.incrementKPI({
      userId: 1,
      date: new Date(),
      type: 'SMS',
      count: 1,
    })
    
    */
    return response.status(200).json({
        body: 'test body',
    });
}
