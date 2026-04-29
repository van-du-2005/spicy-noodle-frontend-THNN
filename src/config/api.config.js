// src/config/api.config.js

if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error("Missing NEXT_PUBLIC_API_URL in .env.local");
}

export const API_URL = process.env.NEXT_PUBLIC_API_URL;
