import { Message } from '@/models/Message';
import { OAuth2Credentials } from '@/models/auth';

export default interface ICRMAPI {
  getMessages(conversationId: string, auth: OAuth2Credentials): Promise<Message[]>;
} 