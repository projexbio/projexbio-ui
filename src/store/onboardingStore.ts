import { create } from "zustand";

interface OnboardingStore {
  currentStep: number;
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (step: number) => void;
  totalSteps: number;
}

export const useOnboardingStore = create<OnboardingStore>((set) => ({
  currentStep: 1,
  totalSteps: 4,
  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, state.totalSteps),
    })),
  previousStep: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 1),
    })),
  goToStep: (step: number) =>
    set((state) => ({
      currentStep: Math.min(Math.max(step, 1), state.totalSteps),
    })),
}));
