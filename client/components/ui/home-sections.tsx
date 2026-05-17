import Section from "@/components/common/Section";
import Logo, { WavyLogo } from "@/components/common/Logo";
import { motion } from "framer-motion";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * FusionSection - The white section with the sensor exploded view.
 */
export function FusionSection() {
  return (
    <Section data-header-class="header-dark" className="bg-bg-light pt-28 pb-16 overflow-hidden relative min-h-[200vh] flex flex-col items-center justify-center">
      {/* Subtle Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.15]"
        style={{
          backgroundImage: `linear-gradient(#242425 1px, transparent 1px), linear-gradient(90deg, #242425 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative z-10 text-center max-w-[1800px] mx-auto mb-[-80px]">
        <h2 className="text-huge text-[#F15D59]">
          MULTIMODAL FUSION
        </h2>
        <h3 className="text-huge text-dark">
          THREE SIGNALS.
        </h3>
        <h3 className="text-huge text-dark">
          ONE INTELLIGENCE.
        </h3>
      </div>

      <div className="relative z-30 w-full h-full -top-20 overflow-visible mx-auto pointer-events-none align-top">
        <img
          src="/images/sensor.png"
          alt="Exploded view of the sensor"
          className="w-full h-auto object-contain rotate-[-30deg]"
        />
      </div>

      {/* Jagged red background image - aligned to bottom */}
      <div className="absolute  bottom-0 left-0 w-full h-full pointer-events-none z-0">
        <svg className="absolute bottom-0 w-full h-[80vh] object-cover object-bottom" viewBox="100 0 1857 1000.13" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M736 120.251L736.331 84.2318L768.177 84.0747L768.383 68.8783L832.57 68.8506L832.735 83.9916L896.881 84.0932L896.22 59.8066L960.945 59.862L961.193 84.047C972.263 84.1856 981.515 84.2041 993.163 84.0285L993.287 30.319L1089.65 30.2913L1089.82 51.1783C1100.35 51.3261 1109.93 51.3169 1121.66 51.2338L1121.87 -9.8838e-06L1218.07 -8.74529e-06L1218.35 51.28L1282.38 51.28L1282.54 88.3889L1314.51 88.6383L1314.8 105.867C1326.78 106.135 1336.82 105.673 1346.73 106.107L1346.85 140.796L1378.78 140.897L1379.07 175.734L1410.96 175.845L1411.2 212.852L1443.13 212.981L1443.5 233.36C1454.62 233.656 1462.71 233.545 1475.02 233.48L1475.35 194.764L1507.24 194.579L1507.57 175.817C1518.43 175.595 1528.22 176.177 1539.29 175.484L1539.66 194.616C1550.32 194.783 1559.49 194.736 1571.22 194.644L1571.75 175.891L1603.48 175.743L1603.85 156.953L1635.78 156.805L1635.78 112.592L1667.79 112.408L1667.99 74.3934L1700.05 74.2455L1700.21 41.3676L1796.74 41.3676L1796.95 74.2455L1828.87 74.3472L1829.04 102.957L1860.76 103.16L1860.76 121.877L1892.9 122.015L1892.98 156.796L1925.11 156.981L1925.11 247.005L1957 247.143L1957 1000.13L-67.1633 1000.13L-67.5766 244.511L-36.3501 244.289C-34.6567 243.079 -34.7806 241.998 -36.2675 240.788L-43.0002 242.173L-43.1242 234.413C-43.7438 234.127 -46.6347 233.794 -47.0065 234.229C-43.2891 237.591 -46.0568 235.032 -46.1807 238.598L-46.3047 243.042C-48.7416 243.189 -49.4437 243.236 -49.8567 243.31C-50.8481 243.457 -54.6891 243.365 -51.0956 242.931L-51.6326 228.381C-57.6218 227.679 -52.9135 238.912 -55.6396 237.471C-53.9874 238.349 -53.409 239.559 -56.5069 239.938C-57.1678 240.021 -60.1004 240.058 -59.7699 239.781C-57.2917 237.665 -59.398 235.707 -59.4393 233.628L-59.8526 219.651C-67.4526 219.115 -60.0179 222.081 -64.4787 222.469C-70.1374 222.949 -67.2459 212.843 -67.3698 211.355L-67.7411 206.422L-67.1217 183.697C-62.9086 183.577 -58.82 183.614 -54.0286 183.614C-53.6982 184.639 -55.8871 185.267 -54.8131 186.376C-46.0567 185.849 -40.2328 185.434 -41.5546 183.669L-4.29801 183.752L-3.71964 178.034L67.5719 177.96L68.2736 161.369L100.037 161.092L100.491 155.521L192.931 155.447L193.219 127.798L224.57 127.53C225.85 125.599 225.643 123.9 224.693 122.477L317.959 122.542L317.711 111.465C328.037 111.715 338.074 111.715 350.3 111.484L350.3 85.7099L382.518 85.5343L382.518 29.968L511.304 29.9864L511.304 85.3865C522.663 85.8669 533.485 85.5251 543.728 85.599L543.481 120.334C556.987 120.537 567.313 120.167 575.739 120.509L575.244 184.842L607.296 184.981L607.378 203.66L670.616 203.743L672.144 183.531L703.948 183.411L703.948 120.26C712.787 120.426 721.792 120.472 735.918 120.278L736 120.251Z"
            fill="#F15D59"
          />
        </svg>

      </div>

      <div className="relative z-10 max-w-[1700px] gap-32 mx-auto px-[50px] max-md:px-5 flex max-lg:flex-col items-end  mb-0 mt-auto">
        {/* Large Text Block */}
        <div className="flex-[1.5] max-w-[850px]">
          <h2 className="text-h1-md text-justify text-balance text-white uppercase">
            SENSING SUBTLE SHIFTS IN THE ENVIRONMENT ACROSS
            <span className=" text-justify text-balance text-bg-dark font-bold"> CHEMICAL, VISUAL, AND TEMPORAL SIGNALS,</span><br />
            <span className=" text-justify text-balance">DETECTING IGNITION BEFORE CATASTROPHE UNFOLDS.</span>
          </h2>
        </div>

        {/* Small Paragraph Block */}
        <div className="flex-1 max-w-[260px] ml-auto">
          <p className="text-white align-right font-figtree font-[400] text-body leading-relaxed opacity-90">
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
  const panelRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const calloutLayerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const panel = panelRef.current;
      const intro = introRef.current;
      const calloutLayer = calloutLayerRef.current;

      if (!section || !panel || !intro || !calloutLayer) return;

      const callouts = gsap.utils.toArray<HTMLElement>(".fire-callout");

      gsap.set(intro, { x: "0vw", autoAlpha: 1 });
      gsap.set(calloutLayer, { autoAlpha: 0 });
      callouts.forEach((callout) => {
        gsap.set(callout, {
          autoAlpha: 0,
          x: callout.dataset.enterFrom === "left" ? "-10vw" : "10vw",
        });
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: panel,
          start: "top top",
          end: "+=180%",
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(intro, { x: "-24vw", duration: 0.34, ease: "none" }, 0)
        .to(intro, { autoAlpha: 0, duration: 0.14, ease: "none" }, 0.2)
        .to(calloutLayer, { autoAlpha: 1, duration: 0.14, ease: "none" }, 0.36);

      callouts.forEach((callout) => {
        const start = Number(callout.dataset.start ?? 0.4);
        const end = Number(callout.dataset.end ?? start + 0.12);

        timeline.to(
          callout,
          {
            autoAlpha: 1,
            x: "0vw",
            duration: end - start,
            ease: "none",
          },
          start,
        );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      data-header-class=""
      className="relative bg-transparent"
      style={{ position: "relative" }}
    >
      <div ref={panelRef} className="relative h-screen overflow-hidden text-white">
        <img
          src="/images/home-map.png"
          alt="California wildfire spread map"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-[#24242578]" />


        <div
          ref={introRef}
          className="absolute inset-0 z-10 flex flex-col justify-between px-[50px] pb-12 pt-28 max-md:px-5 max-md:pb-8 max-md:pt-24"
        >
          <div className="max-w-[1120px]">
            <h2 className="font-display text-h1 font-[350] uppercase leading-[1] text-white">
              A Decade of Wildfires.
              <br />
              Minutes to Spread.
              <br />
              <span className="text-cta font-[500]">California, USA</span>
            </h2>
          </div>

          <div className="max-w-[800px]">
            <div
              aria-hidden="true"
              className="mb-10 ml-5 h-0 w-0 border-y-[18px] border-l-[18px] border-y-transparent border-l-white max-md:mb-8 max-md:ml-0 max-md:border-y-[18px] max-md:border-l-[18px]"
            />
            <p className="max-w-[780px] font-heading text-h3 font-[350] uppercase leading-[1.2] text-white">
              We detect at ignition, providing a{" "}
              <span className="font-bold">15-minute</span>
              <br className="hidden md:block" /> head start before the invisible becomes
              <br className="hidden md:block" /> inevitable, because every minute counts.
            </p>
          </div>
        </div>

        <div
          ref={calloutLayerRef}
          className="absolute inset-0 z-20"
        >
          <FireCallout
            label="Tubbs Complex (2017)"
            stats={{
              scale: "36,807 acres | 23 days",
              delay: "15-60 mins to detect",
              impact: "5,636 structures destroyed | $1B+ losses",
            }}
            className="left-[30%] top-[37%]"
            enterFrom="left"
            range={[0.4, 0.52]}
            markerPosition="right"
          />
          <FireCallout
            label="Camp Fire (2018)"
            stats={{
              scale: "153,336 acres | 17 days",
              delay: "10-90 mins to detect",
              impact: "18,804 structures destroyed | $16.5B losses",
            }}
            className="left-[56%] top-[11%]"
            enterFrom="right"
            range={[0.46, 0.58]}
          />
          <FireCallout
            label="August Complex (2020)"
            stats={{
              scale: "1,032,648 acres | ~87 days",
              delay: "~180 mins to detect",
              impact: "935 structures destroyed | $2B+ losses",
            }}
            className="left-[35%] top-[25%]"
            enterFrom="left"
            range={[0.52, 0.64]}
            markerPosition="left"
          />
          <FireCallout
            label="Dixie Fire (2021)"
            stats={{
              scale: "963,309 acres | ~104 days",
              delay: "~120-180 mins to detect",
              impact: "1,311 structures destroyed | $1.2B+ losses",
            }}
            className="left-[65%] top-[13%]"
            enterFrom="right"
            range={[0.58, 0.72]}
            markerPosition="left"
          />
          <FireCallout
            label="Palisades Fire (2025*)"
            stats={{
              scale: "~20,000-25,000 acres | ~2-3 weeks",
              delay: "~45 mins to detect",
              impact: "5,636 structures destroyed | $1B+ losses",
            }}
            className="left-[40%] top-[87%]"
            enterFrom="left"
            range={[0.7, 0.86]}
            markerPosition="left"
            expandDirection="up"
            doesHaveAsterisk="*Recent incident context; figures may evolve with final reporting"
          />
        </div>

        {/* <WavyLogo
          width={500}
          color="#FFFFFF"
          gap={80}
          height={200}
          strokWidth={15}
          className="pointer-events-none absolute bottom-0 right-0 z-10 hidden lg:block"
        /> */}

        <div className=" absolute bottom-0 right-0 z-10 hidden lg:block w-[600px]">
          <img src="/images/wave-logo.png" className="object-cover align-bottom" alt="" />
        </div>
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
  enterFrom,
  range,
  markerPosition = "right",
  expandDirection = "down",
  doesHaveAsterisk = ""
}: FireCalloutProps) {
  const offset = enterFrom === "left" ? "-10vw" : "10vw";
  const isMarkerLeft = markerPosition === "left";
  const isExpandUp = expandDirection === "up";

  return (
    <div
      className={cn("fire-callout group absolute h-0 w-0 hover:z-40", className)}
      data-enter-from={enterFrom}
      data-start={range[0]}
      data-end={range[1]}
      style={{ opacity: 0, transform: `translateX(${offset})` }}
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
          "absolute z-20 flex h-12 w-12 items-center justify-center",
          isExpandUp ? "-bottom-6" : "-top-6",
          isMarkerLeft ? "-left-6" : "-right-6"
        )}>
          {/* Ambient glow behind everything */}
          <motion.div
            className="absolute inset-[-4px] rounded-full bg-[#F55656]/20 blur-md"
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Pulsing Rings — expand outward and fade to nothing */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border-[2.5px] border-white/80"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: [0.5, 1.6, 2.2], opacity: [0, 0.7, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 1,
                ease: "easeOut",
              }}
            />
          ))}

          {/* The Central Marker — breathing red dot */}
          <motion.div
            className="relative z-10 h-6 w-6 rounded-full border-[3.5px] border-white bg-[#F55656] shadow-[0_0_12px_rgba(245,86,86,0.5),0_0_24px_rgba(245,86,86,0.2)] max-md:h-7 max-md:w-7 max-md:border-[3px]"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Header Content */}
        <div className="px-5 py-5">
          <h3 className="font-heading font-figtree uppercase leading-none text-white">
            {label}
          </h3>
        </div>

        {/* Expandable Stats */}
        <div className="grid grid-rows-[0fr] font-figtree font-[400] transition-[grid-template-rows] duration-300 group-hover:grid-rows-[1fr]">
          <div className="overflow-hidden">
            <div className="space-y-5  pb-6 pt-5 text-body leading-tight">
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
    </div>
  );
}
