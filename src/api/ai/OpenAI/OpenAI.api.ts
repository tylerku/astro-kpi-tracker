import IAIAPI from '../AI.api.interface'
import OpenAI from "openai";

const client = new OpenAI();

export default class OpenAIAPI implements IAIAPI {

  private client?: OpenAI;


  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error('OpenAI API Key is required to use OpenAI API');
    }
    this.client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  ask = async (prompt: string): Promise<string> => {
    const completion = await client.chat.completions.create({
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