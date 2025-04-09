import { GHLSMSMessage } from '@/models/Message'
import { GHLContact } from '@/models/Contact';
import IGoHighLevelAPI, { SearchContactsResult, SearchConversationsResult } from './GoHighLevel.api.interface';
import axios from 'axios';
import prisma from '@/prisma/prisma';
import { OAuth2Credentials } from '@/models/auth';
import { IOAuth2API, OAuth2CredentialsRequestParams } from '@/api/OAuth2.interface';
import jwt from 'jsonwebtoken';
import { GHLConversation } from '@/models/Conversation';

interface GHLCredentials extends OAuth2Credentials {
  scope: string;
  tokenType: string;
  userId: string;
  locationId: string;
  companyId: string;
}

interface JWTPayload {
  authClass: string
  authClassId: string
}

export default class GoHighLevelAPI implements IGoHighLevelAPI, IOAuth2API {
  constructor(){

  }

  getOAuth2URL(): string {
    const baseURL = process.env.GO_HIGH_LEVEL_OAUTH_BASE_URL;
    const endpoint = process.env.GO_HIGH_LEVEL_OAUTH_ENDPOINT;
    const callbackURI = process.env.GO_HIGH_LEVEL_OAUTH_CALLBACK_URI;
    const clientId = process.env.GO_HIGH_LEVEL_CLIENT_ID;
    const scopes = process.env.GO_HIGH_LEVEL_OAUTH_SCOPES;
    if (!baseURL) { throw new Error('GoHighLevel Base OAUTH2 URL is not set'); }
    if (!endpoint) { throw new Error('GoHighLevel OAuth2 endpoint is not set');}
    if (!callbackURI) { throw new Error('GoHighLevel OAuth2 callback URI is not set');}
    if (!clientId) { throw new Error('GoHighLevel Client Id is not set'); }
    if (!scopes) { throw new Error('GoHighLevel OAuth2 scopes are not set');}
    return `${baseURL}/${endpoint}?response_type=code&redirect_uri=${callbackURI}&client_id=${clientId}&scope=${encodeURIComponent(scopes)}`;
  }


  getAuthCredentials = async (params: OAuth2CredentialsRequestParams): Promise<GHLCredentials> => {
    const { URLSearchParams } = require('url');
    const fetch = require('node-fetch');
    const encodedParams = new URLSearchParams();
    if (params.refreshToken) {
      encodedParams.set('refresh_token', params.refreshToken);
    }
    if (params.code) {
      encodedParams.set('code', params.code);
    }
    encodedParams.set('client_id', process.env.GO_HIGH_LEVEL_CLIENT_ID);
    encodedParams.set('client_secret', process.env.GO_HIGH_LEVEL_CLIENT_SECRET);
    encodedParams.set('grant_type', 'authorization_code');
    encodedParams.set('redirect_uri', process.env.GO_HIGH_LEVEL_OAUTH_CALLBACK_URL);
    encodedParams.set('user_type', 'Company');

    const url = 'https://services.leadconnectorhq.com/oauth/token';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json'
      },
      body: encodedParams
    }

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      const auth: GHLCredentials = {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        expiresIn: data.expires_in,
        scope: data.scope,
        tokenType: data.token_type,
        userId: data.userId,
        locationId: data.locationId,
        companyId: data.companyId,
      };
      await this.storeAuthCredentials(auth);
      return auth;
    } catch (error) {
      throw new Error('Error fetching CRM Auth Object: ' + error);
    }
  };

  storeAuthCredentials = async (auth: GHLCredentials): Promise<void> => {
    const resp = await prisma.crm.upsert({
      where: { crmUserId: auth.userId },
      update: {
        accessToken: auth.accessToken,
        expiration: new Date(Date.now() + auth.expiresIn * 1000),
        refreshToken: auth.refreshToken,
        crmType: 'GoHighLevel', // Example CRM type
      },
      create: {
        crmUserId: auth.userId,
        accessToken: auth.accessToken,
        expiration: new Date(Date.now() + auth.expiresIn * 1000),
        refreshToken: auth.refreshToken,
        crmType: 'GoHighLevel',
      },
    });   
  }

  searchContacts = async (tags: string[], pageLimit: number, accessToken: string, searchAfter: any[]): Promise<SearchContactsResult> => {
    const url = `${process.env.GO_HIGH_LEVEL_API_BASE_URL}/contacts/search`;
    if (tags.length === 0) {
      throw Error('No tags provided for search. Returning empty result.');
    }
    const decodedToken = jwt.decode(accessToken) as JWTPayload;
    if (decodedToken.authClass !== 'Location') {
      throw Error('Access token does not belong to a Location. Cannot search contacts. Only location ID implemented');
    }
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Version: '2021-04-15',
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      data: {
        "locationId": decodedToken.authClassId,
        "pageLimit": pageLimit,
        "searchAfter": searchAfter,
        "filters": [
          {
            "field": "tags",
            "operator": "eq",
            "value": tags
          }
        ]
      }
    }

    try {
      const response = await axios.post(url, options.data, { headers: options.headers });
      const contacts = response.data?.contacts ?? [];
      const ghlContacts = contacts.map((contact: any) => ({
        id: contact.id,
        firstName: contact.firstNameLowerCase ?? '',
        lastName: contact.lastNameLowerCase ?? '',
        email: contact.email ?? '',
        phone: contact.phone ?? '',
        locationId: contact.locationId ?? 'unknown',
        searchAfter: contact.searchAfter ?? [], // Used for pagination
      } as GHLContact));
      return {
        contacts: ghlContacts,
        total: response.data?.total ?? 0,
      } as SearchContactsResult;
    } catch (error) {
      console.error('Error searching contacts:', error);
      throw error;
    }
  }

  searchConversations = async (contactId: string, accessToken: string): Promise<SearchConversationsResult> => {
    const decodedToken = jwt.decode(accessToken) as JWTPayload;
    if (decodedToken.authClass !== 'Location') {
      throw Error('Access token does not belong to a Location. Cannot search contacts. Only location ID implemented');
    } 
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Version: '2021-04-15',
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      params: {
        "locationId": decodedToken.authClassId,
        "contactId": contactId,
      }
    }
    
    const url = `${process.env.GO_HIGH_LEVEL_API_BASE_URL}/conversations/search`;
    try {
      const response = await axios.get(url, options);
      const conversationData = response.data?.conversations ?? [];
      const ghlConvos = conversationData.map((conversation: any) => ({
        id: conversation.id,
        contactId: conversation.contactId,
        locationId: conversation.locationId,
        contactName: conversation.fullName
      } as GHLConversation));
      return {
        conversations: ghlConvos,
        total: response.data?.total ?? 0,
      } as SearchConversationsResult;
    } catch (error) {
      console.error('Error searching conversations:', error);
      throw error;
    }
  }

  getMessages = async (conversationId: string, limit: number, accessToken: string): Promise<GHLSMSMessage[]> => {
    const url = `${process.env.GO_HIGH_LEVEL_API_BASE_URL}/conversations/${conversationId}/messages`;
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Version: '2021-04-15',
        Accept: 'application/json',
      },
      params: { limit }
    }
    const response = await axios.get(url, options);
    const responseMessages = response.data?.messages?.messages ?? undefined;

    if (responseMessages) {
      const messages = responseMessages.map((message: any) => {
        return {
          body: message.body,
          timestamp: new Date(message.dateAdded),
          status: message.status,
          direction: message.direction,
          conversationId: conversationId
        } as GHLSMSMessage;
      });
      return messages.reverse();
    }
    return [];
  }
}