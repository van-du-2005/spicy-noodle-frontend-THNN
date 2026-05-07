export async function createChatSession() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/chat-sessions`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

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