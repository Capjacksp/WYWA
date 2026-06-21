import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import {
  LoadTextLines,
  ScrollTextLines,
} from "@/components/ui/scroll-text-lines";
import { ArrowHead } from "@/components/common/ArrowHead";
import { useIsMobile, useMediaQuery } from "@/hooks/use-mobile";
import { type TeamMember, teamMembers, advisors } from "./data/peopleData";

function TeamStageCard({
  member,
  activeId,
  setActiveId,
}: {
  member: TeamMember;
  activeId: null | string;
  setActiveId: (id: null | string) => void;
}) {
  const isActive = activeId === member.id;

  return (
    <button
      type="button"
      onMouseEnter={() => setActiveId(member.id)}
      onFocus={() => setActiveId(member.id)}
      className={`absolute overflow-hidden text-left transition duration-300 focus:outline-none ${member.stageClassName} ${isActive ? "grayscale-0" : "grayscale"
        }`}
    >
      <img
        src={isActive && member.activeImage ? member.activeImage : member.image}
        alt={member.name}
        className="aspect-[1.07/1] w-full object-cover"
      />
    </button>
  );
}

function TeamOverlay({ member }: { member: TeamMember }) {
  return (
    <AnimatePresence>
      {member ? (
        <motion.div
          key={member.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={` absolute z-40 flex flex-col overflow-hidden rounded-[18px] ${member.count % 2 != 0 ? (member.count == 3 ? "rounded-bl-none" : "rounded-tl-none") : "rounded-br-none rounded-tr-none"}  bg-[#242425ED] px-[clamp(1rem,2vw,2.8rem)] py-[clamp(1rem,2.15vw,3.25rem)] text-white shadow-[0_18px_60px_rgba(0,0,0,0.22)] ${member.panelClassName}`}
        >
          <div className="flex shrink-0 items-start justify-between gap-5">
            <div className="flex min-w-0 items-start gap-[clamp(0.75rem,1.4vw,2rem)]">
              <ArrowHead
                direction="right"
                color="var(--color-cta)"
                className="mt-[clamp(0.15rem,0.35vw,0.5rem)]"
                style={{
                  borderTopWidth: "clamp(0.5rem,0.9vw,1.25rem)",
                  borderBottomWidth: "clamp(0.5rem,0.9vw,1.25rem)",
                  borderLeftWidth: "clamp(0.5rem,0.9vw,1.25rem)",
                }}
              />
              <div className="min-w-0">
                <h2
                  className="font-body text-h3 font-normal uppercase leading-none tracking-normal"
                  style={{ color: member.panelTitleColor ?? "#90E8FF" }}
                >
                  {member.name}
                </h2>
                <p className="mt-[clamp(0.25rem,0.35vw,0.45rem)] font-figtree text-body-lg font-normal uppercase leading-none tracking-[0.18em] text-white">
                  {member.role}
                </p>
              </div>
            </div>
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on LinkedIn`}
              className="text-white hover:text-white transition-colors"
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

          <div className="mt-[clamp(1rem,2.6vw,4.5rem)] max-w-[94%] overflow-hidden whitespace-pre-line font-figtree text-body font-normal leading-[clamp(1.08rem,1.45vw,1.625rem)] text-white">
            {member.bio}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function TeamHero() {
  const useCompactTeamStage = useMediaQuery("(max-width: 1023px)");
  const [activeId, setActiveId] = useState<null | string>(null);
  const activeMember =
    teamMembers.find((member) => member.id === activeId) ?? null;

  return (
    <section className="bg-[#F7F7F7] px-[50px] pt-0 max-md:px-5">
      {useCompactTeamStage ? (
        <MobileTeamStage />
      ) : (
        <div
          className="relative mx-auto aspect-[16/9] w-full max-w-[1920px] overflow-hidden"
          onMouseLeave={() => setActiveId(null)}
        >
          <LoadTextLines
            className="pointer-events-none absolute left-[1.35%] top-[11.8%] z-0 font-body text-[clamp(8rem,17.6vw,18rem)] uppercase leading-[0.92] tracking-normal text-bg-dark"
            lines={["Our"]}
          />
          <LoadTextLines
            className="pointer-events-none absolute bottom-[1.7%] right-[1.1%] z-0 font-body text-[clamp(8rem,17.4vw,18rem)] uppercase leading-[0.92] tracking-normal text-bg-dark"
            delay={0.12}
            lines={["Team"]}
          />

          {teamMembers.map((member) => (
            <TeamStageCard
              key={member.id}
              member={member}
              activeId={activeId}
              setActiveId={setActiveId}
            />
          ))}

          {activeMember ? <TeamOverlay member={activeMember} /> : null}
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
                  src={isActive && member.activeImage ? member.activeImage : member.image}
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

      <p className="mt-8 whitespace-pre-line font-figtree text-[12px] font-[400] leading-[1.2] text-white">
        {member.bio}
      </p>
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
    <section className="bg-[#F7F7F7] px-[50px] pb-28 pt-20 max-md:px-5 max-md:pt-10">
      {isMobile ? (
        <MobileAdvisorsSection />
      ) : (
      <div className="mx-auto max-w-[1920px]">
        <ScrollTextLines
          as="h2"
          className="text-center font-body text-display font-normal uppercase leading-[0.9] tracking-normal text-bg-dark"
          lines={["Our Advisors"]}
        />

        <div className="mt-36 grid grid-cols-3 gap-10 max-lg:grid-cols-2 max-lg:gap-6 max-md:mt-16 max-md:grid-cols-1">
          {advisors.map((advisor) => (
            <article key={advisor.name}>
              <div className="relative overflow-hidden bg-cta">
                <img
                  src={advisor.image}
                  alt={advisor.name}
                  className="aspect-[1.365/1] w-full object-cover"
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
                className="mt-8 font-body text-h3 font-[500] uppercase leading-none tracking-normal text-bg-dark"
                lines={[advisor.name]}
              />
              <ScrollTextLines
                as="p"
                className="mt-2 font-figtree text-body font-[400] uppercase leading-none tracking-[0.18em] text-bg-dark"
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
