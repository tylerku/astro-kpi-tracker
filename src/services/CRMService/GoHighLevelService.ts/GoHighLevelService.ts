import { IGoHighLevelAPI, GoHighLevelAPI } from "@/api/crm"

import ICRMService from "@/services/CRMService/CRMService.interface";
import { GHLSMSMessage, Message } from "@/models/Message";
import { GHLConversation } from "@/models/Conversation";
import { GHLContact } from "@/models/Contact";
import { OAuth2Credentials } from "@/models/auth";
import { IOAuth2API, OAuth2CredentialsRequestParams } from "@/api/OAuth2.interface";

type OpenAITrainingData = {
  messages: {
    role: "user" | "assistant" | "system";
    timestamp?: Date;
    content: string;
  }[];
}

export default class GoHighLevelService implements ICRMService, IOAuth2API{ 
  
  api: IGoHighLevelAPI & IOAuth2API;

  constructor(api: IGoHighLevelAPI & IOAuth2API) {
    this.api = api;
  }

  getAuthCredentials = async (params: OAuth2CredentialsRequestParams): Promise<OAuth2Credentials> => {
    return this.api.getAuthCredentials(params)
  }

  getOAuth2URL = (): string => {
    return this.api.getOAuth2URL()
  }

  getChatGPTTrainingData = async (accessToken: string): Promise<any[]> => {
    const contacts = await this.getContacts(800, ['realtor'], accessToken)
    const conversationMetadata = await this.getConversations(contacts, accessToken)
    const messages = await this.getMessagesForConversations(conversationMetadata, 6, accessToken)
    const formattedMessages = this.formatMessagesForChatGPT(messages)
    return formattedMessages;
  }

  getMessages = async (contactId: string, limit: number, accessToken: string): Promise<GHLSMSMessage[]> => {
    const convoResp = await this.api.searchConversations(contactId, accessToken);
    if (convoResp.total > 1) { throw new Error("Found multiple contacts for one contact ID") }
    if (convoResp.total === 0) { throw new Error("No conversations found for provided contact ID") }
    const convo = convoResp.conversations[0]
    const messages = await this.api.getMessages(convo.id, limit, accessToken)
    return messages
  }

  saveContactAIResponse = async (contactId: string, response: string, accessToken: string): Promise<void> => {
    const aiResponseFieldId = 'j68PJLWVlIOzKLxzUbzY'; //TODO: Look up the field ID dynamically
    await this.api.updateContactCustomField(contactId, aiResponseFieldId, response, accessToken);
  }

  private getContacts = async (amount: 'all' | number, tags: string[], accessToken: string): Promise<GHLContact[]> => {
    const pageLimit = amount !== 'all' && amount < 100 ? amount : 100
    const logContactProgress = (numContacts: number) => console.log(`Fetching contacts ${numContacts} - ${numContacts + pageLimit}`)
    let searchAfter: any[] = []
    let contacts: GHLContact[] = []

    try {
      logContactProgress(contacts.length)
      let result = await this.api.searchContacts(tags, pageLimit, accessToken, searchAfter);
      const totalContacts = result.total
      contacts = contacts.concat(result.contacts)
      while (contacts.length < (amount === 'all' ? totalContacts : Number(amount)))  {
        await new Promise(resolve => setTimeout(resolve, 110)); // Adding a delay to avoid hitting rate limits
        searchAfter = result.contacts.slice(-1)[0].searchAfter // Assuming the last contact's ID can be used for pagination
        logContactProgress(contacts.length)
        result = await this.api.searchContacts(tags, pageLimit, accessToken, searchAfter);
        contacts = contacts.concat(result.contacts)
      }
      console.log(`Total contacts fetched: ${contacts.length}`)
    } catch (error) {
      console.error('Error searching GHL contacts:', error);
      throw new Error('Failed to fetch contacts from GoHighLevel');
    }
    return contacts
  }

  private getConversations = async (contacts: GHLContact[], accessToken: string): Promise<GHLConversation[]> => {
    let conversations: GHLConversation[] = []
    for (const contact of contacts) {
      try {
        console.log(`fetching conversation ${conversations.length + 1} / ${contacts.length} (${contact.id})`)
        const result = await this.api.searchConversations(contact.id, accessToken)
        await new Promise(resolve => setTimeout(resolve, 110)); //avoid rate limiting
        conversations = conversations.concat(result.conversations)
      } catch (error) {
        console.error(`Error fetching GHL conversations for contact ${contact.id}:`, error);
        throw error
      }
    }
    console.log(`Total conversations fetched: ${conversations.length}`)
    return conversations
  }

