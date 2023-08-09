import { NextApiRequest, NextApiResponse } from 'next';
 
export default function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  console.log('The cron job ran!!!')
  response.status(200).json({
    body: "this is a sample body response",
    query: request.query,
    cookies: request.cookies,
  });
}