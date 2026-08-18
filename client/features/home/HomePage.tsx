import { useCallback, useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LazyVideo } from "@/components/common/LazyVideo";
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
  const [isPlaying, setIsPlaying] = useState(false);
  const wasPlayingRef = useRef(false);
  const resumeAfterSeekRef = useRef(false);
  const pauseTimerRef = useRef<number | undefined>(undefined);
  const videoSrc = useResponsiveVideoSource({
    desktop: DESKTOP_VIDEO_SRC,
    mobile: MOBILE_VIDEO_SRC,
  });

  useEffect(
    () => () => {
      if (pauseTimerRef.current !== undefined) {
        window.clearTimeout(pauseTimerRef.current);
      }
    },
    [],
  );

  const handleVideoPlay = useCallback(() => {
    if (pauseTimerRef.current !== undefined) {
      window.clearTimeout(pauseTimerRef.current);
      pauseTimerRef.current = undefined;
    }
    wasPlayingRef.current = true;
    resumeAfterSeekRef.current = false;
    setIsPlaying(true);
  }, []);
  const handleVideoPause = useCallback(
    (event: React.SyntheticEvent<HTMLVideoElement>) => {
      const video = event.currentTarget;
      if (pauseTimerRef.current !== undefined) {
        window.clearTimeout(pauseTimerRef.current);
      }
      pauseTimerRef.current = window.setTimeout(() => {
        pauseTimerRef.current = undefined;
        if (resumeAfterSeekRef.current || video.seeking) {
          void video.play().catch(() => undefined);
          return;
        }
        wasPlayingRef.current = false;
        setIsPlaying(false);
      }, 80);
    },
    [],
  );
  const handleVideoSeeking = useCallback(() => {
    resumeAfterSeekRef.current = wasPlayingRef.current;
  }, []);
  const handleVideoSeeked = useCallback(
    (event: React.SyntheticEvent<HTMLVideoElement>) => {
      if (resumeAfterSeekRef.current) {
        void event.currentTarget.play().catch(() => undefined);
      }
    },
    [],
  );
  const handleVideoMetadata = useCallback(() => {
    // The video's intrinsic dimensions can change the page height in Chrome.
    // Recalculate the map pin after those dimensions are known.
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, []);

  return (
    <PageLayout>
      <section className="relative bg-white">
        <HeroFusionPullScene />
        {!isMobile && <DesktopFusionRedSection />}

        <div className="relative z-20">
          <section
            data-header-class=""
            className="relative flex min-h-screen items-center justify-center bg-[#F15D59] md:px-8 md:py-16 max-md:min-h-0 max-md:px-5 max-md:py-10"
          >
            <div className="w-full max-w-[1460px] overflow-hidden bg-[#F15D59] px-32 pb-14 pt-24 max-md:px-0 max-md:py-0">
              <div className="group relative aspect-video w-full">
                <LazyVideo
                  className="h-full w-full rounded-2xl object-cover max-md:rounded-lg"
                  src={videoSrc}
                  poster={VIDEO_POSTER_SRC}
                  playsInline
                  preload="metadata"
                  controls={isPlaying}
                  onLoadedMetadata={handleVideoMetadata}
                  onPlay={handleVideoPlay}
                  onPause={handleVideoPause}
                  onSeeking={handleVideoSeeking}
                  onSeeked={handleVideoSeeked}
                />

                {!isPlaying && (
                  <button
                    type="button"
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer text-white transition-transform duration-200 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                    aria-label="Play WYWA wildfire detection video"
                    onClick={(event) => {
                      const video = event.currentTarget.previousElementSibling;
                      if (video instanceof HTMLVideoElement) {
                        void video.play();
                      }
                    }}
                  >
                    <Play className="h-20 w-24 fill-current stroke-[1.5] max-md:h-11 max-md:w-11" />
                  </button>
                )}
              </div>
            </div>
          </section>

          <div className="relative z-30">
            <WildfireMapSection />
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
