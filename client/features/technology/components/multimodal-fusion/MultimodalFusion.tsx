import { fusionCards } from "@/features/technology/data/technologyCards";
import { useEffect, useRef, useState } from "react";
import { fusionWavePath } from "@/features/technology/data/fusionWavePath";
import { ScrollTextLines } from "@/components/ui/scroll-text-lines";
import { CursorRadialGlow } from "@/components/ui/cursor-radial-glow";
import { useIsMobile } from "@/hooks/use-mobile";

const FUSION_WAVE_STROKE = "#f5f5f502";

export function MultimodalFusion() {
  const isMobile = useIsMobile();

  return isMobile ? <MobileMultimodalFusion /> : <DesktopMultimodalFusion />;
}

function DesktopMultimodalFusion() {
  return (
    <CursorRadialGlow
      as="section"
      data-header-class=""
      className="sticky top-0 z-20 h-screen min-h-[720px] overflow-hidden bg-bg-dark text-white max-md:hidden"
    >
      <div className="relative z-10 mx-auto flex h-full pt-16 flex-col">
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
          <FusionWave />

          <div className="relative z-10 grid min-h-[360px] grid-cols-4 overflow-visible items-end gap-2 px-[70px] max-lg:grid-cols-2 max-md:min-h-0 max-md:grid-cols-1">
            {fusionCards.map(({ eyebrow, title, body, iconSrc }, index) => {
              const isFusionLayer = index === 3;

              return (
                <article
                  key={title}
                  className={`relative h-[360px] px-7 py-4 text-left ${isFusionLayer
                    ? "overflow-visible bg-[#90E8FF] text-bg-dark"
                    : "overflow-hidden bg-transparent text-white"
                    }`}
                >
                  {!isFusionLayer && (
                    <span className="block font-body text-xs font-normal uppercase tracking-[0.2em]">
                      {eyebrow}
                    </span>
                  )}
                  <span
                    className={`${isFusionLayer ? "mt-5" : "mt-2 text-cta"} block font-body text-[20px] font-bold uppercase leading-none tracking-normal`}
                  >
                    {title}
                  </span>

                  <div className="mt-20">
                    <FusionCardIcon
                      iconSrc={iconSrc}
                      isOnLightBackground={isFusionLayer}
                      className="mb-8 h-14 w-14"
                    />
                    <p className="max-w-[340px] font-figtree text-body font-normal leading-snug">
                      {body}
                    </p>
                  </div>
                  {isFusionLayer && (
                    <div className="absolute -top-[54px] -right-[37px]">
                      <svg className="ml-[-17px]" width="17" height="17" viewBox="0 0 17 17" xmlns="http://www.w3.org/2000/svg">
                        <rect width="17" height="17" fill="#90E8FF" />
                      </svg>
                      <svg width="37" height="37" viewBox="0 0 37 37" xmlns="http://www.w3.org/2000/svg">
                        <rect width="37" height="37" fill="#90E8FF" />
                      </svg>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </CursorRadialGlow>
  );
}

function MobileMultimodalFusion() {
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSectionInView, setIsSectionInView] = useState(false);
  const isAutoScrolling = useRef(false);
  const scrollDebounce = useRef<number>();
  const intervalRef = useRef<number>();

  const restartAutoScroll = () => {
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    if (!isSectionInView) return;

    intervalRef.current = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % fusionCards.length);
    }, 3000);
  };

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const cards = Array.from(
      rail.querySelectorAll<HTMLElement>("[data-fusion-card-slot]"),
    );
    const activeCard = cards[activeIndex];
    if (!activeCard) return;

    isAutoScrolling.current = true;
    rail.scrollTo({
      left:
        activeCard.offsetLeft +
        activeCard.offsetWidth / 2 -
        rail.clientWidth / 2,
      behavior: "smooth",
    });

    const timeout = window.setTimeout(() => {
      isAutoScrolling.current = false;
    }, 700);

    return () => window.clearTimeout(timeout);
  }, [activeIndex]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof IntersectionObserver === "undefined") {
      setIsSectionInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsSectionInView(entry.isIntersecting),
      { rootMargin: "200px 0px" },
    );
    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    restartAutoScroll();

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [isSectionInView]);

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
      const nearestCard = cards.reduce(
        (closest, card, index) => {
          const distance = Math.abs(
            card.offsetLeft + card.offsetWidth / 2 - railCenter,
          );

          return distance < closest.distance ? { index, distance } : closest;
        },
        { index: 0, distance: Infinity },
      );

      setActiveIndex(nearestCard.index);
      restartAutoScroll();
    }, 80);
  };

  return (
    <section
      ref={sectionRef}
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

        <div className="mx-auto mt-[42px] flex max-w-[330px] flex-col items-center font-body font-[350] uppercase leading-[28px] tracking-normal text-center text-white">
          <ScrollTextLines
            as="span"
            lineClassName="inline-flex text-[11px] items-center gap-2"
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
            lineClassName="inline-flex text-[11px] items-center gap-2"
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
            lineClassName="inline-flex text-[11px] items-center gap-2"
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

      <MobileFusionWave />

      <div
        ref={railRef}
        className="relative z-10 mt-[132px] flex h-[350px] items-end gap-3 overflow-x-auto px-[calc(50%-150px)] snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label="Multimodal fusion encoders"
        onScroll={handleScroll}
      >
        {fusionCards.map((card, index) => (
          <MobileFusionCard key={card.title} card={card} index={index} />
        ))}
      </div>

      <div className="mt-5 flex justify-center gap-3 pb-8" aria-hidden="true">
        {fusionCards.map((card, index) => (
          <span
            key={card.title}
            className={`h-1.5 w-8 transition-colors ${index === activeIndex ? "bg-[#90E8FF]" : "bg-white/20"
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
}: {
  card: (typeof fusionCards)[number];
  index: number;
}) {
  const isFusionLayer = index === 3;

  return (
    <article
      data-fusion-card-slot
      className={`h-[330px] w-[300px] shrink-0 snap-center overflow-hidden px-[18px] py-[22px] text-left ${isFusionLayer
        ? "bg-[#90E8FF] text-bg-dark"
        : "bg-transparent text-white"
        }`}
    >
      {!isFusionLayer && (
        <p className="font-figtree text-[10px] font-[500] uppercase tracking-[0.12em]">
          {card.eyebrow}
        </p>
      )}
      <h3
        className={`${isFusionLayer ? "" : "mt-1 text-cta"} font-heading text-[18px] font-[800] uppercase leading-none tracking-normal`}
      >
        {card.title}
      </h3>

      <div>
        <FusionCardIcon
          iconSrc={card.iconSrc}
          isOnLightBackground={isFusionLayer}
          className="mt-8 h-20 w-20"
        />

        <p className="mt-[48px] max-w-[280px] font-figtree text-[12px] font-[400] leading-[1.45]">
          {getMobileFusionBody(card.title, card.body)}
        </p>
      </div>
    </article>
  );
}

function FusionCardIcon({
  iconSrc,
  isOnLightBackground,
  className,
}: {
  iconSrc: string;
  isOnLightBackground: boolean;
  className: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`block ${isOnLightBackground ? "bg-bg-dark" : "bg-[#90E8FF]"} ${className}`}
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

function MobileFusionWave() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-[-24px] right-0 bottom-0 z-0 h-[140px] overflow-hidden"
    >
      <svg
        className="absolute bottom-[16px] left-0 h-[100vh] w-[32px]"
        preserveAspectRatio="none"
        viewBox="0 0 48 100"
      >
        <path
          d="M24 0V100"
          fill="none"
          stroke={FUSION_WAVE_STROKE}
          strokeWidth="48"
        />
      </svg>
      <svg
        className="absolute bottom-0 left-[-60px] h-[140px] w-[600px] overflow-visible"
        viewBox="0 0 2650 339"
        preserveAspectRatio="xMinYMin meet"
      >
        <g>
          <path
            d={fusionWavePath}
            fill="none"
            stroke={FUSION_WAVE_STROKE}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="48"
          />
        </g>
      </svg>
    </div>
  );
}

function getMobileFusionBody(title: string, fallback: string) {
  if (title === "Chemical") {
    return "The VOC time series is processed with 1D convolutions to capture gas-concentration slopes, enabling visual detection 45 seconds earlier.";
  }

  return fallback;
}

function FusionWave() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 max-md:hidden"
    >
      <svg
        className="absolute bottom-[16px] left-0 h-[100vh] w-[32px]"
        preserveAspectRatio="none"
        viewBox="0 0 48 100"
      >
        <path
          d="M24 0V100"
          fill="none"
          stroke={FUSION_WAVE_STROKE}
          strokeWidth="48"
        />
      </svg>
      <svg
        className="absolute bottom-0 left-[-60px] h-[230px] w-[1800px] overflow-visible"
        viewBox="0 0 2650 339"
        preserveAspectRatio="xMinYMin meet"
      >
        <g>
          <path
            d={fusionWavePath}
            fill="none"
            stroke={FUSION_WAVE_STROKE}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="48"
          />
        </g>
      </svg>
    </div>
  );
}
