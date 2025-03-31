import { NextApiRequest, NextApiResponse } from "next";
import cookies from "cookies";
import { crmService } from "@/services";


export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    const crmAccessToken = cookies(req, res).get('crmAccessToken') ?? ''
    // TODO: update this ... this is Nicole Dabbs
    const conversationId = "H76BBC6Av4TO9a5PDNtQ";
    if (!crmAccessToken) {
      throw new Error('No crmAccessToken found. Cannot access crm api');
    }

    const resp = await crmService.getMessages(conversationId, crmAccessToken);
    return res.status(200).json(resp);
  } catch (error) {
    console.log('Error getting crm messages: ', error);
    return res.status(500).json({ Errormessage: 'Internal error getting crm messages' });
  }
};
