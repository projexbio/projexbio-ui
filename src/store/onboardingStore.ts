import { create } from "zustand";

export interface OnboardingData {
  role: "STUDENT" | "FACULTY";
  firstName: string;
  middleName?: string;
  lastName?: string;
  username: string;
  primaryEmail: string;
  avatarFile?: File;
  collegeId: string;
  collegeEmail: string;
  // Student fields
  program?: string;
  branch?: string;
  startDate?: string;
  endDate?: string;
  // Faculty fields
  designation?: string;
}

interface OnboardingStore {
  onboardingData: OnboardingData;
  setOnboardingData: (data: Partial<OnboardingData>) => void;
  resetStore: () => void;
}

const initialState: OnboardingData = {
  role: "STUDENT",
  firstName: "",
  middleName: "",
  lastName: "",
  username: "",
  primaryEmail: "",
  avatarFile: undefined,
  collegeId: "",
  collegeEmail: "",
  program: "",
  branch: "",
  startDate: "",
  endDate: "",
  designation: "",
};

export const useOnboardingStore = create<OnboardingStore>((set) => ({
  onboardingData: initialState,
  setOnboardingData: (data: Partial<OnboardingData>) =>
    set((state) => {
      // console.log(state.onboardingData, data);
      return {
        onboardingData: { ...state.onboardingData, ...data },
      };
    }),
  resetStore: () => set({ onboardingData: initialState }),
}));
