import { type RefObject, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { LeafletWildfireMap } from "@/features/home/components/wildfire-map/LeafletWildfireMap";
import { ArrowHead } from "@/components/common/ArrowHead";
import { ScrollTextLines } from "@/components/ui/scroll-text-lines";
import { useIsMobile } from "@/hooks/use-mobile";
import type { FireCalloutProps } from "@/features/home/components/wildfire-map/types";
import {
  ScrambleLoadText,
  useScrambleText,
} from "@/components/ui/scramble-load-text";
import type { FireStatValue } from "@/features/home/components/wildfire-map/types";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function WildfireMapSection() {
  const isMobile = useIsMobile();

  return isMobile ? <MobileWildfireMapSection /> : <DesktopWildfireMapSection />;
}

function DesktopWildfireMapSection() {
  const [selectedFire, setSelectedFire] = useState<FireCalloutProps | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const mapOverlayRef = useRef<HTMLDivElement>(null);
  const locationsRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any | null>(null);
  const clearMapSelectionRef = useRef<(() => void) | null>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(max-width: 767px)").matches) return;

      const section = sectionRef.current;
      const panel = panelRef.current;
      const intro = introRef.current;
      const mapOverlay = mapOverlayRef.current;
      const locations = locationsRef.current;
      if (!section || !panel || !intro || !mapOverlay || !locations) return;

      const setMapInteractive = (interactive: boolean) => {
        const map = mapRef.current;
        if (!map) return;

        const handlers = [
          map.dragging,
          map.touchZoom,
          map.doubleClickZoom,
          map.boxZoom,
          map.keyboard,
        ];
        handlers.forEach((handler) =>
          interactive ? handler?.enable() : handler?.disable(),
        );
      };

      gsap.set(intro, { x: "0vw", autoAlpha: 1 });
      gsap.set(mapOverlay, { autoAlpha: 1 });
      gsap.set(locations, { autoAlpha: 0 });
      setMapInteractive(false);

      const timeline = gsap.timeline({
        onReverseComplete: () => {
          locations.classList.remove("is-visible");
          setMapInteractive(false);
          setSelectedFire(null);
          clearMapSelectionRef.current?.();
        },
        scrollTrigger: {
          trigger: section,
          pin: panel,
          start: "top top",
          end: "+=90%",
          scrub: 1,
          // Let the pin begin exactly at the section boundary. Chrome's
          // early pin anticipation makes this transition look like a snap.
          anticipatePin: 0,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(intro, { x: "-16vw", duration: 0.28, ease: "none" }, 0)
        .to(intro, { autoAlpha: 0, duration: 0.18, ease: "none" }, 0.1)
        .to(mapOverlay, { autoAlpha: 0, duration: 0.18, ease: "none" }, 0.1)
        .call(
          () => {
            const revealingMap = timeline.scrollTrigger?.direction !== -1;
            locations.classList.toggle("is-visible", revealingMap);
            setMapInteractive(revealingMap);
            if (!revealingMap) {
              setSelectedFire(null);
              clearMapSelectionRef.current?.();
            }
          },
          [],
          0.24,
        )
        .to(locations, { autoAlpha: 1, duration: 0.18, ease: "none" }, 0.24)
        .to({}, { duration: 0.72 });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      data-header-class=""
      className="relative bg-transparent max-md:hidden"
      style={{ position: "relative" }}
    >
      <div
        ref={panelRef}
        className="relative h-screen overflow-hidden text-white"
      >
        <LeafletWildfireMap
          locationsLayerRef={locationsRef}
          mapRef={mapRef}
          onSelect={setSelectedFire}
          clearSelectionRef={clearMapSelectionRef}
        />

        <div
          ref={mapOverlayRef}
          className="pointer-events-none absolute inset-0 z-[500] bg-[#24242578]"
        />
        <WildfireMapIntro introRef={introRef} />

        <WildfireMapDetailsPanel
          fire={selectedFire}
          onClose={() => {
            setSelectedFire(null);
            clearMapSelectionRef.current?.();
          }}
        />

        <div className="pointer-events-none absolute bottom-0 right-0 z-[510] hidden w-[400px] lg:block">
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
  const [selectedFire, setSelectedFire] = useState<FireCalloutProps | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const mapOverlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const locationsRef = useRef<HTMLDivElement | null>(null);
  const clearMapSelectionRef = useRef<(() => void) | null>(null);

  useGSAP(
    () => {
      if (!window.matchMedia("(max-width: 767px)").matches) return;

      const section = sectionRef.current;
      const panel = panelRef.current;
      const intro = introRef.current;
      const mapOverlay = mapOverlayRef.current;
      const logo = logoRef.current;
      const locations = locationsRef.current;
      if (!section || !panel || !intro || !mapOverlay || !logo || !locations)
        return;

      gsap.set([intro, mapOverlay, logo], { autoAlpha: 1 });
      gsap.set(intro, { x: 0 });
      gsap.set(locations, { autoAlpha: 0 });

      const timeline = gsap.timeline({
        onReverseComplete: () => {
          locations.classList.remove("is-visible");
          setSelectedFire(null);
          clearMapSelectionRef.current?.();
        },
        scrollTrigger: {
          trigger: section,
          pin: panel,
          start: "top top",
          end: "+=100%",
          scrub: 0.8,
          anticipatePin: 0,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(intro, { x: "-18vw", duration: 0.28, ease: "none" }, 0)
        .to(
          [intro, mapOverlay, logo],
          { autoAlpha: 0, duration: 0.18, ease: "none" },
          0.1,
        )
        .call(
          () => {
            const revealingMap = timeline.scrollTrigger?.direction !== -1;
            locations.classList.toggle("is-visible", revealingMap);
            if (!revealingMap) {
              setSelectedFire(null);
              clearMapSelectionRef.current?.();
            }
          },
          [],
          0.24,
        )
        .to(locations, { autoAlpha: 1, duration: 0.18, ease: "none" }, 0.24)
        .to({}, { duration: 0.72 });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      data-header-class=""
      className="relative bg-bg-dark md:hidden"
    >
      <div
        ref={panelRef}
        className="relative h-[100svh] overflow-hidden text-white"
      >
        <LeafletWildfireMap
          locationsLayerRef={locationsRef}
          onSelect={setSelectedFire}
          clearSelectionRef={clearMapSelectionRef}
        />

        <div
          ref={mapOverlayRef}
          className="pointer-events-none absolute inset-0 z-[500] bg-[#24242578]"
        />
        <WildfireMapIntro introRef={introRef} />

        <WildfireMapDetailsPanel
          fire={selectedFire}
          onClose={() => {
            setSelectedFire(null);
            clearMapSelectionRef.current?.();
          }}
        />

        <div
          ref={logoRef}
          className="pointer-events-none absolute bottom-0 right-0 z-[510] w-[300px]"
        >
          <img
            src="/images/wave-logo.png"
            className="w-full object-cover align-bottom"
            alt=""
          />
        </div>
      </div>
    </section>
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
      <div className="pointer-events-auto w-fit cursor-default">
        <ScrollTextLines
          as="h2"
          className="font-display text-h1 font-[350] uppercase leading-[1] text-white"
          lines={[
            "A Decade of Wildfires.",
            "Minutes to Spread.",
            <span className="font-[500] text-cta">California, USA</span>,
          ]}
        />
      </div>
    </div>

    <div className="max-w-[800px] max-md:mb-20">
      <ArrowHead
        direction="right"
        size={18}
        color="white"
        className="mb-10 ml-5 max-md:mb-8 max-md:ml-0"
      />
      <p className="max-w-[780px] font-heading text-h3 font-[350] uppercase leading-[1.2] text-white">
        We detect at ignition,
        <br />
        providing a{" "}<span className="font-bold">15-minute</span> head start.
      </p>
    </div>
  </div>
);

function WildfireMapDetailsPanel({
  fire,
  onClose,
}: {
  fire: FireCalloutProps | null;
  onClose: () => void;
}) {
  return (
    <aside
      className={cn(
        "absolute bottom-0 left-0 top-0 z-[700] w-[min(420px,100vw)] overflow-y-auto border-b border-white bg-[#000000]/40 px-14 pb-12 pt-12 text-white transition-[transform,opacity,visibility] duration-500 max-md:bottom-2 max-md:left-2 max-md:right-2 max-md:top-16 max-md:h-auto max-md:w-auto max-md:rounded-[6px] max-md:bg-[#242425]/95 max-md:px-5 max-md:pb-8 max-md:pt-14",
        fire
          ? "visible translate-x-0 opacity-100"
          : "pointer-events-none invisible -translate-x-full opacity-0 max-md:translate-y-full max-md:translate-x-0",
      )}
      style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
      aria-hidden={!fire}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 inline-flex h-8 items-center justify-center border border-white/70 px-3 font-figtree text-[11px] uppercase tracking-[0.16em] text-white transition-colors hover:border-white hover:bg-white hover:text-bg-dark md:hidden"
        aria-label="Cancel wildfire details"
      >
        Close
      </button>

      {fire ? (
        <div key={fire.label} className="relative">
          <div className="relative overflow-hidden">
            <img
              src={fire.image}
              alt={`${fire.label} wildfire incident image`}
              className="w-[300px] object-cover max-md:mx-auto max-md:w-[75%]"
            />
            <ScrambleLoadText
              as="h2"
              lines={[{ text: fire.label.toUpperCase() }]}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-heading text-[24px] font-medium uppercase leading-[1.2] max-md:text-[24px]"
              duration={0.75}
              resolveInterval={42}
              distance={40}
            />
          </div>

          {fire.sourceUrl && fire.sourceName && (
            <a
              href={fire.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-block text-xs uppercase underline underline-offset-2 transition-colors hover:text-cta"
            >
              {fire.sourceName}
            </a>
          )}

          <div className="mt-8 border-t border-white pt-4 max-md:mt-8 max-md:pt-6">
            <WildfireDetailStat label="SCALE:" value={fire.stats.scale} />
            <WildfireDetailStat label="DELAY:" value={fire.stats.delay} />
            <WildfireDetailStat label="IMPACT:" value={fire.stats.impact} />
          </div>
          {fire.doesHaveAsterisk &&
            <div className="text-[12px] mt-8 w-[180px] font-figtree text-[#FFFFFF75]">
              {fire.doesHaveAsterisk}
            </div>
          }

        </div>
      ) : null}
      <div className="border-t mt-2 w-full border-white max-md:mt-12" />
    </aside>
  );
}

function WildfireDetailStat({
  label,
  value,
}: {
  label: string;
  value: FireStatValue;
}) {
  return (
    <div className="grid grid-cols-[120px_1fr] gap-4 py-4 font-heading text-[12px] uppercase leading-[1.4] max-md:grid-cols-[82px_1fr] max-md:text-[14px]">
      <ScrambleLoadText
        as="div"
        lines={[{ text: label, className: "text-white" }]}
        duration={0.5}
        resolveInterval={36}
        distance={30}
      />
      <ScrambleStatValue value={value} />
    </div>
  );
}

function ScrambleStatValue({ value }: { value: FireStatValue }) {
  const segments = typeof value === "string" ? [{ text: value }] : value;

  return (
    <span className="inline leading-[1.2] lowercase">
      {segments.map((segment, index) => (
        <ScrambleStatSegment
          key={`${segment.text}-${index}`}
          text={segment.text}
          className={segment.className}
          delay={index * 0.08}
        />
      ))}
    </span>
  );
}

function ScrambleStatSegment({
  text,
  className,
  delay,
}: {
  text: string;
  className?: string;
  delay: number;
}) {
  const reduceMotion = useReducedMotion();
  const displayText = useScrambleText({
    text,
    delay,
    resolveInterval: 34,
  });

  return (
    <motion.span
      className={cn("inline", className)}
      initial={reduceMotion ? false : { opacity: 0, x: 36 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: reduceMotion ? 0 : 0.8,
        delay: reduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      aria-label={text}
    >
      <span aria-hidden="true">{displayText}</span>
    </motion.span>
  );
}
