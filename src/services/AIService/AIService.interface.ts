import { SMSMessage } from "@/models/Message";

export interface IAIService {
  generateAgentOutreachResponse: (message: SMSMessage[]) => Promise<string>;
}