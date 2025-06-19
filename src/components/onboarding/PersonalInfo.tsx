import React, { useEffect, useState } from "react";
import { Input, Tooltip, Chip } from "@heroui/react";
import { useAuth } from "../../contexts/AuthContext";
import { FaUpload } from "react-icons/fa";
import Image from "next/image";
import { UserService } from "../../lib/api/users";
import { useOnboardingStore } from "@/store/onboardingStore";

const PersonalInfo: React.FC = () => {
  const { appwriteUser } = useAuth();
  const { onboardingData, setOnboardingData } = useOnboardingStore();
  const [photoPreview, setPhotoPreview] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string>("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);

  // Sync primaryEmail from appwriteUser
  useEffect(() => {
    if (
      appwriteUser?.email &&
      onboardingData.primaryEmail !== appwriteUser.email
    ) {
      setOnboardingData({ primaryEmail: appwriteUser.email });
    }
  }, [appwriteUser, onboardingData.primaryEmail, setOnboardingData]);

  useEffect(() => {
    if (onboardingData.avatarFile) {
      const url = URL.createObjectURL(onboardingData.avatarFile);
      setPhotoPreview(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPhotoPreview("");
    }
  }, [onboardingData.avatarFile]);

  const handleUsernameChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value;
    setOnboardingData({ username: value });
    if (!value || value.length < 3 || value.length > 25) {
      setUsernameError(
        value ? "Username must be >= 3 characters and <= 25 characters" : "",
      );
      return;
    }
    setIsCheckingUsername(true);
    try {
      const response = await UserService.checkUsernameAvailability(value);
      setUsernameError(
        response.data.available ? "" : "This username is already taken",
      );
    } catch (error) {
      setUsernameError(
        error instanceof Error
          ? error.message
          : "Error checking username availability",
      );
    } finally {
      setIsCheckingUsername(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "primaryEmail") return;
    setOnboardingData({ [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const maxSizeInBytes = 500 * 1024;
    if (file.size > maxSizeInBytes) {
      setError("Please upload an image smaller than 500KB");
      return;
    }
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      setError(
        "Please upload a valid image file (JPG/JPEG, PNG, WEBP, or GIF)",
      );
      return;
    }
    setOnboardingData({ avatarFile: file });
    setError("");
  };

  return (
    <div className="max-w-4xl m-auto p-6 space-y-4">
      <Chip color="primary" size="sm">
        Personal Information
      </Chip>
      <div className="space-y-4 flex flex-col items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full items-center">
          <div className="flex flex-col items-center gap-4">
            <label
              htmlFor="photo-upload"
              className="relative w-28 h-28 rounded-full cursor-pointer group overflow-hidden"
            >
              {photoPreview ? (
                <Image
                  src={photoPreview}
                  alt="Profile preview"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-gray-200 group-hover:bg-gray-300 transition-all" />
              )}
              <div className="absolute inset-0 flex items-center justify-center bg-opacity-20 hover:bg-opacity-40 transition-all">
                <Tooltip
                  placement="bottom"
                  content="Upload Avatar (Max: 500KB, Formats: JPEG/PNG/WEBP/GIF)"
                  className="rounded-full"
                >
                  <FaUpload className="text-white transform scale-150" />
                </Tooltip>
              </div>
              <Input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleImageChange}
                className="hidden"
                id="photo-upload"
              />
            </label>
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
          </div>
          <Input
            isRequired
            isClearable
            onClear={() => setOnboardingData({ username: "" })}
            label="Username"
            placeholder="samIsSailing"
            variant="bordered"
            size="sm"
            type="text"
            id="username"
            name="username"
            value={onboardingData.username}
            onChange={handleUsernameChange}
            isInvalid={!!usernameError}
            errorMessage={usernameError}
            description={isCheckingUsername ? "Checking username..." : ""}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full items-center">
          <Input
            isRequired
            isClearable
            onClear={() => setOnboardingData({ firstName: "" })}
            label="First Name"
            placeholder="Sam"
            variant="bordered"
            size="sm"
            type="text"
            id="firstName"
            name="firstName"
            value={onboardingData.firstName}
            onChange={handleInputChange}
          />
          <Input
            isClearable
            onClear={() => setOnboardingData({ middleName: "" })}
            label="Middle Name"
            variant="bordered"
            size="sm"
            type="text"
            id="middleName"
            name="middleName"
            value={onboardingData.middleName}
            onChange={handleInputChange}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full items-center">
          <Input
            isClearable
            onClear={() => setOnboardingData({ lastName: "" })}
            type="text"
            id="lastName"
            name="lastName"
            value={onboardingData.lastName}
            onChange={handleInputChange}
            label="Last Name"
            variant="bordered"
            size="sm"
          />
          <Input
            type="email"
            id="primaryEmail"
            name="primaryEmail"
            value={onboardingData.primaryEmail}
            isDisabled
            label="Primary Email"
            variant="bordered"
            size="sm"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
