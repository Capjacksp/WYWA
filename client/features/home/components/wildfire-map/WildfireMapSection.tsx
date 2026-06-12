import { type RefObject, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { wildfireCallouts } from "@/features/home/data/wildfireCallouts";
import { LeafletWildfireMap } from "@/features/home/components/wildfire-map/LeafletWildfireMap";
import { useHorizontalScroll } from "@/hooks/use-horizontal-scroll";
import { WavyLogo } from "@/components/common/Logo";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function WildfireMapSection() {
  return (
    <>
      <DesktopWildfireMapSection />
      <MobileWildfireMapSection />
    </>
  );
}

function DesktopWildfireMapSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const mapOverlayRef = useRef<HTMLDivElement>(null);
  const locationsRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(max-width: 767px)").matches) return;

      const section = sectionRef.current;
      const panel = panelRef.current;
      const intro = introRef.current;
      const mapOverlay = mapOverlayRef.current;
      const locations = locationsRef.current;
      if (!section || !panel || !intro || !mapOverlay || !locations) return;

      gsap.set(intro, { x: "0vw", autoAlpha: 1 });
      gsap.set(mapOverlay, { autoAlpha: 1 });
      gsap.set(locations, { autoAlpha: 0 });

      const timeline = gsap.timeline({
        onReverseComplete: () => locations.classList.remove("is-visible"),
        scrollTrigger: {
          trigger: section,
          pin: panel,
          start: "top top",
          end: "+=90%",
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(intro, { x: "-16vw", duration: 0.28, ease: "none" }, 0)
        .to(intro, { autoAlpha: 0, duration: 0.18, ease: "none" }, 0.1)
        .to(mapOverlay, { autoAlpha: 0, duration: 0.18, ease: "none" }, 0.1)
        .call(() => locations.classList.add("is-visible"), [], 0.24)
        .to(locations, { autoAlpha: 1, duration: 0.18, ease: "none" }, 0.24)
        .to({}, { duration: 0.72 });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      data-header-class="header-dark"
      className="relative bg-transparent max-md:hidden"
      style={{ position: "relative" }}
    >
      <div ref={panelRef} className="relative h-screen overflow-hidden text-white">
        <LeafletWildfireMap locationsLayerRef={locationsRef} />

        <div
          ref={mapOverlayRef}
          className="pointer-events-none absolute inset-0 z-[500] bg-[#24242578]"
        />
        <WildfireMapIntro introRef={introRef} />

        <div className="pointer-events-none absolute bottom-0 right-0 z-[510] hidden w-[500px] lg:block">
          <img
            src="/images/wave-logo.png"
            className="object-cover align-bottom"
            alt=""
          />
        </div>
      </div>
    </section>
  );
}

function MobileWildfireMapSection() {
  const { sectionRef, sectionHeight, trackWidth, trackX, slideWidth } =
    useHorizontalScroll({
      slideCount: 4,
      scrollVhPerSlide: 105,
    });

  return (
    <section
      ref={sectionRef}
      data-header-class=""
      className="relative bg-bg-dark md:hidden"
      style={{ height: sectionHeight }}
    >
      <div className="sticky top-0 h-screen overflow-hidden text-white">
        <motion.div
          className="relative flex h-full"
          style={{ width: trackWidth, x: trackX }}
        >
          <img
            src="/images/home-map.png"
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#101820]/35" />
          <MobileMapIntroSlide width={slideWidth} />
          <MobileTubbsSlide width={slideWidth} />
          <MobileCentralFiresSlide width={slideWidth} />
        </motion.div>
      </div>
    </section>
  );
}

function MobileMapSlide({
  width,
  children,
}: {
  width: string;
  children: React.ReactNode;
}) {
  return (
    <article
      className="relative h-full shrink-0"
      style={{ width }}
    >
      <div className="relative z-10 h-full">{children}</div>
    </article>
  );
}

function MobileMapIntroSlide({ width }: { width: string }) {
  return (
    <MobileMapSlide width={width}>
      <div className="flex h-full flex-col px-7 pb-7 pt-[104px]">
        <h2 className="max-w-[350px] font-heading text-[40px] font-[350] uppercase leading-[0.94] tracking-normal text-white">
          A Decade
          of Wildfires.
          Minutes to
          Spread.
          <span className="block font-[500] text-cta">California,</span>
          <span className="block font-[500] text-cta">USA</span>
        </h2>

        <div className="mt-auto pb-[100px]">
          <span
            aria-hidden="true"
            className="mb-11 block h-0 w-0 border-y-[18px] border-l-[18px] border-y-transparent border-l-white"
          />
          <p className="max-w-[258px] font-heading text-[14px] font-[350] uppercase leading-[1.3] tracking-normal text-white">
            We detect at ignition providing a <span className="font-[700]">15-minute</span>
            head start before the invisible becomes inevitable, because every minute counts.
          </p>
        </div>

        <div className="absolute bottom-0 right-0 z-10 w-[300px] lg:block">
          <img
            src="/images/wave-logo.png"
            className="object-cover align-bottom"
            alt=""
          />
        </div>
      </div>
    </MobileMapSlide>
  );
}

function MobileTubbsSlide({ width }: { width: string }) {
  const tubbs = wildfireCallouts[0];
  const camp = wildfireCallouts[1];
  const august = wildfireCallouts[2];
  const palisades = wildfireCallouts[4];
  const [openCard, setOpenCard] = useState<string | null>();

  const toggleCard = (label: string) => {
    setOpenCard((current) => (current === label ? null : label));
  };

  return (
    <MobileMapSlide width={width}>
      <MobileMapMarker
        className=""
        style={{ left: "7.7%", top: "38%" }}
        isActive={openCard === tubbs.label}
        onClick={() => toggleCard(tubbs.label)}
      />
      <MobileFireCard
        className="w-[292px]"
        style={{ left: "15.4%", top: "41.5%" }}
        title={tubbs.label}
        stats={tubbs.stats}
        isOpen={openCard === tubbs.label}
        onToggle={() => toggleCard(tubbs.label)}
      />

      <MobileMapMarker
        className=""
        style={{ left: "38.5%", top: "23.7%" }}
        isActive={openCard === august.label}
        onClick={() => toggleCard(august.label)}
      />
      <MobileFireCard
        className="w-[258px]"
        style={{ left: "48.7%", top: "26.1%" }}
        title={august.label}
        stats={august.stats}
        isOpen={openCard === august.label}
        onToggle={() => toggleCard(august.label)}
      />

      <MobileMapMarker
        className=""
        style={{ left: "50%", bottom: "12%" }}
        isActive={openCard === palisades.label}
        onClick={() => toggleCard(palisades.label)}
      />
      <MobileFireCard
        className="w-[262px]"
        style={{ left: "60%", bottom: "15%" }}
        title={palisades.label}
        stats={palisades.stats}
        footnote={palisades.doesHaveAsterisk}
        isOpen={openCard === palisades.label}
        onToggle={() => toggleCard(palisades.label)}
      />

      <MobileMapMarker
        className=""
        style={{ right: "-35%", top: "10%" }}
        isActive={openCard === camp.label}
        onClick={() => toggleCard(camp.label)}
      />
      <MobileFireCard
        className="w-[258px]"
        style={{ right: "-25%", top: "13%" }}
        title={camp.label}
        stats={camp.stats}
        isOpen={openCard === camp.label}
        onToggle={() => toggleCard(camp.label)}
      />
    </MobileMapSlide>
  );
}

function MobileCentralFiresSlide({ width }: { width: string }) {
  const camp = wildfireCallouts[1];
  const august = wildfireCallouts[2];
  const palisades = wildfireCallouts[4];
  const dixie = wildfireCallouts[3];

  const [openCard, setOpenCard] = useState<string | null>(palisades.label);

  const toggleCard = (label: string) => {
    setOpenCard((current) => (current === label ? null : label));
  };

  return (
    <MobileMapSlide width={width}>


      <MobileMapMarker
        className=""
        style={{ right: "40%", top: "12%" }}
        isActive={openCard === dixie.label}
        onClick={() => toggleCard(dixie.label)}
      />
      <MobileFireCard
        className="w-[264px]"
        style={{ right: "-22%", top: "15%" }}
        title={dixie.label}
        stats={dixie.stats}
        isOpen={openCard === dixie.label}
        onToggle={() => toggleCard(dixie.label)}
      />
    </MobileMapSlide>
  );
}

function MobileFireCard({
  title,
  stats,
  className,
  style,
  footnote,
  isCompact = false,
  isOpen,
  onToggle,
}: {
  title: string;
  stats: {
    scale: string;
    delay: string;
    impact: string;
  };
  className: string;
  style?: React.CSSProperties;
  footnote?: string;
  isCompact?: boolean;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      className={`absolute overflow-hidden rounded-[10px] bg-[#24211f]/90 text-white shadow-[0_18px_42px_rgba(0,0,0,0.32)] backdrop-blur-sm ${className}`}
      style={style}
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.65 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <button
        type="button"
        className={`block w-full text-center font-heading text-[16px] font-[500] uppercase leading-none text-white ${isCompact ? "px-5 py-3" : "px-2 py-5"}`}
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        {title}
      </button>
      <motion.div
        className="grid grid-rows-[0fr]"
        animate={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
        transition={{ duration: 0.34, delay: 0.16, ease: "easeOut" }}
      >
        <div className="overflow-hidden">
          <MobileCardStat label="Scale:" value={stats.scale} />
          <MobileCardStat label="Delay:" value={stats.delay} />
          <MobileCardStat label="Impact:" value={stats.impact} />
          {footnote ? (
            <p className="px-7 pb-5 pt-2 font-figtree text-[9px] leading-[1.2] text-white/45">
              {footnote}
            </p>
          ) : null}
        </div>
      </motion.div>
    </motion.div>
  );
}

function MobileCardStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[86px_1fr] border-t border-white/10 px-6 py-3 font-figtree text-[12px] leading-[1.15]">
      <span className="font-[700] text-cta">{label}</span>
      <span className="font-[400] text-white">{value}</span>
    </div>
  );
}

function MobileMapMarker({
  className,
  style,
  isActive,
  onClick,
}: {
  className: string;
  style?: React.CSSProperties;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      className={`absolute z-20 flex h-[58px] w-[58px] items-center justify-center ${className}`}
      style={style}
      initial={{ opacity: 0, scale: 0.7 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false, amount: 0.7 }}
      transition={{ duration: 0.32, ease: "easeOut" }}
      aria-label={isActive ? "Hide fire details" : "Show fire details"}
      aria-pressed={isActive}
      onClick={onClick}
    >
      <motion.div
        className="absolute inset-[-5px] rounded-full bg-[#F55656]/20 blur-md"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="absolute inset-0 rounded-full border-[4px] border-white/85"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: [0.5, 1.35, 1.75], opacity: [0, 0.7, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: index * 1,
            ease: "easeOut",
          }}
        />
      ))}

      <div className="relative z-10 flex h-[58px] w-[58px] items-center justify-center rounded-full bg-white">
        <motion.span
          className="block h-[36px] w-[36px] rounded-full bg-[#F55656] shadow-[0_0_12px_rgba(245,86,86,0.5),0_0_24px_rgba(245,86,86,0.2)]"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </motion.button>
  );
}

