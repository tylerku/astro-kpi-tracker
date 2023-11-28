import { NextApiRequest, NextApiResponse } from 'next';
import notionAPIService from '../../../services/NotionAPIService'; 
import kpiService from '../../../services/KPIService';
import { TIMEZONE } from '@/models';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const body = 'This is just a test!'
  const getMessageBody = async () => {
    const kpiNames = ['Verbal Offers', 'Written Offers', 'Agent Conversations', 'Buyers Called']
    const goals = { 'Verbal Offers': 12, 'Written Offers': 2, 'Agent Conversations': 50, 'Buyers Called': 5}
    const todaysKPIs: any[] = await kpiService.getTodaysKPIs(3, TIMEZONE.MST)
    // return `Ty's day today:\n\nOffers Made: ${kpis.find((kpi) => kpi.key === 'Verbal Offers')?.value ?? 0}/${goals['Verbal Offers']}\nWritten Offers: ${kpis.find((kpi) => kpi.key === 'Written Offers')?.value ?? 0}/${goals['Written Offers']}\nAgent Conversations: ${kpis.find((kpi) => kpi.key === 'Agent Conversations')?.value ?? 0}/${goals['Agent Conversations']}\nBuyers Called: ${kpis.find((kpi) => kpi.key === 'Buyers Called')?.value ?? 0}/${goals['Buyers Called']}\n\nTell Ty he's freaking sick`
    let kpiNamesAndGoalsString = ''
    todaysKPIs.forEach((kpi) => {
      kpiNamesAndGoalsString += `${kpi.name}: ${kpi.value}/${kpi.goal}\n`
    })
     
    return `Ty's day today:\n\n${kpiNamesAndGoalsString}\nIf Ty didn't hit every goal tell him to pick it up`
  }
  const returnBody = await getMessageBody()
  console.log(returnBody)
  response.status(200).json({
    body: returnBody,
    query: request.query,
    cookies: request.cookies,
  });
}