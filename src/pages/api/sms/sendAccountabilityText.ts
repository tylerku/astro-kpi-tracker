import { NextApiRequest, NextApiResponse } from "next";
import cookies from "cookies";
import notionAPIService from "../../../services/NotionAPIService";
import { AuthPlus, GoogleApis } from "googleapis/build/src/googleapis";
import { access } from "fs";


export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const getMessageBody = async () => {
    const kpiNames = ['Offers Made', 'Agent Conversations', 'Buyers Found']
    const goals = { 'Offers Made': 5, 'Agent Conversations': 50, 'Buyers Found': 2}
    const kpis = await notionAPIService.getTodaysKPIs(kpiNames, goals)
    return `Ty's day today:\n\nOffers Made: ${kpis.find((kpi) => kpi.key === 'Offers Made')}/${goals['Offers Made']}\nAgent Conversations: ${kpis.find((kpi) => kpi.key === 'Agent Conversations')}/${goals['Agent Conversations']}\nBuyers Found: ${kpis.find((kpi) => kpi.key === 'Buyers Found')}/${goals['Buyers Found']}\n\nTell Ty he's freaking sick`
  }
  try {
    const accountSid = process.env.ASTRO_TWILIO_ACCOUNT_SID;
    const authToken = process.env.ASTRO_TWILIO_AUTH_TOKEN;
    const messagingServiceSid = process.env.ASTRO_TWILIO_MESSAGE_SERVICE_ID;
    const to = process.env.ACCOUNTABILITY_PARTNER_NUMBER;

    const client = require('twilio')(accountSid, authToken);
    const body = await getMessageBody();
    // const message = {
    //   errorMessage: null,
    //   body: 'This is just a test'
    // }
    const message = await client.messages.create({
      messagingServiceSid: messagingServiceSid, 
      to: to,
      body: body
    })
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
