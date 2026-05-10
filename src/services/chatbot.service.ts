export async function sendChatMessage({
  message,
  history = [],
  sessionId,
  userId,
}: {
  message: string;
  history?: any[];
  sessionId?: number | null;
  userId?: number | null;
}) {
  const body: any = {
    message,
    history,
  };

  if (sessionId !== null && sessionId !== undefined) {
    body.sessionId = sessionId;
  }
  if (userId !== null && userId !== undefined) {
    body.userId = userId;
  }

  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/chatbot`;
  console.log("[Chatbot Request]", { url, body });

  const response = await fetch(
    url,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      credentials: "include",

      body: JSON.stringify(body),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`[Chatbot API Error] Status: ${response.status}, Body: ${errorText}`);
    throw new Error(`Failed to chat: ${response.status} - ${errorText}`);
  }

  return response.json();
}