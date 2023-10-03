import { NextApiRequest, NextApiResponse } from "next";
import notionAPIService from "../../../services/NotionAPIService";

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    const { kpiName, kpiNumber } = req.body;
    const response = await notionAPIService.updateTodaysKPI(kpiName, kpiNumber);    
    return res.status(200).json({data: response});

  } catch (error) {
    return res.status(500).json({ error: 'Error gettings todays KPIs' });
  }
};
