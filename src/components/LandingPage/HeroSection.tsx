import Image from "next/image";
import ActionButtons from "./ActionButtons";

export default function HeroSection() {
  return (
    <div className="bg-black -mt-16 ">
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 pb-10 md:pb-16 relative overflow-hidden">
        <Image
          src="/assets/landingPageGraphics/1.svg"
          alt="ProjexBio"
          width={800}
          height={800}
          className="absolute top-0 left-0 object-cover z-0 opacity-50 w-[480px] h-[480px] sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] lg:w-[700px] lg:h-[700px]"
        />
        <Image
          src="/assets/landingPageGraphics/2.svg"
          alt="ProjexBio"
          width={700}
          height={700}
          className="absolute top-0 right-0 object-cover z-0 opacity-50 w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-96 lg:h-96"
        />

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center mb-10 md:mb-12 relative z-10">
          {/* Left Content */}
          <div className="space-y-6 md:space-y-8 text-center lg:text-left">
            <h1 className="font-norwester text-xl sm:text-2xl md:text-5xl font-normal text-white leading-tight">
              Empowering Projects
              <br />
              Across Campuses
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300">
              ProjexBio helps students build a project portfolio, collaborate
              with peers, and submit work for assignments.
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
      </section>
    </div>
  );
}
