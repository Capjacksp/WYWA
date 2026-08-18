import { Link } from "react-router-dom";
import { Button } from "@/components/common/Button";
import { ScrambleLoadText } from "@/components/ui/scramble-load-text";
import { RadioGlitchFilter } from "@/components/ui/radio-glitch-filter";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const HERO_TEXT_MOTION = {
  duration: 1.1,
  stagger: 0.12,
  distance: 80,
} as const;

function HomeHero({
  embedded = false,
  trackHeader = true,
}: {
  embedded?: boolean;
  trackHeader?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const isHeroInView = useInView(heroRef, { amount: 0.1 });

  return (
    <section
      ref={heroRef}
      data-header-class={trackHeader ? "header-dark" : undefined}
      className={`home-hero radio-glitch-paint-boundary relative min-h-screen w-full overflow-hidden bg-[#FFFFFF] text-[#242425] ${embedded ? "" : "-mt-16"}`}
    >
      <RadioGlitchFilter />
      <HeroGrid />
      <HeroForestImage />

      <div className="relative z-10 mx-auto min-h-screen w-full max-w-[1920px]">
        <div className="absolute left-[6.8%] top-[16%] max-w-[680px] max-md:left-[7.4vw] max-md:right-[7.4vw] max-md:top-[11.8%]">
          <ScrambleLoadText
            as="h1"
            className="hero-radio-glitch font-heading text-h1 font-[400] uppercase leading-[94%] tracking-[0%] text-[#242425] max-md:text-[30px] max-md:leading-[94%]"
            delay={0.12}
            {...HERO_TEXT_MOTION}
            lines={[
              { text: "BUILDING" },
              { text: "NATURE’S" },
              { text: "SIXTH SENSE" },
            ]}
          />
        </div>

        <div className="pointer-events-none absolute left-1/2 top-[10%] z-20 h-[80%] -translate-x-1/2 max-md:top-[34.4%] max-md:h-[45%]">
          <motion.div
            className="h-full"
            initial={reduceMotion ? false : { opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.15, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.img
              src="/images/home-hero-overlay-image.png"
              alt="WYWA wildfire detection sensor"
              className="block h-full w-auto object-contain "
              animate={
                reduceMotion || !isHeroInView
                  ? undefined
                  : { y: [0, -10, 0, 10, 0], rotate: [0, 0.45, 0, -0.45, 0] }
              }
              transition={{
                delay: 1.35,
                duration: 5.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>

        <HeroCallout />
      </div>
    </section>
  );
}

function HeroGrid() {
  return (
    <div
      aria-hidden="true"
      className="home-hero-grid pointer-events-none absolute inset-0 opacity-[0.10]"
      style={{
        backgroundImage:
          "linear-gradient(#242425 1px, transparent 1px), linear-gradient(90deg, #242425 1px, transparent 1px)",
      }}
    />
  );
}

function HeroForestImage() {
  return (
    <picture className="pointer-events-none absolute inset-0 block">
      <source
        media="(max-width: 767px)"
        srcSet="/images/home-hero-image-mobile.png"
      />
      <img
        src="/images/home-hero-image.png"
        alt=""
        aria-hidden="true"
        className="h-full w-full object-cover object-center"
      />
    </picture>
  );
}

function HeroCallout() {
  return (
    <div className="absolute bottom-[9.2%] left-[70%] z-30 w-[min(28vw,420px)] max-md:bottom-auto max-md:left-[7.4vw] max-md:right-[7.4vw] max-md:top-[24.5%] max-md:w-auto">
      <div className="hidden max-md:block">
        <ScrambleLoadText
          as="h2"
          className="font-heading text-[14px] font-[400] uppercase leading-[1] tracking-[0%] text-[#242425]"
          delay={0.42}
          {...HERO_TEXT_MOTION}
          lines={[
            { text: "SYSTEMS THAT DETECT" },
            { text: "WILDFIRES BEFORE" },
            { text: "THEY BECOME VISIBLE" },
          ]}
        />
      </div>

      <ScrambleLoadText
        as="h2"
        className="font-heading text-[28px] font-[400] uppercase leading-[28px] tracking-[0%] text-[#242425] max-md:hidden"
        delay={0.42}
        {...HERO_TEXT_MOTION}
        lines={[
          { text: "SYSTEMS THAT" },
          { text: "DETECT WILDFIRES" },
          { text: "BEFORE THEY" },
          { text: "BECOME VISIBLE" },
        ]}
      />

      <Button
        asChild
        variant="primary"
        className="mt-6 h-[32px] min-w-[140px] bg-[#4300ff] px-5 font-figtree text-[16px] font-[500] leading-none tracking-[0.18em] text-white hover:bg-[#3500d6] max-md:mt-3 max-md:h-[18px] max-md:min-w-[94px] max-md:px-3 max-md:text-[9px]"
      >
        <Link to="/technology#how-it-works">LEARN MORE</Link>
      </Button>
    </div>
  );
}

export default HomeHero;
