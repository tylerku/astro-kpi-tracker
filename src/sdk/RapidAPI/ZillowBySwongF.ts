import IZillowSDK from "@/api/Zillow.interface";
import axios from "axios";
import { Property } from "@/models";

export default class ZillowBySwongF implements IZillowSDK {
  private host: string
  private apiKey: string

  constructor(host: string, apiKey: string) {
    this.host = host
    this.apiKey = apiKey
  }

  async getProperties(location: string): Promise<Property[]> {
    const options = {
			method: 'GET',
			url: `https://${process.env.RAPID_API_SWONGF_ZILLOW_HOST}/search`,
			params: {
				location: location
			},
			headers: {
				'X-RapidAPI-Key': process.env.RAPID_API_KEY,
				'X-RapidAPI-Host': process.env.RAPID_API_SWONGF_ZILLOW_HOST
			}
		};

    try {
      const response = await axios.request(options)
      const properties = response.data.props.map((prop: any, index: number) => {
        const p = prop.address.split(',') 
        const pieces = p.map((piece: string) => piece.trim()) 
        const streetAddress = pieces[0] ? pieces[0] : ''
        const city = pieces[1] ? pieces[1] : ''
        const state = pieces[2] && pieces[2].split(' ')[0] ? pieces[2].split(' ')[0] : ''
        const zip = pieces[2] && pieces[2].split(' ')[1] ? pieces[2].split(' ')[1] : ''
        return {
          address: prop.address,
          streetAddress,
          city,
          state,
          zip 
        } as Property
      })
      return properties
    } catch(error) {
      console.error('Zillow SDK Error (GetProperties): ', error)
      throw error
    }
    return []
  }

  async getPropertyDetails(property: Property): Promise<Property> {

    if (!property.address) throw new Error('Property address is required')
    const options = {
			method: 'GET',
			url: `https://${process.env.RAPID_API_SWONGF_ZILLOW_HOST}/property`,
			params: {
			  address: property.address 
			},
			headers: {
				'X-RapidAPI-Key': process.env.RAPID_API_KEY,
				'X-RapidAPI-Host': process.env.RAPID_API_SWONGF_ZILLOW_HOST
			}
		};

    try {
      const response = await axios.request(options)
      const propDetails = response.data
      const listingAgent = propDetails.listed_by?.display_name ?? null
      const listingAgentPhoneObj = propDetails.listed_by?.phone ?? null
      const listingAgentPhoneNumber = listingAgentPhoneObj ? `${listingAgentPhoneObj.areacode}-${listingAgentPhoneObj.prefix}-${listingAgentPhoneObj.number}` : null
      return {
        ...property,
        listingAgent: listingAgent,
        listingAgentPhone: listingAgentPhoneNumber,
      }

    } catch (error) {
      console.error('Zillow SDK Error (GetPropertyDetails): ', error)
      throw error
    }

  }
}