import { useCallback, useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageLayout from "@/components/layout/PageLayout";
import HomeHero from "@/features/home/components/HomeHero";
import {
  FusionSection,
  WildfireMapSection,
} from "@/features/home/components/HomeSections";

export default function HomePage() {
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
          video.play().catch(() => {});
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
      <HomeHero />

      <FusionSection />
      <div className="h-[100vh] min-h-[500px] w-full">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
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
