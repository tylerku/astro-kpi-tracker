import { GoHighLevelAPI } from "@/api/crm"

import ICRMService from "@/services/CRMService/CRMService.interface";
import { Message } from "@/models/Message";

export default class GoHighLevelService implements ICRMService {
  api = new GoHighLevelAPI();
  
  async getMessages(conversationId: string): Promise<Message[]> {
    // Implementation for fetching messages from GoHighLevel
    // TODO: Add authentication handling
    return this.api.getMessages(conversationId, )
    throw new Error("Method not implemented.");
  }

  async getChatGPTTrainingData(): Promise<any[]> {
    // Implementation for fetching training data from GoHighLevel
    throw new Error("Method not implemented.");
  }
}