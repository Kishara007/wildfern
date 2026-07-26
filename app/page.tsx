import Preloader from "@/components/Preloader";
import Hero from "@/components/Hero";
import EthosSection from "@/components/EthosSection";
import SanctuariesSection from "@/components/SanctuariesSection";
import ExperiencesSection from "@/components/ExperiencesSection";
import GrandFooter from "@/components/GrandFooter";

export default function Home() {
  return (
    <main className="relative bg-white min-h-screen text-zinc-900 selection:bg-zinc-900 selection:text-white">
      {/* Creative 0-100% Preloader Screen */}
      <Preloader />

      {/* Complete 3D Parallax Hero Section */}
      <Hero />

      {/* 01: Ethos Word-by-Word Scroll Reveal Section */}
      <EthosSection />

      {/* 02: Sanctuaries Horizontal Scroll Section */}
      <SanctuariesSection />

      {/* 03: Experiences Interactive Cursor-Tracking Hover List */}
      <ExperiencesSection />

      {/* 04: Dark Grand Footer */}
      <GrandFooter />
    </main>
  );
}
