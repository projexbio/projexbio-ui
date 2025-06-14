import React, { useState, useEffect } from "react";
import { Form, Input, Tooltip, Button } from "@heroui/react";
import { useAuth } from "../../contexts/AuthContext";
import { FaUpload } from "react-icons/fa";
import Image from "next/image";
import { UserService } from "../../lib/api/users";
import { useOnboardingStore, UserProfile } from "@/store/onboardingStore";

const StepTwo: React.FC = () => {
  const { appwriteUser } = useAuth();
  const { userProfile, setUserProfile, goToStep } = useOnboardingStore();
  const [formData, setFormData] = useState<UserProfile>({
    firstName: userProfile.firstName || "",
    middleName: userProfile.middleName || "",
    lastName: userProfile.lastName || "",
    username: userProfile.username || "",
    primaryEmail: appwriteUser?.email || "",
    photo: userProfile.photo,
  });
  const [photoPreview, setPhotoPreview] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string>("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);

  useEffect(() => {
    // Set initial avatar if available from userProfile or Appwrite user
    if (userProfile.photo) {
      setPhotoPreview(userProfile.photo);
    } else if (appwriteUser?.prefs?.avatar) {
      setPhotoPreview(appwriteUser.prefs.avatar);
    }
  }, [appwriteUser, userProfile.photo]);

  const handleUsernameChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      username: value,
    }));

    // Don't check if username is empty or too short
    if (!value || value.length < 3) {
      setUsernameError(value ? "Username must be at least 3 characters" : "");
      return;
    }

    setIsCheckingUsername(true);
    try {
      const response = await UserService.checkUsernameAvailability(value);
      const { available } = response.data;
      setUsernameError(available ? "" : "This username is already taken");
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
    setFormData((prev: UserProfile) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size
    const maxSizeInBytes = 500 * 1024; // 500 KB
    if (file.size > maxSizeInBytes) {
      setError("Please upload an image smaller than 500KB");
      return;
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      setError(
        "Please upload a valid image file (JPG/JPEG, PNG, WEBP, or GIF)",
      );
      return;
    }

    // Create preview and store as base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setPhotoPreview(base64String);
      setFormData((prev) => ({
        ...prev,
        photo: base64String,
      }));
    };
    reader.readAsDataURL(file);
    setError("");
  };

  const preventSubmitOnEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      (e.target as HTMLElement).blur();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("formData", formData);
    setUserProfile(formData);
    goToStep(3);
  };

  return (
    <div className="max-w-4xl m-auto p-6">
      <Form
        onSubmit={handleSubmit}
        className="space-y-8 flex flex-col items-center"
      >
        {/* First row: Photo and Username */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full items-center">
          {/* Photo upload section */}
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
              {/* Upload icon overlay - always visible */}
              <div className="absolute inset-0 flex items-center justify-center bg-opacity-20 hover:bg-opacity-40 transition-all">
                <Tooltip
                  placement="bottom"
                  content="Upload photo (Max: 500KB, Formats: JPEG/PNG/WEBP/GIF)"
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

          {/* Username field */}
          <Input
            isRequired
            isClearable
            onClear={() => {
              setFormData((prev: UserProfile) => ({ ...prev, username: "" }));
            }}
            label="Username"
            placeholder="samIsSailing"
            variant="bordered"
            size="sm"
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleUsernameChange}
            onKeyDown={preventSubmitOnEnter}
            isInvalid={!!usernameError}
            errorMessage={usernameError}
            description={isCheckingUsername ? "Checking username..." : ""}
          />
        </div>

        {/* Second row: First Name and Middle Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full items-center">
          {/* First Name */}
          <Input
            isRequired
            isClearable
            onClear={() => {
              setFormData((prev: UserProfile) => ({ ...prev, firstName: "" }));
            }}
            label="First Name"
            placeholder="Sam"
            variant="bordered"
            size="sm"
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            onKeyDown={preventSubmitOnEnter}
          />

          {/* Middle Name */}
          <Input
            isClearable
            onClear={() => {
              setFormData((prev: UserProfile) => ({ ...prev, middleName: "" }));
            }}
            label="Middle Name"
            variant="bordered"
            size="sm"
            type="text"
            id="middleName"
            name="middleName"
            value={formData.middleName}
            onChange={handleInputChange}
            onKeyDown={preventSubmitOnEnter}
          />
        </div>

        {/* Third row: Last Name and Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full items-center">
          {/* Last Name */}
          <Input
            isClearable
            onClear={() => {
              setFormData((prev: UserProfile) => ({ ...prev, lastName: "" }));
            }}
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            label="Last Name"
            variant="bordered"
            size="sm"
            onKeyDown={preventSubmitOnEnter}
          />

          {/* Primary Email */}
          <Input
            type="email"
            id="primaryEmail"
            name="primaryEmail"
            value={formData.primaryEmail}
            isDisabled
            label="Primary Email"
            variant="bordered"
            size="sm"
          />
        </div>

        <Button type="submit" variant="ghost" color="primary">
          Save Information
        </Button>
      </Form>
    </div>
  );
};

export default StepTwo;
