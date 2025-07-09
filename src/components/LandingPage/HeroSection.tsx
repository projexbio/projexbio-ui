import Image from "next/image";
import ActionButtons from "./ActionButtons";

export default function HeroSection() {
  return (
    <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-10 md:mb-12">
      {/* Left Content */}
      <div className="space-y-6 md:space-y-8">
        <h1 className="font-norwester text-3xl sm:text-4xl md:text-6xl font-normal text-white leading-tight">
          Empowering Projects
          <br />
          Across Campuses
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-300">
          ProjexBio helps students build a project portfolio, collaborate with
          peers, and submit work for assignments.
          <br />
          <span className=" font-semibold text-white">
            Showcase. Collaborate. Submit.
          </span>
        </p>
        {/* Action Buttons */}
        <ActionButtons />
      </div>
      {/* Right Image */}
      <div className="relative mt-6 md:mt-0 flex justify-center md:justify-end overflow-visible">
        <div className="w-full max-w-[400px] md:max-w-full mx-auto md:mx-0 transition-all duration-500 ease-in-out">
          <Image
            src="/dashboardpic.png"
            alt="ProjexBio preview"
            width={800}
            height={600}
            className="rounded-2xl shadow-lg w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}
