import { type RefObject } from "react";
import {
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

type ScrollOffset = NonNullable<Parameters<typeof useScroll>[0]>["offset"];

const DEFAULT_PULL_PROGRESS: number[] = [0, 0.18, 0.42, 0.74, 1];
const HERO_PULL_PROGRESS: number[] = [0, 0.08, 0.22, 0.38, 0.52];
const PULL_Y: number[] = [0, 22, 118, 48, 0];
const DEFAULT_EDGE_SCALE_PROGRESS: number[] = [0.1, 0.45, 0.9];
const DEFAULT_EDGE_OPACITY_PROGRESS: number[] = [0.08, 0.28, 0.9];
const HERO_EDGE_SCALE_PROGRESS: number[] = [0.08, 0.3, 0.5];
const HERO_EDGE_OPACITY_PROGRESS: number[] = [0.06, 0.18, 0.52];
const EDGE_SCALE: number[] = [0.22, 0.72, 1];
const EDGE_OPACITY: number[] = [0, 0.9, 0];
const DEFAULT_PULL_Y: number[] = [0, 22, 118, 48, 0];
const SPRING = {
  stiffness: 105,
  damping: 26,
  mass: 0.9,
  restDelta: 0.2,
};

export const pullTransitionPresets = {
  boundary: {
    offset: ["start end", "start start"] as ScrollOffset,
    pullProgress: DEFAULT_PULL_PROGRESS,
    edgeScaleProgress: DEFAULT_EDGE_SCALE_PROGRESS,
    edgeOpacityProgress: DEFAULT_EDGE_OPACITY_PROGRESS,
  },
  hero: {
    offset: ["start start", "end end"] as ScrollOffset,
    pullProgress: HERO_PULL_PROGRESS,
    edgeScaleProgress: HERO_EDGE_SCALE_PROGRESS,
    edgeOpacityProgress: HERO_EDGE_OPACITY_PROGRESS,
  },
} as const;

export function usePullTransition(
  target: RefObject<HTMLElement>,
  {
    disabledOnMobile = true,
    offset = pullTransitionPresets.boundary.offset,
    pullProgress = pullTransitionPresets.boundary.pullProgress,
    pullY = DEFAULT_PULL_Y,
    edgeScaleProgress = pullTransitionPresets.boundary.edgeScaleProgress,
    edgeOpacityProgress = pullTransitionPresets.boundary.edgeOpacityProgress,
  }: {
    disabledOnMobile?: boolean;
    offset?: ScrollOffset;
    pullProgress?: number[];
    pullY?: number[];
    edgeScaleProgress?: number[];
    edgeOpacityProgress?: number[];
  } = {},
) {
  const isMobile = useIsMobile();
  const reduceMotion = useReducedMotion();
  const disabled = reduceMotion || (disabledOnMobile && isMobile);
  const { scrollYProgress } = useScroll({
    target,
    offset,
  });

  const resistedY = useTransform(scrollYProgress, pullProgress, pullY);
  const y = useSpring(resistedY, SPRING);
  const edgeScale = useTransform(
    scrollYProgress,
    edgeScaleProgress,
    EDGE_SCALE,
  );
  const edgeOpacity = useTransform(
    scrollYProgress,
    edgeOpacityProgress,
    EDGE_OPACITY,
  );

  return {
    disabled,
    y,
    edgeScale,
    edgeOpacity,
  };
}
