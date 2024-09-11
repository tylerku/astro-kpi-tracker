import { NextApiRequest, NextApiResponse } from "next";
import kpiService from "@/services/KPIService";
import { DailyKPI, TIMEZONE } from "@/models";
import NotionAPIService from "@/services/NotionAPIService";


export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const getMessageBody = async () => {
    // KPIs from my database
    /*
    const todaysKPIs: any[] = await kpiService.getTodaysKPIs(3, TIMEZONE.MST)
    let kpiNamesAndGoalsString = ''
    todaysKPIs.forEach((kpi: DailyKPI) => {
      kpiNamesAndGoalsString += `${kpi.name}: ${kpi.current}/${kpi.goal}\n`
    })
    return `Ty's day today:\n\n${kpiNamesAndGoalsString}\nIf Ty didn't hit every goal tell him to pick it up`
    */
    // KPIs from notion
    const kpis = await NotionAPIService.getTodaysKPIs(['Agent Conversations', 'Seller Conversations', 'Verbal Offers', 'Contracts', 'Buyers Added'], {'Agent Conversations': 50, 'Seller Conversations': 20, 'Verbal Offers': 5, 'Contracts': 1, 'Buyers Added': 2})
    let kpiString = ''
    kpis.forEach((kpi) => {
      kpiString += `${kpi.key}: ${kpi.value}/${kpi.goal}\n`
    })
    return `Ty's KPIs today: \n\n${kpiString}`
  }
  try {
    const accountSid = process.env.ASTRO_TWILIO_ACCOUNT_SID;
    const authToken = process.env.ASTRO_TWILIO_AUTH_TOKEN;
    const messagingServiceSid = process.env.ASTRO_TWILIO_MESSAGE_SERVICE_ID;
    const to = process.env.ACCOUNTABILITY_PARTNER_NUMBER;

    console.log('Account SID: ', accountSid);
  console.log('Auth Token: ', authToken);
    const client = require('twilio')(accountSid, authToken);
    const body = await getMessageBody();
    const messageOptions = {
      messagingServiceSid: messagingServiceSid, 
      to: to,
      body: body
    }
    console.log('Message: ', JSON.parse(JSON.stringify(messageOptions)));
    const message = await client.messages.create(messageOptions)
    const error = message.errorMessage
    if (error) {
      console.log('Message send error: ', error);
      res.status(500).json({
        body: error,
        query: req.query,
        cookies: req.cookies,
      });
    } else {
      console.log('Message sent successfully!');
      res.status(200).json({
      body: message.body,
        query: req.query,
        cookies: req.cookies,
      });
    }
  } catch (error) {
    console.log('Error: ', error);
    return res.status(500).json({ error: `Error: ${error}`});
  }
}
