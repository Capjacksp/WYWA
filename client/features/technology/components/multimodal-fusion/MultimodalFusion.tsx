import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { fusionCards } from "@/features/technology/data/technologyCards";
import { fusionWavePath } from "@/features/technology/data/fusionWavePath";
import { ScrollTextLines } from "@/components/ui/scroll-text-lines";
import { CursorRadialGlow } from "@/components/ui/cursor-radial-glow";
import { useIsMobile } from "@/hooks/use-mobile";

export function MultimodalFusion() {
  const isMobile = useIsMobile();

  return isMobile ? <MobileMultimodalFusion /> : <DesktopMultimodalFusion />;
}

function DesktopMultimodalFusion() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <CursorRadialGlow
      as="section"
      data-header-class=""
      className="sticky top-0 z-20 h-screen min-h-[720px] overflow-hidden bg-bg-dark pt-16 pb-[10px] text-white max-md:hidden"
    >
      <div className="relative z-10 mx-auto flex h-full flex-col">
        <div className="text-center">
          <div className="mx-auto w-fit cursor-default">
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
        </div>

        <div className="mt-[clamp(2rem,6vh,5rem)] flex flex-wrap items-center justify-center gap-x-4 gap-y-5 font-body text-[16px] font-[350] uppercase leading-[28px] tracking-normal text-center text-white max-md:mt-12">
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

        <div className="relative mt-auto max-md:mt-16">
          <FusionWave activeIndex={activeIndex} />

          <div className="relative z-10 grid min-h-[360px] grid-cols-4 items-end gap-2 px-[50px] max-lg:grid-cols-2 max-md:min-h-0 max-md:grid-cols-1">
            {fusionCards.map(({ eyebrow, title, body, iconSrc }, index) => {
              const isActive = index === activeIndex;
              const isActiveFusionLayer = isActive && index === 3;

              return (
                <motion.button
                  type="button"
                  key={title}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  className={`group relative min-h-[120px] overflow-hidden px-7 py-4 text-left transition-colors duration-300 max-md:min-h-[230px] ${isActive
                    ? isActiveFusionLayer
                      ? "bg-[#F15D59] text-white"
                      : "bg-white text-bg-dark"
                    : "bg-[#676767] text-white hover:bg-[#777777]"
                    }`}
                  animate={{
                    height: isActive ? 360 : 120,
                  }}
                  transition={{ type: "spring", stiffness: 130, damping: 20 }}
                >
                  {!isActiveFusionLayer && (
                    <span className="block font-body text-sm font-normal uppercase tracking-[0.2em]">
                      {!(index === 3) && eyebrow}
                    </span>
                  )}
                  <span
                    className={`${isActiveFusionLayer ? "" : "mt-2"} block font-body text-h3 font-bold uppercase leading-none tracking-normal`}
                  >
                    {title}
                  </span>

                  <motion.div
                    className="mt-10"
                    animate={{
                      opacity: isActive ? 1 : 0,
                      y: isActive ? 0 : 18,
                    }}
                    transition={{ duration: 0.25 }}
                  >
                    <FusionCardIcon
                      iconSrc={iconSrc}
                      isHighlighted={isActiveFusionLayer}
                      className="mb-8 h-20 w-20"
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
    </CursorRadialGlow>
  );
}

function MobileMultimodalFusion() {
  const railRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isAutoScrolling = useRef(false);
  const scrollDebounce = useRef<number>();
  const intervalRef = useRef<number>();

  // Restart the auto-cycle timer (called on manual interaction)
  const restartInterval = () => {
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % fusionCards.length);
    }, 3000);
  };

  // Scroll active card to center of rail whenever activeIndex changes
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const cards = Array.from(
      rail.querySelectorAll<HTMLElement>("[data-fusion-card-slot]"),
    );
    const card = cards[activeIndex];
    if (!card) return;

    const targetScroll =
      card.offsetLeft + card.offsetWidth / 2 - rail.clientWidth / 2;

    isAutoScrolling.current = true;
    rail.scrollTo({ left: targetScroll, behavior: "smooth" });
    const t = window.setTimeout(() => {
      isAutoScrolling.current = false;
    }, 700);
    return () => window.clearTimeout(t);
  }, [activeIndex]);

  // Auto-cycle on mount
  useEffect(() => {
    restartInterval();
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Detect nearest card when user manually scrolls and snap to it
  const handleScroll = () => {
    if (isAutoScrolling.current) return;

    window.clearTimeout(scrollDebounce.current);
    scrollDebounce.current = window.setTimeout(() => {
      const rail = railRef.current;
      if (!rail) return;

      const railCenter = rail.scrollLeft + rail.clientWidth / 2;
      const cards = Array.from(
        rail.querySelectorAll<HTMLElement>("[data-fusion-card-slot]"),
      );

      let nearest = { index: 0, dist: Infinity };
      cards.forEach((card, i) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const dist = Math.abs(cardCenter - railCenter);
        if (dist < nearest.dist) nearest = { index: i, dist };
      });

      setActiveIndex(nearest.index);
      restartInterval(); // reset timer so auto-cycle doesn't interrupt
    }, 80);
  };

  return (
    <section
      data-header-class=""
      className="relative min-h-[100svh] overflow-hidden bg-bg-dark pb-0 pt-[104px] text-white md:hidden"
    >
      <div className="px-7 text-center">
        <div className="mx-auto w-fit cursor-default">
          <ScrollTextLines
            as="h2"
            className="font-heading text-[38px] font-[400] uppercase leading-[0.94] tracking-normal"
            lines={[
              <span className="text-cta">The</span>,
              <span className="text-cta">Intelligence</span>,
              <span className="text-cta">Layer</span>,
              "Multimodal",
              "Fusion.",
            ]}
          />
        </div>

        <div className="mx-auto mt-[42px] flex max-w-[330px] flex-col items-center gap-2 font-body font-[350] uppercase leading-[28px] tracking-normal text-center text-white">
          <ScrollTextLines
            as="span"
            lineClassName="inline-flex text-[18px] items-center gap-2"
            lines={[
              <>
                <span className="h-4 w-px bg-white" />
                Three Signal Types
                <span className="h-4 w-px bg-white" />
              </>,
            ]}
          />
          <ScrollTextLines
            as="span"
            lineClassName="inline-flex text-[18px] items-center gap-2"
            delay={0.08}
            lines={[
              <>
                <span className="h-4 w-px bg-white" />
                One Cross-Attention Transformer
                <span className="h-4 w-px bg-white" />
              </>,
            ]}
          />
          <ScrollTextLines
            as="span"
            lineClassName="inline-flex text-[18px] items-center gap-2"
            delay={0.16}
            lines={[
              <>
                <span className="h-4 w-px bg-white" />
                Each Modality Catches What The Others Miss
                <span className="h-4 w-px bg-white" />
              </>,
            ]}
          />
        </div>
      </div>

      <MobileFusionWave activeIndex={activeIndex} />

      <div
        ref={railRef}
        className="relative z-10 mt-[132px] flex h-[350px] items-end overflow-x-auto px-[calc(50%-150px)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label="Multimodal fusion encoders"
        onScroll={handleScroll}
      >
        {fusionCards.map((card, index) => (
          <MobileFusionCard
            key={card.title}
            card={card}
            index={index}
            isActive={index === activeIndex}
          />
        ))}
      </div>

      <div className="mt-5 flex justify-center gap-3 pb-8">
        {fusionCards.map((card, index) => (
          <span
            key={card.title}
            className={`h-1.5 w-8 transition-colors ${index === activeIndex ? "bg-[#F55656]" : "bg-white/20"
              }`}
          />
        ))}
      </div>
    </section>
  );
}

