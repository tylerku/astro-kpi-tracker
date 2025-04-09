import { NextApiRequest, NextApiResponse } from 'next';
import cookies from "cookies";
import { crmService } from '@/services';

export default async function GET(
	req: NextApiRequest,
	res: NextApiResponse,
){
  try {
    const body = req.body
    const { contactId } = body
    //{{ contact.ai_response }}
    const crmAccessToken = cookies(req, res).get('crmAccessToken') ?? ''
    if (!crmAccessToken) {
      res.status(401).json({ error: 'No crmAccessToken found. Cannot access crm api' });
      return;
    }
    const messageLimit = 10;
    const messages = await crmService.getMessages(contactId, messageLimit, crmAccessToken)
    return res.status(200).json({messages})
  } catch (error) {
    console.error('Error parsing body: ', error)
    return res.status(400).json({
      errorMessage: 'Error generating GHL response.',
      error: JSON.stringify(error)
    })
  }
}

