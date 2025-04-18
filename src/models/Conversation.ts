import { Message } from "./Message";

export default interface Conversation {
  id: string;
}

export interface GHLConversation extends Conversation {
  locationId: string;
  contactId: string;
  contactName: string; 
  message?: Message[];
}