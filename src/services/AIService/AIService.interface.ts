import { SMSMessage } from "@/models/Message";

export default interface IAIService {
  /**
   * Generates an agent outreach response from a group of text messages. This response is
   * based on the agent outreach goal of finding distressed properties.
   * @param messages A set of messages to base the agent outreach response on
   * @returns a text message response 
   */
  generateAgentOutreachResponse: (messages: SMSMessage[]) => Promise<string>;
}