const WildfireMapIntro = ({
  introRef,
}: {
  introRef: RefObject<HTMLDivElement>;
}) => (
  <div
    ref={introRef}
    className="pointer-events-none absolute inset-0 z-[520] flex flex-col justify-between px-[50px] pb-12 pt-28 max-md:px-5 max-md:pb-8 max-md:pt-24"
  >
    <div className="max-w-[1120px]">
      <h2 className="font-display text-h1 font-[350] uppercase leading-[1] text-white">
        A Decade of Wildfires.
        <br />
        Minutes to Spread.
        <br />
        <span className="font-[500] text-cta">California, USA</span>
      </h2>
    </div>

    <div className="max-w-[800px]">
      <div
        aria-hidden="true"
        className="mb-10 ml-5 h-0 w-0 border-y-[18px] border-l-[18px] border-y-transparent border-l-white max-md:mb-8 max-md:ml-0 max-md:border-y-[18px] max-md:border-l-[18px]"
      />
      <p className="max-w-[780px] font-heading text-h3 font-[350] uppercase leading-[1.2] text-white">
        We detect at ignition, providing a <span className="font-bold">15-minute</span>
        <br className="hidden md:block" /> head start before the invisible becomes
        <br className="hidden md:block" /> inevitable, because every minute counts.
      </p>
    </div>
  </div>
);
