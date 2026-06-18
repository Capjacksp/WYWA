import { motion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useHorizontalScroll } from "@/hooks/use-horizontal-scroll";
import { useResponsiveVideoSource } from "@/hooks/use-responsive-video-source";
import {
  labTestCards,
  wildfireClassCards,
} from "@/features/technology/data/technologyCards";
import { ArrowHead } from "@/components/common/ArrowHead";
import { ScrollTextLines } from "@/components/ui/scroll-text-lines";

export function WildfireDetectionShowcase() {
  return (
    <>
      <DesktopWildfireDetectionShowcase />
      <MobileWildfireDetectionShowcase />
    </>
  );
}

function DesktopWildfireDetectionShowcase() {
  const { sectionRef, sectionHeight, trackWidth, trackX, slideWidth } =
    useHorizontalScroll({
      slideCount: 2,
    });
  const scrollToSlide = (index: number) => {
    const section = sectionRef.current;
    if (!section) return;

    const scrollDistance = section.offsetHeight - window.innerHeight;
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const progress = index > 0 ? 1 : 0;

    window.scrollTo({
      top: sectionTop + scrollDistance * progress,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      data-header-class="header-dark"
      className="relative bg-[#F7F7F7] max-md:hidden"
      style={{ height: sectionHeight }}
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-[#F7F7F7]">
        <motion.div className="flex h-full" style={{ width: trackWidth, x: trackX }}>
          <ShowcaseSlide
            title={
              <>
                Wildfire Detection
                <br />
                Classes
              </>
            }
            animatedTitleLines={["Wildfire Detection", "Classes"]}
            arrowDirection="right"
            arrowLabel="Show lab tests"
            onArrowClick={() => scrollToSlide(1)}
            width={slideWidth}
          >
            <div className="mt-auto grid grid-cols-3 items-end gap-4 max-lg:gap-3 max-md:grid-cols-1">
              {wildfireClassCards.map((card) => (
                <article key={card.label}>
                  <ClassVideo
                    card={card}
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
          </ShowcaseSlide>

          <ShowcaseSlide
            title="Lab Tests"
            arrowDirection="left"
            arrowLabel="Show wildfire detection classes"
            onArrowClick={() => scrollToSlide(0)}
            width={slideWidth}
            titleSpacingClassName="mb-[clamp(2.5rem,9vh,12rem)]"
          >
            <div className="mt-auto grid grid-cols-3 items-end gap-4 max-lg:gap-3 max-md:grid-cols-1">
              {labTestCards.map((card) => (
                <article key={card.title}>
                  <LabVideo
                    card={card}
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
          </ShowcaseSlide>
        </motion.div>
      </div>
    </section>
  );
}

function MobileWildfireDetectionShowcase() {
  return (
    <section
      data-header-class="header-dark"
      className="bg-[#F7F7F7] px-0 pb-20 pt-[96px] md:hidden"
    >
      <MobileCardRail
        title={
          <>
            Wildfire
            <br />
            Detection
            <br />
            Classes
          </>
        }
        animatedTitleLines={["Wildfire", "Detection", "Classes"]}
        cards={wildfireClassCards}
        renderCard={(card) => (
          <MobileClassCard key={card.label} card={card} />
        )}
      />

      <MobileCardRail
        className="mt-20"
        title="Lab Tests"
        cards={labTestCards}
        renderCard={(card) => (
          <MobileLabCard key={card.title} card={card} />
        )}
      />
    </section>
  );
}

function MobileCardRail<T>({
  title,
  cards,
  renderCard,
  className = "",
  animatedTitleLines,
}: {
  title: ReactNode;
  cards: readonly T[];
  renderCard: (card: T) => ReactNode;
  className?: string;
  animatedTitleLines?: ReactNode[];
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isAutoScrolling = useRef(false);
  const scrollDebounce = useRef<ReturnType<typeof setTimeout>>();

  const scrollToCard = (index: number) => {
    const rail = railRef.current;
    const slot = rail?.querySelectorAll<HTMLElement>("[data-mobile-card-slot]")[
      index
    ];

    if (!rail || !slot) return;

    isAutoScrolling.current = true;
    rail.scrollTo({
      left: slot.offsetLeft + slot.offsetWidth / 2 - rail.clientWidth / 2,
      behavior: "smooth",
    });
    setTimeout(() => { isAutoScrolling.current = false; }, 700);
  };

  const goToCard = (index: number) => {
    const nextIndex = Math.max(0, Math.min(cards.length - 1, index));
    setActiveIndex(nextIndex);
    scrollToCard(nextIndex);
  };

  useEffect(() => {
    if (cards.length <= 1) return;

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => {
        const next = (current + 1) % cards.length;
        scrollToCard(next);
        return next;
      });
    }, 3000);

    return () => window.clearInterval(intervalId);
  }, [cards.length]);

  const handleScroll = () => {
    if (isAutoScrolling.current) return;

    clearTimeout(scrollDebounce.current);
    scrollDebounce.current = setTimeout(() => {
      const rail = railRef.current;
      if (!rail) return;

      const railCenter = rail.getBoundingClientRect().left + rail.clientWidth / 2;
      const slots = Array.from(
        rail.querySelectorAll<HTMLElement>("[data-mobile-card-slot]"),
      );

      const nearest = slots.reduce(
        (closest, slot, index) => {
          const rect = slot.getBoundingClientRect();
          const distance = Math.abs(rect.left + rect.width / 2 - railCenter);
          return distance < closest.distance ? { index, distance } : closest;
        },
        { index: activeIndex, distance: Number.POSITIVE_INFINITY },
      );

      if (nearest.index !== activeIndex) {
        setActiveIndex(nearest.index);
      }
    }, 80);
  };

  return (
    <div className={className}>
      <div className="mb-10 flex items-start gap-4 px-7">
        <button
          type="button"
          className="shrink-0 border-0 bg-transparent p-0 leading-none focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F55656] disabled:pointer-events-none"
          onClick={() => goToCard(activeIndex + 1)}
          disabled={activeIndex + 1 >= cards.length}
          aria-label="Show next card"
        >
          <ArrowHead
            direction="right"
            size={16}
            color={activeIndex + 1 < cards.length ? "#F55656" : "transparent"}
          />
        </button>

        {animatedTitleLines ? (
          <ScrollTextLines
            as="h2"
            className="font-heading text-[42px] font-[400] uppercase leading-[0.94] tracking-normal text-bg-dark"
            lines={animatedTitleLines}
          />
        ) : (
          <h2 className="font-heading text-[42px] font-[400] uppercase leading-[0.94] tracking-normal text-bg-dark">
            {title}
          </h2>
        )}

        <button
          type="button"
          className="shrink-0 border-0 bg-transparent p-0 leading-none focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F55656] disabled:pointer-events-none"
          onClick={() => goToCard(activeIndex - 1)}
          disabled={activeIndex <= 0}
          aria-label="Show previous card"
        >
          <ArrowHead
            direction="left"
            size={16}
            color={activeIndex > 0 ? "#F55656" : "transparent"}
          />
        </button>
      </div>

      <div
        ref={railRef}
        className="snap-x snap-mandatory overflow-x-auto px-[28px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        onScroll={handleScroll}
      >
        <div className="flex w-max gap-7">
          {cards.map((card, index) => (
            <div
              key={index}
              data-mobile-card-slot
              className="snap-center"
            >
              {renderCard(card)}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex justify-center gap-3">
        {cards.map((_, index) => (
          <span
            key={index}
            className={`h-1.5 w-8 transition-colors ${index === activeIndex ? "bg-[#F55656]" : "bg-bg-dark/20"
              }`}
          />
        ))}
      </div>
    </div>
  );
}

function MobileClassCard({
  card,
}: {
  card: (typeof wildfireClassCards)[number];
}) {
  return (
    <article className="w-[334px] shrink-0">
      <ClassVideo
        card={card}
        className="aspect-[334/421] w-full object-cover"
      />
      <h3 className="mt-9 font-figtree text-[19px] font-[700] uppercase leading-none tracking-[0.16em] text-bg-dark">
        <span className="text-[#F55656]">{card.label}</span>
        <span className="px-2">-</span>
        {card.title}
      </h3>
      <p className="mt-2 font-figtree text-[14px] font-[400] leading-tight text-bg-dark">
        {card.body}
      </p>
    </article>
  );
}

function MobileLabCard({
  card,
}: {
  card: (typeof labTestCards)[number];
}) {
  return (
    <article className="w-[334px] shrink-0">
      <LabVideo
        card={card}
        className="aspect-[334/421] w-full object-cover"
      />
      <h3 className="mt-9 font-figtree text-[19px] font-[700] uppercase leading-none tracking-[0.16em] text-bg-dark">
        {card.title}
      </h3>
      <p className="mt-2 font-figtree text-[19px] font-[700] uppercase leading-none tracking-[0.16em] text-[#F55656]">
        {card.result}
      </p>
    </article>
  );
}

function ClassVideo({
  card,
  className,
}: {
  card: (typeof wildfireClassCards)[number];
  className: string;
}) {
  const source = useResponsiveVideoSource({
    desktop: card.desktopVideo,
    mobile: card.mobileVideo,
  });

  return (
    <video
      className={className}
      src={source}
      poster={card.image}
      aria-label={`${card.label}: ${card.title}`}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
    />
  );
}

function LabVideo({
  card,
  className,
}: {
  card: (typeof labTestCards)[number];
  className: string;
}) {
  return (
    <video
      className={className}
      src={card.video}
      poster={card.image}
      aria-label={`${card.title}: ${card.result}`}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
    />
  );
}

function ShowcaseSlide({
  title,
  arrowDirection,
  arrowLabel,
  onArrowClick,
  width,
  titleSpacingClassName = "mb-[clamp(2.5rem,9vh,7rem)]",
  animatedTitleLines,
  children,
}: {
  title: ReactNode;
  arrowDirection: "left" | "right";
  arrowLabel: string;
  onArrowClick: () => void;
  width: string;
  titleSpacingClassName?: string;
  animatedTitleLines?: ReactNode[];
  children: ReactNode;
}) {
  return (
    <div
      className="box-border flex h-full shrink-0 flex-col justify-start px-[50px] pt-16 pb-[clamp(2rem,6.5vh,6rem)] max-md:px-5"
      style={{ width }}
    >
      <div
        className={`${titleSpacingClassName} flex items-start gap-24 max-md:mb-16 max-md:gap-8`}
      >
        <button
          type="button"
          className="mt-4 shrink-0 border-0 bg-transparent p-0 leading-none focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F15D59] max-md:mt-1"
          onClick={onArrowClick}
          aria-label={arrowLabel}
        >
          <ArrowHead direction={arrowDirection} />
        </button>
        {animatedTitleLines ? (
          <ScrollTextLines
            as="h2"
            className="font-body text-display font-normal uppercase leading-[1] tracking-normal text-bg-dark"
            lines={animatedTitleLines}
          />
        ) : (
          <h2 className="font-body text-display font-normal uppercase leading-[1] tracking-normal text-bg-dark">
            {title}
          </h2>
        )}
      </div>

      {children}
    </div>
  );
}
