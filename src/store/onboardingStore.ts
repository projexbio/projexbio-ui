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

// Step 3 data
export interface CollegeInfo {
  collegeId: string;
  collegeEmail: string;
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

  // Step 3 - College Info
  collegeInfo: CollegeInfo;
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

  // Step 3 methods
  setCollegeInfo: (info: Partial<CollegeInfo>) => void;

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
  collegeInfo: {
    collegeId: "",
    collegeEmail: "",
  },
};

export const useOnboardingStore = create<OnboardingStore>((set) => ({
  ...initialState,

  goToStep: (step: number) =>
    set((state) => {
      return {
        currentStep: Math.min(
          Math.max(step, 1),
          Math.min(state.highestStepReached, state.totalSteps),
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

  // Step 3 data methods
  setCollegeInfo: (info: Partial<CollegeInfo>) =>
    set((state) => {
      const newCollegeInfo = { ...state.collegeInfo, ...info };
      return {
        collegeInfo: newCollegeInfo,
        highestStepReached: Math.max(state.highestStepReached, 4),
      };
    }),

  // Reset store
  resetStore: () => set(initialState),
}));
