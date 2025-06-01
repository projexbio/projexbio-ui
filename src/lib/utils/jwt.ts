import { Account } from "appwrite";
import { client } from "@/lib/appwrite/client";
import { useJWTStore } from "@/store/jwtStore";

export async function getJWT() {
  const jwtStore = useJWTStore.getState();
  const now = Date.now();

  // If we have a cached JWT that's still valid, return it
  if (jwtStore.jwt && jwtStore.expiresAt && now < jwtStore.expiresAt) {
    return jwtStore.jwt;
  }

  // Otherwise, get a new JWT
  const account = new Account(client);
  const jwt = await account.createJWT();

  jwtStore.setJWT(jwt.jwt);

  return jwt.jwt;
}
