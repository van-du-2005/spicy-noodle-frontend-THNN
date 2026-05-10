export async function createChatSession(userId?: string | number) {
  const body = userId ? JSON.stringify({ users_id: userId }) : undefined;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/chat-sessions`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body,
      credentials: "include",
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`[Chat Session API Error] Status: ${response.status}, Body: ${errorText}`);
    return null;
  }

  return response.json();
}

// Fetch chat history for logged-in user by sessionId
export async function getChatHistory(sessionId: number) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/chat-sessions/${sessionId}/messages`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    if (!response.ok) {
      console.warn(`[Get Chat History] Status: ${response.status}`);
      return [];
    }

    const data = await response.json();
    return data.messages || [];
  } catch (error) {
    console.error("[Get Chat History Error]", error);
    return [];
  }
}