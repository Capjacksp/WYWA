import PageLayout from "@/components/layout/PageLayout";
import Hero from "@/components/ui/home-hero";
import {
  FusionSection,
  WildfireMapSection,
} from "@/components/ui/home-sections";
import { useCallback, useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoReady = useCallback(() => {
    ScrollTrigger.refresh();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => { });
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <PageLayout>
      {/* ===== HERO SECTION ===== */}
      <Hero />

      {/* ===== NEW SECTIONS ===== */}
      <FusionSection />
      <div className="w-full h-[100vh] min-h-[500px]">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src="/videos/Wywa.mp4"
          loop
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