function MobileFusionCard({
  card,
  index,
  isActive,
}: {
  card: (typeof fusionCards)[number];
  index: number;
  isActive: boolean;
}) {
  const isActiveFusionLayer = isActive && index === 3;

  return (
    <motion.article
      data-fusion-card-slot
      className={`overflow-hidden text-left ${isActive
        ? isActiveFusionLayer
          ? "bg-[#F15D59] text-white"
          : "bg-white text-bg-dark"
        : "bg-[#676767] text-white"
        }`}
      initial={{
        width: 300,
        height: 120,
        paddingLeft: 14,
        paddingRight: 14,
        paddingTop: 14,
        paddingBottom: 14,
      }}
      animate={{
        width: 300,
        height: isActive ? 330 : 120,
        paddingLeft: isActive ? 18 : 14,
        paddingRight: isActive ? 18 : 14,
        paddingTop: isActive ? 22 : 14,
        paddingBottom: isActive ? 22 : 14,
      }}
      style={{ flexShrink: 0 }}
      transition={{ type: "spring", stiffness: 160, damping: 22 }}
    >
      {!isActiveFusionLayer && (
        <p className="font-figtree text-[10px] font-[500] uppercase tracking-[0.12em]">
          {card.eyebrow}
        </p>
      )}
      <h3
        className={`${isActiveFusionLayer ? "" : "mt-1"} font-heading text-[18px] font-[800] uppercase leading-none tracking-normal`}
      >
        {card.title}
      </h3>

      <motion.div
        animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 14 }}
        transition={{ duration: 0.22 }}
      >
        <FusionCardIcon
          iconSrc={card.iconSrc}
          isHighlighted={isActiveFusionLayer}
          className="mt-8 h-20 w-20"
        />

        <p className="mt-[48px] max-w-[280px] font-figtree text-[12px] font-[400] leading-[1.45]">
          {getMobileFusionBody(card.title, card.body)}
        </p>
      </motion.div>
    </motion.article>
  );
}

