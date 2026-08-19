import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { howItWorksSteps } from "@/features/technology/data/howItWorksSteps";
import { ScrollTextLines } from "@/components/ui/scroll-text-lines";
import { cn } from "@/lib/utils";
import { NavigationArrowButton } from "@/components/common/NavigationArrowButton";
import { useIsMobile } from "@/hooks/use-mobile";
import { useScrollStepNavigation } from "@/hooks/use-scroll-step-navigation";
import { scrollToSectionProgress } from "@/lib/scroll-to-section-progress";

// ─── shared spring config ─────────────────────────────────────────────────────
const SPRING = {
  type: "spring" as const,
  stiffness: 380,
  damping: 36,
  mass: 0.8,
};
const EASE_EXPO = [0.16, 1, 0.3, 1] as const;
const DESKTOP_STEP_PROGRESS_END = 2 / 3;
const STEP_PROGRESS_OFFSET = 0.02;

export function HowItWorks() {
  const isMobile = useIsMobile();

  return isMobile ? <MobileHowItWorks /> : <DesktopHowItWorks />;
}

// ─── Desktop ──────────────────────────────────────────────────────────────────
function DesktopHowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Smooth spring-driven progress for the step indicator bar
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
  });
  const indicatorWidth = useTransform(
    smoothProgress,
    [0, DESKTOP_STEP_PROGRESS_END],
    ["0%", "100%"],
  );

  const thresholds = useMemo(
    () => howItWorksSteps.map((_, index) => index / howItWorksSteps.length),
    [],
  );

  const getDesktopStepFromProgress = useCallback((sectionProgress: number) => {
    const stepProgress = Math.min(
      sectionProgress / DESKTOP_STEP_PROGRESS_END,
      0.999,
    );

    return Math.min(
      howItWorksSteps.length - 1,
      Math.floor(stepProgress * howItWorksSteps.length),
    );
  }, []);

  const {
    activeIndex: activeStep,
    direction,
    scrollToIndex: scrollToStep,
  } = useScrollStepNavigation({
    itemCount: howItWorksSteps.length,
    sectionRef,
    targetProgressEnd: DESKTOP_STEP_PROGRESS_END,
    getActiveIndexForProgress: getDesktopStepFromProgress,
  });

  const step = howItWorksSteps[activeStep];

  return (
    <div
      id="how-it-works"
      data-header-class="header-dark"
      className="bg-bg-light max-md:hidden"
    >
      {/* STATIC HEADER PART */}
      <div className="px-[50px] pt-32 max-md:px-5 max-md:pt-20">
        <div className="mx-auto">
          <div className="w-fit cursor-default">
            <ScrollTextLines
              as="h2"
              className="font-body font-normal text-display uppercase tracking-normal text-bg-dark"
              lines={[
                "Single senses create",
                <>
                  blind spots.{" "}
                  <span className="text-[#F15D59]">Multimodal</span>
                </>,
                <span className="text-[#F15D59]">
                  intelligence closes them.
                </span>,
              ]}
            />
          </div>
        </div>
      </div>

      {/* STICKY HORIZONTAL SCROLL PART */}
      <section ref={sectionRef} className="relative h-[500vh]">
        <div className="sticky top-0 h-screen overflow-hidden px-[50px] pb-12 pt-12 max-md:h-auto max-md:min-h-screen max-md:px-5">
          <div className="mx-auto flex h-full flex-col">
            <div className="mt-20 flex items-center gap-5 max-md:mt-12">
              <span className="shrink-0 font-body font-normal text-sm uppercase tracking-[0.22em] text-bg-dark">
                How it works
              </span>
              {/* Animated progress bar replacing the static line */}
              <div className="relative h-px flex-1 bg-black/15">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-[#F15D59] origin-left"
                  style={{ width: indicatorWidth }}
                />
              </div>
            </div>

            <div className="relative flex min-h-0 flex-1 items-end max-md:items-center max-md:pt-8">
              {/* Skyline fill — smooth fade and rise */}
              <div
                className="pointer-events-none absolute inset-x-0 left-8 bottom-[80px] min-h-[70%] overflow-hidden"
                aria-hidden="true"
              >
                <AnimatePresence mode="sync">
                  <motion.svg
                    key={activeStep}
                    viewBox="0 0 1085 573"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    initial={
                      reduceMotion ? false : { opacity: 0, y: 18, scale: 0.98 }
                    }
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={
                      reduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, y: -8, scale: 1.01 }
                    }
                    transition={{
                      duration: reduceMotion ? 0 : 0.48,
                      ease: EASE_EXPO,
                    }}
                    style={{ transformOrigin: "50% 100%" }}
                    className={"absolute h-full w-[60%]"}
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M326.46 362.99L326.68 254.26L348.17 253.78L348.31 207.92L391.65 207.85L391.76 253.55L435.07 253.87L434.62 180.57L478.32 180.75L478.5 253.74C485.97 254.16 492.21 254.22 500.09 253.69L500.17 91.56L565.23 91.47L565.34 154.51C572.46 154.95 578.93 154.93 586.84 154.68L586.97 0.0299988L651.92 0L652.13 154.82L695.34 154.85L695.44 266.82L717.01 267.57L717.2 319.56C725.29 320.36 719.06 318.98 725.76 320.28L725.84 424.98L760.38 425.3L760.59 530.46L782.11 530.8L782.29 642.51L803.83 642.91L804.08 704.43C811.57 705.33 817.05 704.99 825.37 704.79L825.58 587.93L847.11 587.38L847.33 530.75C854.66 530.08 861.27 531.84 868.75 529.74L869.01 587.47C876.19 587.98 882.4 587.83 890.3 587.55L890.67 530.94L912.08 530.5L912.34 473.8L933.9 473.37V339.92L955.51 339.35L955.64 224.61L977.29 224.15L977.41 124.9L1042.59 124.92L1042.73 224.13L1064.29 224.45L1064.4 310.81L1085.83 311.42L1085.85 367.9L1107.53 368.33L1107.58 473.32L1129.27 473.87V745.6L1150.79 746.01L1150.81 803.09L-215.7 803.07L-215.97 738.04L-194.9 737.38C-193.75 733.72 -193.84 730.47 -194.84 726.82L-199.38 730.99L-199.48 707.58C-199.9 706.73 -201.85 705.7 -202.09 707.02C-199.58 717.18 -201.45 709.43 -201.52 720.21L-201.61 733.62C-203.26 734.07 -203.72 734.22 -204.02 734.42C-204.69 734.88 -207.29 734.59 -204.85 733.27L-205.2 689.36C-209.24 687.25 -206.07 721.15 -207.9 716.78C-206.79 719.42 -206.39 723.08 -208.47 724.21C-208.91 724.45 -210.89 724.58 -210.67 723.74C-209.01 717.36 -210.42 711.44 -210.46 705.16L-210.73 662.98C-215.85 661.37 -210.85 670.33 -213.85 671.47C-217.66 672.92 -215.72 642.42 -215.8 637.91L-216.06 623.01L-215.65 554.42C-212.8 554.06 -210.04 554.17 -206.81 554.16C-206.59 557.25 -208.07 559.15 -207.33 562.49C-201.41 560.9 -197.48 559.66 -198.38 554.32L-173.22 554.57L-172.83 537.3L-124.72 537.09L-124.24 487L-102.79 486.16L-102.47 469.34L-40.0599 469.12L-39.8699 385.67L-18.6999 384.86C-17.8399 379.04 -17.9699 373.9 -18.6199 369.61L44.3401 369.79L44.1701 336.35C51.1501 337.1 57.9101 337.1 66.1701 336.4L66.1901 258.6L87.9201 258.06L87.9501 90.35L174.87 90.41L174.85 257.62C182.53 259.06 189.86 258.02 196.76 258.25L196.58 363.1C205.69 363.7 212.68 362.61 218.35 363.64L218.01 557.81L239.66 558.23L239.71 614.62L282.4 614.87L283.42 553.86L304.88 553.5L304.85 362.89C310.85 363.4 316.93 363.54 326.47 362.95L326.46 362.99Z"
                      fill={activeStep % 2 === 0 ? "#90E8FF" : "#4101F5"}
                    />
                  </motion.svg>
                </AnimatePresence>
              </div>

              {/* Product image — spring scale + fade */}
              <div className="absolute left-14 w-[60%] h-[60vh] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step.image}
                    initial={{ opacity: 0, scale: 0.88, filter: "blur(6px)" }}
                    animate={{ opacity: 1, scale: 1.15, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 1.08, filter: "blur(4px)" }}
                    transition={{ ...SPRING, duration: 0.6 }}
                    className="h-full w-full flex items-start justify-center"
                  >
                    <div className={cn(
                      "relative",
                      activeStep === 3 ? "" : "h-full w-full"
                    )}>
                      <motion.img
                        src={step.image}
                        alt=""
                        animate={
                          reduceMotion || activeStep === 3
                            ? undefined
                            : { y: [0, 12, 0] }
                        }
                        transition={{
                          duration: 6.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className={cn(
                          "h-full w-full object-contain drop-shadow-2xl max-md:h-auto max-md:w-[92vw]",
                          step.customCSS,
                        )}
                      />
                      {activeStep === 3 && <ActStepDecorations />}
                    </div>
                  </motion.div>
                </AnimatePresence>


              </div>

              {/* Text grid — staggered children via variants */}
              <div className="relative z-10 grid w-full grid-cols-[1fr_1fr] h-full items-center gap-0 max-lg:grid-cols-[1fr_1fr] max-md:grid-cols-1 max-md:gap-6">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={`${step.number}-${step.title}`}
                    custom={direction}
                    variants={desktopTitleVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.55, ease: EASE_EXPO }}
                    className="self-end"
                  >
                    <div className="flex ml-10 items-start gap-10">
                      <div>
                        {/* Number — clip-path wipe from bottom */}
                        <motion.p
                          className={`font-body font-normal text-display uppercase tracking-normal ${activeStep % 2 === 0 ? "text-bg-dark" : "text-bg-light"}`}
                          initial={{ clipPath: "inset(0 0 100% 0)" }}
                          animate={{ clipPath: "inset(0 0 0% 0)" }}
                          transition={{
                            duration: 0.55,
                            ease: EASE_EXPO,
                            delay: 0.05,
                          }}
                        >
                          {step.number}
                        </motion.p>
                        {/* Title — clip-path wipe from bottom with slight delay */}
                        <motion.h3
                          className="mt-3 font-body font-normal text-display uppercase tracking-normal text-bg-dark"
                          initial={{ clipPath: "inset(0 0 100% 0)" }}
                          animate={{ clipPath: "inset(0 0 0% 0)" }}
                          transition={{
                            duration: 0.6,
                            ease: EASE_EXPO,
                            delay: 0.12,
                          }}
                        >
                          {step.title}
                        </motion.h3>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="flex h-40 w-full flex-col items-center justify-center">
                  <div className="ml-[20px]">

                    <AnimatePresence mode="wait" custom={direction}>
                      <motion.p
                        key={step.body}
                        custom={direction}
                        variants={desktopBodyVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                          duration: 0.5,
                          ease: EASE_EXPO,
                          delay: 0.08,
                        }}
                        className="max-w-[300px] font-figtree text-body font-normal leading-snug text-bg-dark max-md:max-w-none"
                      >
                        {step.body}
                      </motion.p>
                    </AnimatePresence>
                    <div className="mt-8 flex items-start gap-10">
                      <NavigationArrowButton
                        onClick={() => scrollToStep(activeStep - 1)}
                        aria-label="Show previous step"
                        disabled={activeStep === 0}
                        direction="left"
                        size={12}
                        color={activeStep === 0 ? "#D5D5D5" : "#242425"}
                      />
                      <NavigationArrowButton
                        onClick={() => scrollToStep(activeStep + 1)}
                        aria-label="Show next step"
                        disabled={activeStep === howItWorksSteps.length - 1}
                        direction="right"
                        size={12}
                        color={
                          activeStep === howItWorksSteps.length - 1
                            ? "#D5D5D5"
                            : "#242425"
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -right-8 top-10 h-full w-[45%] bg-[linear-gradient(to_right,rgba(36,36,37,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(36,36,37,0.08)_1px,transparent_1px)] bg-[size:34px_34px] [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent),linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] [mask-composite:intersect] max-md:hidden" />
            </div>

            <div className="mt-5 flex justify-center gap-3 md:hidden">
              {thresholds.map((_, index) => (
                <span
                  key={index}
                  className={`h-1.5 w-8 transition-colors ${index === activeStep ? "bg-[#f15d59]" : "bg-bg-dark/20"
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Desktop animation variants ───────────────────────────────────────────────
const desktopTitleVariants = {
  enter: (dir: number) => ({
    opacity: 0,
    y: dir > 0 ? 40 : -40,
    filter: "blur(4px)",
  }),
  center: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: (dir: number) => ({
    opacity: 0,
    y: dir > 0 ? -30 : 30,
    filter: "blur(3px)",
  }),
};

const desktopBodyVariants = {
  enter: (dir: number) => ({ opacity: 0, y: dir > 0 ? 28 : -28 }),
  center: { opacity: 1, y: 0 },
  exit: (dir: number) => ({ opacity: 0, y: dir > 0 ? -20 : 20 }),
};

// ─── Mobile ───────────────────────────────────────────────────────────────────
function MobileHowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
  });
  const indicatorWidth = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      const nextStep = Math.min(
        howItWorksSteps.length - 1,
        Math.floor(latest * howItWorksSteps.length),
      );

      setActiveStep((previous) => {
        if (previous !== nextStep) {
          setDirection(nextStep > previous ? 1 : -1);
        }
        return nextStep;
      });
    });
  }, [scrollYProgress]);

  const scrollToStep = (targetStep: number) => {
    const nextStep = Math.max(
      0,
      Math.min(howItWorksSteps.length - 1, targetStep),
    );
    const targetProgress =
      (nextStep + STEP_PROGRESS_OFFSET) / howItWorksSteps.length;

    scrollToSectionProgress(sectionRef.current, targetProgress);
  };

  const step = howItWorksSteps[activeStep];

  return (
    <div
      id="how-it-works"
      data-header-class="header-dark"
      className="bg-[#F7F7F7] md:hidden"
    >
      {/* Static heading — outside the scroll section */}
      <div className="px-7 pt-24 pb-6">
        <div className="w-fit cursor-default">
          <ScrollTextLines
            as="h2"
            className="font-heading text-[32px] font-[400] uppercase leading-[0.94] tracking-normal text-bg-dark"
            lines={[
              "Single senses",
              "create",
              "blind spots.",
              <span className="text-[#F55656]">Multimodal</span>,
              <span className="text-[#F55656]">intelligence</span>,
              <span className="text-[#F55656]">closes them.</span>,
            ]}
          />
        </div>
      </div>

      <section ref={sectionRef} className="relative h-[520vh]">
        <div className="sticky top-0 h-screen overflow-hidden bg-[#F7F7F7] px-5 pb-10 pt-32">
          <div className="flex items-center gap-3 mb-2">
            <span className="shrink-0 font-heading text-[14px] font-[400] uppercase tracking-[0.22em] text-bg-dark">
              How it works
            </span>
            <div className="relative h-px flex-1 bg-black/15">
              <motion.div
                className="absolute inset-y-0 left-0 bg-[#F55656] origin-left"
                style={{ width: indicatorWidth }}
              />
            </div>
          </div>

          {/* Skyline — smooth fade and rise */}
          <AnimatePresence mode="sync">
            <motion.div
              key={`skyline-${activeStep}`}
              className={`absolute w-full pr-10 bottom-[40%] z-0 h-[200px] ${activeStep % 2 === 0 ? "text-cta" : "text-[#4101F5]"}`}
              initial={
                reduceMotion ? false : { opacity: 0, y: 16, scale: 0.98 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: -8, scale: 1.01 }
              }
              transition={{
                duration: reduceMotion ? 0 : 0.45,
                ease: EASE_EXPO,
              }}
              style={{ transformOrigin: "50% 100%" }}
            >
              <MobileSkyline className="h-full w-full" />
            </motion.div>
          </AnimatePresence>

          {/* Product image — spring blur + scale */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step.image}
              custom={direction}
              className="absolute bottom-[38%] right-[10%] mx-auto z-10 h-[250px] w-auto max-w-none -translate-x-1/2 object-contain drop-shadow-xl"
              initial={{
                opacity: 0,
                scale: 0.88,
                filter: "blur(8px)",
                x: direction > 0 ? 50 : -50,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
                x: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.94,
                filter: "blur(5px)",
                x: direction > 0 ? -50 : 50,
              }}
              transition={{ ...SPRING, duration: 0.55 }}
            >
              <motion.img
                src={step.image}
                alt=""
                initial={{ y: 0, rotate: -0.4 }}
                animate={
                  reduceMotion || activeStep === 3
                    ? undefined
                    : { y: -18, rotate: 0.4 }
                }
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }}
                className={cn(
                  "h-full w-auto max-w-none object-contain drop-shadow-xl",
                  step.mobileImageClassName,
                )}
              />
              {activeStep === 3 && <ActStepDecorations mobile />}
            </motion.div>
          </AnimatePresence>

          {/* Bottom text panel */}
          <div className="absolute bottom-0 left-1 right-0 h-[40%] z-0 px-5 pt-4 pb-6">
            <MobileGridBackground />

            {/* Title — clip-path wipe from bottom */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`${step.number}-${step.title}`}
                custom={direction}
                variants={mobileTitleVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: EASE_EXPO }}
              >
                <h3 className="font-heading text-[32px] font-[400] -mt-[52px] uppercase leading-[1.2] tracking-normal text-bg-dark">
                  <motion.span
                    className={`${activeStep % 2 === 1 ? "text-[#FFFFFF]" : ""} block`}
                    initial={{ clipPath: "inset(0 0 100% 0)" }}
                    animate={{ clipPath: "inset(0 0 0% 0)" }}
                    transition={{ duration: 0.5, ease: EASE_EXPO, delay: 0.05 }}
                  >
                    {step.number}
                  </motion.span>
                  <motion.span
                    className="block"
                    initial={{ clipPath: "inset(0 0 100% 0)" }}
                    animate={{ clipPath: "inset(0 0 0% 0)" }}
                    transition={{
                      duration: 0.55,
                      ease: EASE_EXPO,
                      delay: 0.13,
                    }}
                  >
                    {step.title}
                  </motion.span>
                </h3>
              </motion.div>
            </AnimatePresence>

            {/* Body — fade + vertical spring */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.p
                key={step.body}
                custom={direction}
                variants={mobileBodyVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: EASE_EXPO, delay: 0.1 }}
                className="ml-[24px] mt-8 max-w-[255px] font-figtree text-[14px] font-[400] leading-[1.12] text-bg-dark"
              >
                {step.body}
              </motion.p>
            </AnimatePresence>

            <div className="mt-8 flex items-center justify-center gap-10">
              <NavigationArrowButton
                onClick={() => scrollToStep(activeStep - 1)}
                aria-label="Show previous step"
                disabled={activeStep === 0}
                direction="left"
                size={12}
                color={activeStep === 0 ? "#D5D5D5" : "#242425"}
              />
              <NavigationArrowButton
                onClick={() => scrollToStep(activeStep + 1)}
                aria-label="Show next step"
                disabled={activeStep === howItWorksSteps.length - 1}
                direction="right"
                size={12}
                color={
                  activeStep === howItWorksSteps.length - 1
                    ? "#D5D5D5"
                    : "#242425"
                }
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Mobile animation variants ────────────────────────────────────────────────
const mobileTitleVariants = {
  enter: (dir: number) => ({ opacity: 0, y: dir > 0 ? 32 : -32 }),
  center: { opacity: 1, y: 0 },
  exit: (dir: number) => ({ opacity: 0, y: dir > 0 ? -24 : 24 }),
};

const mobileBodyVariants = {
  enter: (dir: number) => ({ opacity: 0, y: dir > 0 ? 20 : -20 }),
  center: { opacity: 1, y: 0 },
  exit: (dir: number) => ({ opacity: 0, y: dir > 0 ? -16 : 16 }),
};

// ─── Sub-components ───────────────────────────────────────────────────────────
function ActStepDecorations({ mobile = false }: { mobile?: boolean }) {
  const position = mobile
    ? {
      firstSquare: "-top-3 -left-[8%] w-[8%]",
      secondSquare: "top-[30px] left-[20.3%] w-[8%]",
      thirdSquare: "top-[74px] left-[47.3%] w-[15%]",
      firstHorizontal: "top-[138px] left-[23.5%] w-[108%]",
      secondHorizontal: "top-[172px] left-[54%] w-[54%]",
      thirdHorizontal: "top-[38px] -left-[8.1%] w-[32.4%]",
      firstVertical: "-top-[30px] left-[23.5%] h-[230px]",
      secondVertical: "-top-[30px] left-[9%] h-[70px]",
      thirdVertical: "-top-[30px] left-[54%] h-[130px]",
      lastSquare: "-bottom-1 -right-[2%] w-[12%]",
    }
    : {
      firstSquare: "-top-6 -left-[6.5%] w-[6.5%]",
      secondSquare: "top-[45px] left-[20.3%] w-[6.5%]",
      thirdSquare: "top-[119px] left-[47.3%] w-[13.5%]",
      firstHorizontal: "top-[223px] left-[23.5%] w-[108%]",
      secondHorizontal: "top-[277px] left-[54%] w-[54%]",
      thirdHorizontal: "top-[55px] -left-[8.1%] w-[32.4%]",
      firstVertical: "-top-[45px] left-[23.5%] h-[370px]",
      secondVertical: "-top-[45px] left-[9%] h-[100px]",
      thirdVertical: "-top-[45px] left-[54%] h-[200px]",
      lastSquare: "-bottom-[35px] right-0 w-[10%]",
    };

  return (
    <div className="pointer-events-none absolute inset-0 overflow-visible" aria-hidden="true">
      <div className={`absolute aspect-square bg-[#4101F5] ${position.firstSquare}`} />
      <div className={`absolute aspect-square bg-[#90E8FF]/50 ${position.secondSquare}`} />
      <div className={`absolute aspect-square bg-[#90E8FF]/50 ${position.thirdSquare}`} />
      <div className={`absolute h-px bg-[#90E8FF]/70 ${position.firstHorizontal}`} />
      <div className={`absolute h-px bg-[#90E8FF]/70 ${position.secondHorizontal}`} />
      <div className={`absolute h-px bg-[#90E8FF]/70 ${position.thirdHorizontal}`} />
      <div className={`absolute w-px bg-[#90E8FF]/90 ${position.firstVertical}`} />
      <div className={`absolute w-px bg-[#90E8FF]/90 ${position.secondVertical}`} />
      <div className={`absolute w-px bg-[#90E8FF]/90 ${position.thirdVertical}`} />
      <div className={`absolute aspect-square bg-[#4101F5] ${position.lastSquare}`} />
    </div>
  );
}

function MobileGridBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 -top-6"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(36,36,37,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(36,36,37,0.08) 1px, transparent 1px)",
        backgroundSize: "16px 16px",
        maskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent), linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
        maskComposite: "intersect",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent), linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
        WebkitMaskComposite: "source-in",
      }}
    />
  );
}

