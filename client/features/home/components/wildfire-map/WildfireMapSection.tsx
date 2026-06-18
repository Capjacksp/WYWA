import { type RefObject, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { LeafletWildfireMap } from "@/features/home/components/wildfire-map/LeafletWildfireMap";
import { ArrowHead } from "@/components/common/ArrowHead";
import { ScrambleHover } from "@/components/ui/scramble-hover";
import { ScrollTextLines } from "@/components/ui/scroll-text-lines";

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
  const mapRef = useRef<any | null>(null);

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
        },
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
        .call(
          () => {
            const revealingMap = timeline.scrollTrigger?.direction !== -1;
            locations.classList.toggle("is-visible", revealingMap);
            setMapInteractive(revealingMap);
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
        <LeafletWildfireMap locationsLayerRef={locationsRef} mapRef={mapRef} />

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
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const mapOverlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const locationsRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any | null>(null);

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

      gsap.set([intro, mapOverlay, logo], { autoAlpha: 1 });
      gsap.set(intro, { x: 0 });
      gsap.set(locations, { autoAlpha: 0 });
      setMapInteractive(false);

      const timeline = gsap.timeline({
        onReverseComplete: () => {
          locations.classList.remove("is-visible");
          setMapInteractive(false);
        },
        scrollTrigger: {
          trigger: section,
          pin: panel,
          start: "top top",
          end: "+=100%",
          scrub: 0.8,
          anticipatePin: 1,
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
            setMapInteractive(revealingMap);
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
        <LeafletWildfireMap locationsLayerRef={locationsRef} mapRef={mapRef} />

        <div
          ref={mapOverlayRef}
          className="pointer-events-none absolute inset-0 z-[500] bg-[#24242578]"
        />
        <WildfireMapIntro introRef={introRef} />

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
      <ScrambleHover className="pointer-events-auto w-fit cursor-default">
        <ScrollTextLines
          as="h2"
          className="font-display text-h1 font-[350] uppercase leading-[1] text-white"
          lines={[
            "A Decade of Wildfires.",
            "Minutes to Spread.",
            <span className="font-[500] text-cta">California, USA</span>,
          ]}
        />
      </ScrambleHover>
    </div>

    <div className="max-w-[800px] max-md:mb-20">
      <ArrowHead
        direction="right"
        size={18}
        color="white"
        className="mb-10 ml-5 max-md:mb-8 max-md:ml-0"
      />
      <ScrollTextLines
        as="p"
        className="max-w-[780px] font-heading text-h3 font-[350] uppercase leading-[1.2] text-white"
        delay={0.08}
        smoothProgress
        lines={[
          <>
            We detect at ignition, providing a{" "}
            <span className="font-bold">15-minute</span>
          </>,
          "head start before the invisible becomes",
          "inevitable, because every minute counts.",
        ]}
      />
    </div>
  </div>
);
