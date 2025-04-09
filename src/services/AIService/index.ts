import AIService from './AIService';
import OpenAIAPI from '@/api/ai/OpenAI';

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) { 
  throw new Error('OpenAI API Key is required to use OpenAI API');
}
const api = new OpenAIAPI(apiKey);
const aiService = new AIService(api);

export default aiService;