function FusionCardIcon({
  iconSrc,
  isHighlighted,
  className,
}: {
  iconSrc: string;
  isHighlighted: boolean;
  className: string;
}) {
  if (isHighlighted) {
    return (
      <span
        aria-hidden="true"
        className={`block bg-[#90E8FF] ${className}`}
        style={{
          maskImage: `url(${iconSrc})`,
          maskPosition: "center",
          maskRepeat: "no-repeat",
          maskSize: "contain",
          WebkitMaskImage: `url(${iconSrc})`,
          WebkitMaskPosition: "center",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskSize: "contain",
        }}
      />
    );
  }

  return (
    <img
      src={iconSrc}
      alt=""
      className={`object-contain ${className}`}
      aria-hidden="true"
    />
  );
}

function MobileFusionWave({ activeIndex }: { activeIndex: number }) {
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute left-[-24px] top-[490px] z-0 h-[140px] overflow-hidden"
      animate={{ width: `calc(${(activeIndex + 0.5) * 25}% + 24px)` }}
      transition={{ type: "spring", stiffness: 130, damping: 20 }}
    >
      <svg
        className="absolute left-0 top-0 h-[130px] w-[340px] text-white/10"
        viewBox="0 0 430 136"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M-24 98V37C-24 17.7 -8.3 2 11 2C30.3 2 46 17.7 46 37V98C46 117.3 61.7 133 81 133C100.3 133 116 117.3 116 98V37C116 17.7 131.7 2 151 2C170.3 2 186 17.7 186 37V98C186 117.3 201.7 133 221 133C240.3 133 256 117.3 256 98V37C256 17.7 271.7 2 291 2C310.3 2 326 17.7 326 37V98C326 117.3 341.7 133 361 133C380.3 133 396 117.3 396 98V37C396 17.7 411.7 2 431 2"
          stroke="currentColor"
          strokeWidth="30"
        />
      </svg>
    </motion.div>
  );
}

function getMobileFusionBody(title: string, fallback: string) {
  if (title === "Chemical") {
    return "The VOC time series is processed with 1D convolutions to capture gas-concentration slopes, enabling visual detection 45 seconds earlier.";
  }

  return fallback;
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
