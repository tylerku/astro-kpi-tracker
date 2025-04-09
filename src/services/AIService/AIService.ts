import OpenAIService from './OpenAIService'
import IAIService from './AIService.interface'

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) { 
  throw new Error('OpenAI API Key is required to use OpenAI API');
}
const aiService: IAIService = new OpenAIService(apiKey);
export default aiService;