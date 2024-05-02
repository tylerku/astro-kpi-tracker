import { IUserAPI } from '@/api/User'
import { Property, User } from '@/models'
import { IPropertyAPI } from '@/api/Property'

export default class PropertyService {
  api: IPropertyAPI

  constructor(api: IPropertyAPI) {
    this.api = api
  }

  async getProperties(location: string): Promise<Property[]> {
    return await this.api.getProperties(location)
  }

  async getPropertyDetails(property: Property): Promise<Property> {
    return await this.api.getPropertyDetails(property)
  }
}