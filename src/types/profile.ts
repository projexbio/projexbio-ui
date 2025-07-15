export interface Skill {
  id: string;
  name: string;
  slug: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface College {
  collegeId: string;
  name: string;
  slug: string;
  logoUrl: string;
  userType: "STUDENT" | "FACULTY" | "ALUMNI";
  isAdmin: boolean;
  degreeType: string;
  branch: string;
  verified: boolean;
  joinedAt: string;
  leftAt: string | null;
  collegeEmail: string;
}

export interface UserProfile {
  id: string;
  firstName: string;
  middleName?: string;
  lastName?: string;
  username: string;
  email: string;
  avatarFileId?: string;
  isSuperAdmin: boolean;
  tagline?: string;
  bio?: string;
  resume?: string;
  appwriteId: string;
  websiteUrl?: string;
  createdAt?: string;
  updatedAt?: string;
  skills: Skill[];
  socialLinks: SocialLink[];
  colleges: College[];
}

export interface PersonalInfoFormData {
  firstName: string;
  middleName?: string;
  lastName?: string;
  tagline?: string;
  bio?: string;
  websiteUrl?: string;
  resume?: string;
}

export interface SkillFormData {
  skills: Skill[];
}

export interface SocialLinkFormData {
  socialLinks: SocialLink[];
}
