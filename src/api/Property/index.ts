import PropertyAPI from './Property.api'
import IPropertyAPI from './Property.interface'
export type { IPropertyAPI }

const propertyAPI = new PropertyAPI()
export { propertyAPI }