import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import HomeHero from "@/features/home/components/HomeHero";
import {
  DesktopFusionIntroSection,
  FusionSection,
} from "@/features/home/components/HomeSections";
import {
  pullTransitionPresets,
  usePullTransition,
} from "@/features/home/hooks/use-pull-transition";

export default function HeroFusionPullScene() {
  const sceneRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: pullTransitionPresets.hero.offset,
  });
  const {
    y: panelY,
    edgeScale,
    edgeOpacity,
  } = usePullTransition(sceneRef, {
    ...pullTransitionPresets.hero,
  });
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.975]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -14]);
  const heroShade = useTransform(scrollYProgress, [0.05, 0.48], [0, 0.42]);

  if (isMobile) {
    return (
      <>
        <HomeHero />
        <FusionSection />
      </>
    );
  }

  if (reduceMotion) {
    return (
      <>
        <HomeHero />
        <DesktopFusionIntroSection />
      </>
    );
  }

  return (
    <section ref={sceneRef} className="relative -mt-16">
      <div
        data-header-class="header-dark"
        className="pointer-events-none absolute inset-x-0 top-0 h-screen"
      />

      <div className="sticky top-0 h-screen overflow-hidden bg-bg-dark">
        <motion.div
          className="h-full w-full origin-top"
          style={{ scale: heroScale, y: heroY }}
        >
          <HomeHero embedded trackHeader={false} />
        </motion.div>
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 bg-bg-dark"
          style={{ opacity: heroShade }}
        />
      </div>

      <motion.div
        className="relative z-30 will-change-transform"
        style={{ y: panelY }}
      >
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 z-40 h-[3px] w-[42%] -translate-x-1/2 origin-center bg-gradient-to-r from-transparent via-cta to-transparent"
          style={{ scaleX: edgeScale, opacity: edgeOpacity }}
        />
        <DesktopFusionIntroSection />
      </motion.div>
    </section>
  );
}
