import { useCallback, useState } from "react";
import { Play } from "lucide-react";
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
  const [isPlaying, setIsPlaying] = useState(false);
  const videoSrc = useResponsiveVideoSource({
    desktop: DESKTOP_VIDEO_SRC,
    mobile: MOBILE_VIDEO_SRC,
  });

  const handleVideoPlay = useCallback(() => setIsPlaying(true), []);
  const handleVideoPause = useCallback(() => setIsPlaying(false), []);
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
                <video
                  className="h-full w-full rounded-2xl object-cover max-md:rounded-lg"
                  src={videoSrc}
                  poster={VIDEO_POSTER_SRC}
                  playsInline
                  preload="metadata"
                  controls
                  onLoadedMetadata={handleVideoMetadata}
                  onPlay={handleVideoPlay}
                  onPause={handleVideoPause}
                />

                {!isPlaying && (
                  <Play
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-20 w-24 cursor-pointer fill-current stroke-[1.5] text-white transition-transform duration-200 hover:scale-105 max-md:h-11 max-md:w-11"
                    aria-label="Play WYWA wildfire detection video"
                    role="button"
                    tabIndex={0}
                    onClick={(event) => {
                      const video = event.currentTarget.previousElementSibling;
                      if (video instanceof HTMLVideoElement) {
                        void video.play();
                      }
                    }}
                  />
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
