import React, { useEffect } from "react";
import { PiStudentFill } from "react-icons/pi";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { useOnboardingStore } from "@/store/onboardingStore";
import { Checkbox } from "@heroui/react";

const StepOne: React.FC = () => {
  const { role, setRole, goToStep } = useOnboardingStore();

  const handleRoleSelect = (selectedRole: "STUDENT" | "FACULTY") => {
    setRole(selectedRole);
    // wait 1 sec
    setTimeout(() => {
      goToStep(2);
    }, 500);
  };

  return (
    <div className="mx-6 flex flex-col h-full justify-center items-center">
      <Checkbox
        className="my-4 min-w-full max-w-full border-5 rounded-2xl border-brand-purple bg-brand-purple-50"
        isSelected={role === "STUDENT"}
        onValueChange={() => handleRoleSelect("STUDENT")}
      >
        <div className="flex items-center gap-2">
          <PiStudentFill className="" size={100} />
          <div className="flex flex-col">
            <p className="text-lg font-bold">Student</p>
            <p className="text-sm">
              Showcase your journey, build your project legacy, and stand out to
              recruiters. <br />
              It all starts here!
            </p>
          </div>
        </div>
      </Checkbox>
      <Checkbox
        className="my-4 min-w-full max-w-full border-5 rounded-2xl border-brand-blue bg-brand-blue-50"
        isSelected={role === "FACULTY"}
        onValueChange={() => handleRoleSelect("FACULTY")}
      >
        <div className="flex items-center gap-2">
          <LiaChalkboardTeacherSolid size={100} />
          <div className="flex flex-col">
            <p className="text-lg font-bold">Faculty</p>
            <p className="text-sm">
              Empower innovation, guide future tech leaders, and celebrate your
              students’ work. <br />
              Welcome aboard!
            </p>
          </div>
        </div>
      </Checkbox>
    </div>
  );
};

export default StepOne;
