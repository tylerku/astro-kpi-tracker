import { NextApiRequest, NextApiResponse } from 'next';
import dailyKPIService from '../../../services/KPIService';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  try {
    const userIdParam = request.query['userId'];
    const userId = Number(userIdParam)
    const result = await dailyKPIService.getTodaysKPIs(userId)
    return response.status(200).json({
      data: result
    });
  } catch (error) {
    console.error('Error in getTodaysKPIs', error)
  }
  response.status(500).json({
    body: 'Error in getTodaysKPIs'
  })
}