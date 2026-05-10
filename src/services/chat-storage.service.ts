const STORAGE_KEY = "guest_chat_messages";

export const saveGuestMessages = (messages: any[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
};

export const loadGuestMessages = () => {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) return [];

  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
};

export const clearGuestMessages = () => {
  localStorage.removeItem(STORAGE_KEY);
};