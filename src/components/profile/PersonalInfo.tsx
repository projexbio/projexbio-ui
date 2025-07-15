"use client";

import { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Textarea,
  Avatar,
  Chip,
} from "@heroui/react";
import {
  FaEdit,
  FaSave,
  FaTimes,
  FaExternalLinkAlt,
  FaFileDownload,
} from "react-icons/fa";
import { UserProfile, PersonalInfoFormData } from "@/types/profile";

interface PersonalInfoProps {
  profile: UserProfile;
  isOwnProfile: boolean;
  onUpdate: (data: PersonalInfoFormData) => Promise<void>;
}

export default function PersonalInfo({
  profile,
  isOwnProfile,
  onUpdate,
}: PersonalInfoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<PersonalInfoFormData>({
    firstName: profile.firstName,
    middleName: profile.middleName || "",
    lastName: profile.lastName || "",
    tagline: profile.tagline || "",
    bio: profile.bio || "",
    websiteUrl: profile.websiteUrl || "",
    resume: profile.resume || "",
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      firstName: profile.firstName,
      middleName: profile.middleName || "",
      lastName: profile.lastName || "",
      tagline: profile.tagline || "",
      bio: profile.bio || "",
      websiteUrl: profile.websiteUrl || "",
      resume: profile.resume || "",
    });
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      await onUpdate(formData);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update personal info:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    field: keyof PersonalInfoFormData,
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const getFullName = () => {
    const parts = [
      profile.firstName,
      profile.middleName,
      profile.lastName,
    ].filter(Boolean);
    return parts.join(" ");
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <Avatar
            src={
              profile.avatarFileId
                ? `/api/files/${profile.avatarFileId}`
                : undefined
            }
            name={getFullName()}
            size="lg"
            className="w-20 h-20"
          />
          <div>
            <h2 className="text-2xl font-bold">{getFullName()}</h2>
            <p className="text-default-500">@{profile.username}</p>
            {profile.tagline && (
              <Chip size="sm" variant="flat" color="primary" className="mt-1">
                {profile.tagline}
              </Chip>
            )}
          </div>
        </div>
        {isOwnProfile && (
          <div className="flex gap-2">
            {!isEditing ? (
              <Button
                size="sm"
                variant="flat"
                color="primary"
                startContent={<FaEdit />}
                onPress={handleEdit}
              >
                Edit
              </Button>
            ) : (
              <>
                <Button
                  size="sm"
                  variant="flat"
                  color="danger"
                  startContent={<FaTimes />}
                  onPress={handleCancel}
                  isDisabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  color="primary"
                  startContent={<FaSave />}
                  onPress={handleSave}
                  isLoading={isLoading}
                >
                  Save
                </Button>
              </>
            )}
          </div>
        )}
      </CardHeader>

      <CardBody className="space-y-4">
        {isEditing ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="First Name"
                value={formData.firstName}
                onValueChange={(value) => handleInputChange("firstName", value)}
                isRequired
                variant="bordered"
              />
              <Input
                label="Middle Name"
                value={formData.middleName}
                onValueChange={(value) =>
                  handleInputChange("middleName", value)
                }
                variant="bordered"
              />
              <Input
                label="Last Name"
                value={formData.lastName}
                onValueChange={(value) => handleInputChange("lastName", value)}
                variant="bordered"
              />
            </div>

            <Input
              label="Tagline"
              value={formData.tagline}
              onValueChange={(value) => handleInputChange("tagline", value)}
              placeholder="e.g., Full Stack Developer & Tech Enthusiast"
              variant="bordered"
            />

            <Textarea
              label="Bio"
              value={formData.bio}
              onValueChange={(value) => handleInputChange("bio", value)}
              placeholder="Tell us about yourself..."
              minRows={3}
              maxRows={6}
              variant="bordered"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Website URL"
                value={formData.websiteUrl}
                onValueChange={(value) =>
                  handleInputChange("websiteUrl", value)
                }
                placeholder="https://yourwebsite.com"
                variant="bordered"
              />
              <Input
                label="Resume URL"
                value={formData.resume}
                onValueChange={(value) => handleInputChange("resume", value)}
                placeholder="https://link-to-your-resume.pdf"
                variant="bordered"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Contact Information
              </h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Email:</span> {profile.email}
                </p>
                {profile.websiteUrl && (
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Website:</span>
                    <a
                      href={profile.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1"
                    >
                      {profile.websiteUrl}
                      <FaExternalLinkAlt size={12} />
                    </a>
                  </div>
                )}
                {profile.resume && (
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Resume:</span>
                    <a
                      href={profile.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1"
                    >
                      View Resume
                      <FaFileDownload size={12} />
                    </a>
                  </div>
                )}
              </div>
            </div>

            {profile.bio && (
              <div>
                <h3 className="text-lg font-semibold mb-2">About</h3>
                <p className="text-default-600 leading-relaxed">
                  {profile.bio}
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="text-sm text-default-500">
                <span className="font-medium">Member since:</span>{" "}
                {profile.createdAt
                  ? new Date(profile.createdAt).toLocaleDateString()
                  : "N/A"}
              </div>
              {profile.updatedAt && (
                <div className="text-sm text-default-500">
                  <span className="font-medium">Last updated:</span>{" "}
                  {new Date(profile.updatedAt).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
}
