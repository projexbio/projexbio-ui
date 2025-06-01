"use client";

import React from "react";
import { useOnboardingStore } from "@/store/onboardingStore";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import { Tabs, Tab } from "@heroui/tabs";

const OnboardingWrapper: React.FC = () => {
  const { currentStep, goToStep } = useOnboardingStore();

  return (
    <div className="max-w-3xl mx-auto my- bg-gray-10">
      <Tabs
        selectedKey={currentStep.toString()}
        onSelectionChange={(key) => goToStep(Number(key))}
        variant="bordered"
        color="primary"
        classNames={{
          tabContent: "text-sm",
          panel: "h-full",
        }}
        fullWidth
      >
        <Tab key="1" title="Role">
          <StepOne />
        </Tab>
        <Tab key="2" title="Personal Info">
          <StepTwo />
        </Tab>
        <Tab key="3" title="College Info">
          <StepThree />
        </Tab>
        <Tab key="4" title="Submit">
          <StepFour />
        </Tab>
      </Tabs>
    </div>
  );
};

export default OnboardingWrapper;
