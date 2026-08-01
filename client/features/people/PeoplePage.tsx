import {
  AnimatePresence,
  motion,
} from "framer-motion";
import { useRef, useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import {
  LoadTextLines,
  ScrollTextLines,
} from "@/components/ui/scroll-text-lines";
import { ArrowHead } from "@/components/common/ArrowHead";
import { useIsMobile, useMediaQuery } from "@/hooks/use-mobile";
import { useScrollStepNavigation } from "@/hooks/use-scroll-step-navigation";
import { type TeamMember, teamMembers, advisors } from "./data/peopleData";

function TeamStageCard({
  member,
  index,
  isFirst,
  isLast,
  isActive,
  onNavigate,
}: {
  member: TeamMember;
  index: number;
  isFirst: boolean;
  isLast: boolean;
  isActive: boolean;
  onNavigate: (index: number) => void;
}) {
  return (
    <div className="relative text-left transition duration-300 focus:outline-none">
      {isActive && !isLast && (
        <button
          type="button"
          className="absolute right-[-74px] top-1/2 z-20 -translate-y-1/2 border-0 bg-transparent p-3 leading-none focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#242425]"
          onClick={() => onNavigate(index + 1)}
          aria-label={`Show ${teamMembers[index + 1]?.name ?? "next team member"}`}
        >
          <ArrowHead size={20} color="#242425" />
        </button>
      )}
      {isActive && !isFirst && (
        <button
          type="button"
          className="absolute left-[-74px] top-1/2 z-20 -translate-y-1/2 border-0 bg-transparent p-3 leading-none focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#242425]"
          onClick={() => onNavigate(index - 1)}
          aria-label={`Show ${teamMembers[index - 1]?.name ?? "previous team member"}`}
        >
          <ArrowHead
            size={20}
            color="#242425"
            direction="left"
          />
        </button>
      )}
      {/* Image with thick border */}
      <div className="bg-[#242425]/85 backdrop-blur-[15px] p-6">
        <img
          src={member.image}
          alt={member.name}
          className="w-[350px] object-cover"
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
  const stageCount = teamMembers.length + 1;
  const { activeIndex: activeStageIndex, scrollToIndex } =
    useScrollStepNavigation({
      itemCount: stageCount,
      sectionRef,
    });
  const activeTeamIndex = activeStageIndex - 1;
  const activeTeamMember =
    activeTeamIndex >= 0 ? teamMembers[activeTeamIndex] : null;

  const scrollToTeamMember = (index: number) => {
    scrollToIndex(index + 1);
  };

  return (
    <section
      ref={sectionRef}
      className={`bg-[#F7F7F7] -mt-16 max-md:px-5 ${useCompactTeamStage ? "" : "relative"
        }`}
      style={
        useCompactTeamStage
          ? undefined
          : { height: `${stageCount * 100}vh` }
      }
    >
      {useCompactTeamStage ? (
        <MobileTeamStage />
      ) : (

        <div
          className="sticky top-0 mx-auto h-screen w-full max-w-[1920px] overflow-hidden"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.10]"
            style={{
              backgroundImage:
                "linear-gradient(#242425 1px, transparent 1px), linear-gradient(90deg, #242425 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          <LoadTextLines
            className="pointer-events-none absolute left-[30px] top-[100px] z-0 font-body text-[clamp(8rem,17.6vw,18rem)] uppercase leading-[0.92] tracking-normal text-bg-dark"
            lines={["Our"]}
          />
          <LoadTextLines
            className="pointer-events-none absolute bottom-[50px] right-[1.1%] z-0 font-body text-[clamp(8rem,17.4vw,18rem)] uppercase leading-[0.92] tracking-normal text-bg-dark"
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
  const [activeId, setActiveId] = useState<null | string>(null);
  const activeMember =
    teamMembers.find((member) => member.id === activeId) ?? null;

  return (
    <div
      className="relative min-h-screen  pb-14 pt-[92px] lg:hidden"
      onClick={() => setActiveId(null)}
    >
      <LoadTextLines
        as="h1"
        className="pointer-events-none absolute left-0 top-[50px] z-0 font-body text-[105px] font-[400] uppercase tracking-normal text-bg-dark"
        lines={["Our"]}
      />

      <div className="relative z-10" onClick={(event) => event.stopPropagation()}>
        {teamMembers.map((member, index) => {
          const isActive = member.id === activeId;
          const positionClassName = [
            "left-0 top-[3vh] w-[50%]",
            "left-0 top-[37vh] w-[50%]",
            "right-0 top-[50vh] w-[50%]",
            "right-0 top-[18vh] w-[50%]",
          ][index];
          const panelPlacementClassName = getMobileTeamPanelPlacementClassName(
            member.id,
            index,
          );

          return (
            <div
              key={member.id}
              className={`absolute ${positionClassName} ${isActive ? "z-40" : "z-10"
                }`}
            >
              <button
                type="button"
                onClick={() => setActiveId(member.id)}
                className={`block w-full overflow-hidden bg-[#D6D6D6] text-left transition duration-300 focus:outline-none ${!activeMember
                  ? "opacity-100 grayscale-0"
                  : isActive
                    ? "opacity-100 grayscale-0"
                    : "opacity-35 grayscale"
                  }`}
                aria-pressed={isActive}
                aria-label={`Show ${member.name}`}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="aspect-[1.07/1] w-full object-cover"
                />
              </button>

              <AnimatePresence>
                {isActive ? (
                  <MobileTeamBioPanel
                    member={member}
                    className={panelPlacementClassName}
                  />
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <LoadTextLines
        className="pointer-events-none absolute z-0 bottom-[50px] right-[0px] text-right font-body text-[105px] font-[400] uppercase tracking-normal text-bg-dark"
        delay={0.08}
        lines={["Team"]}
      />
    </div>
  );
}

function MobileTeamBioPanel({
  member,
  className,
}: {
  member: TeamMember;
  className: string;
}) {
  return (
    <motion.article
      key={member.id}
      initial={{ opacity: 0, y: className.includes("bottom-full") ? -12 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: className.includes("bottom-full") ? -10 : 10 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
      className={`absolute z-30 w-[calc(100vw-40px)] rounded-[6px] bg-[#242425ED] px-4 pb-6 pt-6 text-white ${className}`}
      onClick={(event) => event.stopPropagation()}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <ArrowHead
            direction="right"
            size={10}
            color="var(--color-cta)"
          />
          <div className="min-w-0">
            <h2 className="font-body text-[14px] font-[400] uppercase leading-none tracking-normal text-cta">
              {member.name}
            </h2>
            <p className="mt-1 font-figtree text-[10px] font-[400] uppercase leading-none tracking-[0.18em] text-white">
              {member.role}
            </p>
          </div>
        </div>

        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${member.name} on LinkedIn`}
          className="shrink-0 text-white transition-colors hover:text-white/80"
        >
          <LinkedInIcon className="h-5 w-5" />
        </a>
      </div>
    </motion.article>
  );
}

function getMobileTeamPanelPlacementClassName(memberId: string, index: number) {
  const horizontalClassName = index === 0 || index === 1 ? "left-0" : "right-0";

  switch (memberId) {
    case "anirudh":
      return `top-full rounded-tl-none ${horizontalClassName}`;
    case "isha":
      return `top-full rounded-tr-none ${horizontalClassName}`;
    case "ravi":
      return `bottom-full rounded-bl-none ${horizontalClassName}`;
    case "dev":
      return `bottom-full rounded-br-none ${horizontalClassName}`;
    default:
      return `top-full ${horizontalClassName}`;
  }
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function AdvisorsSection() {
  const isMobile = useIsMobile();

  return (
    <section data-header-class="" className="px-[50px] bg-[#4101F5] pb-28 pt-28 max-md:px-5 max-md:pt-10 ">
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
        className="font-heading text-[42px] font-[400] uppercase leading-[0.94] tracking-normal text-bg-dark"
        lines={["Our", "Advisors"]}
      />

      <div className="mt-6 flex flex-col">
        {advisors.map((advisor, index) => {
          const alignmentClassName =
            index === 1 ? "self-end" : "self-start";

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
                  className="aspect-[1.21/1] w-full object-contain object-top"
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

                <div className="absolute inset-x-0 bottom-0 bg-bg-dark px-4 py-2 text-center text-white">
                  <ScrollTextLines
                    as="h3"
                    className="font-body text-[15px] font-[500] uppercase leading-none tracking-normal"
                    lines={[advisor.name]}
                  />
                  <ScrollTextLines
                    as="p"
                    className="mt-1 font-figtree text-[10px] font-[400] uppercase leading-none tracking-[0.18em]"
                    delay={0.08}
                    lines={[advisor.role]}
                  />
                </div>
              </div>
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
