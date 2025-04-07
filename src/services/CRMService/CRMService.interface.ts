import { Message } from '@/models/Message';

export default interface ICRMService {
  /**
   * Searches for contacts based on a search term.
   * @returns A promise that resolves to an array of data used for training.
   */
  getChatGPTTrainingData(accessToken: string): Promise<any[]>;
}