function MobileSkyline({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1085 573"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M326.46 362.99L326.68 254.26L348.17 253.78L348.31 207.92L391.65 207.85L391.76 253.55L435.07 253.87L434.62 180.57L478.32 180.75L478.5 253.74C485.97 254.16 492.21 254.22 500.09 253.69L500.17 91.56L565.23 91.47L565.34 154.51C572.46 154.95 578.93 154.93 586.84 154.68L586.97 0.0299988L651.92 0L652.13 154.82L695.34 154.85L695.44 266.82L717.01 267.57L717.2 319.56C725.29 320.36 719.06 318.98 725.76 320.28L725.84 424.98L760.38 425.3L760.59 530.46L782.11 530.8L782.29 642.51L803.83 642.91L804.08 704.43C811.57 705.33 817.05 704.99 825.37 704.79L825.58 587.93L847.11 587.38L847.33 530.75C854.66 530.08 861.27 531.84 868.75 529.74L869.01 587.47C876.19 587.98 882.4 587.83 890.3 587.55L890.67 530.94L912.08 530.5L912.34 473.8L933.9 473.37V339.92L955.51 339.35L955.64 224.61L977.29 224.15L977.41 124.9L1042.59 124.92L1042.73 224.13L1064.29 224.45L1064.4 310.81L1085.83 311.42L1085.85 367.9L1107.53 368.33L1107.58 473.32L1129.27 473.87V745.6L1150.79 746.01L1150.81 803.09L-215.7 803.07L-215.97 738.04L-194.9 737.38C-193.75 733.72 -193.84 730.47 -194.84 726.82L-199.38 730.99L-199.48 707.58C-199.9 706.73 -201.85 705.7 -202.09 707.02C-199.58 717.18 -201.45 709.43 -201.52 720.21L-201.61 733.62C-203.26 734.07 -203.72 734.22 -204.02 734.42C-204.69 734.88 -207.29 734.59 -204.85 733.27L-205.2 689.36C-209.24 687.25 -206.07 721.15 -207.9 716.78C-206.79 719.42 -206.39 723.08 -208.47 724.21C-208.91 724.45 -210.89 724.58 -210.67 723.74C-209.01 717.36 -210.42 711.44 -210.46 705.16L-210.73 662.98C-215.85 661.37 -210.85 670.33 -213.85 671.47C-217.66 672.92 -215.72 642.42 -215.8 637.91L-216.06 623.01L-215.65 554.42C-212.8 554.06 -210.04 554.17 -206.81 554.16C-206.59 557.25 -208.07 559.15 -207.33 562.49C-201.41 560.9 -197.48 559.66 -198.38 554.32L-173.22 554.57L-172.83 537.3L-124.72 537.09L-124.24 487L-102.79 486.16L-102.47 469.34L-40.0599 469.12L-39.8699 385.67L-18.6999 384.86C-17.8399 379.04 -17.9699 373.9 -18.6199 369.61L44.3401 369.79L44.1701 336.35C51.1501 337.1 57.9101 337.1 66.1701 336.4L66.1901 258.6L87.9201 258.06L87.9501 90.35L174.87 90.41L174.85 257.62C182.53 259.06 189.86 258.02 196.76 258.25L196.58 363.1C205.69 363.7 212.68 362.61 218.35 363.64L218.01 557.81L239.66 558.23L239.71 614.62L282.4 614.87L283.42 553.86L304.88 553.5L304.85 362.89C310.85 363.4 316.93 363.54 326.47 362.95L326.46 362.99Z"
        fill="currentColor"
        opacity="0.95"
      />
    </svg>
  );
}
