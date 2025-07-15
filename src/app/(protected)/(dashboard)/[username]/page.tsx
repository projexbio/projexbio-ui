"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Spinner, Alert } from "@heroui/react";
import { useCurrentUser } from "@/lib/query/useCurrentUser";
import { ProfileService } from "@/lib/api/profile";
import {
  UserProfile,
  PersonalInfoFormData,
  Skill,
  SocialLink,
} from "@/types/profile";
import CombinedProfile from "@/components/profile/CombinedProfile";

export default function ProfilePage() {
  const params = useParams();
  const username = params.username as string;

  const { data: currentUser, isLoading: currentUserLoading } = useCurrentUser();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Determine if this is the current user's own profile
  const isOwnProfile = currentUser?.username === username;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const profileData = await ProfileService.getUserProfile(username);

        if (!profileData) {
          setError("User not found");
          return;
        }

        setProfile(profileData);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        setError("Failed to load profile");
      } finally {
        setIsLoading(false);
      }
    };

    if (username) {
      fetchProfile();
    }
  }, [username]);

  const handlePersonalInfoUpdate = async (data: PersonalInfoFormData) => {
    if (!profile || !isOwnProfile) return;

    try {
      const updatedProfile = await ProfileService.updatePersonalInfo(
        profile.id,
        data,
      );
      setProfile(updatedProfile);
    } catch (error) {
      console.error("Failed to update personal info:", error);
      throw error;
    }
  };

  const handleSkillsUpdate = async (skills: Skill[]) => {
    if (!profile || !isOwnProfile) return;

    try {
      const updatedProfile = await ProfileService.updateSkills(
        profile.id,
        skills,
      );
      setProfile(updatedProfile);
    } catch (error) {
      console.error("Failed to update skills:", error);
      throw error;
    }
  };

  const handleSocialLinksUpdate = async (socialLinks: SocialLink[]) => {
    if (!profile || !isOwnProfile) return;

    try {
      const updatedProfile = await ProfileService.updateSocialLinks(
        profile.id,
        { socialLinks },
      );
      setProfile(updatedProfile);
    } catch (error) {
      console.error("Failed to update social links:", error);
      throw error;
    }
  };

  // Show loading while fetching current user or profile
  if (currentUserLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Spinner size="lg" />
          <p className="mt-4 text-default-500">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Show error if profile not found or failed to load
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Alert
          color="danger"
          title="Error"
          description={error}
          className="max-w-md"
        />
      </div>
    );
  }

  // Show error if no profile data
  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Alert
          color="warning"
          title="Profile Not Found"
          description="The requested user profile could not be found."
          className="max-w-md"
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <CombinedProfile
        profile={profile}
        isOwnProfile={isOwnProfile}
        onUpdatePersonalInfo={handlePersonalInfoUpdate}
        onUpdateSkills={handleSkillsUpdate}
        onUpdateSocialLinks={handleSocialLinksUpdate}
      />
    </div>
  );
}
