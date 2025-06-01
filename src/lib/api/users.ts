import api from "../utils/api";

export class UserService {
  static async getCurrentUser() {
    return api.get("/users/me");
  }

  static async checkUsernameAvailability(username: string) {
    return api.get("/users/check-username", {
      params: { username },
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
    return api.post("/users/onboard", userData);
  }
}
