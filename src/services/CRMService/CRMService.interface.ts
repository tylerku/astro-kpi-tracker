import { OAuth2Credentials } from '@/models/auth';
import { Message } from '@/models/Message';
import { Contact } from '@/models/Contact';

export default interface ICRMService {
  /**
   * Fetches messages for a given conversation.
   * @param conversationId The ID of the conversation to fetch messages for.
   * @returns A promise that resolves to an array of messages.
   */
  getMessages(conversationId: string, accessToken: string): Promise<Message[]>;

  /**
   * Searches for contacts based on a search term.
   * @returns A promise that resolves to an array of data used for training.
   */
  getChatGPTTrainingData(accessToken: string): Promise<Contact[]>;
}