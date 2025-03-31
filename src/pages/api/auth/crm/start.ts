import { NextApiRequest, NextApiResponse } from 'next';
import ghlAPIService from '@/services/CRMService/CRMService'
import axios from 'axios';
import crmService from '@/services/CRMService/CRMService';

export default (req: NextApiRequest, res: NextApiResponse): void => {
  const authUrl: string = crmService.getOAuth2URL();
  res.redirect(authUrl);
};