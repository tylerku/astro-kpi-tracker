import { APIKeyCredentials, AuthProvider, Credentials, OAuth2Credentials } from "@/models/auth";
import ICredentialsAPI, { CredentialParams } from "./credentials.api.interface";
import prisma from "@/prisma";
import { InputJsonValue } from "@prisma/client/runtime/library";

export default class CredentialsAPI implements ICredentialsAPI {
  upsertCredentials = async (credentials: CredentialParams): Promise<Credentials> => { 
    const { userId, authProviderUserId, revoked, type, value, provider } = credentials;
    const hasCredentials = value && Object.keys(value).length > 0;
    if (!hasCredentials) {
      throw new Error("Credentials value is required.");
    }
    if (!credentials.userId) {
      throw new Error("Auth Provider User ID is required.");
    }

    const newCredentials = await prisma.credentials.upsert({
      where: {
        authProviderUserId: authProviderUserId,
      },
      create: {
        userId,
        authProviderUserId,
        provider,
        type,
        value: value!,
        revoked,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      update: {
        revoked,
        updatedAt: new Date(),
        value: value!,
      },
    });
    return newCredentials;
  }
  getCredentialsByApiKey = async (apiKey: string): Promise<Credentials | null> => {
    const value: APIKeyCredentials & InputJsonValue = {
      apiKey: apiKey
    }
    return await prisma.credentials.findFirst({
      where: {
        value: {
          equals: value,
        },
        type: "API_KEY",
      },
    });
  }
  getCredentialsByUserIdAndProvider = async (userId: string, provider: AuthProvider): Promise<Credentials | null> => {
    return await prisma.credentials.findFirst({
      where: {
        userId: userId,
        provider: provider,
      },
    });
  }

  getCredentialsByProviderIdAndProvider = async (providerId: string, provider: AuthProvider): Promise<Credentials | null> => {
    return await prisma.credentials.findFirst({
      where: {
        authProviderUserId: providerId,
        provider: provider,
      },
    });
  }
}