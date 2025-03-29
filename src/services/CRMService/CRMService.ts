import { ICRMAPI } from '@/api/crm';
import { IOAuth2API, OAuth2CredentialsRequestParams } from '@/api/OAuth2.interface';
import GoHighLevelAPI from '@/api/crm/GoHighLevel';
import { OAuth2Credentials } from '@/models/auth';
import { Message } from '@/models/Message';

// make an enum of CRM choices where the only choice is GHL

export default class CRMService {
  private static instance: CRMService;
  private api: ICRMAPI & IOAuth2API;

  constructor(api: ICRMAPI & IOAuth2API) {
    this.api = api;
  }

  static getInstance(): CRMService {
    if (!this.instance) {
      this.instance = new CRMService(new GoHighLevelAPI());
    }
    return this.instance;
  }

  getOAuth2URL() {
    return this.api.getOAuth2URL();
  }

  getAuthObject = async (params: OAuth2CredentialsRequestParams): Promise<OAuth2Credentials> => {
    return this.api.getAuthCredentials(params);
  }

  getMessages = async (conversationId: string, auth: OAuth2Credentials): Promise<Message[]> => {
    if (!conversationId) { throw new Error('Conversation ID is required for getMessages function in CRMService'); }
    if (!auth) { throw new Error('Auth is required for getMessages function in CRMService'); }
    return this.api.getMessages(conversationId, auth);
  }
}