import { Account, ID, OAuthProvider } from "appwrite";

import { client } from "./client";

const account = new Account(client);

export const googleOAuth = async () => {
  try {
    if (typeof window !== "undefined") {
      const origin = window.location.origin;
      return account.createOAuth2Session(
        OAuthProvider.Google,
        `${origin}/explore`, // Redirect URL after successful login
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

export const signupWithEmailPassword = async (
  email: string,
  password: string
) => {
  try {
    await account.create(ID.unique(), email, password);
    return await account.createEmailPasswordSession(email, password);
  } catch (error) {
    console.error("Error during email signup:", error);
    throw error;
  }
};

export const sendVerificationEmail = async (url: string) => {
  try {
    const origin = window.location.origin;
    return await account.createVerification(`${origin}${url}`);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw error;
  }
};

export const confirmVerification = async (userId: string, secret: string) => {
  try {
    return await account.updateVerification(userId, secret);
  } catch (error) {
    console.error("Error confirming verification:", error);
    throw error;
  }
};

export const getCurrentAppwriteUser = async () => {
  try {
    return await account.get();
  } catch (error) {
    console.error("Error getting current user:", error);
    throw error;
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    await account.deleteSession("current");
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
};
