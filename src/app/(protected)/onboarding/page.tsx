import OnboardingWrapper from "@/components/onboarding/OnboardingWrapper";

export default function OnboardingPage() {
  return (
    <div>
      <div className="text-center my-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Welcome to ProjexBio
        </h1>
        <p className="text-gray-600">
          Please complete the onboarding process to get started
        </p>
      </div>
      <OnboardingWrapper />
    </div>
  );
}
