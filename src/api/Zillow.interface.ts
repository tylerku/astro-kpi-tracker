import { Property } from "@/models";

export default interface IZillowAPI {
  getProperties(location: string): Promise<Property[]>
  getPropertyDetails(property: Property): Promise<Property>
}