import IZillowSDK from "@/api/Zillow.interface";
import axios from "axios";
import { Property } from "@/models";
import { max, min } from "moment";

export default class ZillowBySwongF implements IZillowSDK {
  private host: string
  private apiKey: string

  constructor(host: string, apiKey: string) {
    this.host = host
    this.apiKey = apiKey
  }

  async getProperties(location: string): Promise<Property[]> {
  
    const getPropertyFromZillowObj = (propData: any): Property => {
      const p = propData.address.split(',') 
      const pieces = p.map((piece: string) => piece.trim()) 
      const streetAddress = pieces[0] ? pieces[0] : ''
      const city = pieces[1] ? pieces[1] : ''
      const state = pieces[2] && pieces[2].split(' ')[0] ? pieces[2].split(' ')[0] : ''
      const zip = pieces[2] && pieces[2].split(' ')[1] ? pieces[2].split(' ')[1] : ''
      return {
        address: propData.address,
        streetAddress,
        city,
        state,
        zip 
      } as Property
    } 
   
    
    const options: any = {
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

    let response = await axios.request(options)
    const allProperties: Property[] = []

    console.log('Total Results (', location, '): ', response.data.totalResultCount)
    
    const TOTAL_PROPERTIES = response.data.totalResultCount
    let attempts = 0
    let MAX_ATTEMPTS = 10
    let cursor = 0
    let page = 1
    let minPrice = 1
    let maxPrice = 100000
    options.params.minPrice = `${minPrice}`
    options.params.maxPrice = `${maxPrice}`
    console.log('pulling properties between $', minPrice, ' and $', maxPrice)

    try {
      while (allProperties.length < TOTAL_PROPERTIES && attempts < MAX_ATTEMPTS) {
        while(cursor < response.data.totalResultCount) {
          response = await axios.request(options)
          await new Promise(resolve => setTimeout(resolve, 600)) // wait 500ms to avoid rate limiting
          console.log(cursor, ' / ', response.data.totalResultCount)
          const properties = await response.data.props.map((prop: any, index: number) => {
            return getPropertyFromZillowObj(prop)
          })
          allProperties.push(...properties)
          cursor += response.data.resultsPerPage
          if (cursor > response.data.totalResultCount) cursor = response.data.totalResultCount
          console.log('pulled page ', page, 'of ', response.data.totalPages, '(', minPrice, '-', maxPrice, ') -- fetched properties: ', cursor, ' / ', response.data.totalResultCount)
          page++
          options.params.page = `${page}`
        }
        cursor = 0
        page = 1
        minPrice = maxPrice + 1
        maxPrice = maxPrice * 1.5
        options.params.page = `${page}`
        options.params.minPrice = `${minPrice}`
        options.params.maxPrice = `${maxPrice}`
        console.log('pulling properties between $', minPrice, ' and $', maxPrice)
        response = await axios.request(options)
        console.log('total pages: ', response.data.totalPages)
        console.log('total results: ', response.data.totalResultCount)
        console.log('results per page: ', response.data.resultsPerPage)
        attempts++
      }
      console.log('pulled ', allProperties.length, ' properties')
      return allProperties
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