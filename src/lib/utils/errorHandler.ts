import { ZodError, z } from "zod/v4";
import { AxiosError } from "axios";

export function handleApiError(error: unknown): string {
  if (error instanceof ZodError) {
    return error.issues.map((err: z.core.$ZodIssue) => err.message).join(", ");
  }

  if (error instanceof AxiosError) {
    const responseData = error.response?.data;
    if (
      responseData &&
      typeof responseData === "object" &&
      "message" in responseData
    ) {
      return responseData.message as string;
    }
    return error.message || "Request failed";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred";
}
