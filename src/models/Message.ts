export interface Message {
  id: string;
  body: string;
  timestamp: Date;
  direction: string;
}

export interface SMSMessage extends Message {
  status: string;
}

export interface GHLSMSMessage extends SMSMessage {
  conversationId: string;
}

