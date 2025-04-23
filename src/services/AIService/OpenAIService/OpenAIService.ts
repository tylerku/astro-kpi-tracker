import IAIService from '../AIService.interface';
import { getAgentOutreachPrompt, AgentOutreachLeadDetails } from '../prompts'
import { Message } from '@/models/Message';
import OpenAIAPI, { ChatCompletionResult, ChatCompletionToolNames, ChatCompletionTool } from '@/api/ai/OpenAI';
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
    // const prompt = `${AGENT_OUTREACH_PROMPT}`; // TODO: Add specifics like the agents name and anything else known about them
    const leadDetails: AgentOutreachLeadDetails = {}
    const toolNamesToLeadDetails: Record<ChatCompletionToolNames, keyof AgentOutreachLeadDetails> = {
      [ChatCompletionToolNames.SAVE_ADDRESS]: 'address',
      [ChatCompletionToolNames.SAVE_SELLER_MOTIVATION]: 'sellerMotivation',
      [ChatCompletionToolNames.SAVE_PROPERTY_CONDITION]: 'condition'
    }
  
    let prompt = getAgentOutreachPrompt(leadDetails, toolNamesToLeadDetails, true); // TODO: Add specifics like the agents name and anything else known about them 
    console.log('Prompt', prompt);
    const tools = this.getAgentOutreachChatCompletionTools(); 
    let result = await this.api.createChatCompletion(prompt, messages, OpenAIModels.GPT_4_O_MINI, tools);
    let usedToolsCount = 0;
    while (result.status === 'tool_called' && usedToolsCount < 1) {
      usedToolsCount++;
      if (!result.tool?.arg) { throw new Error('Tool arg is missing where it is required'); }
      leadDetails[toolNamesToLeadDetails[result.tool!.name]] = result.tool.arg;
      prompt = getAgentOutreachPrompt(leadDetails, toolNamesToLeadDetails, false);
      console.log('Prompt', prompt);
      result = await this.api.createChatCompletion(prompt, messages, OpenAIModels.GPT_4_O_MINI, tools);
      // console.log('result', JSON.parse(JSON.stringify(result)));
    }
    if (!result.message) { throw new Error('No message found when expecting a message in generateAgentOutreachResponse'); }
    console.log('message: ', result.message);
    return result.message; 
  }

  private getAgentOutreachChatCompletionTools = (): Record<string, ChatCompletionTool> => {

    const saveAddress = async (address: string): Promise<any> => {
      console.log(`Saving address: ${address}`);
    }

    const saveSellerMotivation = async (motivation: string): Promise<any> => {
      console.log(`Saving seller motivation: ${motivation}`);
    }

    const savePropertyCondition = async (condition: string): Promise<any> => {
      console.log(`Saving property condition: ${condition}`);
    }

    const tools: Record<string, ChatCompletionTool> = {
      [ChatCompletionToolNames.SAVE_ADDRESS]: {
        schema: {
          'type': 'function',
          'function': {
            'name': 'save_address',
            'description': 'Saves the address of the property',
            "parameters": {
              "type": "object",
              "properties": {
                  "address": {"type": "string"},
              },
              "required": ["address"],
              "additionalProperties": false
            },
            "strict": true
          }
        },
        name: ChatCompletionToolNames.SAVE_ADDRESS,
        function: saveAddress
      },
      [ChatCompletionToolNames.SAVE_SELLER_MOTIVATION]: {
        schema: {
          'type': 'function',
          'function': {
            'name': 'save_seller_motivation',
            'description': 'Saves the sellers motivation for selling the property',
            "parameters": {
              "type": "object",
              "properties": {
                  "motivation": {"type": "string"},
              },
              "required": ["motivation"],
              "additionalProperties": false
            },
            "strict": true
          }
        },
        name: ChatCompletionToolNames.SAVE_SELLER_MOTIVATION,
        function: saveSellerMotivation
      },
      [ChatCompletionToolNames.SAVE_PROPERTY_CONDITION]: {
        schema: {
          'type': 'function',
          'function': {
            'name': 'save_property_condition',
            'description': 'Saves the condition of the property',
            "parameters": {
              "type": "object",
              "properties": {
                  "condition": {"type": "string"},
              },
              "required": ["condition"],
              "additionalProperties": false
            },
            "strict": true
          }
        },
        name: ChatCompletionToolNames.SAVE_PROPERTY_CONDITION,
        function: savePropertyCondition
      }
    }
    return tools;
  }
}