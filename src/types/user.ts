import { z } from "zod/v4";

// Zod schema for UserRole
export const UserRoleSchema = z.enum(["STUDENT", "FACULTY"]);

// Base schema for common fields
const BaseOnboardingSchema = z.object({
  appwriteId: z.string().min(1, "Appwrite ID is required"),
  role: UserRoleSchema,
  username: z.string().min(1, "Username is required"),
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
  primaryEmail: z.email("Invalid email format"),
  collegeId: z.string().min(1, "College selection is required"),
  collegeEmail: z.email("Invalid college email format"),
});

// Student-specific schema
const StudentOnboardingSchema = BaseOnboardingSchema.extend({
  role: z.literal("STUDENT"),
  program: z.string().min(1, "Program is required for students"),
  branch: z.string().min(1, "Branch is required for students"),
  startDate: z.string().min(1, "Start date is required for students"),
  endDate: z.string().min(1, "End date is required for students"),
});

// Faculty-specific schema
const FacultyOnboardingSchema = BaseOnboardingSchema.extend({
  role: z.literal("FACULTY"),
  designation: z.string().min(1, "Designation is required for faculty"),
});

// Combined schema using discriminated union
export const OnboardingPayloadSchema = z.discriminatedUnion("role", [
  StudentOnboardingSchema,
  FacultyOnboardingSchema,
]);

// Infer TypeScript types from Zod schemas
export type OnboardingPayload = z.infer<typeof OnboardingPayloadSchema>;

// Response type for the onboarding API
export interface OnboardingResponse {
  success: boolean;
  message: string;
}

// Skill interface
export interface Skill {
  id: string;
  name: string;
  slug: string;
}

// Social link interface
export interface SocialLink {
  platform: string;
  url: string;
}

// College interface for user's college details
export interface College {
  collegeId: string;
  name: string;
  slug: string;
  userType: 'STUDENT' | 'FACULTY' | 'GENERAL';
  isAdmin: boolean;
  degreeType?: string;
  branch?: string;
  verified: boolean;
  joinedAt: string;
  leftAt?: string;
  collegeEmail: string;
  designation?: string;
  logoUrl?: string;
}

// Main User interface for authenticated users
export interface User {
  id: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  username?: string;
  email: string;
  appwriteId: string;
  avatarUrl?: string;
  isSuperAdmin?: boolean;
  githubUsername?: string;
  college?: string;
  websiteUrl?: string;
  authProvider?: string;
  createdAt: string;
  updatedAt: string;
  // New fields from backend
  tagline?: string;
  bio?: string;
  resume?: string;
  skills?: Skill[];
  socialLinks?: SocialLink[];
  colleges?: College[];
}
