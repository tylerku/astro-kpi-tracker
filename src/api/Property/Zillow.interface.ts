import { Property } from "@/models";

export default interface IZillowSDK {
  getProperties(location: string): Promise<Property[]>
}