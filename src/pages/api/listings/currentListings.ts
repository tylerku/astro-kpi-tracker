import { NextApiRequest, NextApiResponse } from 'next';
import { Property } from '@/models';
import propertyService from '@/services/PropertyService';

export default async function GET(
	request: NextApiRequest,
	response: NextApiResponse,
){
	try {
		const properties = await propertyService.getProperties('Nashville, TN')
		const promises = properties.map((property, index ) => {
			return () => new Promise(async (resolve, reject) => {
				try {
					console.log('running request', index, 'of', properties.length, 'for property:', property.address)	
					const propertyWithDetails = await propertyService.getPropertyDetails(property)
					console.log('finished request', index, 'of', properties.length, 'for property:', property.address)
					resolve(propertyWithDetails)
				} catch (error) {
					reject(error)
				}
			})
		})

		// TODO: Fire off a request every half second
		const executePromisesSequentially = async (promises: (() => Promise<any>)[]) => {
			const results: any[] = [];
			let requestDuration = 0
			let TIME_BEWEEN_REQEUSTS = 550
			for (const promiseFunction of promises) {
				const result = promiseFunction().then((result) => results.push(result)).catch(error => console.error('Property Fetch Error: ', error)); 
				await new Promise(resolve => setTimeout(resolve, TIME_BEWEEN_REQEUSTS))
			}
			return results;
		};

		const propertiesWithAgentInfo = await executePromisesSequentially(promises);
    
    // TODO: make the getPropertyDetails call happen in a loop so the console.log runs synchronously with the requests (get rid of the Promise.all)
    // TODO: filter out properties that don't have a listing agent phone number
    // TODO: filter out properties that are duplicates
    // TODO: require some sort of authentication to access this endpoint
    // TODO: cache the agents in the database to not have to refetch them on subsequent requests
		// TODO: NOT POSSIBLE WITH CURRENT SETUP - filter out properties (if possible) before making API requests. I just made 4000 api requests and then kept only like 1500 properties
    const propertiesWithAgentPhoneNumber = propertiesWithAgentInfo.filter((property: any) => property.listingAgentPhone)

    // remove objects that have the same phone number any property before it
    const uniqueProperties = propertiesWithAgentPhoneNumber.filter((property: any, index: number) => {
      return index === propertiesWithAgentPhoneNumber.findIndex((prop: any) => prop.listingAgentPhone === property.listingAgentPhone)
    })


		console.log('Properties searched:', properties.length)
		console.log('Properties with agent info:', propertiesWithAgentInfo.length)
		console.log('Unique properties with agent info:', uniqueProperties.length)


		return response.status(200).json({ properties: uniqueProperties, count: uniqueProperties.length } )
	} catch (error) {
		console.error('Error getting properties: ', error)
		return response.status(500).json({
			errorMessage: 'Error getting properties'
		})
	}
}


