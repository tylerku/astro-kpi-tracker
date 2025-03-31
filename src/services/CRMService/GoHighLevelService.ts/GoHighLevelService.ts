import { IGoHighLevelAPI, GoHighLevelAPI } from "@/api/crm"

import ICRMService from "@/services/CRMService/CRMService.interface";
import { Message } from "@/models/Message";
import { GHLContact } from "@/models/Contact";
import { OAuth2Credentials } from "@/models/auth";
import { IOAuth2API, OAuth2CredentialsRequestParams } from "@/api/OAuth2.interface";
import { content_v2_1 } from "googleapis";

export default class GoHighLevelService implements ICRMService, IOAuth2API{
  
  api: IGoHighLevelAPI & IOAuth2API = new GoHighLevelAPI();

  getAuthCredentials = async (params: OAuth2CredentialsRequestParams): Promise<OAuth2Credentials> => {
    return this.api.getAuthCredentials(params)
  }

  getOAuth2URL = (): string => {
    return this.api.getOAuth2URL()
  }
  
  getMessages = async (conversationId: string, accessToken: string): Promise<Message[]> => {
    return this.api.getMessages(conversationId, accessToken)
  }

  getChatGPTTrainingData = async (accessToken: string): Promise<GHLContact[]> => {
    const pageLimit = 100
    const logContactProgress = (numContacts: number) => console.log(`Fetching contacts ${numContacts} - ${numContacts + pageLimit}`)
    const tags = ['realtor']
    let searchAfter: any[] = []
    let contacts: GHLContact[] = []

    try {
      logContactProgress(contacts.length)
      let result = await this.api.searchContacts(tags, pageLimit, accessToken, searchAfter);
      const totalContacts = result.total
      contacts = contacts.concat(result.contacts)
      while (contacts.length < totalContacts) {
        await new Promise(resolve => setTimeout(resolve, 110)); // Adding a delay to avoid hitting rate limits
        searchAfter = result.contacts.slice(-1)[0].searchAfter // Assuming the last contact's ID can be used for pagination
        logContactProgress(contacts.length)
        result = await this.api.searchContacts(tags, pageLimit, accessToken, searchAfter);
        contacts = contacts.concat(result.contacts)
      }
      console.log(`Total contacts fetched: ${contacts.length}`)
    } catch (error) {
      console.error('Error searching contacts:', error);
      throw new Error('Failed to fetch contacts from GoHighLevel');
    }
    return contacts
  }
}