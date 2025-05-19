import { createContext, useContext, useState, useEffect } from "react";
import { UserService } from "../lib/api/users";
import axios from "axios";
import { useRouter } from "next/router";
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
  error: string | null;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [appwriteUser, setAppwriteUser] =
    useState<Models.User<Models.Preferences> | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const refreshUser = async () => {
    try {
      // First get Appwrite user
      const appwriteUserData = await getCurrentAppwriteUser();
      setAppwriteUser(appwriteUserData);

      if (!appwriteUserData) {
        setUser(null);
        return;
      }

      // Then try to get backend user
      try {
        const userData = await UserService.getCurrentUser();
        setUser(userData.data);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 404) {
          // User exists in Appwrite but not in our DB
          setUser(null);
        } else {
          setError("Failed to fetch user data");
        }
      }
    } catch (err) {
      setAppwriteUser(null);
      setUser(null);
      setError("Failed to fetch Appwrite user");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutUser();

      // Clear both user states
      setAppwriteUser(null);
      setUser(null);
      setError(null);

      // Redirect to home/login page
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
      setError("Failed to logout");
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        appwriteUser,
        user,
        loading,
        error,
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
