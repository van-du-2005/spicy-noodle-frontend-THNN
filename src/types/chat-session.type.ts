// src/types/chat-session.type.ts

export interface IChatSession {
  chat_sessions_id: number;
  user_id: number;
  started_at: Date;
  ended_at?: Date | null;
}

export interface ChatSessionResponse {
  chat_sessions_id: number;
}