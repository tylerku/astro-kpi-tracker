import { GHLSMSMessage } from '@/models/Message';
import { GHLConversation } from '@/models/Conversation';
import { GHLContact } from '@/models/Contact';
import { OAuth2Credentials } from '@/models/auth';

export interface SearchContactsResult {
  contacts: GHLContact[];
  total: number;
}
export interface SearchConversationsResult {
  conversations: GHLConversation[];
  total: number;
}

export default interface ICRMAPI {
  getMessages(conversationId: string, limit: number, accessToken: string): Promise<GHLSMSMessage[]>;
  searchContacts(searchTerm: string[], pageLimit: number, accessToken: string, searchAfter: any[]): Promise<SearchContactsResult>;
  searchConversations(accountId: string, accessToken: string): Promise<SearchConversationsResult>;
  searchConversations(contactId: string, accessToken: string): Promise<SearchConversationsResult>;
  updateContactCustomField(contactId: string, fieldId: string, newValue: string, accessToken: string): Promise<void>;
}