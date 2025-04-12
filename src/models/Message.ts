export enum MessageDirection {
  INBOUND = 'inbound',
  OUTBOUND = 'outbound'
}

export interface Message {
  id: string;
  body: string;
  timestamp: Date;
  direction: MessageDirection;
}

export interface SMSMessage extends Message {
  status: string;
}

export interface GHLSMSMessage extends SMSMessage {
  conversationId: string;
}

