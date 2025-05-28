"use client";

import React from "react";
import { useOnboardingStore } from "@/store/onboardingStore";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import { Tabs, Tab } from "@heroui/tabs";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const OnboardingWrapper: React.FC = () => {
  const { currentStep, nextStep, previousStep, totalSteps } =
    useOnboardingStore();

  return (
    <div className="max-w-2xl mx-auto">
      <Tabs
        selectedKey={currentStep.toString()}
        onSelectionChange={(key) =>
          useOnboardingStore.getState().goToStep(Number(key))
        }
        variant="underlined"
        color="primary"
        classNames={{
          tabList: "m-auto",
          tab: "px-4 py-2",
          tabContent: "text-sm",
        }}
      >
        <Tab key="1" title="Role">
          <div className="bg-white rounded-lg p-6">
            <StepOne />
          </div>
        </Tab>
        <Tab key="2" title="Personal Info">
          <div className="bg-white rounded-lg p-6">
            <StepTwo />
          </div>
        </Tab>
        <Tab key="3" title="College Info">
          <div className="bg-white rounded-lg p-6">
            <StepThree />
          </div>
        </Tab>
        <Tab key="4" title="Submit">
          <div className="bg-white rounded-lg p-6">
            <StepFour />
          </div>
        </Tab>
      </Tabs>
      <NavigationButtons
        currentStep={currentStep}
        totalSteps={totalSteps}
        onNext={nextStep}
        onPrevious={previousStep}
      />
    </div>
  );
};

interface NavigationButtonsProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
}) => (
  <div className="flex justify-between mt-8">
    <button
      onClick={onPrevious}
      className={`flex items-center px-6 py-2 rounded-lg ${
        currentStep === 1
          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}
      disabled={currentStep === 1}
    >
      <FiArrowLeft className="w-5 h-5 mr-2" />
      Back
    </button>
    <button
      onClick={onNext}
      className={`flex items-center px-6 py-2 rounded-lg ${
        currentStep === totalSteps
          ? "bg-green-600 hover:bg-green-700"
          : "bg-blue-600 hover:bg-blue-700"
      } text-white`}
    >
      {currentStep === totalSteps ? (
        "Submit"
      ) : (
        <>
          Next
          <FiArrowRight className="w-5 h-5 ml-2" />
        </>
      )}
    </button>
  </div>
);

export default OnboardingWrapper;
