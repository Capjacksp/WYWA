import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import PageLayout from "@/components/layout/PageLayout";
import {
  LoadTextLines,
  ScrollTextLines,
} from "@/components/ui/scroll-text-lines";
import { NavigationArrowButton } from "@/components/common/NavigationArrowButton";
import { LinkedInIcon } from "@/components/common/LinkedInIcon";
import { useIsMobile, useMediaQuery } from "@/hooks/use-mobile";
import { useHorizontalScroll } from "@/hooks/use-horizontal-scroll";
import { useScrollStepNavigation } from "@/hooks/use-scroll-step-navigation";
import { type TeamMember, teamMembers, advisors } from "./data/peopleData";

function TeamStageCard({
  member,
  index,
  isFirst,
  isLast,
  isActive,
  onNavigate,
  className = "",
}: {
  member: TeamMember;
  index: number;
  isFirst: boolean;
  isLast: boolean;
  isActive: boolean;
  onNavigate: (index: number) => void;
  className?: string;
}) {
  return (
    <div
      className={`relative text-left transition duration-300 focus:outline-none ${className}`}
    >
      {isActive && !isLast && (
        <NavigationArrowButton
          className="absolute right-[-74px] top-1/2 z-20 -translate-y-1/2 p-3"
          onClick={() => onNavigate(index + 1)}
          aria-label={`Show ${teamMembers[index + 1]?.name ?? "next team member"}`}
          direction="right"
          size={12}
          color="#242425"
        />
      )}
      {isActive && !isFirst && (
        <NavigationArrowButton
          className="absolute left-[-74px] top-1/2 z-20 -translate-y-1/2 p-3"
          onClick={() => onNavigate(index - 1)}
          aria-label={`Show ${teamMembers[index - 1]?.name ?? "previous team member"}`}
          direction="left"
          size={12}
          color="#242425"
        />
      )}
      {/* Image with thick border */}
      <div className="bg-[#242425]/85 backdrop-blur-[15px] p-6">
        <img
          src={member.image}
          alt={member.name}
          className="w-full max-w-[350px] object-cover"
        />

        <div className="mt-4 flex items-start justify-between">
          <div>
            <h3 className="font-body text-[24px] font-[400] uppercase leading-[28px] tracking-normal text-cta">
              {member.name}
            </h3>
            <p className="mt-0.5 font-figtree text-[16px] font-[400] uppercase leading-[28px] tracking-[0.15em] text-white">
              {member.role}
            </p>
          </div>
          <div>
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} on LinkedIn`}
                className="text-white transition-colors hover:text-white/80"
                onClick={(e) => e.stopPropagation()}
              >
                <LinkedInIcon className="h-6 w-6" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function TeamHero() {
  const useCompactTeamStage = useMediaQuery("(max-width: 1023px)");
  const sectionRef = useRef<HTMLElement>(null);
  const stageCount = teamMembers.length;
  const { activeIndex: activeStageIndex, scrollToIndex } =
    useScrollStepNavigation({
      itemCount: stageCount,
      sectionRef,
    });
  const activeTeamIndex = activeStageIndex;
  const activeTeamMember = teamMembers[activeTeamIndex];

  const scrollToTeamMember = (index: number) => {
    scrollToIndex(index);
  };

  return (
    <section
      ref={sectionRef}
      className={`bg-[#F7F7F7] -mt-16 max-md:px-5 max-md:-mt-8 ${useCompactTeamStage ? "" : "relative"
        }`}
      style={
        useCompactTeamStage ? undefined : { height: `${stageCount * 100}vh` }
      }
    >
      {useCompactTeamStage ? (
        <MobileTeamStage />
      ) : (
        <div className="sticky top-0 mx-auto h-screen w-full max-w-[1920px] overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.10]"
            style={{
              backgroundImage:
                "linear-gradient(#242425 1px, transparent 1px), linear-gradient(90deg, #242425 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          <LoadTextLines
            className="pointer-events-none absolute left-[30px] top-[100px] z-0 font-body text-[clamp(6rem,11vw,12rem)] uppercase leading-[0.92] tracking-normal text-bg-dark"
            lines={["Our"]}
          />
          <LoadTextLines
            className="pointer-events-none absolute bottom-[50px] right-[1.1%] z-0 font-body text-[clamp(6rem,11vw,12rem)] uppercase leading-[0.92] tracking-normal text-bg-dark"
            delay={0.12}
            lines={["Team"]}
          />

          <div className="absolute bottom-[70px] left-[50px] max-w-[385px] font-figtree text-[18px] leading-[22px] tracking-normal text-bg-dark">
            <p>
              We're a team of engineers, scientists, and researchers from NVIDIA, Amazon Lab126, CMU, and MIT, based in San Francisco and advised by climate scientists and first responders.
            </p>
            <br />
            <p>
              Our sensors and AI deliver real-time environmental data at ground level, processed locally, with alerts that reach communities and emergency responders even where cell coverage doesn't. The result: faster wildfire response, safer communities, and a network that's fully open source.
            </p>
          </div>

          <div
            className="relative z-10 flex h-full items-center justify-center overflow-hidden"
            aria-label="Team members"
          >
            <AnimatePresence mode="wait">
              {activeTeamMember ? (
                <motion.div
                  key={activeTeamMember.id}
                  data-team-slide
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                >
                  <TeamStageCard
                    member={activeTeamMember}
                    index={activeTeamIndex}
                    isFirst={activeTeamIndex === 0}
                    isLast={activeTeamIndex === teamMembers.length - 1}
                    isActive
                    onNavigate={scrollToTeamMember}
                  />
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      )}
    </section>
  );
}

function MobileTeamStage() {
  const cardCount = teamMembers.length;
  const { sectionRef, sectionHeight } = useHorizontalScroll({
    slideCount: cardCount,
  });
  const { activeIndex, scrollToIndex } = useScrollStepNavigation({
    itemCount: cardCount,
    sectionRef,
  });
  const activeIndexRef = useRef(activeIndex);
  const touchStartRef = useRef<{ index: number; y: number } | null>(null);
  const isSnappingRef = useRef(false);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const isSectionInView = () => {
      const section = sectionRef.current;
      if (!section) return false;

      const bounds = section.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      return bounds.top <= viewportCenter && bounds.bottom >= viewportCenter;
    };

    const snapToIndex = (index: number) => {
      const nextIndex = Math.min(cardCount - 1, Math.max(0, index));
      activeIndexRef.current = nextIndex;
      isSnappingRef.current = true;
      scrollToIndex(nextIndex);
      window.setTimeout(() => {
        isSnappingRef.current = false;
      }, 950);
    };

    const snapByDirection = (direction: 1 | -1) => {
      const currentIndex = activeIndexRef.current;
      const nextIndex = Math.min(
        cardCount - 1,
        Math.max(0, currentIndex + direction),
      );

      if (nextIndex === currentIndex) return false;

      snapToIndex(nextIndex);
      return true;
    };

    const handleWheel = (event: WheelEvent) => {
      if (
        !isSectionInView() ||
        Math.abs(event.deltaY) <= Math.abs(event.deltaX) ||
        Math.abs(event.deltaY) < 2
      ) {
        return;
      }

      if (isSnappingRef.current) {
        event.preventDefault();
        scrollToIndex(activeIndexRef.current);
        return;
      }

      if (snapByDirection(event.deltaY > 0 ? 1 : -1)) {
        event.preventDefault();
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      if (!isSectionInView()) return;

      touchStartRef.current = {
        index: activeIndexRef.current,
        y: event.touches[0]?.clientY ?? 0,
      };
    };

    const handleTouchEnd = (event: TouchEvent) => {
      const touchStart = touchStartRef.current;
      touchStartRef.current = null;
      if (!touchStart || !isSectionInView()) return;

      const touchEndY = event.changedTouches[0]?.clientY ?? touchStart.y;
      const distance = touchStart.y - touchEndY;
      if (Math.abs(distance) < 24) return;

      const direction = distance > 0 ? 1 : -1;
      const nextIndex = Math.min(
        cardCount - 1,
        Math.max(0, touchStart.index + direction),
      );

      if (nextIndex !== touchStart.index) {
        snapToIndex(nextIndex);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [cardCount, scrollToIndex, sectionRef]);

  return (
    <section
      ref={sectionRef}
      className="relative -mx-5 bg-[#F7F7F7] lg:hidden"
      style={{ height: sectionHeight }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage:
              "linear-gradient(#242425 1px, transparent 1px), linear-gradient(90deg, #242425 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />

        <LoadTextLines
          as="h1"
          className="pointer-events-none absolute left-0 top-[50px] z-0 font-body text-[105px] font-[400] uppercase leading-[0.92] tracking-normal text-bg-dark"
          lines={["Our"]}
        />

        <div
          className="relative z-10 flex h-full items-center justify-center px-5"
          aria-label="Team members"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={teamMembers[activeIndex]?.id}
              initial={{ opacity: 0, scale: 0.94, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -8 }}
              transition={{ duration: 0.26, ease: "easeOut" }}
            >
              <TeamStageCard
                member={teamMembers[activeIndex]}
                index={activeIndex}
                isFirst={activeIndex === 0}
                isLast={activeIndex === cardCount - 1}
                isActive={false}
                onNavigate={() => undefined}
                className="w-[calc(100vw-40px)] max-w-[398px]"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <LoadTextLines
          className="pointer-events-none absolute bottom-[50px] right-0 z-20 text-right font-body text-[105px] font-[400] uppercase leading-[0.92] tracking-normal text-bg-dark"
          delay={0.08}
          lines={["Team"]}
        />
      </div>
    </section>
  );
}

function AdvisorsSection() {
  const isMobile = useIsMobile();

  return (
    <section
      data-header-class=""
      className="px-[50px] bg-[#4101F5] pb-28 pt-28 max-md:px-5 max-md:pt-10 hidden"
    >
      {isMobile ? (
        <MobileAdvisorsSection />
      ) : (
        <div className="mx-auto max-w-[1920px] ">
          <ScrollTextLines
            as="h2"
            className="text-center font-body text-display font-normal uppercase leading-[0.9] tracking-normal text-[#90E8FF]"
            lines={["Our Advisors"]}
          />

          <div className="mt-28 grid grid-cols-3 gap-10 max-lg:grid-cols-2 max-lg:gap-6 max-md:mt-16 max-md:grid-cols-1">
            {advisors.map((advisor) => (
              <article key={advisor.name}>
                <div className="relative overflow-hidden bg-cta">
                  <img
                    src={advisor.image}
                    alt={advisor.name}
                    className="w-full object-cover"
                  />
                  <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-[4px]">
                    <a
                      href={advisor.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${advisor.name} on LinkedIn`}
                      className="text-bg-dark/80 hover:text-bg-dark transition-colors"
                    >
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  </div>
                </div>
                <ScrollTextLines
                  as="h3"
                  className="mt-8 font-body text-h3 font-[500] uppercase leading-none tracking-normal text-white"
                  lines={[advisor.name]}
                />
                <ScrollTextLines
                  as="p"
                  className="mt-2 font-figtree text-body font-[400] uppercase leading-none tracking-[0.18em] text-white"
                  delay={0.08}
                  lines={[advisor.role]}
                />
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function MobileAdvisorsSection() {
  return (
    <div className="md:hidden">
      <ScrollTextLines
        as="h2"
        className="font-heading text-[42px] font-[400] uppercase leading-[0.94] tracking-normal text-[#90E8FF]"
        lines={["Our", "Advisors"]}
      />

      <div className="mt-6 flex flex-col">
        {advisors.map((advisor, index) => {
          const alignmentClassName = index === 1 ? "self-end" : "self-start";

          return (
            <article
              key={advisor.name}
              className={`w-[min(63vw,250px)] ${alignmentClassName} ${index === 0 ? "" : "mt-4"
                }`}
            >
              <div className="relative overflow-hidden bg-cta">
                <img
                  src={advisor.image}
                  alt={advisor.name}
                  className="w-full object-contain object-top"
                />
                <a
                  href={advisor.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${advisor.name} on LinkedIn`}
                  className="absolute right-1.5 top-1.5 text-bg-dark transition-colors hover:text-bg-dark/80"
                >
                  <LinkedInIcon className="h-4 w-4" />
                </a>
              </div>
              <ScrollTextLines
                as="h3"
                className="mt-4 font-body text-[15px] font-[500] uppercase leading-none tracking-normal text-white"
                lines={[advisor.name]}
              />
              <ScrollTextLines
                as="p"
                className="mt-1 font-figtree text-[10px] font-[400] uppercase leading-none tracking-[0.18em] text-white"
                delay={0.08}
                lines={[advisor.role]}
              />
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default function People() {
  return (
    <PageLayout headerClassName="header-dark">
      <TeamHero />
      <AdvisorsSection />
    </PageLayout>
  );
}
