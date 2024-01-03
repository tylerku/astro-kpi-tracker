import { NextApiRequest, NextApiResponse } from 'next';
import { DailyKPI, TIMEZONE } from '@/models';
import kpiService from '@/services/KPIService';


export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  try {
    const kpi: DailyKPI = request.body.kpi
    const result = await kpiService.incrementKPI(kpi)
    return response.status(200).json({});
  } catch (error) {
    console.error('Error in api/kpi/increment', error)
  }
  response.status(500).json({
    body: 'Error in getTodaysKPIs'
  })
}