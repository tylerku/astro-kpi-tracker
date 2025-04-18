import { NextApiRequest, NextApiResponse } from 'next';
import ghlAPIService from '@/services/CRMService/CRMService'
import axios from 'axios';
import crmService from '@/services/CRMService/CRMService';
import { auth } from 'googleapis/build/src/apis/abusiveexperiencereport';

export default (req: NextApiRequest, res: NextApiResponse): void => {
  // get user parameter from query
  const { user } = req.query;
  if (!user) {
    return res.status(400).json({ error: 'No user provided' });
  }
  const authUrl: string = `${crmService.getOAuth2URL()}&state=${user}`;
  res.redirect(authUrl);
};