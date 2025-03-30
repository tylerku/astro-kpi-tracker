import { Message } from '@/models/Message';

export default interface ICRMService {
  /**
   * Fetches messages for a given conversation.
   * @param conversationId The ID of the conversation to fetch messages for.
   * @returns A promise that resolves to an array of messages.
   */
  getMessages(conversationId: string): Promise<Message[]>;

  /**
   * Searches for contacts based on a search term.
   * @param searchTerm The term to search for in contacts.
   * @returns A promise that resolves to an array of conversations matching the search term.
   */
  getChatGPTTrainingData(): Promise<any[]>;
}