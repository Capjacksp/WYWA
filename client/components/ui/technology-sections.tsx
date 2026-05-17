import { motion } from "framer-motion";
import { useState } from "react";
import { useHorizontalScroll } from "@/hooks/use-horizontal-scroll";

const fusionCards = [
  {
    eyebrow: "Encoder 1",
    title: "Chemical",
    body: "VOC, CO2, and particulate signatures identify early combustion chemistry before visible smoke forms.",
    iconSrc: "/images/tech-multi-1.png",
  },
  {
    eyebrow: "Encoder 2",
    title: "Visual",
    body: "Live camera feeds are processed by a vision transformer that extracts spatial features and identifies anomalous regions.",
    iconSrc: "/images/tech-multi-2.png",
  },
  {
    eyebrow: "Encoder 3",
    title: "Temporal",
    body: "Motion vectors across 5-second clips are analyzed to distinguish rising smoke plumes from drifting fog.",
    iconSrc: "/images/tech-multi-3.png",
  },
  {
    eyebrow: "Encoder 4",
    title: "Fusion Layer",
    body: "A cross-attention transformer fuses the encodings. The model dynamically learns contextual weighting; chemical data is weighted higher at dawn, and visual data is weighted higher in dry conditions.",
    iconSrc: "/images/tech-multi-4.png",
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

const fusionWavePath =
  "M -80 165 C -80 95, -20 48, 31 48 C 82 48, 109 78, 109 102 V 236 C 109 291, 154 314, 187 314 C 220 314, 265 291, 265 236 V 102 C 265 48, 310 24, 343 24 C 376 24, 421 48, 421 102 V 236 C 421 291, 466 314, 499 314 C 532 314, 577 291, 577 236 V 102 C 577 48, 622 24, 655 24 C 688 24, 733 48, 733 102 V 236 C 733 291, 778 314, 811 314 C 844 314, 889 291, 889 236 V 102 C 889 48, 934 24, 967 24 C 1000 24, 1045 48, 1045 102 V 236 C 1045 291, 1090 314, 1123 314 C 1156 314, 1201 291, 1201 236 V 102 C 1201 48, 1246 24, 1279 24 C 1312 24, 1357 48, 1357 102 V 236 C 1357 291, 1402 314, 1435 314 C 1468 314, 1513 291, 1513 236 V 102 C 1513 48, 1558 24, 1591 24 C 1624 24, 1669 48, 1669 102 V 236 C 1669 291, 1714 314, 1747 314 C 1780 314, 1825 291, 1825 236 V 102 C 1825 48, 1870 24, 1903 24 C 1936 24, 1981 48, 1981 102 V 236 C 1981 291, 2026 314, 2059 314 C 2092 314, 2137 291, 2137 236 V 102 C 2137 48, 2182 24, 2215 24 C 2248 24, 2293 48, 2293 102 V 236 C 2293 291, 2338 314, 2371 314 C 2404 314, 2449 291, 2449 236 V 102 C 2449 48, 2494 24, 2527 24 C 2580 24, 2610 72, 2610 126";

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
    <section className="relative overflow-hidden bg-bg-dark pb-8 pt-28 text-white max-md:px-5 max-md:py-20">
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
            className="pointer-events-none absolute left-[-50px] top-[-16px] z-0 h-[230px] overflow-hidden max-md:hidden"
            animate={{ width: `calc(${(activeIndex + 0.5) * 25}% + 50px)` }}
            transition={{ type: "spring", stiffness: 130, damping: 20 }}
          >
            <svg
              className="absolute left-0 top-0 h-[230px] w-[1800px] overflow-visible"
              viewBox="0 0 2650 339"
              preserveAspectRatio="xMinYMin meet"
            >
              <motion.g
                key={activeIndex}
                initial={{ opacity: 0.52 }}
                animate={{ opacity: [0.52, 0.52, 0.52] }}
                transition={{
                  opacity: { duration: 0.48, ease: "easeOut" },
                }}
              >
                <path
                  d={fusionWavePath}
                  fill="none"
                  stroke="#F5F5F54A"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="48"
                />
              </motion.g>
            </svg>
          </motion.div>

          <div className="relative px-[50px] z-10 grid grid-cols-4 items-end gap-2 min-h-[360px] max-lg:grid-cols-2 max-md:grid-cols-1 max-md:min-h-0">
            {fusionCards.map(({ eyebrow, title, body, iconSrc }, index) => {
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
                    <img
                      src={iconSrc}
                      alt=""
                      className="mb-8 h-20 w-20 object-contain"
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
      data-header-class="header-dark"
      className="relative bg-[#F7F7F7]"
      style={{ height: sectionHeight }}
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-[#F7F7F7]">
        <motion.div className="flex h-full" style={{ width: trackWidth, x: trackX }}>
          <div
            className="box-border flex h-full shrink-0 flex-col justify-start px-[50px] py-[clamp(2rem,6.5vh,6rem)] max-md:px-5"
            style={{ width: slideWidth }}
          >
            <div className="mb-[clamp(2.5rem,9vh,7rem)] flex items-start gap-24 max-md:mb-16 max-md:gap-8">
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
                    className="aspect-[1.4/1] max-h-[min(42vh,360px)] w-full object-cover"
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
            className="box-border flex h-full shrink-0 flex-col justify-start px-[50px] py-[clamp(2rem,6.5vh,6rem)] max-md:px-5"
            style={{ width: slideWidth }}
          >
            <div className="mb-[clamp(2.5rem,9vh,12rem)] flex items-start gap-24 max-md:mb-16 max-md:gap-8">
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
                    className="aspect-[1.4/1] max-h-[min(42vh,360px)] w-full object-cover"
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
