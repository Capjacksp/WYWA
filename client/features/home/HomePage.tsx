import { useCallback, useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageLayout from "@/components/layout/PageLayout";
import HomeHero from "@/features/home/components/HomeHero";
import {
  FusionSection,
  WildfireMapSection,
} from "@/features/home/components/HomeSections";

const MOBILE_VIDEO_SRC = "/videos/Wywa-480.mp4";
const DESKTOP_VIDEO_SRC = "/videos/Wywa-720.mp4";
const VIDEO_POSTER_SRC = "/images/video-overlay.webp";

function getResponsiveVideoSource() {
  if (typeof window === "undefined") {
    return DESKTOP_VIDEO_SRC;
  }

  const prefersSmallerAsset =
    window.matchMedia("(max-width: 767px)").matches ||
    window.matchMedia("(pointer: coarse) and (max-width: 1024px)").matches;

  return prefersSmallerAsset ? MOBILE_VIDEO_SRC : DESKTOP_VIDEO_SRC;
}

export default function HomePage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const loadedVideoSrcRef = useRef<string | null>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [videoSrc, setVideoSrc] = useState(DESKTOP_VIDEO_SRC);

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
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const coarseTabletQuery = window.matchMedia(
      "(pointer: coarse) and (max-width: 1024px)",
    );

    const updateVideoSource = () => {
      setVideoSrc(getResponsiveVideoSource());
    };

    updateVideoSource();
    mobileQuery.addEventListener("change", updateVideoSource);
    coarseTabletQuery.addEventListener("change", updateVideoSource);

    return () => {
      mobileQuery.removeEventListener("change", updateVideoSource);
      coarseTabletQuery.removeEventListener("change", updateVideoSource);
    };
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
      <HomeHero />

      <FusionSection />
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
