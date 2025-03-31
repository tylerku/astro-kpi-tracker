import { Message } from '@/models/Message';
import { GHLContact } from '@/models/Contact';
import { OAuth2Credentials } from '@/models/auth';

export interface SearchContactsResult {
  contacts: GHLContact[];
  total: number;
}

export default interface ICRMAPI {
  getMessages(conversationId: string, accessToken: string): Promise<Message[]>;
  searchContacts(searchTerm: string[], pageLimit: number, accessToken: string, searchAfter: any[]): Promise<SearchContactsResult>;
}