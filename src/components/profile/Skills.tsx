"use client";

import { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Chip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import { FaEdit, FaSave, FaTimes, FaPlus } from "react-icons/fa";
import { Skill } from "@/types/profile";

interface SkillsProps {
  skills: Skill[];
  isOwnProfile: boolean;
  onUpdate: (skills: Skill[]) => Promise<void>;
}

export default function Skills({
  skills,
  isOwnProfile,
  onUpdate,
}: SkillsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [skillsData, setSkillsData] = useState<Skill[]>(skills);
  const [newSkillName, setNewSkillName] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSkillsData(skills);
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      await onUpdate(skillsData);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update skills:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveSkill = (skillId: string) => {
    setSkillsData((prev) => prev.filter((skill) => skill.id !== skillId));
  };

  const handleAddSkill = () => {
    if (newSkillName.trim()) {
      const slug = newSkillName
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, "");
      const newSkill: Skill = {
        id: `temp-${Date.now()}`, // Temporary ID for demo
        name: newSkillName.trim(),
        slug: slug,
      };

      setSkillsData((prev) => [...prev, newSkill]);
      setNewSkillName("");
      onOpenChange();
    }
  };

  const skillColors = [
    "primary",
    "secondary",
    "success",
    "warning",
    "danger",
    "default",
  ] as const;

  const getSkillColor = (index: number) => {
    return skillColors[index % skillColors.length];
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Skills & Technologies</h3>
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
                Edit Skills
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
        {skillsData.length === 0 ? (
          <div className="text-center py-8 text-default-500">
            <p>No skills added yet.</p>
            {isOwnProfile && (
              <Button
                className="mt-2"
                variant="flat"
                color="primary"
                startContent={<FaPlus />}
                onPress={onOpen}
              >
                Add Your First Skill
              </Button>
            )}
          </div>
        ) : (
          <>
            <div className="flex flex-wrap gap-2 mb-4">
              {skillsData.map((skill, index) => (
                <Chip
                  key={skill.id}
                  color={getSkillColor(index)}
                  variant="flat"
                  onClose={
                    isEditing ? () => handleRemoveSkill(skill.id) : undefined
                  }
                  className="text-sm"
                >
                  {skill.name}
                </Chip>
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
                  Add Skill
                </Button>
              </div>
            )}
          </>
        )}
      </CardBody>

      {/* Add Skill Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add New Skill
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Skill Name"
                  placeholder="e.g., JavaScript, React, Python..."
                  value={newSkillName}
                  onValueChange={setNewSkillName}
                  variant="bordered"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={handleAddSkill}
                  isDisabled={!newSkillName.trim()}
                >
                  Add Skill
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </Card>
  );
}
