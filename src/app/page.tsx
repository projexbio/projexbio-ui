import Navbar from "@/components/LandingPage/Navbar";
import Footer from "@/components/LandingPage/Footer";
import Features from "@/components/LandingPage/Features";
import FAQSection from "@/components/LandingPage/FAQSection";
import HeroSection from "@/components/LandingPage/HeroSection";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      {" "}
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-20 pb-10 md:pb-16 flex-grow relative z-10">
        <HeroSection />
      </main>
      <Features />
      <FAQSection />
      <Footer />
    </div>
  );
}
