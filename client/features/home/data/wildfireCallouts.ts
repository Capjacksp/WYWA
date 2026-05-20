import type { FireCalloutProps } from "@/features/home/components/wildfire-map/FireCallout";

export const wildfireCallouts = [
  {
    label: "Tubbs Complex (2017)",
    stats: {
      scale: "36,807 acres | 23 days",
      delay: "15-60 mins to detect",
      impact: "5,636 structures destroyed | $1B+ losses",
    },
    className: "left-[30%] top-[37%]",
    enterFrom: "left",
    range: [0.4, 0.52],
    markerPosition: "right",
  },
  {
    label: "Camp Fire (2018)",
    stats: {
      scale: "153,336 acres | 17 days",
      delay: "10-90 mins to detect",
      impact: "18,804 structures destroyed | $16.5B losses",
    },
    className: "left-[56%] top-[11%]",
    enterFrom: "right",
    range: [0.46, 0.58],
  },
  {
    label: "August Complex (2020)",
    stats: {
      scale: "1,032,648 acres | ~87 days",
      delay: "~180 mins to detect",
      impact: "935 structures destroyed | $2B+ losses",
    },
    className: "left-[35%] top-[25%]",
    enterFrom: "left",
    range: [0.52, 0.64],
    markerPosition: "left",
  },
  {
    label: "Dixie Fire (2021)",
    stats: {
      scale: "963,309 acres | ~104 days",
      delay: "~120-180 mins to detect",
      impact: "1,311 structures destroyed | $1.2B+ losses",
    },
    className: "left-[65%] top-[13%]",
    enterFrom: "right",
    range: [0.58, 0.72],
    markerPosition: "left",
  },
  {
    label: "Palisades Fire (2025*)",
    stats: {
      scale: "~20,000-25,000 acres | ~2-3 weeks",
      delay: "~45 mins to detect",
      impact: "5,636 structures destroyed | $1B+ losses",
    },
    className: "left-[40%] top-[87%]",
    enterFrom: "left",
    range: [0.7, 0.86],
    markerPosition: "left",
    expandDirection: "up",
    doesHaveAsterisk:
      "*Recent incident context; figures may evolve with final reporting",
  },
] satisfies FireCalloutProps[];
