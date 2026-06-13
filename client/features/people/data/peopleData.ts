export type TeamMember = {
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
  linkedin?: string;
};

export const teamMembers: TeamMember[] = [
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
    linkedin: "https://www.linkedin.com/company/wywa-ai",
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
    linkedin: "https://www.linkedin.com/company/wywa-ai",
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
    linkedin: "https://www.linkedin.com/company/wywa-ai",
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
    linkedin: "https://www.linkedin.com/company/wywa-ai",
  },
] as const;

export type Advisor = {
  name: string;
  role: string;
  image: string;
  linkedin?: string;
};

export const advisors: Advisor[] = [
  {
    name: "Gabriel Donaldson",
    role: "COO, Great Basin Institute",
    image: "/images/advisor-gabriel-donaldson.png",
    linkedin: "https://www.linkedin.com/company/wywa-ai",
  },
  {
    name: "Joel Wright",
    role: "Lorem Ipsum",
    image: "/images/advisor-joel-wright.png",
    linkedin: "https://www.linkedin.com/company/wywa-ai",
  },
  {
    name: "Savalai Vaikakul",
    role: "Lorem Ipsum",
    image: "/images/advisor-savalai-vaikakul.png",
    linkedin: "https://www.linkedin.com/company/wywa-ai",
  },
] as const;
