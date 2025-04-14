import IAIService from '../AIService.interface';
import { Message } from '@/models/Message';
import OpenAIAPI from '@/api/ai/OpenAI';
import { AGENT_OUTREACH_PROMPT } from './prompts';
import { OpenAIModels, IOpenAIAPI } from '@/api/ai';


export default class OpenAIService implements IAIService {

  private api: IOpenAIAPI; 

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error('OpenAI API Key is required to use OpenAI API');
    }
    this.api = new OpenAIAPI(apiKey);
  }

  generateAgentOutreachResponse = async (messages: Message[]): Promise<string> => {
    const prompt = `${AGENT_OUTREACH_PROMPT}`; // TODO: Add specifics like the agents name and anything else known about them
    const response = await this.api.createChatCompletion(prompt, messages, OpenAIModels.GPT_4_O_MINI);
    return response; 
  }
}