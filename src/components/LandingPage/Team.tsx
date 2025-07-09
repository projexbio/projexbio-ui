import Image from "next/image";

const teamMembers = [
  {
    name: "Saksham Jain",
    role: "Founder & Backend Developer",
    image: "/assets/logo/black-without-bg.png",
  },
  {
    name: "Abhi Gandhi",
    role: "Frontend Developer",
    image: "/assets/logo/white-without-bg.png",
  },
  {
    name: "Priya Sharma",
    role: "Community Manager",
    image: "/assets/logo/black-without-bg.png",
  },
];

export default function Team() {
  return (
    <section className="w-full max-w-3xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Our Team</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {teamMembers.map((member, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center bg-white/10 rounded-lg p-6 shadow-md w-60"
          >
            <Image
              src={member.image}
              alt={member.name}
              width={80}
              height={80}
              className="rounded-full mb-4 border-2 border-cyan-400 bg-white"
            />
            <h3 className="text-lg font-semibold text-white mb-1">
              {member.name}
            </h3>
            <p className="text-cyan-200 text-sm">{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
