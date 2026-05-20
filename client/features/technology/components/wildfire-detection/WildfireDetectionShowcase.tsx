import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useHorizontalScroll } from "@/hooks/use-horizontal-scroll";
import {
  labTestCards,
  wildfireClassCards,
} from "@/features/technology/data/technologyCards";
import { RedArrow } from "@/features/technology/components/RedArrow";

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
          <ShowcaseSlide
            title={
              <>
                Wildfire Detection
                <br />
                Classes
              </>
            }
            arrowDirection="right"
            width={slideWidth}
          >
            <div className="mt-auto grid grid-cols-3 items-end gap-4 max-lg:gap-3 max-md:grid-cols-1">
              {wildfireClassCards.map((card) => (
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
          </ShowcaseSlide>

          <ShowcaseSlide
            title="Lab Tests"
            arrowDirection="left"
            width={slideWidth}
            titleSpacingClassName="mb-[clamp(2.5rem,9vh,12rem)]"
          >
            <div className="mt-auto grid grid-cols-3 items-end gap-4 max-lg:gap-3 max-md:grid-cols-1">
              {labTestCards.map((card) => (
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
          </ShowcaseSlide>
        </motion.div>
      </div>
    </section>
  );
}

function ShowcaseSlide({
  title,
  arrowDirection,
  width,
  titleSpacingClassName = "mb-[clamp(2.5rem,9vh,7rem)]",
  children,
}: {
  title: ReactNode;
  arrowDirection: "left" | "right";
  width: string;
  titleSpacingClassName?: string;
  children: ReactNode;
}) {
  return (
    <div
      className="box-border flex h-full shrink-0 flex-col justify-start px-[50px] py-[clamp(2rem,6.5vh,6rem)] max-md:px-5"
      style={{ width }}
    >
      <div
        className={`${titleSpacingClassName} flex items-start gap-24 max-md:mb-16 max-md:gap-8`}
      >
        <div className="mt-4 max-md:mt-1">
          <RedArrow direction={arrowDirection} />
        </div>
        <h2 className="font-body text-display font-normal uppercase leading-[1] tracking-normal text-bg-dark">
          {title}
        </h2>
      </div>

      {children}
    </div>
  );
}
