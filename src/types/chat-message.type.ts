// src/types/chat-message.type.ts

export interface IChatMessage {
  chat_messages_id: number;
  chat_sessions_id: number;
  sender: string; // 'nguoi' | 'bot'
  message: string;
  created_at?: Date;
}