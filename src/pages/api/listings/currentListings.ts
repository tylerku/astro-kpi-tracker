import { NextApiRequest, NextApiResponse } from 'next';
import { Property } from '@/models';
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
					console.log('running request', index, 'of', properties.length, 'for property:', property.address)	
					await new Promise(resolve => setTimeout(resolve, index * 510)) // wait 510ms to avoid rate limiting
					const propertyWithDetails = await propertyService.getPropertyDetails(property)
					resolve(propertyWithDetails)
				} catch (error) {
					reject(error)
				}
			})
		})
		const propertiesWithAgentInfo = await Promise.all(promises)
    
    // TODO: filter out properties that don't have a listing agent phone number
    // TODO: filter out properties that are duplicates
    // TODO: require some sort of authentication to access this endpoint
    const filteredProperties = propertiesWithAgentInfo.filter((property: any) => property.listingAgentPhone)

    // remove objects that have the same phone number any property before it
    const uniqueProperties = filteredProperties.filter((property: any, index: number) => {
      return index === filteredProperties.findIndex((prop: any) => prop.listingAgentPhone === property.listingAgentPhone)
    })


		return response.status(200).json({ properties: uniqueProperties, count: uniqueProperties.length } )
	} catch (error) {
		console.error('Error getting properties: ', error)
		return response.status(500).json({
			errorMessage: 'Error getting properties'
		})
	}
}


