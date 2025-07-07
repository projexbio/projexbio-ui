import api from "../utils/api";

export enum OTPContext {
  PASSWORD_RESET = "password_reset",
  VERIFY_EMAIL = "verify_email",
}

export class EmailVerificationService {
  static async sendOtp(email: string, context: OTPContext) {
    return api.post("/auth/send-otp", { email, context });
  }

  static async verifyOtp(email: string, otp: string) {
    return api.post("/auth/verify-otp", { email, otp });
  }
}
