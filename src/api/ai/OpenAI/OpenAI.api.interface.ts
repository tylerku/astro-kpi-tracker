import { Message } from '@/models/Message';

// make an enum of models for the OpenAI API
export enum OpenAIModels {
  GPT_3_5_TURBO = 'gpt-3.5-turbo',
  GPT_4 = 'gpt-4',
  GPT_4_O_MINI = 'gpt-4o-mini',
  GPT_4_O_AGENT_FINE_TUNED = 'ft:gpt-4o-mini-2024-07-18:personal:wh1:BJtHDdRC',
}

export enum ChatCompletionToolNames {
  SAVE_ADDRESS = 'save_address',
  SAVE_SELLER_MOTIVATION = 'save_seller_motivation',
  SAVE_PROPERTY_CONDITION = 'save_property_condition'
}

export interface ChatCompletionResult {
  message?: string;
  tool?: {
    name: ChatCompletionToolNames;
    arg: string;
  }
  status: 'tool_called' | 'response_generated';
}

export interface ChatCompletionTool {
  schema: any;
  name: ChatCompletionToolNames;
  function: (...args: any[]) => Promise<any>;
}

export default interface IOpenAIAPI {
  ask(prompt: string): Promise<string>;
  createChatCompletion(systemPrompt: string, messages: Message[], model: OpenAIModels, tools: Record<string, ChatCompletionTool>): Promise<ChatCompletionResult>;
}