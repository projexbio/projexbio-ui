import { create } from "zustand";

interface JWTState {
  jwt: string | null;
  expiresAt: number | null;
  setJWT: (jwt: string) => void;
  clearJWT: () => void;
}

const JWT_CACHE_DURATION = 12 * 60 * 1000; // 12 minutes in milliseconds

export const useJWTStore = create<JWTState>((set) => ({
  jwt: null,
  expiresAt: null,
  setJWT: (jwt: string) =>
    set({
      jwt,
      expiresAt: Date.now() + JWT_CACHE_DURATION,
    }),
  clearJWT: () =>
    set({
      jwt: null,
      expiresAt: null,
    }),
}));
