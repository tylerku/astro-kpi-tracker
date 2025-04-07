import { NextApiRequest, NextApiResponse } from "next";
import cookies from "cookies";
import crmService from "@/services/CRMService/CRMService";


export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    const crmAccessToken = cookies(req, res).get('crmAccessToken') ?? ''
    if (!crmAccessToken) {
      res.status(401).json({ error: 'No crmAccessToken found. Cannot access crm api' });
      return;
    }
    console.log('fetching training data...')
    const response = await crmService.getChatGPTTrainingData(crmAccessToken);
    return res.status(200).json(response);
  } catch (error) {
    console.log('Error getting training data: ', error);
    return res.status(500).json({ ErrorMessage: 'Internal error getting crm messages', error });
  }
};
