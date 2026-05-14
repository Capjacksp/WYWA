import { motion } from "framer-motion";
import { Activity, Aperture, Flame, RadioTower } from "lucide-react";
import { useState } from "react";
import { WavyLogo } from "@/components/common/Logo";
import { useHorizontalScroll } from "@/hooks/use-horizontal-scroll";

const fusionCards = [
  {
    eyebrow: "Encoder 1",
    title: "Chemical",
    body: "VOC, CO2, and particulate signatures identify early combustion chemistry before visible smoke forms.",
    Icon: Activity,
  },
  {
    eyebrow: "Encoder 2",
    title: "Visual",
    body: "Live camera feeds are processed by a vision transformer that extracts spatial features and identifies anomalous regions.",
    Icon: Aperture,
  },
  {
    eyebrow: "Encoder 3",
    title: "Temporal",
    body: "Motion vectors across 5-second clips are analyzed to distinguish rising smoke plumes from drifting fog.",
    Icon: RadioTower,
  },
  {
    eyebrow: "Encoder 4",
    title: "Fusion Layer",
    body: "A cross-attention transformer fuses the encodings. The model dynamically learns contextual weighting; chemical data is weighted higher at dawn, and visual data is weighted higher in dry conditions.",
    Icon: Flame,
  },
] as const;

const classCards = [
  {
    image: "/images/wildfire-class-fire-flames.png",
    label: "Class A",
    title: "Fire Flames",
    body: "Visible growth or flicker",
  },
  {
    image: "/images/wildfire-class-smoke-plumes.png",
    label: "Class B",
    title: "Smoke Plumes",
    body: "Rising, drifting, expanding",
  },
  {
    image: "/images/wildfire-class-fire-smoke.png",
    label: "Class C",
    title: "Fire and Smoke",
    body: "Combined detection",
  },
] as const;

const labCards = [
  {
    image: "/images/lab-test-incense-smoke.png",
    title: "Incense Smoke",
    result: "Rejected",
  },
  {
    image: "/images/lab-test-brush-fire-smoke.png",
    title: "Brush Fire Smoke",
    result: "Detected",
  },
] as const;

function RedArrow({ direction = "right" }: { direction?: "left" | "right" }) {
  return (
    <span
      aria-hidden="true"
      className={`block h-0 w-0 border-y-[27px] border-y-transparent ${direction === "right"
        ? "border-l-[27px] border-l-[#F15D59]"
        : "border-r-[27px] border-r-[#F15D59]"
        }`}
    />
  );
}

