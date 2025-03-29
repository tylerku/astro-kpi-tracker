import { NextApiRequest, NextApiResponse } from "next";
import cookies from "cookies";
import CRMService from "@/services/CRMService/CRMService";
import { AIService } from '@/services';
import { CRMAuth } from "@/api/crm"


export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    const crmAccessToken = cookies(req, res).get('crmAccessToken') ?? ''
    const { conversationId } = req.query;
    if (Array.isArray(conversationId) || !conversationId) { throw new Error('Invalid conversationId'); }
    if (!crmAccessToken) { throw new Error('No crmAccessToken found. Cannot access crm api'); }

    const messages = await CRMService.getInstance().getMessages(conversationId, {accessToken: crmAccessToken, refreshToken: '', expiresIn: 0});
    const response = await AIService.getInstance().generateAgentOutreachResponse(messages);
    console.log('response is: ', response);
    return res.status(200).json(response);
  } catch (error) {
    console.log('Error getting crm messages: ', error);
    return res.status(500).json({ Errormessage: 'Internal error getting crm messages' });
  }
};
