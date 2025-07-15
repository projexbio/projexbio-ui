import {
  UserProfile,
  PersonalInfoFormData,
  SocialLinkFormData,
} from "@/types/profile";

// Mock data for demonstration
const mockUserProfiles: UserProfile[] = [
  {
    id: "598a163d-2e95-46f7-815f-37ac7ff6c685",
    firstName: "Saksham",
    lastName: "Jain",
    username: "sauc",
    email: "jainsaksham1004@gmail.com",
    isSuperAdmin: false,
    appwriteId: "685fa8b540955b19f494",
    tagline: "Full Stack Developer & Tech Enthusiast",
    bio: "Passionate about building innovative solutions with modern web technologies. Currently working on ProjexBio to connect students and showcase their projects.",
    websiteUrl: "https://sakshamjain.dev",
    resume: "https://example.com/resume.pdf",
    skills: [
      {
        id: "868a163d-2e95-46f7-815f-37ac7ff6c625",
        name: "JavaScript",
        slug: "javascript",
      },
      {
        id: "868a163d-2e95-46f7-815f-37ac7ff6c626",
        name: "React",
        slug: "react",
      },
      {
        id: "868a163d-2e95-46f7-815f-37ac7ff6c627",
        name: "Node.js",
        slug: "nodejs",
      },
      {
        id: "868a163d-2e95-46f7-815f-37ac7ff6c628",
        name: "TypeScript",
        slug: "typescript",
      },
    ],
    socialLinks: [
      {
        platform: "GitHub",
        url: "https://github.com/sailingsam/",
      },
      {
        platform: "LinkedIn",
        url: "https://linkedin.com/in/jainsaksham1004",
      },
      {
        platform: "Twitter",
        url: "https://twitter.com/sakshamjain",
      },
      {
        platform: "nstagram",
        url: "https://instagram.com/sakshamjain",
      },
    ],
    colleges: [
      {
        collegeId: "fe674a18-dd61-4a20-9764-ccdb23f138aa",
        name: "Scaler School of Technology",
        slug: "scaler-school-of-technology",
        logoUrl:
          "https://fra.cloud.appwrite.io/v1/storage/buckets/684ac20d001adb958444/files/684bfeba000d45ca0e82/view?project=6814819a000f5b7d2be7",
        userType: "STUDENT",
        isAdmin: false,
        degreeType: "B.Sc + M.Sc (Bachelor of Science + Master of Science)",
        branch: "Computer Science",
        verified: true,
        joinedAt: "2025-06-04T00:00:00.000Z",
        leftAt: "2025-06-30T00:00:00.000Z",
        collegeEmail: "saksham.23bcs10063@sst.scaler.com",
      },
    ],
  },
  {
    id: "598a163d-2e95-46f7-815f-37ac7ff6c686",
    firstName: "Jane",
    lastName: "Smith",
    username: "janesmith",
    email: "jane.smith@example.com",
    isSuperAdmin: false,
    appwriteId: "685fa8b540955b19f495",
    tagline: "UI/UX Designer & Frontend Developer",
    bio: "Creating beautiful and intuitive user experiences. Love working with design systems and modern frontend frameworks.",
    skills: [
      {
        id: "868a163d-2e95-46f7-815f-37ac7ff6c629",
        name: "Figma",
        slug: "figma",
      },
      {
        id: "868a163d-2e95-46f7-815f-37ac7ff6c630",
        name: "React",
        slug: "react",
      },
    ],
    socialLinks: [
      {
        platform: "Dribbble",
        url: "https://dribbble.com/janesmith",
      },
      {
        platform: "LinkedIn",
        url: "https://linkedin.com/in/janesmith",
      },
    ],
    colleges: [
      {
        collegeId: "fe674a18-dd61-4a20-9764-ccdb23f138ab",
        name: "MIT",
        slug: "mit",
        logoUrl: "",
        userType: "STUDENT",
        isAdmin: false,
        degreeType: "Bachelor of Science",
        branch: "Computer Science",
        verified: true,
        joinedAt: "2024-09-01T00:00:00.000Z",
        leftAt: null,
        collegeEmail: "jane.smith@mit.edu",
      },
    ],
  },
];

export class ProfileService {
  /**
   * Fetch user profile by username
   */
  static async getUserProfile(username: string): Promise<UserProfile | null> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const profile = mockUserProfiles.find((p) => p.username === username);
    return profile || null;
  }

  /**
   * Update user personal information
   */
  static async updatePersonalInfo(
    userId: string,
    data: PersonalInfoFormData,
  ): Promise<UserProfile> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const profileIndex = mockUserProfiles.findIndex((p) => p.id === userId);
    if (profileIndex === -1) {
      throw new Error("User not found");
    }

    // Update the mock data
    mockUserProfiles[profileIndex] = {
      ...mockUserProfiles[profileIndex],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    return mockUserProfiles[profileIndex];
  }

  /**
   * Update user social links
   */
  static async updateSocialLinks(
    userId: string,
    data: SocialLinkFormData,
  ): Promise<UserProfile> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const profileIndex = mockUserProfiles.findIndex((p) => p.id === userId);
    if (profileIndex === -1) {
      throw new Error("User not found");
    }

    // Update the mock data
    mockUserProfiles[profileIndex] = {
      ...mockUserProfiles[profileIndex],
      socialLinks: data.socialLinks,
      updatedAt: new Date().toISOString(),
    };

    return mockUserProfiles[profileIndex];
  }

  /**
   * Add or remove skills
   */
  static async updateSkills(
    userId: string,
    skills: { id: string; name: string; slug: string }[],
  ): Promise<UserProfile> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const profileIndex = mockUserProfiles.findIndex((p) => p.id === userId);
    if (profileIndex === -1) {
      throw new Error("User not found");
    }

    // Update the mock data
    mockUserProfiles[profileIndex] = {
      ...mockUserProfiles[profileIndex],
      skills: skills,
      updatedAt: new Date().toISOString(),
    };

    return mockUserProfiles[profileIndex];
  }
}
