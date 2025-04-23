import OpenAIAPI from './OpenAI.api';
import IOpenAIAPI, { ChatCompletionResult, ChatCompletionToolNames, ChatCompletionTool } from './OpenAI.api.interface';

export { type IOpenAIAPI, type ChatCompletionResult, ChatCompletionToolNames, type ChatCompletionTool };
export default OpenAIAPI;