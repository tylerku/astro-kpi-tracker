import { NextApiRequest, NextApiResponse } from 'next';
import cookies from "cookies";
import { crmService, aiService, credentialsService } from '@/services';
import { AuthProvider } from '@/models/auth';


export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    const body = req.body
    const { contactId, apiKey } = body
    // get accessToken from database ... 
    // if expired, refresh it 
    // and store it in the database

    // 1. Get credential for apiKey
    const userId = await credentialsService.getUserIdByAPIKey(apiKey);
    if (!userId) { throw new Error('No userId found for apiKey'); };

    // 2. Get up to date access Token
    const accessToken = await credentialsService.getOAuthAccessToken(userId, AuthProvider.GHL)
    if (!accessToken) {
      throw new Error('No accessToken found for userId');
    }
    const messageLimit = 10;
    const messages = await crmService.getMessages(contactId, messageLimit, accessToken)
    const response = await aiService.generateAgentOutreachResponse(messages)
    await crmService.saveContactAIResponse(contactId, response, accessToken)
    return res.status(200).json({ response })
  } catch (error) {
    console.error('Error generating response:', error)
    return res.status(400).json({
      errorMessage: 'Error generating response.',
      error: JSON.stringify(error)
    })
  }
}

