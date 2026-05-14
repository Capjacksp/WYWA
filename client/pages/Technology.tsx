import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Eye, Flame, Wind } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import {
  MultimodalFusion,
  WildfireDetectionShowcase,
} from "@/components/ui/technology-sections";

const howItWorksSteps = [
  {
    number: "1.",
    title: "Deploy",
    image: "/images/tech-deploy.png",
    body: "Deploy-and-forget sensor nodes detect real brush fire combustion while rejecting incense, diesel exhaust, dust, or fog, eliminating false alarms at the source. Fully solar-powered with energy harvesting and supercapacitor storage, the system operates battery-free. Integrated VOC, CO₂, and particulate sensors communicate over a secure LoRa mesh network for continuous, distributed wildfire monitoring.",
  },
  {
    number: "2.",
    title: "Analyse",
    image: "/images/tech-analyse.png",
    body: "Data from sensor nodes is processed locally through a 10-mile edge network that operates fully offline. On-device AI, software-defined radio (SDR), and satellite link capability ensure reliable monitoring in remote terrain. Integrated cameras provide visual confirmation, while edge analytics interpret environmental signals in real time.",
  },
  {
    number: "3.",
    title: "Interpret",
    image: "/images/tech-interpret.png",
    body: "Edge inference runs directly on local compute hardware, with no cloud dependency. A cross-attention transformer fuses chemical, visual, and temporal signals to classify ignition events. Real-time VOC pattern matching, smoke detection, and flame motion analysis enable early detection with fewer false positives.",
  },
  {
    number: "4.",
    title: "ACT",
    image: "/images/tech-act.png",
    body: "A live dashboard provides real-time visibility across all deployed nodes, temperature, humidity, GPS location, and signal strength. When ignition is confirmed, alerts are broadcasted instantly via software-defined radio(SDR) and text-to-speech radio transmission, no internet required.",
  },
] as const;

function TechnologyHero() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden  bg-[#242425] -mt-16 px-[50px] pb-20 pt-32 text-white max-md:px-5 max-md:pt-10">

      <div className="relative z-10 max-w-[1340px]">
        <h1 className="max-w-[1200px] font-body font-normal text-display uppercase tracking-normal">
          Most wildfire detection systems depend on a single sense.
        </h1>
        <div className="mt-20 grid max-w-[600px] gap-14 max-md:mt-12 max-md:gap-10">
          <div>
            <Eye
              className="mb-5 h-16 w-16 text-cta"
              strokeWidth={1}
              aria-hidden="true"
            />
            <p className="font-figtree font-normal text-h3 leading-snug">
              Satellites and ground cameras watch for heat or smoke. But
              satellites can take 15-45 minutes to confirm thermal signatures,
              while ground cameras must wait for visible smoke. Fog, dust,
              glare, and reflections often mimic smoke or flame, leading to
              unreliable alerts.
            </p>
          </div>

          <div>
            <Wind
              className="mb-5 h-12 w-12 text-cta"
              strokeWidth={1.9}
              aria-hidden="true"
            />
            <p className="font-figtree font-normal text-h3 leading-snug">
              Other systems monitor gases released during combustion, detecting
              chemical traces in the air. But isolated signals often create
              noise and false alarms without additional verification.
            </p>
          </div>
        </div>

        <p className="mt-20 max-w-[1280px] font-body font-normal text-display font-light uppercase tracking-normal text-cta max-md:mt-14">
          The result
          <br />
          is a 20-60 minute
          <br />
          blind spot after ignition.
        </p>
      </div>

      <img
        src="/images/earth.png"
        alt=""
        className="pointer-events-none absolute right-[0vw] top-[21vh] w-[52vw] min-w-[350px] max-w-[600px] opacity-95 max-lg:right-[-28vw] max-md:top-[56vh] max-md:w-[105vw] max-md:min-w-0 max-md:opacity-40"
      />
    </section>
  );
}

