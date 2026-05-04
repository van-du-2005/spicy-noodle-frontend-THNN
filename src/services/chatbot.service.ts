export async function sendChatMessage(
  message: string,
  history: any[] = []
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/chatbot`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        history,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to chat");
  }

  return response.json();
}