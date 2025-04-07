import { NextApiRequest, NextApiResponse } from 'next';

export default async function GET(
	request: NextApiRequest,
	response: NextApiResponse,
){
	try {
		// get location from request
    try {
		  const body = request.body
      console.log('body: ', body)
		  return response.status(200).json({body})
    } catch (error) {
      console.error('Error parsing body: ', error)
      return response.status(400).json({
        errorMessage: 'Error parsing body'
      })
    }
	} catch (error) {
		console.error('Error getting properties: ', error)
		return response.status(500).json({
			errorMessage: 'Error getting properties'
		})
	}
}

