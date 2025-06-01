import { create } from "zustand";

// Step 1 data
export type Role = "STUDENT" | "FACULTY" | "";

// Step 2 data
export interface UserProfile {
  firstName: string;
  middleName?: string;
  lastName?: string;
  username: string;
  primaryEmail: string;
  photo?: string;
}

interface OnboardingState {
  // Navigation
  currentStep: number;
  highestStepReached: number;
  totalSteps: number;

  // Step 1 - Role Selection
  role: Role;

  // Step 2 - User Profile
  userProfile: UserProfile;
}

interface OnboardingStore extends OnboardingState {
  // Navigation methods
  // nextStep: () => void;
  // previousStep: () => void;
  goToStep: (step: number) => void;

  // Step 1 methods
  setRole: (role: Role) => void;

  // Step 2 methods
  setUserProfile: (profile: Partial<UserProfile>) => void;

  // Reset
  resetStore: () => void;
}

const initialState: OnboardingState = {
  currentStep: 1,
  highestStepReached: 1,
  totalSteps: 4,
  role: "",
  userProfile: {
    firstName: "",
    middleName: undefined,
    lastName: undefined,
    username: "",
    primaryEmail: "",
    photo: undefined,
  },
};

export const useOnboardingStore = create<OnboardingStore>((set, get) => ({
  ...initialState,

  goToStep: (step: number) =>
    set((state) => {
      // Only allow going to steps that have been reached or are immediately next
      console.log(state.highestStepReached, "highestStepReached");
      console.log(step, "step");
      console.log(state.totalSteps, "totalSteps");
      console.log(state.currentStep, "currentStep");

      return {
        currentStep: Math.min(
          Math.max(step, 1),
          Math.min(state.highestStepReached, state.totalSteps)
        ),
      };
    }),

  // Step 1 data methods
  setRole: (role: Role) =>
    set((state) => ({
      role,
      highestStepReached: Math.max(state.highestStepReached, 2),
    })),

  // Step 2 data methods
  setUserProfile: (profile: Partial<UserProfile>) =>
    set((state) => {
      const newUserProfile = { ...state.userProfile, ...profile };
      return {
        userProfile: newUserProfile,
        highestStepReached: Math.max(state.highestStepReached, 3),
      };
    }),

  // Reset store
  resetStore: () => set(initialState),
}));
