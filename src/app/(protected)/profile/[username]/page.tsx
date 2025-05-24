"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface UserData {
  id: string;
  name: string;
  username: string;
  // Add more fields as needed
}

interface ProfilePageProps {
  params: {
    username: string;
  };
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const { username } = params;
  const { user, loading } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/users/profile/${username}`);
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (!loading) {
      fetchUserData();
    }
  }, [username, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Profile</h2>
        {userData && (
          <div>
            <p>Name: {userData.name}</p>
            <p>Username: @{userData.username}</p>
            {/* Add more user details here */}
          </div>
        )}
      </div>
    </div>
  );
}
