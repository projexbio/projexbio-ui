import React from "react";
import { PiStudentFill } from "react-icons/pi";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { useOnboardingStore } from "@/store/onboardingStore";
import { Checkbox, Chip } from "@heroui/react";

const RoleSelection: React.FC = () => {
  const { onboardingData, setOnboardingData } = useOnboardingStore();

  const handleRoleSelect = (selectedRole: "STUDENT" | "FACULTY") => {
    setOnboardingData({ role: selectedRole });
  };

  return (
    <>
      <Chip color="primary" size="sm">
        Role Selection
      </Chip>
      <div className="p-6 flex flex-col md:flex-row gap-6 justify-center font-semibold">
        <Checkbox
          className="border border-gray-300 rounded-2xl h-14"
          isSelected={onboardingData.role === "STUDENT"}
          onValueChange={() => handleRoleSelect("STUDENT")}
        >
          <div className="flex items-center">
            <PiStudentFill size={30} />
            <p>Student</p>
          </div>
        </Checkbox>
        <Checkbox
          className="border border-gray-300 rounded-2xl h-14"
          isSelected={onboardingData.role === "FACULTY"}
          onValueChange={() => handleRoleSelect("FACULTY")}
        >
          <div className="flex items-center">
            <LiaChalkboardTeacherSolid size={30} />
            <p>Faculty</p>
          </div>
        </Checkbox>
      </div>
    </>
  );
};

export default RoleSelection;
