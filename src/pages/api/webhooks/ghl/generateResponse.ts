import { NextApiRequest, NextApiResponse } from 'next';

export default async function GET(
	request: NextApiRequest,
	response: NextApiResponse,
){
  try {
    const body = request.body
    const { conversationId, locationId } = body
    return response.status(200).json({body})
  } catch (error) {
    console.error('Error parsing body: ', error)
    return response.status(400).json({
      errorMessage: 'Error generating GHL response.',
      error: JSON.stringify(error)
    })
  }
}

