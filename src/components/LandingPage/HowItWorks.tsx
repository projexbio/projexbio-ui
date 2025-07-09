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

export default function HowItWorks({ id = "how-it-works" }) {
  return (
    <section
      id={id}
      className="pt-12 pb-16 px-4 sm:px-8 bg-[#f5f5f5]"
      style={{ scrollMarginTop: "2.5rem" }}
    >
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="font-norwester text-3xl md:text-5xl font-bold text-black mb-3">
          How It Works?
        </h2>
        <p className="text-gray-500 text-base md:text-lg">
          Powerful tools built for students and educators, with zero cost
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {/* First two cards */}
        <Card className="bg-white border border-gray-300 rounded-xl shadow-md p-5 space-y-4 hover:scale-[1.015] transition-transform duration-900">
          <CardHeader>
            <h3 className="text-lg md:text-xl font-bold text-black leading-snug">
              {steps[0].title}
            </h3>
          </CardHeader>
          <CardBody>
            <ul className="text-gray-700 text-sm space-y-2 list-disc list-inside">
              {steps[0].description.map((line, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: line }} />
              ))}
            </ul>
            <div className="flex justify-center items-center mt-8 mb-0">
              <Image
                src={steps[0].image}
                alt={steps[0].title}
                width={140}
                height={140}
                className="object-contain w-[150px] h-[150px] md:w-[200px] md:h-[200px] scale-110 md:scale-125 transition-transform duration-900"
              />
            </div>
          </CardBody>
        </Card>

        <Card className="bg-white border border-gray-300 rounded-xl shadow-md p-5 space-y-4 hover:scale-[1.015] transition-transform duration-900">
          <CardHeader>
            <h3 className="text-lg md:text-xl font-bold text-black leading-snug">
              {steps[1].title}
            </h3>
          </CardHeader>
          <CardBody>
            <ul className="text-gray-700 text-sm space-y-2 list-disc list-inside">
              {steps[1].description.map((line, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: line }} />
              ))}
            </ul>
            <div className="flex justify-center items-center mt-14 mb-0">
              <Image
                src={steps[1].image}
                alt={steps[1].title}
                width={160}
                height={160}
                className="object-contain w-[130px] h-[130px] md:w-[180px] md:h-[180px] scale-110 md:scale-125 transition-transform duration-900"
              />
            </div>
          </CardBody>
        </Card>

        {/* Right side two stacked cards */}
        <div className="flex flex-col gap-8">
          <Card className="bg-white border border-gray-300 rounded-xl shadow-md p-5 space-y-4 hover:scale-[1.015] transition-transform duration-900">
            <CardHeader>
              <h3 className="text-lg md:text-xl font-bold text-black leading-snug">
                {steps[2].title}
              </h3>
            </CardHeader>
            <CardBody>
              <ul className="text-gray-700 text-sm space-y-2 list-disc list-inside">
                {steps[2].description.map((line, i) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: line }} />
                ))}
              </ul>
            </CardBody>
          </Card>

          <Card className="bg-white border border-gray-300 rounded-xl shadow-md p-5 space-y-4 hover:scale-[1.015] transition-transform duration-900">
            <CardHeader>
              <h3 className="text-lg md:text-xl font-bold text-black leading-snug">
                {steps[3].title}
              </h3>
            </CardHeader>
            <CardBody>
              <ul className="text-gray-700 text-sm space-y-2 list-disc list-inside">
                {steps[3].description.map((line, i) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: line }} />
                ))}
              </ul>
            </CardBody>
          </Card>
        </div>
      </div>

      <div className="text-center mt-8 md:mt-12">
        <Link href="/signup">
          <button className="pearl-button w-full sm:w-auto">
            <div className="wrap">
              <p>Get Started</p>
            </div>
          </button>
        </Link>
      </div>
    </section>
  );
}
