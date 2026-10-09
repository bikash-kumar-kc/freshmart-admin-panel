// lib/utilis/apiError.ts
import axios from "axios";

export function getApiErrorMessage(
  error: unknown,
  fallback = "Please try again.",
): string {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message;
    if (Array.isArray(message)) return message.join(", ");
    if (typeof message === "string") return message;
  }
  return fallback;
}
