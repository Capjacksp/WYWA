import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";

type TeamMember = {
  id: string;
  name: string;
  count: number;
  role: string;
  image: string;
  activeImage?: string;
  stageClassName: string;
  panelClassName: string;
  panelTitleColor?: string;
  bio: string;
};

const teamMembers: TeamMember[] = [
  {
    id: "anirudh",
    name: "Anirudh Sharma",
    count: 1,
    role: "Co-Founder",
    image: "/images/team-anirudh-sharma.png",
    activeImage: "/images/team-anirudh-sharma-active.png",
    stageClassName:
      "left-[0.45%] top-[29.6%] z-20 w-[24.85%] bg-[#D4D4D4]",
    panelClassName: "left-[25.25%] top-[29.6%] h-[58.2%] w-[43.2%]",
    panelTitleColor: "#90E8FF",
    bio: "Anirudh Sharma is an inventor and technologist specializing in embodied AI interfaces that interact naturally with human senses and the environment. He leads the Spatial AI initiative at Amazon Lab126, building always-on, multimodal edge AI systems for Fire TV and Ring. He co-founded WYWA.ai to apply that same edge AI expertise to early wildfire detection, building systems that sense, reason, and alert in real time.\n\nA former MIT Media Lab Research Affiliate, his inventions, including AIR-INK and Lechal, have scaled globally and been licensed to major brands. He is an MIT TR35 Innovator, Forbes 30 Under 30 Fellow, and TIME 100 honoree.",
  },
  {
    id: "ravi",
    name: "Jaspreet Riar",
    count: 2,
    role: "Hardware Lead",
    image: "/images/team-rajdeep-s.png",
    activeImage: "/images/team-rajdeep-s-active.png",
    stageClassName:
      "left-[50%] top-[10.95%] z-10 w-[24.85%] bg-[#D9D9D9]",
    panelClassName: "left-[8.6%] top-[11.1%] h-[50%] w-[41.4%]",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: "dev",
    name: "Rajdeep S",
    count: 4,
    role: "Design Engineering",
    image: "/images/team-jaspreet-riar.png",
    activeImage: "/images/team-jaspreet-riar-active.png",
    stageClassName:
      "right-[0.55%] top-[31.35%] z-20 w-[24.85%] bg-[#D4D4D4]",
    panelClassName: "left-[30.4%] top-[31.35%] h-[43.4%] w-[45%]",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: "isha",
    name: "Navya Veeturi",
    count: 3,
    role: "Co-Founder",
    image: "/images/team-navya-veeturi.png",
    activeImage: "/images/team-navya-veeturi-active.png",
    stageClassName:
      "left-[25%] top-[52.1%] z-30 w-[24.85%] bg-[#DADADA]",
    panelClassName: "left-[49.85%] top-[34.4%] h-[59%] w-[45%]",
    bio: "Navya Veeturi is a San Francisco-based engineering leader and applied AI specialist working at the convergence of AI systems, data platforms, and physical AI. Currently a Software Engineering Manager at NVIDIA, where she leads personalization, data integration, and production AI systems. \n\nShe co-founded WYWA.ai to build low-cost, multimodal sensors powered by edge and generative AI that detect wildfires early and deliver real-time alerts to first responders, before small sparks become disasters.\n\nBeyond tech, Navya serves on the board of the Learning Rights Law Center and is an active mentor in the AI and climate tech ecosystem. She holds a Master's from Carnegie Mellon University.",
  },
] as const;

const advisors = [
  {
    name: "Gabriel Donaldson",
    role: "COO, Great Basin Institute",
    image: "/images/advisor-gabriel-donaldson.png",
  },
  {
    name: "Joel Wright",
    role: "Lorem Ipsum",
    image: "/images/advisor-joel-wright.png",
  },
  {
    name: "Savalai Vaikakul",
    role: "Lorem Ipsum",
    image: "/images/advisor-savalai-vaikakul.png",
  },
] as const;

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
              <span
                aria-hidden="true"
                className="mt-[clamp(0.15rem,0.35vw,0.5rem)] block h-0 w-0 shrink-0 border-y-[clamp(0.5rem,0.9vw,1.25rem)] border-l-[clamp(0.5rem,0.9vw,1.25rem)] border-y-transparent border-l-cta"
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
              href="https://www.linkedin.com/company/wywa"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WYWA on LinkedIn"
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
  const [activeId, setActiveId] = useState<null | string>(null);
  const activeMember =
    teamMembers.find((member) => member.id === activeId) ?? null;

  return (
    <section className="bg-[#F7F7F7] px-[50px] pt-0 max-md:px-5">
      <div
        className="relative mx-auto hidden aspect-[16/9] w-full max-w-[1920px] overflow-hidden lg:block"
        onMouseLeave={() => setActiveId(null)}
      >
        <div className="pointer-events-none absolute left-[1.35%] top-[11.8%] z-0 font-body text-[clamp(8rem,17.6vw,18rem)] uppercase leading-[0.85] tracking-normal text-bg-dark">
          Our
        </div>
        <div className="pointer-events-none absolute bottom-[1.7%] right-[1.1%] z-0 font-body text-[clamp(8rem,17.4vw,18rem)] uppercase leading-[0.85] tracking-normal text-bg-dark">
          Team
        </div>

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

      <div className="lg:hidden">
        <h1 className="pt-20 font-body text-huge uppercase leading-[0.88] tracking-normal text-bg-dark">
          Our Team
        </h1>
        <div className="mt-8 grid gap-5 pb-14">
          {teamMembers.map((member) => (
            <article key={member.id} className="overflow-hidden bg-[#242425ED]">
              <img
                src={member.image}
                alt={member.name}
                className="aspect-[1.08/1] w-full object-cover grayscale"
              />
              <div className="bg-bg-dark px-5 py-6 text-white">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-body text-h2 uppercase leading-none text-cta">
                      {member.name}
                    </h2>
                    <p className="mt-2 font-body text-sm uppercase tracking-[0.18em]">
                      {member.role}
                    </p>
                  </div>
                  <a
                    href="https://www.linkedin.com/company/wywa"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WYWA on LinkedIn"
                    className="text-white/80 hover:text-white transition-colors"
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
                <p className="mt-5 font-figtree text-body leading-snug">
                  {member.bio.split("\n\n")[0]}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AdvisorsSection() {
  return (
    <section className="bg-[#F7F7F7] px-[50px] pb-28 pt-20 max-md:px-5 max-md:pt-10">
      <div className="mx-auto max-w-[1920px]">
        <h2 className="text-center font-body text-display font-normal uppercase leading-[0.9] tracking-normal text-bg-dark">
          Our Advisors
        </h2>

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
                    href="https://www.linkedin.com/company/wywa"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WYWA on LinkedIn"
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
              <h3 className="mt-8 font-body text-h3 font-[500] uppercase leading-none tracking-normal text-bg-dark">
                {advisor.name}
              </h3>
              <p className="mt-2 font-figtree text-body font-[400] uppercase leading-none tracking-[0.18em] text-bg-dark">
                {advisor.role}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
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
