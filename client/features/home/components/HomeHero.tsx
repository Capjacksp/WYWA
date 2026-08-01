import { Button } from "@/components/common/Button";
import { ScrambleLoadText } from "@/components/ui/scramble-load-text";
import { RadioGlitchFilter } from "@/components/ui/radio-glitch-filter";
import { motion, useReducedMotion } from "framer-motion";

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

  return (
    <section
      data-header-class={trackHeader ? "header-dark" : undefined}
      className={`home-hero radio-glitch-paint-boundary relative min-h-screen w-full overflow-hidden bg-[#fafafa] text-[#242425] ${embedded ? "" : "-mt-16"}`}
    >
      <RadioGlitchFilter />
      <HeroGrid />
      <HeroForestImage />

      <div className="relative z-10 mx-auto min-h-screen w-full max-w-[1920px]">
        <div className="absolute left-[6.8%] top-[16%] max-w-[680px] max-md:left-5 max-md:right-5 max-md:top-[14%]">
          <ScrambleLoadText
            as="h1"
            className="hero-radio-glitch font-heading text-h1 font-[400] uppercase leading-[94%] tracking-[0%] text-[#242425] max-md:text-[42px] max-md:leading-[94%]"
            delay={0.12}
            {...HERO_TEXT_MOTION}
            lines={[
              { text: "BUILDING" },
              { text: "NATURE’S" },
              { text: "SIXTH SENSE" },
            ]}
          />
        </div>

        <div className="pointer-events-none absolute left-1/2 top-[6%] z-20 h-[89%] -translate-x-1/2 max-md:top-[30%] max-md:h-[45%]">
          <motion.div
            className="h-full"
            initial={reduceMotion ? false : { opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.15, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.img
              src="/images/home-hero-overlay-image.png"
              alt="WYWA wildfire detection sensor"
              className="block h-full w-auto object-contain"
              animate={
                reduceMotion
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
      className="pointer-events-none absolute inset-0 opacity-[0.10]"
      style={{
        backgroundImage:
          "linear-gradient(#242425 1px, transparent 1px), linear-gradient(90deg, #242425 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
    />
  );
}

function HeroForestImage() {
  return (
    <img
      src="/images/home-hero-image.png"
      alt=""
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center max-md:object-[54%_center]"
    />
  );
}

function HeroCallout() {
  return (
    <div className="absolute bottom-[9.2%] left-[70%] z-30 w-[min(28vw,420px)] max-md:bottom-[6%] max-md:left-5 max-md:right-5 max-md:w-auto">
      <ScrambleLoadText
        as="h2"
        className="font-heading text-[28px] font-[400] uppercase leading-[28px] tracking-[0%] text-[#242425] max-md:text-[clamp(1.7rem,8vw,2.4rem)] max-md:leading-[0.88]"
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
        className="mt-6 h-[32px] min-w-[140px] bg-[#4300ff] px-5 font-figtree text-[16px] font-[500] leading-none tracking-[0.18em] text-white hover:bg-[#3500d6] max-md:mt-5 max-md:h-[34px] max-md:min-w-0 max-md:px-5 max-md:text-[13px]"
      >
        <a href="/technology">LEARN MORE</a>
      </Button>
    </div>
  );
}

export default HomeHero;