  private getMessagesForConversations = async (conversations: GHLConversation[], messagesPerConvo: number, accessToken: string): Promise<GHLSMSMessage[]> => {
    let messages: GHLSMSMessage[] = []
    let counter = 0;
    for (const conversation of conversations) {
      try {
        console.log(`fetching messsage group ${++counter} / ${conversations.length} (conversation: ${conversation.id})`)
        const result = await this.api.getMessages(conversation.id, messagesPerConvo, accessToken)
        await new Promise(resolve => setTimeout(resolve, 50)); //avoid rate limiting
        messages = messages.concat(result)
      } catch (error) {
        console.error(`Error fetching GHL messages for conversation ${conversation.id}:`, error);
        throw error
      }
    }
    console.log(`Total messages fetched: ${messages.length}`)
    return messages
  } 

  private formatMessagesForChatGPT = (messages: GHLSMSMessage[]): OpenAITrainingData[] => {
    let trainingData: OpenAITrainingData[] = [];
    let currentConvoId = ''
    for (const message of messages) {
      if (message.conversationId !== currentConvoId) {
        trainingData.push({ messages: [] })
        currentConvoId = message.conversationId
        console.log('updated current convo id to: ', currentConvoId)
      }
      if (message.direction !== 'inbound' && message.direction !== 'outbound') {
        console.log('skipping message due to invalid direction: ', message.direction)
        continue;
      }
      if (!message.body) {
        console.log('skipping message due to empty body')
        continue;
      }
      if (message.body.length > 4000) {
        console.log('skipping message due to body length')
        continue;
      }
      if (message.body.length < 1) {
        console.log('skipping message due to empty body')
        continue;
      }
      if (message.status !== 'delivered' && message.status !== 'received') {
        console.log('skipping message due to invalid status: ', message.status)
        continue;
      }

      trainingData[trainingData.length - 1].messages.push({
        role: message.direction === 'inbound' ? 'user' : 'assistant',
        timestamp: message.timestamp,
        content: message.body,
      });      
    }

    // for each trainingData, go over every message, every time assistant responds AND user responds after, make a new TrainingData with that assistant response at the end
    let numInserted = 0;
    for (let i = 0; i < trainingData.length; i++) {
      const messages = trainingData[i].messages
      for (let j = 0; j < messages.length; j++) {
        if (messages[j].role === 'assistant' && messages[j + 1]?.role === 'user') {
          // make newTrainingData all the messages up to and including index j
          // but not including j + 1
          const newTrainingData: OpenAITrainingData = { messages: [] }
          for (let k = 0; k <= j; k++) {
            newTrainingData.messages.push(messages[k])
          }
          // add it at the right spot... right after the originial trainingData
          trainingData.splice(i, 0, newTrainingData)
          i++;
        }
      }
    }

    // remove empty training data
    for (let i = trainingData.length - 1; i >= 0; i--) {
      if (trainingData[i].messages.length === 0) {
        trainingData.splice(i, 1);
      }
    }

    // remove the conversation if it has no messages from user
    trainingData = trainingData.filter((data) => {
      for (const message of data.messages) { 
        if (message.role === 'user' && message.content.length > 0) {
          return true;
        }
      }
      return false;
    })

    // remove anything that doesn't have assistant as the last message
    trainingData = trainingData.filter((data) => {
      const lastMessage = data.messages[data.messages.length - 1]
      return lastMessage.role === 'assistant' && lastMessage.content.length > 0;
    });

    // remove anything where the last message isn't within a day of the message before it
    trainingData = trainingData.filter((data) => {
      const messages = data.messages
      if (messages.length < 2) {
        return false;
      }
      const lastMessage = messages[messages.length - 1]
      const secondToLastMessage = messages[messages.length - 2]
      // get time difference in milliseconds between the two messages
      if (!lastMessage.timestamp || !secondToLastMessage.timestamp) {
        return false;
      }
      const timeDiff = Math.abs(new Date(lastMessage.timestamp).getTime() - new Date(secondToLastMessage.timestamp).getTime())
      const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24))
      return diffDays <= 1;
    });

    // add a system message at the beginning of each training data
    trainingData = trainingData.map((data) => {
      const systemMessage: { role: "user" | "assistant" | "system"; content: string; timestamp: Date } = {
        role: 'system',
        content: 'You are a real estate investor. Your main goal is to find off market properties that need work or need to be sold fast by the seller',
        timestamp: new Date()
      }
      data.messages.unshift(systemMessage)
      return data
    })

    return trainingData.map((data) => {
      return {
        messages: data.messages.map((message) => {
          return {
            role: message.role,
            content: message.content
          }
        })
      } as OpenAITrainingData
    });
  }
}