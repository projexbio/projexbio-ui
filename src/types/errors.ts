export interface ErrorState {
  type: "network" | "server" | "user_not_found" | null;
  message: string;
  action?: string;
}

export const ERROR_MESSAGES = {
  NETWORK:
    "🔌 Couldn't connect to server. Please check your connection or try again later.",
  SERVER:
    "⚠️ Something went wrong on our end. Please try again in a few moments.",
  USER_NOT_FOUND: "👤 Please complete your profile setup to continue.",
  UNKNOWN: "❌ Something unexpected happened. Please try again.",
} as const;
