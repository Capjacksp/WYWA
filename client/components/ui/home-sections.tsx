import Section from "@/components/common/Section";
import Logo, { WavyLogo } from "@/components/common/Logo";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * FusionSection - The white section with the sensor exploded view.
 */
export function FusionSection() {
  return (
    <Section className="bg-bg-light py-32 overflow-hidden relative min-h-[200vh] flex flex-col items-center justify-center">
      {/* Subtle Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.15]"
        style={{
          backgroundImage: `linear-gradient(#242425 1px, transparent 1px), linear-gradient(90deg, #242425 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative z-10 text-center max-w-[1200px] mx-auto px-6 mb-[-80px]">
        <h2 className="text-display text-[#FF5A5A] mb-4">
          MULTIMODAL FUSION
        </h2>
        <h3 className="text-display leading-tight">
          THREE SIGNALS.<br />
          ONE INTELLIGENCE.
        </h3>
      </div>

      <div className="relative z-30 w-full overflow-visible max-w-[1150px] mx-auto pointer-events-none">
        <img
          src="/images/sensor.png"
          alt="Exploded view of the sensor"
          className="w-full h-auto object-contain rotate-[-25deg]"
        />
      </div>

      {/* Jagged red background image - aligned to bottom */}
      <div className="absolute  bottom-0 left-0 w-full h-full pointer-events-none z-0">
        <img
          src="/images/red-steps.png"
          alt="Red jagged landscape"
          className="absolute  bottom-0 w-full h-auto object-cover object-bottom"
        />
      </div>

      <div className="relative z-10 max-w-[1700px] mx-auto px-[50px] max-md:px-5 flex max-lg:flex-col items-end gap-12 mb-20">
        {/* Large Text Block */}
        <div className="flex-[2]">
          <h2 className="text-h1 text-white leading-[1.1] uppercase font-heading">
            SENSING SUBTLE SHIFTS IN THE ENVIRONMENT ACROSS
            <span className="text-bg-dark font-bold"> CHEMICAL, VISUAL, AND TEMPORAL SIGNALS,</span>
            DETECTING IGNITION BEFORE CATASTROPHE UNFOLDS.
          </h2>
        </div>

        {/* Small Paragraph Block */}
        <div className="flex-1 max-w-[400px]">
          <p className="text-white text-sm leading-relaxed opacity-90">
            Our models are trained on VOC signatures from fast-igniting fuels like Red Brome, Medusahead, Cheatgrass, and Wild Oats to detect wildfire-specific combustion signatures in real time, filtering out false triggers like diesel emissions or dust. Edge AI then verifies ignition by interpreting motion patterns in flame and rising smoke. Trained in simulated wildfire environments using real-world and simulated data, the system detects fire alerts within a minute, providing a critical 15-minute head start.
          </p>
        </div>
      </div>
    </Section>
  );
}

/**
 * WildfireMapSection - Scroll-pinned California map sequence.
 */
