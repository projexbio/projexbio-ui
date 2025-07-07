// import Image from "next/image";
// import Navbar from "@/components/LandingPage/Navbar";
// import Footer from "@/components/LandingPage/Footer";
// import ActionButtons from "@/components/LandingPage/ActionButtons";
// import Features from "@/components/LandingPage/Features";
// import FAQSection from "@/components/LandingPage/FAQSection";

// export default function Home() {
//   return (
//     <div className="min-h-screen flex flex-col bg-black">
//       {" "}
//       <Navbar />
//       <main className="container mx-auto px-6 pt-20 pb-16 flex-grow relative z-10">
//         <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
//           {/* Left Content */}
//           <div className="space-y-8">
//             <h1 className="text-5xl md:text-6xl font-normal text-white leading-tight">
//               Empowering Projects
//               <br />
//               Across Campuses
//             </h1>
//             <p className="text-lg md:text-xl text-gray-300">
//               ProjexBio helps students build a project portfolio, collaborate
//               with peers, and submit work for assignments.
//               <br />
//               <span className=" font-semibold text-white">
//                 Showcase. Collaborate. Submit.
//               </span>
//             </p>
//             {/* Action Buttons */}
//             <ActionButtons />
//           </div>
//           {/* Right Image */}
//           <div className="relative mt-4 md:mt-0 overflow-auto flex justify-end">
//             <Image
//               src="/dashboardpic.png"
//               alt="ProjexBio preview"
//               width={800}
//               height={600}
//               className="rounded-2xl shadow-lg w-full h-auto"
//             />
//           </div>
//         </div>
//       </main>
//       <Features />
//       <FAQSection />
//       <Footer />
//     </div>
//   );
// }

import Image from "next/image";
import Navbar from "@/components/LandingPage/Navbar";
import Footer from "@/components/LandingPage/Footer";
import ActionButtons from "@/components/LandingPage/ActionButtons";
import Features from "@/components/LandingPage/Features";
import FAQSection from "@/components/LandingPage/FAQSection";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      {" "}
      <Navbar />
      <main className="container mx-auto px-6 pt-20 pb-16 flex-grow relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
          {/* Left Content */}
          <div className="space-y-8">
            <h1 className="text-5xl md:text-6xl font-normal text-white leading-tight">
              Empowering Projects
              <br />
              Across Campuses
            </h1>
            <p className="text-lg md:text-xl text-gray-300">
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
          <div className="relative mt-4 md:mt-0 flex justify-end overflow-visible">
            <div className="w-[140%] md:w-full -mr-24 md:mr-0 transition-all duration-500 ease-in-out">
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
      </main>
      <Features />
      <FAQSection />
      <Footer />
    </div>
  );
}
