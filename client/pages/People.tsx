import { AnimatePresence, motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";

type TeamMember = {
  id: string;
  name: string;
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
    name: "Ravi Menon",
    role: "Edge AI Lead",
    image: "/images/team-member-top.png",
    stageClassName:
      "left-[50%] top-[10.95%] z-10 w-[24.85%] bg-[#D9D9D9]",
    panelClassName: "left-[24.6%] top-[20.6%] h-[50%] w-[41.4%]",
    bio: "Ravi works across embedded intelligence, sensing, and low-power compute, helping WYWA fuse chemical, visual, and temporal signals at the edge.",
  },
  {
    id: "dev",
    name: "Dev Shah",
    role: "Systems Lead",
    image: "/images/team-member-right.png",
    stageClassName:
      "right-[0.55%] top-[31.35%] z-20 w-[24.85%] bg-[#D4D4D4]",
    panelClassName: "left-[33.8%] top-[31.35%] h-[46%] w-[41.6%]",
    bio: "Dev leads ruggedized system design and communications, making sure WYWA nodes can operate reliably in remote terrain without depending on continuous internet access.",
  },
  {
    id: "isha",
    name: "Isha Patel",
    role: "Research and Product",
    image: "/images/team-member-bottom.png",
    stageClassName:
      "left-[25%] top-[52.1%] z-30 w-[24.85%] bg-[#DADADA]",
    panelClassName: "left-[49.85%] top-[39.4%] h-[49%] w-[41.6%]",
    bio: "Isha shapes WYWA's field research and product direction, translating responder needs into practical interfaces, clear workflows, and deployment-ready systems for high-risk wildfire regions.",
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
      className={`absolute overflow-hidden text-left transition duration-300 focus:outline-none ${member.stageClassName} ${
        isActive ? "grayscale-0" : "grayscale"
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
          className={`pointer-events-none absolute z-40 rounded-[18px] bg-[rgba(45,45,45,0.97)] px-[2.35vw] py-[2.75vw] text-white shadow-[0_18px_60px_rgba(0,0,0,0.22)] ${member.panelClassName}`}
        >
          <div className="flex items-start justify-between gap-5">
            <div className="flex items-start gap-[1.7vw]">
              <span
                aria-hidden="true"
                className="mt-[0.45vw] block h-0 w-0 border-y-[1.12vw] border-l-[1.12vw] border-y-transparent border-l-cta"
              />
              <div>
                <h2
                  className="font-body text-[clamp(1.7rem,2.2vw,2.75rem)] font-normal uppercase leading-none tracking-normal"
                  style={{ color: member.panelTitleColor ?? "#90E8FF" }}
                >
                  {member.name}
                </h2>
                <p className="mt-[0.35vw] font-body text-[clamp(0.95rem,1.12vw,1.35rem)] uppercase leading-none tracking-[0.18em] text-white">
                  {member.role}
                </p>
              </div>
            </div>
            <Linkedin
              className="mt-[0.15vw] h-[2.1vw] w-[2.1vw] shrink-0 text-white"
              fill="currentColor"
            />
          </div>

          <div className="mt-[4.7vw] max-w-[90%] whitespace-pre-line font-figtree text-[clamp(0.95rem,1.05vw,1.32rem)] leading-[1.32] text-white">
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
        <h1 className="pt-20 font-body text-[clamp(4.8rem,20vw,8rem)] uppercase leading-[0.88] tracking-normal text-bg-dark">
          Our Team
        </h1>
        <div className="mt-8 grid gap-5 pb-14">
          {teamMembers.map((member) => (
            <article key={member.id} className="overflow-hidden bg-[#D4D4D4]">
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
                  <Linkedin className="h-8 w-8 shrink-0" fill="currentColor" />
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
        <h2 className="text-center font-body text-[clamp(4.4rem,6vw,6.8rem)] font-normal uppercase leading-[0.9] tracking-normal text-bg-dark">
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
                <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-[4px] bg-bg-dark text-cta">
                  <Linkedin className="h-7 w-7" fill="currentColor" />
                </div>
              </div>
              <h3 className="mt-8 font-body text-[clamp(2rem,2.15vw,2.65rem)] font-bold uppercase leading-none tracking-normal text-bg-dark">
                {advisor.name}
              </h3>
              <p className="mt-2 font-body text-[clamp(1rem,1.15vw,1.4rem)] uppercase leading-none tracking-[0.18em] text-bg-dark">
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
    <PageLayout>
      <TeamHero />
      <AdvisorsSection />
    </PageLayout>
  );
}
