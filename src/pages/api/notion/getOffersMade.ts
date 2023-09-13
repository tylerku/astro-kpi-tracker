import { NextApiRequest, NextApiResponse } from "next";
import { notionAPIService } from "../../../services";

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    // make request to notion api here 
    const response = await notionAPIService.getNumberKPI('Offers Made');    
    console.log('offers made: ', response )
    return res.status(200).json({data: response});

  } catch (error) {
    return res.status(500).json({ error: 'Error gettings todays KPIs' });
  }
};
