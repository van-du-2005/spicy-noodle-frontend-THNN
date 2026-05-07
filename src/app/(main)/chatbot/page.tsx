"use client";

import { useEffect, useState } from "react";

import { sendChatMessage } from "@/services/chatbot.service";
import { createChatSession } from "@/services/chat-session.service";

import { ChatMessage } from "@/types/chatbot.type";

import { authService } from "@/services/auth.service";

import {
  saveGuestMessages,
  loadGuestMessages,
} from "@/services/chat-storage.service";

export default function ChatbotPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);

  // NEW
  const [sessionId, setSessionId] =
    useState<number | null>(null);

  // NEW
  const [currentUser, setCurrentUser] =
    useState<any>(null);

  // =========================
  // Load guest messages
  // =========================
  useEffect(() => {
    const savedMessages =
      loadGuestMessages();

    if (savedMessages.length > 0) {
      setMessages(savedMessages);
    }
  }, []);

  // =========================
  // Save guest messages
  // =========================
  useEffect(() => {
    saveGuestMessages(messages);
  }, [messages]);

  // =========================
  // NEW:
  // Get current login user
  // =========================
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user =
          await authService.getMe();

        setCurrentUser(user);
      } catch (error) {
        setCurrentUser(null);
      }
    };

    fetchUser();
  }, []);
  // NEW:
  // Create session for login user
  useEffect(() => {
    const initializeChat = async () => {
      if (!currentUser || sessionId) return;
      
      try {
        const session = await createChatSession();
        if (session?.chat_sessions_id) {
          setSessionId(session.chat_sessions_id);
        }
      } catch (error) {
        console.error(error);
      }
    };

    initializeChat();
  }, [currentUser, sessionId]);

  const handleSendMessage =
    async () => {
      if (!input.trim()) return;

      const userMessage: ChatMessage = {
        role: "user",
        content: input,
      };

      const updatedMessages = [
        ...messages,
        userMessage,
      ];

      setMessages(updatedMessages);

      setInput("");

      setLoading(true);

      try {
        const response =
          await sendChatMessage({
            message:
              userMessage.content,

            history:
              updatedMessages,

            // NEW
            sessionId,

            // NEW
            userId:
              currentUser?.user_id,
          });

        // NEW
        if (response.sessionId) {
          setSessionId(
            response.sessionId
          );
        }

        const replyContent = response.answer || response.reply || response.message || "No response from chatbot";
        
        console.log("[Chatbot Response]", response);

        const assistantMessage: ChatMessage =
          {
            role: "assistant",

            content:
              replyContent,
          };

        setMessages((prev) => [
          ...prev,
          assistantMessage,
        ]);
      } catch (error) {
        console.error("[Chatbot Error]", error);

        const errorMessage: ChatMessage =
          {
            role: "assistant",

            content:
              "Sorry, chatbot is temporarily unavailable.",
          };

        setMessages((prev) => [
          ...prev,
          errorMessage,
        ]);
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        AI Spicy Noodle Assistant
      </h1>

      <div className="border rounded-lg h-[600px] overflow-y-auto p-4 mb-4 bg-white">
        {messages.map(
          (message, index) => (
            <div
              key={index}
              className={`mb-4 flex ${
                message.role ===
                "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] px-4 py-2 rounded-lg whitespace-pre-wrap ${
                  message.role ===
                  "user"
                    ? "bg-black text-white"
                    : "bg-gray-100 text-black"
                }`}
              >
                {message.content}
              </div>
            </div>
          )
        )}

        {loading && (
          <div className="text-gray-500">
            AI is typing...
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) =>
            setInput(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
          placeholder="Ask about spicy noodles..."
          className="flex-1 border rounded-lg px-4 py-2"
        />

        <button
          onClick={handleSendMessage}
          disabled={loading}
          className="bg-black text-white px-6 py-2 rounded-lg disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}