export type TeamMember = {
  id: string;
  name: string;
  count: number;
  role: string;
  image: string;
  linkedin?: string;
};

export const teamMembers: TeamMember[] = [
  {
    id: "navya",
    name: "Navya Veeturi",
    count: 1,
    role: "Co-Founder",
    image: "/images/navya.webp",
    linkedin: "https://www.linkedin.com/in/navya-v-72331332/",
  },
  {
    id: "anirudh",
    name: "Anirudh Sharma",
    count: 2,
    role: "Co-Founder",
    image: "/images/anirudh.webp",
    linkedin: "https://www.linkedin.com/in/zwanderer/",
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
    image: "/images/advisor-gabriel.webp",
    linkedin: "https://www.linkedin.com/company/wywa-ai",
  },
  {
    name: "Will Ramey",
    role: "Sr. Director, NVIDIA",
    image: "/images/advisor-will.webp",
    linkedin: "https://www.linkedin.com/company/wywa-ai",
  },
  {
    name: "Joel Wright",
    role: "Lorem Ipsum",
    image: "/images/advisor-joel.webp",
    linkedin: "https://www.linkedin.com/company/wywa-ai",
  },
] as const;
