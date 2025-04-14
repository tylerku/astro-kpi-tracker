import { NextApiRequest, NextApiResponse } from 'next';
import cookies from "cookies";
import { crmService, aiService } from '@/services';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    const body = req.body
    const { contactId } = body
    //{{ contact.ai_response }}
    const crmAccessToken = cookies(req, res).get('crmAccessToken') ?? ''
    if (!crmAccessToken) {
      res.status(401).json({ error: 'No crmAccessToken found. Cannot access crm api' });
      return;
    }
    console.log('token:', crmAccessToken)
    const messageLimit = 10;
    const messages = await crmService.getMessages(contactId, messageLimit, crmAccessToken)
    const response = await aiService.generateAgentOutreachResponse(messages)
    await crmService.saveContactAIResponse(contactId, response, crmAccessToken)
    return res.status(200).json({ response })
  } catch (error) {
    console.error('Error parsing body: ', error)
    return res.status(400).json({
      errorMessage: 'Error generating response.',
      error: JSON.stringify(error)
    })
  }
}

