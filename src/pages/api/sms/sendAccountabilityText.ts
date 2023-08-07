import { NextApiRequest, NextApiResponse } from "next";
import cookies from "cookies";
import googleAPIService from "../../../services";
import { AuthPlus, GoogleApis } from "googleapis/build/src/googleapis";
import { access } from "fs";


export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const getMessageBody = () => {
    const messageBody = {
      
    }
    return `This is an example message body:
    
    1. Did you do your morning routine?
    2. Did you do your evening routine?
    `
  }
  console.log('GOT HERE!!!!!')
  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID1;
    const authToken = process.env.TWILIO_AUTH_TOKEN1;
    console.log('accountSid:', accountSid)
    console.log('authToken:', authToken)
    const accountabilityPartner = process.env.ACCOUNTABILITY_PARTNER_NUMBER;
    const client = require('twilio')(accountSid, authToken, {messageServiceSid: process.env.TWILIO_MESSAGE_SERVICE_ID});
    const messageBody = getMessageBody();
    const message = await client.messages.create({
      from: '+13853277570',
      to: '+17244064427',
      body: messageBody,
    })
    console.log(message);
    return res.status(200).json({
      body: req.body,
      query: req.query,
      cookies: req.cookies,
    });
  } catch (error) {
    console.log('Error: ', error);
    return res.status(500).json({ error: `Error: ${error}`});
  }
}