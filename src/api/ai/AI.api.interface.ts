import { Message } from '@/models/Message';

export default interface IAIAPI {
  ask(prompt: string): Promise<string>;
}