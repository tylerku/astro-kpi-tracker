import { NextApiRequest, NextApiResponse } from 'next';
import notionAPIService from '../../../services/NotionAPIService'; 
import kpiService from '../../../services/KPIService';
import { TIMEZONE } from '@/models';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const getMessageBody = async () => {
    const thisWeeksKPIs = await kpiService.getThisWeeksKPIs(1, TIMEZONE.MST)
    console.log('thisWeeksKPIs: ', thisWeeksKPIs)
    return `${JSON.stringify(thisWeeksKPIs)}`
  }

  const returnBody = await getMessageBody()
  response.status(200).json({
    body: returnBody,
  });
}