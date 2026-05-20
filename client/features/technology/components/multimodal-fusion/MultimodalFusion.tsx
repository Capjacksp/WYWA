import { motion } from "framer-motion";
import { useState } from "react";
import { fusionCards } from "@/features/technology/data/technologyCards";
import { fusionWavePath } from "@/features/technology/data/fusionWavePath";
import { ScrollTextLines } from "@/components/ui/scroll-text-lines";

export function MultimodalFusion() {
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <section className="relative overflow-hidden bg-bg-dark pb-8 pt-28 text-white max-md:px-5 max-md:py-20">
      <div className="mx-auto">
        <div className="text-center">
          <ScrollTextLines
            as="h2"
            className="font-body text-display font-normal uppercase tracking-normal text-cta"
            lines={["The Intelligence Layer"]}
          />
          <ScrollTextLines
            as="p"
            className="font-body text-display font-normal uppercase tracking-normal text-white"
            delay={0.08}
            lines={["Multimodal Fusion"]}
          />
        </div>

        <div className="mt-20 flex flex-wrap items-center justify-center gap-x-9 gap-y-5 font-body text-sm uppercase tracking-[0.22em] text-white max-md:mt-12 max-md:tracking-[0.14em]">
          <ScrollTextLines as="span" lines={["Three Signal Types"]} />
          <span className="h-6 w-[2px] bg-white" />
          <ScrollTextLines
            as="span"
            delay={0.08}
            lines={["One Cross-Attention Transformer"]}
          />
          <span className="h-6 w-[2px] bg-white" />
          <ScrollTextLines
            as="span"
            delay={0.16}
            lines={["Each Modality Catches What The Others Miss"]}
          />
        </div>

        <div className="relative mt-36 max-md:mt-16">
          <FusionWave activeIndex={activeIndex} />

          <div className="relative z-10 grid min-h-[360px] grid-cols-4 items-end gap-2 px-[50px] max-lg:grid-cols-2 max-md:min-h-0 max-md:grid-cols-1">
            {fusionCards.map(({ eyebrow, title, body, iconSrc }, index) => {
              const isActive = index === activeIndex;

              return (
                <motion.button
                  type="button"
                  key={title}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  className={`group relative min-h-[120px] overflow-hidden px-7 py-4 text-left transition-colors duration-300 max-md:min-h-[230px] ${
                    isActive
                      ? "bg-white text-bg-dark"
                      : "bg-[#676767] text-white hover:bg-[#777777]"
                  }`}
                  animate={{
                    height: isActive ? 360 : 120,
                  }}
                  transition={{ type: "spring", stiffness: 130, damping: 20 }}
                >
                  <span className="block font-body text-sm font-normal uppercase tracking-[0.2em]">
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

function FusionWave({ activeIndex }: { activeIndex: number }) {
  return (
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
          transition={{ opacity: { duration: 0.48, ease: "easeOut" } }}
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
  );
}
