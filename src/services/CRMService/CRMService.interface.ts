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

  getUnreadMessages(accessToken: string): Promise<Message[]>;
  /**
   * Saves an AI response to the contact. Usefull when AI is used to generate a response to a conversation.
   * @param contactId The ID of the contact to save the response for.
   * @param response The AI response to save.
   * @param accessToken The access token for authentication.
   */
  saveContactAIResponse(contactId: string, response: string, accessToken: string): Promise<void>;
}