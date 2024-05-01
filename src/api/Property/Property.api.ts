import { Property } from '@/models';
import IZillowAPI from './Zillow.interface';
import IPropertyAPI from './Property.interface';

export default class PropertyAPI implements IZillowAPI {
  zillowAPI: IZillowAPI;

  constructor(zillowAPI: IZillowAPI) {
    this.zillowAPI = zillowAPI;
  }

  async getProperties(location: string): Promise<Property[]> {
    return this.zillowAPI.getProperties(location);
  }
}