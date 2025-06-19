"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { UserService } from "../lib/api/users";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";
import { getCurrentAppwriteUser, logoutUser } from "../lib/appwrite/auth";
import { Models } from "appwrite";

interface User {
  id: string;
  appwriteId: string;
  email: string;
  name?: string;
  avatar?: string;
  college?: string;
  username?: string;
  authProvider: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthContextType {
  appwriteUser: Models.User<Models.Preferences> | null;
  user: User | null;
  loading: boolean;
  isLoggingOut: boolean;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [appwriteUser, setAppwriteUser] =
    useState<Models.User<Models.Preferences> | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const refreshUser = useCallback(async () => {
    try {
      setLoading(true);
      const appwriteUser = await getCurrentAppwriteUser();
      setAppwriteUser(appwriteUser);

      if (!appwriteUser) {
        setUser(null);
        return;
      }

      // Then try to get backend user
      try {
        const userData = await UserService.getCurrentUser();
        setUser(userData.data);
      } catch (err) {
        if (
          axios.isAxiosError(err) &&
          err.response?.status === 404 &&
          err.response?.data?.message === "User not found"
        ) {
          setUser(null);
          if (pathname !== "/onboarding") {
            router.push("/onboarding");
          }
        } else {
          console.log("Failed to fetch user data");
        }
      }
    } catch (err) {
      setAppwriteUser(null);
      setUser(null);
      console.log("Failed to fetch Appwrite user", err);
    } finally {
      setLoading(false);
    }
  }, [pathname, router]);

  const logout = async () => {
    try {
      setIsLoggingOut(true);
      await logoutUser();
      setAppwriteUser(null);
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  return (
    <AuthContext.Provider
      value={{
        appwriteUser,
        user,
        loading,
        isLoggingOut,
        refreshUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
