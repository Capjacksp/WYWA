import { useCallback, useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageLayout from "@/components/layout/PageLayout";
import HeroFusionPullScene from "@/features/home/components/HeroFusionPullScene";
import {
  DesktopFusionRedSection,
  WildfireMapSection,
} from "@/features/home/components/HomeSections";
import { useIsMobile } from "@/hooks/use-mobile";
import { useResponsiveVideoSource } from "@/hooks/use-responsive-video-source";

const MOBILE_VIDEO_SRC = "/videos/Wywa-480.mp4";
const DESKTOP_VIDEO_SRC = "/videos/Wywa-720.mp4";
const VIDEO_POSTER_SRC = "/images/video-overlay.webp";

export default function HomePage() {
  const isMobile = useIsMobile();
  const videoRef = useRef<HTMLVideoElement>(null);
  const loadedVideoSrcRef = useRef<string | null>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const videoSrc = useResponsiveVideoSource({
    desktop: DESKTOP_VIDEO_SRC,
    mobile: MOBILE_VIDEO_SRC,
  });

  const handleVideoReady = useCallback(() => {
    ScrollTrigger.refresh();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadVideo(true);
        } else {
          video.pause();
        }
      },
      { rootMargin: "100px 0px", threshold: 0.15 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoadVideo) return;

    if (loadedVideoSrcRef.current !== videoSrc) {
      loadedVideoSrcRef.current = videoSrc;
      video.load();
    }
  }, [shouldLoadVideo, videoSrc]);

  return (
    <PageLayout>
      <section className="relative bg-bg-dark">
        <HeroFusionPullScene />
        {!isMobile && <DesktopFusionRedSection />}

        <div className="relative z-20">
          <div
            data-header-class=""
            className="sticky top-0 h-screen min-h-[500px] w-full overflow-hidden bg-bg-dark shadow-[0_-24px_60px_rgba(0,0,0,0.18)]"
          >
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              src={shouldLoadVideo ? videoSrc : undefined}
              loop
              playsInline
              preload={shouldLoadVideo ? "metadata" : "none"}
              poster={VIDEO_POSTER_SRC}
              controls
              onLoadedMetadata={handleVideoReady}
            />
          </div>

          <div className="relative z-30">
            <WildfireMapSection />
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
