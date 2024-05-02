import { NextApiRequest, NextApiResponse } from 'next';
import propertyService from '@/services/PropertyService';
import axios from 'axios';

export default async function GET(
	request: NextApiRequest,
	response: NextApiResponse,
){
	try {
		// get location from request
		const location = request.query.location as string
		const properties = await propertyService.getProperties(location.trim())
		return response.status(200).json({ properties: properties, count: properties.length } )
	} catch (error) {
		console.error('Error getting properties: ', error)
		return response.status(500).json({
			errorMessage: 'Error getting properties'
		})
	}
}