export function MultimodalFusion() {
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <section className="relative overflow-hidden bg-bg-dark px-[50px] pb-8 pt-28 text-white max-md:px-5 max-md:py-20">
      <div className="mx-auto">
        <div className="text-center">
          <h2 className="font-body text-display font-normal uppercase tracking-normal text-cta">
            The Intelligence Layer
          </h2>
          <p className="font-body text-display font-normal uppercase tracking-normal text-white">
            Multimodal Fusion
          </p>
        </div>

        <div className="mt-20 flex flex-wrap justify-center items-center gap-x-9 gap-y-5 font-body text-sm uppercase tracking-[0.22em] text-white max-md:mt-12 max-md:tracking-[0.14em]">
          <span>Three Signal Types</span>
          <span className="h-6 w-[2px] bg-white" />
          <span>One Cross-Attention Transformer</span>
          <span className="h-6 w-[2px] bg-white" />
          <span>Each Modality Catches What The Others Miss</span>
        </div>

        <div className="relative mt-36 max-md:mt-16">
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -top-28 h-[390px] w-[560px] opacity-65 max-md:hidden"
            animate={{ left: `calc(${activeIndex * 25}% - 120px)` }}
            transition={{ type: "spring", stiffness: 80, damping: 22 }}
          >
            <motion.div
              animate={{ x: [-30, 18, -30] }}
              transition={{ duration: 4.5, ease: "easeInOut", repeat: Infinity }}
            >
              <WavyLogo
                width={500}
                height={360}
                strokWidth={34}
                loops={5}
                color="#3C3C3D"
                className="h-full w-full"
              />
            </motion.div>
          </motion.div>

          <div className="relative z-10 grid grid-cols-4 items-end gap-2 min-h-[360px] max-lg:grid-cols-2 max-md:grid-cols-1 max-md:min-h-0">
            {fusionCards.map(({ eyebrow, title, body, Icon }, index) => {
              const isActive = index === activeIndex;

              return (
                <motion.button
                  type="button"
                  key={title}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  className={`group relative min-h-[120px] overflow-hidden px-7 py-4 text-left transition-colors duration-300 max-md:min-h-[230px] ${isActive
                    ? "bg-white text-bg-dark"
                    : "bg-[#676767] text-white hover:bg-[#777777]"
                    }`}
                  animate={{
                    height: isActive ? 360 : 120
                  }}
                  transition={{ type: "spring", stiffness: 130, damping: 20 }}
                >
                  <span className="block font-body font-normal text-sm uppercase tracking-[0.2em]">
                    {eyebrow}
                  </span>
                  <span className="mt-2 block font-body text-h3 font-bold uppercase leading-none tracking-normal">
                    {title}
                  </span>

                  <motion.div
                    className="mt-10"
                    animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 18 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Icon
                      className="mb-8 h-20 w-20 text-[#F15D59]"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                    <p className="max-w-[340px] font-figtree text-body font-normal leading-snug">
                      {body}
                    </p>
                  </motion.div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export function WildfireDetectionShowcase() {
  const { sectionRef, sectionHeight, trackWidth, trackX, slideWidth } =
    useHorizontalScroll({
      slideCount: 2,
    });

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#F7F7F7]"
      style={{ height: sectionHeight }}
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-[#F7F7F7]">
        <motion.div className="flex h-full" style={{ width: trackWidth, x: trackX }}>
          <div
            className="box-border flex h-full shrink-0 flex-col justify-start px-[50px] py-24 max-md:px-5"
            style={{ width: slideWidth }}
          >
            <div className="mb-28 flex items-start gap-24 max-md:mb-16 max-md:gap-8">
              <div className="mt-4 max-md:mt-1">
                <RedArrow />
              </div>
              <h2 className="font-body text-display font-normal uppercase leading-[1] tracking-normal text-bg-dark">
                Wildfire Detection
                <br />
                Classes
              </h2>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-auto items-end max-lg:gap-3 max-md:grid-cols-1">
              {classCards.map((card) => (
                <article key={card.label}>
                  <img
                    src={card.image}
                    alt=""
                    className="aspect-[1.4/1] w-full object-cover"
                  />
                  <h3 className="mt-5 font-figtree text-h3 font-[600] uppercase leading-none tracking-[0.10em] text-bg-dark">
                    <span className="text-[#F15D59]">{card.label}</span>
                    <span className="px-3">-</span>
                    {card.title}
                  </h3>
                  <p className="mt-2 font-figtree text-body font-[400] text-bg-dark">
                    {card.body}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div
            className="box-border flex h-full shrink-0 flex-col justify-start px-[50px] py-24 max-md:px-5"
            style={{ width: slideWidth }}
          >
            <div className="mb-48 flex items-start gap-24 max-md:mb-16 max-md:gap-8">
              <div className="mt-4 max-md:mt-1">
                <RedArrow direction="left" />
              </div>
              <h2 className="font-body text-display font-normal uppercase leading-[1] tracking-normal text-bg-dark">
                Lab Tests
              </h2>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-auto items-end max-lg:gap-3 max-md:grid-cols-1">
              {labCards.map((card) => (
                <article key={card.title}>
                  <img
                    src={card.image}
                    alt=""
                    className="aspect-[1.4/1] w-full object-cover"
                  />
                  <h3 className="mt-5 font-figtree text-h3 font-[600] uppercase leading-none tracking-[0.10em] text-bg-dark">
                    {card.title}
                  </h3>
                  <p className="mt-2 font-figtree text-h3 font-[600] uppercase leading-none tracking-[0.10em] text-[#F15D59]">
                    {card.result}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
