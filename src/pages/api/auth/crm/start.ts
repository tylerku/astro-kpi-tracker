import { NextApiRequest, NextApiResponse } from 'next';
import ghlAPIService from '@/services/CRMService/CRMService'
import axios from 'axios';
import CRMService from '@/services/CRMService/CRMService';

export default (req: NextApiRequest, res: NextApiResponse): void => {
  const authUrl: string = CRMService.getInstance().getOAuth2URL();
  res.redirect(authUrl);
};