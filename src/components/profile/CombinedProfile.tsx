"use client";

import { useState } from "react";
import {
  Card,
  CardBody,
  Button,
  Avatar,
  Chip,
  Link,
  Input,
  Textarea,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaGlobe,
  FaFileAlt,
  FaEdit,
  FaPlus,
  FaTimes,
  FaExternalLinkAlt,
} from "react-icons/fa";
import {
  UserProfile,
  PersonalInfoFormData,
  SocialLink,
  Skill,
} from "@/types/profile";

// Extended SocialLink interface with id for local state management
interface SocialLinkWithId extends SocialLink {
  id: string;
}

interface CombinedProfileProps {
  profile: UserProfile;
  isOwnProfile: boolean;
  onUpdatePersonalInfo: (data: PersonalInfoFormData) => Promise<void>;
  onUpdateSkills: (skills: Skill[]) => Promise<void>;
  onUpdateSocialLinks: (socialLinks: SocialLink[]) => Promise<void>;
}

export default function CombinedProfile({
  profile,
  isOwnProfile,
  onUpdatePersonalInfo,
  onUpdateSkills,
  onUpdateSocialLinks,
}: CombinedProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Form state
  const [formData, setFormData] = useState<PersonalInfoFormData>({
    firstName: profile.firstName,
    middleName: profile.middleName || "",
    lastName: profile.lastName || "",
    tagline: profile.tagline || "",
    bio: profile.bio || "",
    websiteUrl: profile.websiteUrl || "",
    resume: profile.resume || "",
  });

  const [skills, setSkills] = useState<Skill[]>(profile.skills);
  const [socialLinks, setSocialLinks] = useState<SocialLinkWithId[]>(
    profile.socialLinks.map((link, index) => ({
      ...link,
      id: index.toString(),
    })),
  );

  // Skill management
  const [newSkill, setNewSkill] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Social links management
  const [newSocialLink, setNewSocialLink] = useState({
    platform: "",
    url: "",
  });
  const {
    isOpen: isSocialModalOpen,
    onOpen: onSocialModalOpen,
    onClose: onSocialModalClose,
  } = useDisclosure();

  const handleSave = async () => {
    try {
      setIsUpdating(true);

      // Update all profile data
      await Promise.all([
        onUpdatePersonalInfo(formData),
        onUpdateSkills(skills),
        onUpdateSocialLinks(
          socialLinks.map((link) => ({
            platform: link.platform,
            url: link.url,
          })),
        ),
      ]);

      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    // Reset form data
    setFormData({
      firstName: profile.firstName,
      middleName: profile.middleName || "",
      lastName: profile.lastName || "",
      tagline: profile.tagline || "",
      bio: profile.bio || "",
      websiteUrl: profile.websiteUrl || "",
      resume: profile.resume || "",
    });
    setSkills(profile.skills);
    setSocialLinks(
      profile.socialLinks.map((link, index) => ({
        ...link,
        id: index.toString(),
      })),
    );
    setIsEditing(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 500 * 1024) {
        alert("File size must be less than 500KB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        // Note: We would need to handle file upload to get an avatarFileId
        // For now, we'll just show the preview but won't save it
        console.log("File uploaded:", result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addSkill = () => {
    if (
      newSkill.trim() &&
      !skills.some((skill) => skill.name === newSkill.trim())
    ) {
      const slug = newSkill
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, "");
      setSkills([
        ...skills,
        {
          id: Date.now().toString(),
          name: newSkill.trim(),
          slug: slug,
        },
      ]);
      setNewSkill("");
      onClose();
    }
  };

  const removeSkill = (skillId: string) => {
    setSkills(skills.filter((skill) => skill.id !== skillId));
  };

  const addSocialLink = () => {
    if (newSocialLink.platform && newSocialLink.url) {
      setSocialLinks([
        ...socialLinks,
        {
          id: Date.now().toString(),
          platform: newSocialLink.platform,
          url: newSocialLink.url,
        },
      ]);
      setNewSocialLink({ platform: "", url: "" });
      onSocialModalClose();
    }
  };

  const removeSocialLink = (linkId: string) => {
    setSocialLinks(socialLinks.filter((link) => link.id !== linkId));
  };

  const getSocialIcon = (platform: string) => {
    const iconProps = { size: 20 };
    switch (platform.toLowerCase()) {
      case "github":
        return <FaGithub {...iconProps} />;
      case "linkedin":
        return <FaLinkedin {...iconProps} />;
      case "twitter":
        return <FaTwitter {...iconProps} />;
      case "instagram":
        return <FaInstagram {...iconProps} />;
      default:
        return <FaGlobe {...iconProps} />;
    }
  };

  const getSkillColor = (index: number) => {
    const colors = ["primary", "secondary", "success", "warning", "danger"];
    return colors[index % colors.length] as
      | "primary"
      | "secondary"
      | "success"
      | "warning"
      | "danger";
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
      <CardBody className="p-6">
        {/* Header: Photo, Username, Tagline */}
        <div className="flex items-center gap-4 mb-8">
          <div className="relative">
            <Avatar
              src={
                profile.avatarFileId
                  ? `/api/files/${profile.avatarFileId}`
                  : undefined
              }
              alt={getFullName()}
              className="w-20 h-20"
            />
            {isEditing && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                <label className="cursor-pointer">
                  <FaEdit className="text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold">
                {isEditing ? (
                  <div className="flex gap-2">
                    <Input
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          firstName: e.target.value,
                        }))
                      }
                      placeholder="First name"
                      variant="underlined"
                      size="sm"
                    />
                    <Input
                      value={formData.middleName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          middleName: e.target.value,
                        }))
                      }
                      placeholder="Middle name"
                      variant="underlined"
                      size="sm"
                    />
                    <Input
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          lastName: e.target.value,
                        }))
                      }
                      placeholder="Last name"
                      variant="underlined"
                      size="sm"
                    />
                  </div>
                ) : (
                  getFullName()
                )}
              </h1>
              <span className="text-default-500 text-lg">
                @{profile.username}
              </span>
            </div>

            <p className="text-default-600">
              {isEditing ? (
                <Input
                  value={formData.tagline}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      tagline: e.target.value,
                    }))
                  }
                  placeholder="Your tagline"
                  variant="underlined"
                />
              ) : (
                profile.tagline || "No tagline set"
              )}
            </p>
          </div>

          {isOwnProfile && (
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <Button
                    color="success"
                    onPress={handleSave}
                    isLoading={isUpdating}
                  >
                    Save
                  </Button>
                  <Button variant="flat" onPress={handleCancel}>
                    Cancel
                  </Button>
                </>
              ) : (
                <Button
                  startContent={<FaEdit />}
                  onPress={() => setIsEditing(true)}
                >
                  Edit Profile
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Profile Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Email */}
            <div>
              <p className="text-sm font-medium text-default-600 mb-1">Email</p>
              <p className="text-default-900">{profile.email}</p>
            </div>

            {/* About/Bio */}
            <div>
              <p className="text-sm font-medium text-default-600 mb-2">About</p>
              {isEditing ? (
                <Textarea
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, bio: e.target.value }))
                  }
                  placeholder="Tell us about yourself..."
                  minRows={3}
                />
              ) : (
                <p className="text-default-700 leading-relaxed">
                  {profile.bio || "No bio available"}
                </p>
              )}
            </div>

            {/* Links */}
            <div>
              <p className="text-sm font-medium text-default-600 mb-2">Links</p>
              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <Input
                      value={formData.websiteUrl}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          websiteUrl: e.target.value,
                        }))
                      }
                      placeholder="Website URL"
                      startContent={<FaGlobe />}
                    />
                    <Input
                      value={formData.resume}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          resume: e.target.value,
                        }))
                      }
                      placeholder="Resume URL"
                      startContent={<FaFileAlt />}
                    />
                  </>
                ) : (
                  <>
                    {profile.websiteUrl && (
                      <Button
                        as={Link}
                        href={profile.websiteUrl}
                        target="_blank"
                        variant="flat"
                        size="sm"
                        startContent={<FaGlobe />}
                        endContent={<FaExternalLinkAlt size={12} />}
                      >
                        Website
                      </Button>
                    )}
                    {profile.resume && (
                      <Button
                        as={Link}
                        href={profile.resume}
                        target="_blank"
                        variant="flat"
                        size="sm"
                        startContent={<FaFileAlt />}
                        endContent={<FaExternalLinkAlt size={12} />}
                      >
                        Resume
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Skills */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-default-600">Skills</p>
                {isEditing && (
                  <Button size="sm" variant="flat" onPress={onOpen}>
                    <FaPlus size={12} />
                  </Button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <Chip
                    key={skill.id}
                    color={getSkillColor(index)}
                    variant="flat"
                    onClose={
                      isEditing ? () => removeSkill(skill.id) : undefined
                    }
                  >
                    {skill.name}
                  </Chip>
                ))}
                {skills.length === 0 && (
                  <p className="text-default-500 text-sm">No skills listed</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Social Links */}
          <div className="lg:col-span-1">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-default-600">
                Social Links
              </p>
              {isEditing && (
                <Button size="sm" variant="flat" onPress={onSocialModalOpen}>
                  <FaPlus size={12} />
                </Button>
              )}
            </div>
            <div className="space-y-2">
              {socialLinks.map((link) => (
                <div key={link.id} className="flex items-center gap-2">
                  <Button
                    as={Link}
                    href={link.url}
                    target="_blank"
                    variant="flat"
                    size="sm"
                    className="w-full justify-start"
                    startContent={getSocialIcon(link.platform)}
                    endContent={<FaExternalLinkAlt size={12} />}
                  >
                    {link.platform}
                  </Button>
                  {isEditing && (
                    <Button
                      size="sm"
                      color="danger"
                      variant="flat"
                      isIconOnly
                      onPress={() => removeSocialLink(link.id)}
                    >
                      <FaTimes size={12} />
                    </Button>
                  )}
                </div>
              ))}
              {socialLinks.length === 0 && (
                <p className="text-default-500 text-sm">No social links</p>
              )}
            </div>
          </div>
        </div>

        {/* Add Skill Modal */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            <ModalHeader>Add New Skill</ModalHeader>
            <ModalBody>
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Enter skill name"
                onKeyPress={(e) => e.key === "Enter" && addSkill()}
              />
            </ModalBody>
            <ModalFooter>
              <Button variant="flat" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" onPress={addSkill}>
                Add Skill
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Add Social Link Modal */}
        <Modal isOpen={isSocialModalOpen} onClose={onSocialModalClose}>
          <ModalContent>
            <ModalHeader>Add Social Link</ModalHeader>
            <ModalBody>
              <Input
                value={newSocialLink.platform}
                onChange={(e) =>
                  setNewSocialLink((prev) => ({
                    ...prev,
                    platform: e.target.value,
                  }))
                }
                placeholder="Platform name (e.g., GitHub, LinkedIn)"
                className="mb-4"
              />
              <Input
                value={newSocialLink.url}
                onChange={(e) =>
                  setNewSocialLink((prev) => ({ ...prev, url: e.target.value }))
                }
                placeholder="URL"
              />
            </ModalBody>
            <ModalFooter>
              <Button variant="flat" onPress={onSocialModalClose}>
                Cancel
              </Button>
              <Button color="primary" onPress={addSocialLink}>
                Add Link
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </CardBody>
    </Card>
  );
}
