import { IAIAPI, OpenAIAPI } from '@/api/ai';
import GoHighLevelAPI from '@/api/crm/GoHighLevel';
import { IAIService } from './AIService.interface';
import { SMSMessage } from '@/models/Message';


export default class AIService implements IAIService {
  private static instance: AIService;
  private api: IAIAPI;

  constructor(api: IAIAPI) {
    this.api = api;
  }

  static getInstance(): AIService {
    if (!this.instance) {
      if (!process.env.OPENAI_API_KEY) {
        throw new Error('OPENAI_API_KEY is not set');
      }
      this.instance = new AIService(new OpenAIAPI(process.env.OPENAI_API_KEY));
    }
    return this.instance;
  }

  generateAgentOutreachResponse = async (messages: SMSMessage[]): Promise<string> => {
    // TODO: create a whole prompt here to send to the ai
    messages.reverse();
    const messageHistory = messages.map((message) => `(${message.direction}) ${message.body}`).join('\n');
    const prompt = `
      Make a response to the the follow sms conversation. The goal of this entire conversation is to have the 
      sender send me off market distressed real estate properties. If the latest inbound message was something 
      like 'No' or 'Not right now' then we would want to respond with something positive along the lines of 
      'Ok well let me know if any distressed off market properties pop up!'. If the latest inbound message was 
      something about a property or something they have coming up, then ask them questions about it. We are looking 
      for 5 things. 1. Condition of the property 2. Asking price that the seller has for the property. 3 The address 
      of the property (I need this so Ican run comps and see potential value). 4. Timeline to close on the property.
      5. We want to know why the seller is selling the property off market. Why don't they jsut sell it on the market?
      If the agent sends a link to an on market property, tell them we aren't looking for on market properties right now.
      Make the response as if you were me, and you are trying to get the information we need to make an offer on the property.
      If they haven't provided all the information we need, don't ask for it all at once. Ask for one piece of information at
      a time. 
      Here are some additional rules:
      1. If they are ending the conversation, let the conversation end with a simple but polite response.

      The conversation is as follows:\n\n
      ${messageHistory}
    `;
    console.log(prompt);
    return this.api.ask(prompt);
  }
}