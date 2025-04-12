import { Message, MessageDirection } from '@/models/Message';
import IAIAPI, { OpenAIModels } from './OpenAI.api.interface'
import OpenAI from "openai";


enum ContextRoles {
  DEVELOPER = "developer",
  SYSTEM = "system",
}

enum Roles {
  USER = "user",
  ASSISTANT = "assistant"
}

interface MessageParam {
  role: string;
  content: {
    type: string;
    text: string;
  }[];
}

export default class OpenAIAPI implements IAIAPI {

  private client: OpenAI;

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error('OpenAI API Key is required to use OpenAI API');
    }
    this.client = new OpenAI({ apiKey });
  }

  ;
  private getContextRole(model: OpenAIModels): ContextRoles {
    
    switch (model) {
      case OpenAIModels.GPT_3_5_TURBO:
        return ContextRoles.SYSTEM; 
      case OpenAIModels.GPT_4:
        return ContextRoles.SYSTEM; 
      case OpenAIModels.GPT_4:
        return ContextRoles.SYSTEM; 
      case OpenAIModels.GPT_4_O_MINI:
        return ContextRoles.SYSTEM; 
      case OpenAIModels.GPT_4_O_AGENT_FINE_TUNED:
        return ContextRoles.SYSTEM; 
      default:
        throw new Error(`Unsupported model: ${model}`);
    }
  }

  createChatCompletion = async (systemPrompt: string, messages: Message[], model: OpenAIModels): Promise<string> => {
    const systemRole = this.getContextRole(model)
    const contextMessages = messages.map((message) => ({
      role: message.direction === MessageDirection.INBOUND ? Roles.USER : Roles.ASSISTANT,
      content: [{
        type: 'text',
        text: message.body,
      }],
    }));
    const context = [{ role: systemRole, content: [{type: 'text', text: systemPrompt}] }, ...contextMessages];
    try {
      const completion = await this.client.chat.completions.create({
        messages: context,
        model,
        store: true, 
      });
      console.log(completion.choices[0].message.content);
      return completion.choices[0].message.content ?? 'unknown error';
    } catch (error) {
      console.error('Error with OpenAI API:', error);
      throw error;
    }
  }

  ask = async (prompt: string): Promise<string> => {
    const completion = await this.client.chat.completions.create({
      model: "gpt-4o",
      messages: [
          {
              role: "user",
              content: prompt,
          },
      ],
    });
    return completion.choices[0].message.content ?? 'unknown error';
  }
}