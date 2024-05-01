import { Property } from '../../models'

export default interface PropertyAPI {
  getProperties(location: string): Promise<Property[]>
}