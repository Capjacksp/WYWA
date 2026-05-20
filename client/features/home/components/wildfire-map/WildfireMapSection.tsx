import { type RefObject, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { wildfireCallouts } from "@/features/home/data/wildfireCallouts";
import { FireCallout } from "@/features/home/components/wildfire-map/FireCallout";

gsap.registerPlugin(ScrollTrigger, useGSAP);

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
        <WildfireMapIntro introRef={introRef} />

        <div ref={calloutLayerRef} className="absolute inset-0 z-20">
          {wildfireCallouts.map((callout) => (
            <FireCallout key={callout.label} {...callout} />
          ))}
        </div>

        <div className="absolute bottom-0 right-0 z-10 hidden w-[600px] lg:block">
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

const WildfireMapIntro = ({
  introRef,
}: {
  introRef: RefObject<HTMLDivElement>;
}) => (
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
