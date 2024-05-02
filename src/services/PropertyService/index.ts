import PropertyService from './PropertyService'
import propertyAPI from '@/api/Property'
import { IPropertyAPI } from '@/api/Property'

const propertyService = new PropertyService(propertyAPI)
export default propertyService