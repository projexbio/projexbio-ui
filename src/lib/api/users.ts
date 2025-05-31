import axios from "axios";
import { client } from "../appwrite/client";
import { Account } from "appwrite";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export class UserService {
  private static async getJWT() {
    const account = new Account(client);
    const jwt = await account.createJWT();
    return jwt.jwt;
  }

  static async getCurrentUser() {
    const jwt = await this.getJWT();
    return axios.get(`${API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
  }

  static async onboardUser(userData: {
    appwriteId: string;
    email: string;
    name?: string;
    avatar?: string;
    college?: string;
    username?: string;
    authProvider: string;
  }) {
    const jwt = await this.getJWT();
    return axios.post(`${API_URL}/users/onboard`, userData, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
  }

  static async checkUsernameAvailability(username: string) {
    const jwt = await this.getJWT();
    return axios.get(`${API_URL}/users/check-username`, {
      params: { username },
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
  }
}
