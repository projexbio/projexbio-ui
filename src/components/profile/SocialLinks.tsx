"use client";

import { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Select,
  SelectItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Link,
} from "@heroui/react";
import {
  FaEdit,
  FaSave,
  FaTimes,
  FaPlus,
  FaExternalLinkAlt,
  FaTrash,
} from "react-icons/fa";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaDribbble,
  FaBehance,
  FaMedium,
  FaStackOverflow,
} from "react-icons/fa";
import { SocialLink } from "@/types/profile";

interface SocialLinksProps {
  socialLinks: SocialLink[];
  isOwnProfile: boolean;
  onUpdate: (socialLinks: SocialLink[]) => Promise<void>;
}

const platformOptions = [
  { value: "GitHub", label: "GitHub", icon: FaGithub },
  { value: "LinkedIn", label: "LinkedIn", icon: FaLinkedin },
  { value: "Twitter", label: "Twitter", icon: FaTwitter },
  { value: "Instagram", label: "Instagram", icon: FaInstagram },
  { value: "Facebook", label: "Facebook", icon: FaFacebook },
  { value: "YouTube", label: "YouTube", icon: FaYoutube },
  { value: "Dribbble", label: "Dribbble", icon: FaDribbble },
  { value: "Behance", label: "Behance", icon: FaBehance },
  { value: "Medium", label: "Medium", icon: FaMedium },
  { value: "Stack Overflow", label: "Stack Overflow", icon: FaStackOverflow },
];

export default function SocialLinks({
  socialLinks,
  isOwnProfile,
  onUpdate,
}: SocialLinksProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [socialLinksData, setSocialLinksData] =
    useState<SocialLink[]>(socialLinks);
  const [newLink, setNewLink] = useState({ platform: "", url: "" });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSocialLinksData(socialLinks);
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      await onUpdate(socialLinksData);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update social links:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveLink = (index: number) => {
    setSocialLinksData((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddLink = () => {
    if (newLink.platform && newLink.url) {
      setSocialLinksData((prev) => [...prev, newLink]);
      setNewLink({ platform: "", url: "" });
      onOpenChange();
    }
  };

  const getPlatformIcon = (platform: string) => {
    const platformData = platformOptions.find((p) => p.value === platform);
    if (platformData) {
      const IconComponent = platformData.icon;
      return <IconComponent size={20} />;
    }
    return <FaExternalLinkAlt size={20} />;
  };

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Social Links</h3>
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
                Edit Links
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

      <CardBody>
        {socialLinksData.length === 0 ? (
          <div className="text-center py-8 text-default-500">
            <p>No social links added yet.</p>
            {isOwnProfile && (
              <Button
                className="mt-2"
                variant="flat"
                color="primary"
                startContent={<FaPlus />}
                onPress={onOpen}
              >
                Add Social Link
              </Button>
            )}
          </div>
        ) : (
          <>
            <div className="space-y-3 mb-4">
              {socialLinksData.map((link, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-default-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-primary">
                      {getPlatformIcon(link.platform)}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{link.platform}</p>
                      <Link
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-default-600 hover:text-primary"
                        showAnchorIcon
                      >
                        {link.url}
                      </Link>
                    </div>
                  </div>
                  {isEditing && (
                    <Button
                      isIconOnly
                      size="sm"
                      variant="flat"
                      color="danger"
                      onPress={() => handleRemoveLink(index)}
                    >
                      <FaTrash size={14} />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {isEditing && (
              <div className="flex justify-center">
                <Button
                  variant="flat"
                  color="primary"
                  startContent={<FaPlus />}
                  onPress={onOpen}
                  size="sm"
                >
                  Add Link
                </Button>
              </div>
            )}
          </>
        )}
      </CardBody>

      {/* Add Social Link Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Social Link
              </ModalHeader>
              <ModalBody className="space-y-4">
                <Select
                  label="Platform"
                  placeholder="Select a platform"
                  selectedKeys={newLink.platform ? [newLink.platform] : []}
                  onSelectionChange={(keys) => {
                    const selectedKey = Array.from(keys)[0] as string;
                    setNewLink((prev) => ({
                      ...prev,
                      platform: selectedKey || "",
                    }));
                  }}
                  variant="bordered"
                >
                  {platformOptions.map((platform) => (
                    <SelectItem key={platform.value}>
                      <div className="flex items-center gap-2">
                        <platform.icon size={16} />
                        {platform.label}
                      </div>
                    </SelectItem>
                  ))}
                </Select>

                <Input
                  label="URL"
                  placeholder="https://..."
                  value={newLink.url}
                  onValueChange={(value) =>
                    setNewLink((prev) => ({ ...prev, url: value }))
                  }
                  variant="bordered"
                  isInvalid={newLink.url !== "" && !validateUrl(newLink.url)}
                  errorMessage={
                    newLink.url !== "" && !validateUrl(newLink.url)
                      ? "Please enter a valid URL"
                      : ""
                  }
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={handleAddLink}
                  isDisabled={
                    !newLink.platform ||
                    !newLink.url ||
                    !validateUrl(newLink.url)
                  }
                >
                  Add Link
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </Card>
  );
}
