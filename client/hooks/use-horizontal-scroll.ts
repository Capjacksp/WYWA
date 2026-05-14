import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";

interface UseHorizontalScrollOptions {
  slideCount: number;
  scrollVhPerSlide?: number;
  offset?: Parameters<typeof useScroll>[0]["offset"];
}

export function useHorizontalScroll({
  slideCount,
  scrollVhPerSlide = 110,
  offset = ["start start", "end end"],
}: UseHorizontalScrollOptions) {
  const sectionRef = useRef<HTMLElement>(null);
  const safeSlideCount = Math.max(1, slideCount);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset,
  });

  const trackX = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${((safeSlideCount - 1) / safeSlideCount) * 100}%`],
  );

  return {
    sectionRef,
    scrollYProgress,
    trackX,
    sectionHeight: `${safeSlideCount * scrollVhPerSlide}vh`,
    trackWidth: `${safeSlideCount * 100}%`,
    slideWidth: `${100 / safeSlideCount}%`,
  };
}
