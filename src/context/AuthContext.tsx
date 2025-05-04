"use client";

import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  JSX,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { Account, Models } from "appwrite";
import { client } from "@/lib/appwrite/client";
import { logoutUser } from "@/lib/appwrite/auth";

interface AuthContextType {
  user: Models.User<Models.Preferences> | null;
  isLoading: boolean;
  checkAuthStatus: () => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const account = useCallback(() => new Account(client), []);

  const checkAuthStatus = useCallback(async (): Promise<boolean> => {
    try {
      const currentUser = await account().get();
      setUser(currentUser);
      setIsLoading(false);
      return true;
    } catch {
      setUser(null);
      setIsLoading(false);
      return false;
    }
  }, [account]);

  const logout = async (): Promise<void> => {
    try {
      await logoutUser();
      setUser(null);
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const value = {
    user,
    isLoading,
    checkAuthStatus,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
