"use client";

import { useCurrentUser } from "@/lib/query/useCurrentUser";
import { User } from "@/types/user";
import { ProfileCard, EducationCard } from "@/components/profile";

export default function ProfilePage() {
  const { data: user } = useCurrentUser();
  const typedUser = user as User;

  return (
    <div className="mx-auto p-6 space-y-6">
      <ProfileCard user={typedUser} />
      <EducationCard user={typedUser} />
    </div>
  );
}
