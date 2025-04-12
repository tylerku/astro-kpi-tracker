import { Message } from '@/models/Message';

// make an enum of models for the OpenAI API
export enum OpenAIModels {
  GPT_3_5_TURBO = 'gpt-3.5-turbo',
  GPT_4 = 'gpt-4',
  GPT_4_O_MINI = 'gpt-4o-mini',
  GPT_4_O_AGENT_FINE_TUNED = 'ft:gpt-4o-mini-2024-07-18:personal:wh1:BJtHDdRC',
}

export default interface IOpenAIAPI {
  ask(prompt: string): Promise<string>;
  createChatCompletion(systemPrompt: string, messages: Message[], model: OpenAIModels): Promise<string>;
}