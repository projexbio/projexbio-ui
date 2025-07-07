import Image from "next/image";
import Link from "next/link";
import { Card, CardHeader, CardBody } from "@heroui/card";

const steps = [
  {
    step: "01",
    title: "Sign Up, Select Role & Verify Institute",
    description: [
      "<strong>Students:</strong> Choose/Req your institute & create your project portfolio.",
      "<strong>Faculty:</strong> Create an educator account, verify your college, and control your institute.",
    ],
    image: "/features/signup.svg",
  },
  {
    step: "02",
    title: "Build & Submit Projects",
    description: [
      "<strong>Students:</strong> Add your projects with title, description, GitHub link, tech stack—you'll also mark if you're 'looking for contributors.'",
      "<strong>Faculty:</strong> Create assignment hubs or contest pages, with details & deadlines.",
    ],
    image: "/features/build.svg",
  },
  {
    step: "03",
    title: "Collaborate & Review",
    description: [
      "<strong>Students:</strong> Invite peers to contribute or discover projects looking for help.",
      "<strong>Faculty:</strong> Students submit to your hub—view submissions in one place, provide feedback or status updates.",
    ],
    image: "/howitworks/review.png",
  },
  {
    step: "04",
    title: "Discover & Showcase",
    description: [
      "<strong>Students:</strong> Browse projects from your campus or globally with filters by domain/branch.",
      "<strong>Faculty:</strong> Monitor submissions, share standout work with other students or across colleges.",
    ],
    image: "/howitworks/showcase.png",
  },
];

export default function HowItWorks() {
  return (
    <section className="pt-12 pb-8 px-6">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-black mb-2">
          How It Works?
        </h2>
        <p className="text-gray-600 text-lg">
          Simple steps to get started with ProjexBio
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Sign Up */}
        <Card className="bg-white border border-gray-300 rounded-xl shadow-md p-6 text-left space-y-3">
          <CardHeader>
            <h3 className="text-lg font-bold text-black">{steps[0].title}</h3>
          </CardHeader>
          <CardBody>
            <ul className="text-gray-700 text-sm space-y-2 list-disc list-inside">
              {steps[0].description.map((line, i) => (
                <li
                  key={i}
                  dangerouslySetInnerHTML={{ __html: line }}
                  className="leading-snug"
                />
              ))}
            </ul>
            <div className="flex justify-center mt-12">
              <Image
                src={steps[0].image}
                alt={steps[0].title}
                width={220}
                height={220}
                className="object-contain hover:scale-105 transition-transform"
              />
            </div>
          </CardBody>
        </Card>

        {/* Build & Submit */}
        <Card className="bg-white border border-gray-300 rounded-xl shadow-md p-6 text-left space-y-3">
          <CardHeader>
            <h3 className="text-lg font-bold text-black">{steps[1].title}</h3>
          </CardHeader>
          <CardBody>
            <ul className="text-gray-700 text-sm space-y-2 list-disc list-inside">
              {steps[1].description.map((line, i) => (
                <li
                  key={i}
                  dangerouslySetInnerHTML={{ __html: line }}
                  className="leading-snug"
                />
              ))}
            </ul>
            <div className="flex justify-center mt-12">
              <Image
                src={steps[1].image}
                alt={steps[1].title}
                width={160}
                height={160}
                className="object-contain hover:scale-105 transition-transform"
              />
            </div>
          </CardBody>
        </Card>

        {/* Column: Collaborate & Discover */}
        <div className="flex flex-col gap-8">
          {/* Collaborate */}
          <Card className="bg-white border border-gray-300 rounded-xl shadow-md p-6 text-left space-y-3">
            <CardHeader>
              <h3 className="text-lg font-bold text-black">{steps[2].title}</h3>
            </CardHeader>
            <CardBody>
              <ul className="text-gray-700 text-sm space-y-2 list-disc list-inside">
                {steps[2].description.map((line, i) => (
                  <li
                    key={i}
                    dangerouslySetInnerHTML={{ __html: line }}
                    className="leading-snug"
                  />
                ))}
              </ul>
            </CardBody>
          </Card>

          {/* Discover */}
          <Card className="bg-white border border-gray-300 rounded-xl shadow-md p-6 text-left space-y-3">
            <CardHeader>
              <h3 className="text-lg font-bold text-black">{steps[3].title}</h3>
            </CardHeader>
            <CardBody>
              <ul className="text-gray-700 text-sm space-y-2 list-disc list-inside">
                {steps[3].description.map((line, i) => (
                  <li
                    key={i}
                    dangerouslySetInnerHTML={{ __html: line }}
                    className="leading-snug"
                  />
                ))}
              </ul>
            </CardBody>
          </Card>
        </div>
      </div>

      <div className="text-center mt-12">
        <Link href="/signup">
          <button className="pearl-button">
            <div className="wrap">
              <p>Get Started</p>
            </div>
          </button>
        </Link>
      </div>
    </section>
  );
}
