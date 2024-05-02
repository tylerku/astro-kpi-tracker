import { NextApiRequest, NextApiResponse } from 'next';
import propertyService from '@/services/PropertyService';

export default async function GET(
	request: NextApiRequest,
	response: NextApiResponse,
){
	try {
		const properties = await propertyService.getProperties('Knoxville, TN')
		const promises = properties.map((property, index ) => {
			return new Promise(async (resolve, reject) => {
				try {
					await new Promise(resolve => setTimeout(resolve, index * 1000))
					console.log('running request ', index, ' for property: ', property.address)	
					const propertyWithDetails = await propertyService.getPropertyDetails(property)
					resolve(propertyWithDetails)
				} catch (error) {
					reject(error)
				}
			})
		})
		const propertiesWithAgentInfo = await Promise.all(promises)
		return response.status(200).json({ properties: propertiesWithAgentInfo } )
	} catch (error) {
		console.error('Error getting properties: ', error)
		return response.status(500).json({
			errorMessage: 'Error getting properties'
		})
	}
}


