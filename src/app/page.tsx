import Image from "next/image";
import Navbar from "@/components/LandingPage/Navbar";
import Footer from "@/components/LandingPage/Footer";
import ActionButtons from "@/components/LandingPage/ActionButtons";
import "./styles/noise.css";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      {" "}
      {/* Removed noise class */}
      <Navbar />
      <main className="container mx-auto px-6 pt-20 pb-16 flex-grow relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
          {/* Left Content */}
          <div className="space-y-8">
            <h1 className="font-anton text-5xl md:text-6xl font-normal text-white leading-tight">
              Empowering Projects
              <br />
              Across Campuses
            </h1>
            <p className="text-lg md:text-xl text-gray-300">
              ProjexBio helps students build a project portfolio, collaborate
              with peers, and submit work for assignments.
              <br />
              <span className="font-anton font-semibold text-white">
                Showcase. Collaborate. Submit.
              </span>
            </p>
            {/* Action Buttons */}
            <ActionButtons />
          </div>
          {/* Right Image */}
          <div className="relative mt-4 md:mt-0">
            <Image
              src="/dashboardpic.png"
              alt="ProjexBio preview"
              width={800}
              height={600}
              className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
              priority
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
