import { Message, MessageDirection } from '@/models/Message';
import IAIAPI, { OpenAIModels, ChatCompletionResult, ChatCompletionTool } from './OpenAI.api.interface'
import OpenAI from "openai";


enum ContextRoles {
  DEVELOPER = "developer",
  SYSTEM = "system",
}

enum Roles {
  USER = "user",
  ASSISTANT = "assistant"
}


type MessageParam = OpenAI.Chat.Completions.ChatCompletionMessageParam;

export default class OpenAIAPI implements IAIAPI {

  private client: OpenAI;

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error('OpenAI API Key is required to use OpenAI API');
    }
    this.client = new OpenAI({ apiKey });
  }

  private getSystemRole(model: OpenAIModels): ContextRoles {
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

  createChatCompletion = async (systemPrompt: string, messages: Message[], model: OpenAIModels, tools: Record<string, ChatCompletionTool>): Promise<ChatCompletionResult> => {
    const systemRole = this.getSystemRole(model)

    const toolsSchema = Object.values(tools).map((tool) => tool.schema);

    const contextMessages = this.formatConversation(messages);
    const context: MessageParam[] = [{ role: systemRole, content: [{type: 'text', text: systemPrompt}] }, ...contextMessages];
    const fetchCompletion = async () => {
      console.log('Fetching completion...');
      return this.client.chat.completions.create({
        model,
        messages: context,
        store: true,
        tools: toolsSchema
      });
    }
    try {
      let completion = await fetchCompletion();
      switch (completion.choices[0].finish_reason) {
        case 'tool_calls':
          const toolCalls = completion.choices[0].message.tool_calls;
          if (toolCalls && toolCalls.length === 1) {
            const toolCall = toolCalls[0];
            const { function: functionCall } = toolCall;
            const func = tools[functionCall.name].function;
            const args = JSON.parse(functionCall.arguments);
            
            if (func) {
              console.log(`Calling function: ${functionCall.name} with args:`, args);
              await func(...Object.values(args)); 
            }
            if (Object.values(args).length !== 1) { throw new Error('Function call arguments must be a single value.'); }
            const result: ChatCompletionResult = {
              status: 'tool_called',
              tool: {
                name: tools[functionCall.name].name,
                arg: Object.values(args)[0] as string
              }
            }
            return result;
          } else { throw new Error('Multiple tool calls are not supported.'); }
        case 'stop':
          const message = completion.choices[0].message.content;
          const result: ChatCompletionResult = {
            message: message ?? undefined,
            status: 'response_generated'
          }
          return result;
        default:
          throw new Error('Unexpected OpenAI Chat Completion finish reason: ' + completion.choices[0].finish_reason);
      }
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

  private formatConversation = (messages: Message[]): MessageParam[] => {
    const contextMessages = messages.map((message) => ({
      role: message.direction === MessageDirection.INBOUND ? Roles.USER : Roles.ASSISTANT,
      content: [{
        type: 'text',
        text: message.body,
      }]
    } as MessageParam));
    return contextMessages;
  }
}