export interface Message {
  id: string;
  body: string;
  timestamp: Date;
}

export interface SMSMessage extends Message {
  direction: string;
  status: string;
  date: Date;
}

export interface GHLSMSMessage extends SMSMessage {
  conversationId: string;
}

