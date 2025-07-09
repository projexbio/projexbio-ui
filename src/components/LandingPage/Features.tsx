import Image from "next/image";
import { Card, CardHeader, CardBody } from "@heroui/card";
import HowItWorks from "./HowItWorks";

export default function Features() {
  const features = [
    {
      title: "Student Project Portfolio",
      description:
        "Your personal space to showcase all your tech projects, with your bio, college, and collaboration status.",
      image: "/features/portfolio.svg",
    },
    {
      title: "Team Up & Collaborate",
      description:
        'Invite others to contribute or mark your project as "looking for contributors" to build something great together.',
      image: "/features/team.svg",
    },
    {
      title: "College Projects Explorer",
      description:
        "Discover what students are building in your college — or browse cool projects from other campuses too.",
      image: "/features/project.svg",
    },
    {
      title: "Smart Assignment Submission",
      description:
        "Turn in class assignments or contest entries through structured faculty hubs — no messy forms.",
      image: "/features/assignment.svg",
    },
  ];

  return (
    <div className="bg-[#f5f5f5]">
      <section
        id="features"
        className="pt-8 md:pt-10 px-4 sm:px-6 lg:px-8"
        style={{ scrollMarginTop: "2.5rem" }}
      >
        <div className="max-w-7xl mx-auto text-center mb-8">
          <h2 className="font-norwester text-2xl md:text-4xl font-bold text-black mb-2 tracking-wide">
            ProjexBio Features
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Powerful tools built for students and educators, with zero cost
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 lg:gap-10 max-w-6xl mx-auto">
          {features.map((feature, idx) => (
            <Card
              key={idx}
              className="w-full max-w-[95%] bg-white border border-gray-300 rounded-xl shadow-sm flex flex-col justify-between h-[330px] md:h-[380px] hover:scale-[1.015] transition-transform duration-900 mx-auto"
            >
              <CardHeader className="p-4 md:p-5">
                <h3 className="text-sm md:text-lg font-semibold text-black leading-snug">
                  {feature.title}
                </h3>
              </CardHeader>

              <CardBody className="px-4 md:px-5 text-left flex-1 flex flex-col justify-between p-0 m-0">
                <p className="text-gray-700 text-xs md:text-sm mb-2">
                  {feature.description}
                </p>

                <div className="absolute bottom-0 left-0 w-full h-[160px] md:h-[220px] flex justify-center items-end">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    width={400}
                    height={300}
                    className="object-contain w-full h-full"
                  />
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      <HowItWorks id="how-it-works" />
    </div>
  );
}
