import IZillowAPI from '../Zillow.interface'
import PropertyAPI from './Property.api'
import IPropertyAPI from './Property.interface'
import { zillowBySwongF } from '@/sdk/RapidAPI'
export type { IPropertyAPI }

const zillowAPI: IZillowAPI = zillowBySwongF
const propertyAPI = new PropertyAPI(zillowAPI)
export default propertyAPI