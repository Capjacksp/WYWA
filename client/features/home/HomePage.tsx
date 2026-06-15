import { useCallback, useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageLayout from "@/components/layout/PageLayout";
import HeroFusionPixelTransition from "@/features/home/components/HeroFusionPixelTransition";
import {
  WildfireMapSection,
} from "@/features/home/components/HomeSections";
import { useResponsiveVideoSource } from "@/hooks/use-responsive-video-source";

const MOBILE_VIDEO_SRC = "/videos/Wywa-480.mp4";
const DESKTOP_VIDEO_SRC = "/videos/Wywa-720.mp4";
const VIDEO_POSTER_SRC = "/images/video-overlay.webp";

export default function HomePage() {
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
      <HeroFusionPixelTransition />
      <div className="h-[100vh] min-h-[500px] w-full">
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
      <WildfireMapSection />
    </PageLayout>
  );
}
