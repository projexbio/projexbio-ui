import Navbar from "@/components/LandingPage/Navbar";
import Footer from "@/components/LandingPage/Footer";
import Features from "@/components/LandingPage/Features";
import FAQSection from "@/components/LandingPage/FAQSection";
import HeroSection from "@/components/LandingPage/HeroSection";
import HowItWorks from "@/components/LandingPage/HowItWorks";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col justify-center gap-14 bg-neutral-100">
        <HeroSection />
        <Features />
        <HowItWorks />
        <FAQSection />
        <Footer />
      </div>
    </>
  );
}
