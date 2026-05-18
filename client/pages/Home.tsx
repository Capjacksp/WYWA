import PageLayout from "@/components/layout/PageLayout";
import Hero from "@/components/ui/home-hero";
import {
  FusionSection,
  WildfireMapSection,
} from "@/components/ui/home-sections";
import { useCallback } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  const handleVideoReady = useCallback(() => {
    ScrollTrigger.refresh();
  }, []);

  return (
    <PageLayout>
      {/* ===== HERO SECTION ===== */}
      <Hero />

      {/* ===== NEW SECTIONS ===== */}
      <FusionSection />
      <div className="w-full h-[100vh] min-h-[500px]">
        <video
          className="w-full h-full object-cover"
          src="/videos/Wywa.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/images/video-overlay.png"
          controls
          onLoadedMetadata={handleVideoReady}
        />
      </div>
      <WildfireMapSection />
    </PageLayout>
  );
}
