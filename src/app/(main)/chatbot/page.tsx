"use client";

import { useState } from "react";

import { sendChatMessage } from "@/services/chatbot.service";
import { ChatMessage } from "@/types/chatbot.type";

export default function ChatbotPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: input,
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);

    setInput("");

    setLoading(true);

    try {
      const response = await sendChatMessage(
        userMessage.content,
        updatedMessages
      );

      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: response.answer,
      };

      setMessages((prev) => [
        ...prev,
        assistantMessage,
      ]);
    } catch (error) {
      console.error(error);
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
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 flex ${
              message.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] px-4 py-2 rounded-lg ${
                message.role === "user"
                  ? "bg-black text-white"
                  : "bg-gray-100 text-black"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}

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
          placeholder="Ask about spicy noodles..."
          className="flex-1 border rounded-lg px-4 py-2"
        />

        <button
          onClick={handleSendMessage}
          disabled={loading}
          className="bg-black text-white px-6 py-2 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}