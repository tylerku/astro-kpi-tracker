import { NextApiRequest, NextApiResponse } from 'next';
import notionAPIService from '../../../services/NotionAPIService'; 

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const body = 'This is just a test!'
  response.status(200).json({
    body: body,
    query: request.query,
    cookies: request.cookies,
  });
}