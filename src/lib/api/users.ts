import api from "../utils/api";
import { OnboardingPayload, OnboardingResponse } from "@/types/user";

export class UserService {
  static async getCurrentUser() {
    return api.get("/users/me");
  }

  static async checkUsernameAvailability(username: string) {
    return api.get("/users/check-username", {
      params: { username },
    });
  }

  static async onboardUser(
    payload: OnboardingPayload,
    avatarFile?: File,
  ): Promise<OnboardingResponse> {
    const formData = new FormData();

    // Add each field individually to FormData
    Object.entries(payload).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Add avatar file if provided
    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }

    return api.post("/users/onboarding", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}
