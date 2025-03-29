import { NextApiRequest, NextApiResponse } from "next";
import cookies from "cookies";
import CRMService from "@/services/CRMService/CRMService";
import { CRMAuth } from "@/api/crm"


export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    const crmAccessToken = cookies(req, res).get('crmAccessToken') ?? ''
    // TODO: update this ... this is Nicole Dabbs
    const conversationId = "H76BBC6Av4TO9a5PDNtQ";
    if (!crmAccessToken) {
      throw new Error('No crmAccessToken found. Cannot access crm api');
    }

    console.log('Date: ', new Date(Date.now()))
    const auth: CRMAuth = {
      accessToken: crmAccessToken,
      refreshToken: '',
      expiresIn: 0,
    }
    const resp = await CRMService.getInstance().getMessages(conversationId, auth);
    console.log('Response in /api/crm/getMessages from CRMService.getMessages: ', resp);
    return res.status(200).json(resp);
  } catch (error) {
    console.log('Error getting crm messages: ', error);
    return res.status(500).json({ Errormessage: 'Internal error getting crm messages' });
  }
};
