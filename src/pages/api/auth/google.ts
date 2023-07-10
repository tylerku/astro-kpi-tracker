import { NextApiRequest, NextApiResponse } from 'next';
import googleAPIService from '../../../services'

export default (req: NextApiRequest, res: NextApiResponse): void => {
  const authUrl: string = googleAPIService.getGoogleAuthUrl()
  res.redirect(authUrl);
};