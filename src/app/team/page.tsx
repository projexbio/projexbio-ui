import Team from "@/components/LandingPage/Team";

export default function TeamPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">Meet the ProjexBio Team</h1>
      <p className="mb-8 text-lg text-gray-600">
        This is where you meet our amazing team!
      </p>
      <Team />
    </main>
  );
}