export function WildfireMapSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const introX = useTransform(scrollYProgress, [0, 0.34], ["0vw", "-24vw"]);
  const introOpacity = useTransform(scrollYProgress, [0, 0.2, 0.34], [1, 1, 0]);
  const calloutOpacity = useTransform(scrollYProgress, [0.36, 0.5], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[250vh] bg-bg-dark"
      style={{ position: "relative" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden text-white">
        <img
          src="/images/map.png"
          alt="California wildfire spread map"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-[#111111]/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/5 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/35 to-transparent" />

        <motion.div
          className="absolute inset-0 z-10 flex flex-col justify-between px-[50px] pb-12 pt-28 max-md:px-5 max-md:pb-8 max-md:pt-24"
          style={{ x: introX, opacity: introOpacity }}
        >
          <div className="max-w-[1120px]">
            <h2 className="font-heading text-[clamp(3rem,6vw,5.5rem)] font-[300] uppercase leading-[0.92] text-white">
              A Decade of Wildfires.
              <br />
              Minutes to Spread.
              <br />
              <span className="text-cta">California, USA</span>
            </h2>
          </div>

          <div className="max-w-[800px]">
            <div
              aria-hidden="true"
              className="mb-10 ml-5 h-0 w-0 border-y-[28px] border-l-[28px] border-y-transparent border-l-white max-md:mb-8 max-md:ml-0 max-md:border-y-[18px] max-md:border-l-[18px]"
            />
            <p className="max-w-[780px] font-heading text-[clamp(1.5rem,2.1vw,2rem)] font-[350] uppercase leading-[1.05] text-white">
              We detect at ignition, providing a{" "}
              <span className="font-bold">15-minute</span>
              <br className="hidden md:block" /> head start before the invisible becomes
              <br className="hidden md:block" /> inevitable, because every minute counts.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="absolute inset-0 z-20"
          style={{ opacity: calloutOpacity }}
        >
          <FireCallout
            label="Tubbs Complex (2017)"
            stats={{
              scale: "36,807 acres | 23 days",
              delay: "15-60 mins to detect",
              impact: "5,636 structures destroyed | $1B+ losses",
            }}
            className="left-[4%] top-[37%]"
            progress={scrollYProgress}
            enterFrom="left"
            range={[0.4, 0.52]}
            markerPosition="left"
          />
          <FireCallout
            label="Camp Fire (2018)"
            stats={{
              scale: "153,336 acres | 17 days",
              delay: "15-60 mins to detect",
              impact: "18,804 structures destroyed",
            }}
            className="left-[34%] top-[11%]"
            progress={scrollYProgress}
            enterFrom="right"
            range={[0.46, 0.58]}
          />
          <FireCallout
            label="August Complex (2020)"
            stats={{
              scale: "1,032,648 acres | 86 days",
              delay: "15-60 mins to detect",
              impact: "935 structures destroyed",
            }}
            className="left-[36%] top-[24%]"
            progress={scrollYProgress}
            enterFrom="left"
            range={[0.52, 0.64]}
          />
          <FireCallout
            label="Dixie Fire (2021)"
            stats={{
              scale: "963,309 acres | 103 days",
              delay: "15-60 mins to detect",
              impact: "1,329 structures destroyed",
            }}
            className="left-[66%] top-[13%]"
            progress={scrollYProgress}
            enterFrom="right"
            range={[0.58, 0.72]}
          />
          <FireCallout
            label="Palisades Fire (2025*)"
            stats={{
              scale: "23,448 acres | 24 days",
              delay: "15-60 mins to detect",
              impact: "6,800+ structures destroyed",
            }}
            className="left-[38%] top-[90%]"
            progress={scrollYProgress}
            enterFrom="left"
            range={[0.7, 0.86]}
            markerPosition="left"
            expandDirection="up"
            doesHaveAsterisk="*Recent incident context; figures may evolve with final reporting"
          />
        </motion.div>

        <WavyLogo
          width={500}
          color="#FFFFFF"
          gap={80}
          height={200}
          strokWidth={15}
          className="pointer-events-none absolute bottom-0 right-0 z-10 hidden lg:block"
        />
      </div>
    </section>
  );
}

interface FireCalloutProps {
  label: string;
  stats: {
    scale: string;
    delay: string;
    impact: string;
  };
  className: string;
  progress: MotionValue<number>;
  enterFrom: "left" | "right";
  range: [number, number];
  markerPosition?: "left" | "right";
  expandDirection?: "up" | "down";
  doesHaveAsterisk?: string;
}

function FireCallout({
  label,
  stats,
  className,
  progress,
  enterFrom,
  range,
  markerPosition = "right",
  expandDirection = "down",
  doesHaveAsterisk = ""
}: FireCalloutProps) {
  const offset = enterFrom === "left" ? "-10vw" : "10vw";
  const x = useTransform(progress, range, [offset, "0vw"]);
  const opacity = useTransform(progress, range, [0.2, 1]);
  const isMarkerLeft = markerPosition === "left";
  const isExpandUp = expandDirection === "up";

  return (
    <motion.div
      className={cn("group absolute h-0 w-0 hover:z-40", className)}
      style={{ x, opacity }}
    >
      <div className={cn(
        "absolute w-[300px] rounded-[6px] bg-[#24211f]/95 text-white shadow-[0_20px_45px_rgba(0,0,0,0.35)] backdrop-blur-sm transition-all duration-300 max-md:w-[235px] flex flex-col",
        isExpandUp ? "bottom-0" : "top-0",
        isMarkerLeft ? "left-0" : "right-0"
      )}>

        {/* Pointy Tail (Triangle pointing to the dot) */}
        <div
          className={cn(
            "absolute h-3 w-3 rotate-45 bg-[#24211f]/95",
            isExpandUp ? "bottom-1.5" : "top-1.5",
            isMarkerLeft ? "-left-1.5" : "-right-1.5"
          )}
          aria-hidden="true"
        />

        {/* Location Marker with Motion Progression */}
        <div className={cn(
          "absolute z-20 flex h-10 w-10 items-center justify-center",
          isExpandUp ? "-bottom-5" : "-top-5",
          isMarkerLeft ? "-left-5" : "-right-5"
        )}>
          {/* Pulsing White Rings (Motion from center) */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border-[4px] border-white/90"
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: [0.4, 1.2], opacity: [1, 0] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.8,
                ease: "easeOut",
              }}
            />
          ))}

          {/* The Central Marker (Red dot with white border) */}
          <div className="relative z-10 h-7 w-7 rounded-full border-[6px] border-white bg-[#F55656] shadow-[0_0_15px_rgba(0,0,0,0.3)] max-md:h-8 max-md:w-8 max-md:border-[5px]" />
        </div>

        {/* Header Content */}
        <div className="px-5 py-5">
          <h3 className="font-heading text-body font-body uppercase leading-none text-white">
            {label}
          </h3>
        </div>

        {/* Expandable Stats */}
        <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 group-hover:grid-rows-[1fr]">
          <div className="overflow-hidden">
            <div className="space-y-5  pb-6 pt-5 text-[12px] leading-tight">
              <div className="grid grid-cols-[64px_1fr] px-5 gap-3">
                <span className="font-bold text-cta">Scale:</span>
                <span className="text-white/85">{stats.scale}</span>
              </div>
              <div className="h-px w-full origin-left scale-x-0 bg-white/15 transition-transform duration-300 group-hover:scale-x-100" />
              <div className="grid grid-cols-[64px_1fr] px-5 gap-3">
                <span className="font-bold text-cta">Delay:</span>
                <span className="text-white/85">{stats.delay}</span>
              </div>
              <div className="h-px w-full origin-left scale-x-0 bg-white/15 transition-transform duration-300 group-hover:scale-x-100" />
              <div className="grid grid-cols-[64px_1fr] px-5 gap-3">
                <span className="font-bold text-cta">Impact:</span>
                <span className="text-white/85">{stats.impact}</span>
              </div>
              {
                doesHaveAsterisk ?
                  <div className="grid grid-cols-[4fr_1fr] px-5 gap-3">
                    <span className="text-white/55 text-xs">{doesHaveAsterisk}</span>
                  </div>
                  : <></>
              }

            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
