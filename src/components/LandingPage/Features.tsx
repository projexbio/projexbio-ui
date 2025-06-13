import Image from "next/image";
import Link from "next/link";

export default function Features() {
  const features = [
    {
      title: "Student Project Portfolio",
      description:
        "Your personal space to showcase all your tech projects, with your bio, college, and collaboration status.",
      image: "/features/portfolio.png",
    },
    {
      title: "Team Up & Collaborate",
      description:
        'Invite others to contribute or mark your project as "looking for contributors" to build something great together.',
      image: "/features/collaborate.png",
    },
    {
      title: "College Projects Explorer",
      description:
        "Discover what students are building in your college — or browse cool projects from other campuses too.",
      image: "/features/explorer.png",
    },
    {
      title: "Smart Assignment Submission",
      description:
        "Turn in class assignments or contest entries through structured faculty hubs — no messy forms.",
      image: "/features/submission.png",
    },
  ];

  const steps = [
    {
      step: "01",
      title: "Sign Up, Select Role & Verify Institute",
      description: [
        "<strong>Students:</strong> Choose/Req your institute & create your project portfolio.",
        "<strong>Faculty:</strong> Create an educator account, verify your college, and control your institute.",
      ],
      image: "/howitworks/signup.png",
    },
    {
      step: "02",
      title: "Build & Submit Projects",
      description: [
        "<strong>Students:</strong> Add your projects with title, description, GitHub link, tech stack—you’ll also mark if you’re “looking for contributors.”",
        "<strong>Faculty:</strong> Create assignment hubs or contest pages, with details & deadlines.",
      ],
      image: "/howitworks/submit.png",
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

  return (
    <div className="bg-[#f5f5f5]">
      {/* Features Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-anton text-black mb-2">
            ProjexBio Features
          </h2>
          <p className="text-gray-600 text-lg">
            Powerful tools built for students and educators, with zero cost
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-300 rounded-xl shadow-md p-6 flex flex-col gap-4 text-left"
            >
              <h3 className="text-xl font-semibold text-black">
                {feature.title}
              </h3>
              <p className="text-gray-700">{feature.description}</p>
              <div className="flex justify-center items-center">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  width={250}
                  height={250}
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-6 border-t border-gray-300">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-anton text-black mb-2">
            How It Works?
          </h2>
          <p className="text-gray-600 text-lg">
            Simple steps to get started with ProjexBio
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Sign Up */}
          <div className="bg-white border border-gray-300 rounded-xl shadow-md p-6 text-left space-y-3">
            <h3 className="text-lg font-bold text-black">{steps[0].title}</h3>
            <ul className="text-gray-700 text-sm space-y-2 list-disc list-inside">
              {steps[0].description.map((line, i) => (
                <li
                  key={i}
                  dangerouslySetInnerHTML={{ __html: line }}
                  className="leading-snug"
                />
              ))}
            </ul>
            <div className="pt-3 flex justify-center">
              <Image
                src={steps[0].image}
                alt={steps[0].title}
                width={160}
                height={160}
                className="object-contain hover:scale-105 transition-transform"
              />
            </div>
          </div>

          {/* Build & Submit */}
          <div className="bg-white border border-gray-300 rounded-xl shadow-md p-6 text-left space-y-3">
            <h3 className="text-lg font-bold text-black">{steps[1].title}</h3>
            <ul className="text-gray-700 text-sm space-y-2 list-disc list-inside">
              {steps[1].description.map((line, i) => (
                <li
                  key={i}
                  dangerouslySetInnerHTML={{ __html: line }}
                  className="leading-snug"
                />
              ))}
            </ul>
            <div className="pt-3 flex justify-center">
              <Image
                src={steps[1].image}
                alt={steps[1].title}
                width={160}
                height={160}
                className="object-contain hover:scale-105 transition-transform"
              />
            </div>
          </div>

          {/* Column: Collaborate & Discover */}
          <div className="flex flex-col gap-8">
            {/* Collaborate */}
            <div className="bg-white border border-gray-300 rounded-xl shadow-md p-6 text-left space-y-3">
              <h3 className="text-lg font-bold text-black">{steps[2].title}</h3>
              <ul className="text-gray-700 text-sm space-y-2 list-disc list-inside">
                {steps[2].description.map((line, i) => (
                  <li
                    key={i}
                    dangerouslySetInnerHTML={{ __html: line }}
                    className="leading-snug"
                  />
                ))}
              </ul>
            </div>

            {/* Discover */}
            <div className="bg-white border border-gray-300 rounded-xl shadow-md p-6 text-left space-y-3">
              <h3 className="text-lg font-bold text-black">{steps[3].title}</h3>
              <ul className="text-gray-700 text-sm space-y-2 list-disc list-inside">
                {steps[3].description.map((line, i) => (
                  <li
                    key={i}
                    dangerouslySetInnerHTML={{ __html: line }}
                    className="leading-snug"
                  />
                ))}
              </ul>
            </div>
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
    </div>
  );
}
