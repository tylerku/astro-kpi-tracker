import { NextApiRequest, NextApiResponse } from 'next';
import timeBlockService from '../../../services/TimeBlockService';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  try {
    const body = await timeBlockService.getAllTimeBlocks()
    return response.status(200).json({
      body: {rows: body.rows},
      query: request.query,
      cookies: request.cookies,
    });
  } catch (error) {
    console.error('Error in getAllTimeBlocks', error)
  }
  response.status(500).json({
    body: 'Error in getAllTimeBlocks',
    query: request.query,
    cookies: request.cookies
  })
}