import { Account, OAuthProvider } from "appwrite";

import { client } from "./client";

const account = new Account(client);

export const googleOAuth = async () => {
  try {
    if (typeof window !== "undefined") {
      const origin = window.location.origin;
      return account.createOAuth2Session(
        OAuthProvider.Google,
        `${origin}/home`, // Redirect URL after successful login
        `${origin}/login` // Redirect URL after failed login
      );
    } else {
      throw new Error(
        "This function can only be called from client-side code."
      );
    }
  } catch (error) {
    console.error("Error during Google OAuth:", error);
    throw error;
  }
};
