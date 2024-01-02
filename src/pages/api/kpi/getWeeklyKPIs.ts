import { NextApiRequest, NextApiResponse } from 'next';
import kpiService from '../../../services/KPIService';
import { TIMEZONE } from '@/models';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  try {
    const userIdParam = request.query['userId'];
    const userId = Number(userIdParam)
    const result = await kpiService.getThisWeeksKPIs(userId, TIMEZONE.MST)
    return response.status(200).json({
      data: result
    });
  } catch (error) {
    console.error('Error in getWeeklyKPIs', error)
  }
  response.status(500).json({
    body: 'Error in getTodaysKPIs'
  })
}