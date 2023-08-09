import { NextApiRequest, NextApiResponse } from 'next';
 
export default function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  response.status(200).json({
    body: "this is a sample body response",
    query: request.query,
    cookies: request.cookies,
  });
}