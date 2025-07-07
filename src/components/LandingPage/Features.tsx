import Image from "next/image";
// import Link from "next/link";
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
      {/* Features Section */}
      <section className="pt-10 px-6">
        <div className="max-w-7xl mx-auto text-center mb-6">
          <h2 className="text-4xl md:text-5xl font-bold  text-black mb-2">
            ProjexBio Features
          </h2>
          <p className="text-gray-600 text-lg">
            Powerful tools built for students and educators, with zero cost
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {features.map((feature, idx) => (
            <Card
              key={idx}
              className="bg-white border border-gray-300 rounded-xl shadow-md p-6 flex flex-col gap-4 text-left"
            >
              <CardHeader>
                <h3 className="text-xl font-semibold text-black">
                  {feature.title}
                </h3>
              </CardHeader>
              <CardBody>
                <p className="text-gray-700">{feature.description}</p>
                <div
                  className={`flex justify-center items-center ${idx === 0 || idx === 2 ? "mt-10" : "mt-6"}`}
                >
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    width={idx === 0 || idx === 2 ? 320 : 270}
                    height={idx === 0 || idx === 2 ? 320 : 270}
                    className="object-contain"
                  />
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <HowItWorks />
    </div>
  );
}
