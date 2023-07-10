import { NextApiRequest, NextApiResponse } from "next";
import { google } from 'googleapis';
import cookies from "cookies";
import googleAPIService from "../../../services";
import { AuthPlus, GoogleApis } from "googleapis/build/src/googleapis";
import { access } from "fs";


export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    const access_token = cookies(req, res).get('accessToken') ?? ''
    const refresh_token = cookies(req, res).get('refreshToken') ?? ''
    const cell = req.query['cell'];
    googleAPIService.setSpreadsheetId('1g-rZyxiu0tEL7rOzyx3FnY0C-0WrGG_NsZIGwVA0eaY');
    const data = await googleAPIService.incrementCell(cell as string , {
      access_token,
      refresh_token,
    })
    return res.status(200).json(data);
  } catch (error) {
    console.log('Error incrementing cell: ', error);
    return res.status(500).json({ error: 'Error incrementing cell' });
  }
};