function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const trackX = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${(howItWorksSteps.length - 1) * 100}%`],
  );

  const thresholds = useMemo(
    () => howItWorksSteps.map((_, index) => index / howItWorksSteps.length),
    [],
  );

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

  const step = howItWorksSteps[activeStep];

  return (
    <div className="bg-bg-light">
      {/* STATIC HEADER PART */}
      <div className="px-[50px] pt-32 max-md:px-5 max-md:pt-20">
        <div className="mx-auto">
          <h2 className="font-body font-normal text-display uppercase tracking-normal text-bg-dark">
            Single senses create
            <br />
            blind spots.{" "}
            <span className="text-[#F15D59]">
              Multimodal <br /> intelligence closes them.
            </span>
          </h2>
        </div>
      </div>

      {/* STICKY HORIZONTAL SCROLL PART */}
      <section ref={sectionRef} className="relative h-[300vh]">
        <div className="sticky top-0 h-screen overflow-hidden px-[50px] pb-12 pt-12 max-md:h-auto max-md:min-h-screen max-md:px-5">
          <div className="mx-auto flex h-full flex-col">

            <div className="mt-20 flex items-center gap-5 max-md:mt-12">
              <span className="shrink-0 font-body font-normal text-sm uppercase tracking-[0.22em] text-bg-dark">
                How it works
              </span>
              <div className="h-px flex-1 bg-[#000000]" />
            </div>
            <div className="relative flex min-h-0 flex-1 items-end max-md:items-center max-md:pt-8">

              <div className="pointer-events-none absolute inset-x-0 left-12 bottom-[70px] min-h-[70%] overflow-hidden" aria-hidden="true">
                <AnimatePresence mode="wait">
                  <motion.svg
                    key={activeStep}
                    viewBox="0 0 1085 573"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className={"absolute h-full w-[55%]"}
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M326.46 362.99L326.68 254.26L348.17 253.78L348.31 207.92L391.65 207.85L391.76 253.55L435.07 253.87L434.62 180.57L478.32 180.75L478.5 253.74C485.97 254.16 492.21 254.22 500.09 253.69L500.17 91.56L565.23 91.47L565.34 154.51C572.46 154.95 578.93 154.93 586.84 154.68L586.97 0.0299988L651.92 0L652.13 154.82L695.34 154.85L695.44 266.82L717.01 267.57L717.2 319.56C725.29 320.36 719.06 318.98 725.76 320.28L725.84 424.98L760.38 425.3L760.59 530.46L782.11 530.8L782.29 642.51L803.83 642.91L804.08 704.43C811.57 705.33 817.05 704.99 825.37 704.79L825.58 587.93L847.11 587.38L847.33 530.75C854.66 530.08 861.27 531.84 868.75 529.74L869.01 587.47C876.19 587.98 882.4 587.83 890.3 587.55L890.67 530.94L912.08 530.5L912.34 473.8L933.9 473.37V339.92L955.51 339.35L955.64 224.61L977.29 224.15L977.41 124.9L1042.59 124.92L1042.73 224.13L1064.29 224.45L1064.4 310.81L1085.83 311.42L1085.85 367.9L1107.53 368.33L1107.58 473.32L1129.27 473.87V745.6L1150.79 746.01L1150.81 803.09L-215.7 803.07L-215.97 738.04L-194.9 737.38C-193.75 733.72 -193.84 730.47 -194.84 726.82L-199.38 730.99L-199.48 707.58C-199.9 706.73 -201.85 705.7 -202.09 707.02C-199.58 717.18 -201.45 709.43 -201.52 720.21L-201.61 733.62C-203.26 734.07 -203.72 734.22 -204.02 734.42C-204.69 734.88 -207.29 734.59 -204.85 733.27L-205.2 689.36C-209.24 687.25 -206.07 721.15 -207.9 716.78C-206.79 719.42 -206.39 723.08 -208.47 724.21C-208.91 724.45 -210.89 724.58 -210.67 723.74C-209.01 717.36 -210.42 711.44 -210.46 705.16L-210.73 662.98C-215.85 661.37 -210.85 670.33 -213.85 671.47C-217.66 672.92 -215.72 642.42 -215.8 637.91L-216.06 623.01L-215.65 554.42C-212.8 554.06 -210.04 554.17 -206.81 554.16C-206.59 557.25 -208.07 559.15 -207.33 562.49C-201.41 560.9 -197.48 559.66 -198.38 554.32L-173.22 554.57L-172.83 537.3L-124.72 537.09L-124.24 487L-102.79 486.16L-102.47 469.34L-40.0599 469.12L-39.8699 385.67L-18.6999 384.86C-17.8399 379.04 -17.9699 373.9 -18.6199 369.61L44.3401 369.79L44.1701 336.35C51.1501 337.1 57.9101 337.1 66.1701 336.4L66.1901 258.6L87.9201 258.06L87.9501 90.35L174.87 90.41L174.85 257.62C182.53 259.06 189.86 258.02 196.76 258.25L196.58 363.1C205.69 363.7 212.68 362.61 218.35 363.64L218.01 557.81L239.66 558.23L239.71 614.62L282.4 614.87L283.42 553.86L304.88 553.5L304.85 362.89C310.85 363.4 316.93 363.54 326.47 362.95L326.46 362.99Z"
                      fill={activeStep % 2 === 0 ? "#90E8FF" : "#4101F5"}
                    />
                  </motion.svg>
                </AnimatePresence>
              </div>

              <div className="relative z-10 grid w-full grid-cols-[0.7fr_1.6fr_0.7fr] items-center gap-0 max-lg:grid-cols-[0.8fr_1fr] max-md:grid-cols-1 max-md:gap-6">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={`${step.number}-${step.title}`}
                    custom={direction}
                    initial={{ opacity: 0, x: direction > 0 ? -80 : 80 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction > 0 ? 80 : -80 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="self-end"
                  >
                    <div className="flex items-start gap-10">
                      <div
                        aria-hidden="true"
                        className="mt-10 h-0 w-0 border-y-[18px] border-l-[18px] border-y-transparent border-l-[#F15D59] max-md:mb-8 max-md:ml-0 max-md:border-y-[18px] max-md:border-l-[18px]"
                      />
                      <div>
                        <p className={`font-body font-normal text-display uppercase tracking-normal ${activeStep % 2 === 0 ? "text-bg-dark" : "text-bg-light"}`}>
                          {step.number}
                        </p>
                        <h3 className="font-body font-normal text-display uppercase tracking-normal text-bg-dark">
                          {step.title}
                        </h3>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="relative flex min-h-[520px] items-center top-0 justify-start max-lg:order-3 max-lg:col-span-2 max-md:order-none max-md:col-span-1 max-md:min-h-[360px]">
                  <div className=" absolute h-[60vh] w-[30vw]">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={step.image}
                        src={step.image}
                        alt=""
                        initial={{ opacity: 0, scale: 0.95, rotate: 0 }}
                        animate={{ opacity: 1, scale: 1.15, rotate: 0 }}
                        exit={{ opacity: 0, scale: 1.05, rotate: 0 }}
                        transition={{ duration: 0.55, ease: "easeOut" }}
                        className="absolute h-full w-full max-w-none object-contain drop-shadow-2xl max-md:h-auto max-md:w-[92vw]"
                      />
                    </AnimatePresence>
                  </div>
                </div>

                <AnimatePresence mode="wait" custom={direction}>
                  <motion.p
                    key={step.body}
                    custom={direction}
                    initial={{ opacity: 0, x: direction > 0 ? 80 : -80 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction > 0 ? -80 : 80 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="self-center justify-self-center max-w-[300px] font-figtree text-body font-normal leading-snug text-bg-dark max-lg:justify-self-start max-md:max-w-none"
                  >
                    {step.body}
                  </motion.p>
                </AnimatePresence>
              </div>

              <div className="absolute right-0 top-16 h-[82%] w-[40%] bg-[linear-gradient(to_right,rgba(36,36,37,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(36,36,37,0.08)_1px,transparent_1px)] bg-[size:34px_34px] max-md:hidden" />
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

export default function Technology() {
  return (
    <PageLayout>
      <TechnologyHero />
      <HowItWorks />
      <MultimodalFusion />
      <WildfireDetectionShowcase />
    </PageLayout>
  );
}
