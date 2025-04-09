import { Message } from '@/models/Message';

export default interface ICRMService {
  /**
   * Searches for contacts based on a search term.
   * @returns A promise that resolves to an array of data used for training.
   */
  getChatGPTTrainingData(accessToken: string): Promise<any[]>;
  
  /**
   * Gets the last 'messageCount' messages between the authenticated user and the specified contact.
   * @param contactId The ID of the contract to retrieve messages for.
   */
  getMessages(contactId: string, limit: number, accessToken: string): Promise<Message[]>;
}