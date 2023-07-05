import { NextApiRequest, NextApiResponse } from 'next';
import { getGoogleAuthUrl } from '../../../googleConfig';

export default (req: NextApiRequest, res: NextApiResponse): void => {
  const authUrl: string = getGoogleAuthUrl();
  res.redirect(authUrl);
};