import type { FireCalloutProps } from "@/features/home/components/wildfire-map/FireCallout";

export const wildfireCallouts = [
  {
    label: "Tubbs Complex (2017)",
    image: "/images/tubbs-complex.png",
    coordinates: [38.6, -122.5],
    stats: {
      scale: [
        { text: "36,807 acres", className: "text-[#F15D59]" },
        { text: " | 23 days" },
      ],
      delay: [
        { text: "15-60", className: "text-[#F15D59]" },
        { text: " mins to detect" },
      ],
      impact: [
        { text: "5,636", className: "text-[#F15D59]" },
        { text: " structures destroyed | $1B+ losses" },
      ],
    },
    className: "left-[30%] top-[37%]",
    enterFrom: "left",
    range: [0.4, 0.52],
    markerPosition: "right",
    mobileCardPosition: "right",
    sourceUrl: "https://phys.org/news/2017-10-nasa-satellite-tail-miles-california.html",
    sourceName: "PHYS.ORG",
  },
  {
    label: "Camp Fire (2018)",
    image: "/images/camp-fire.png",
    coordinates: [39.8, -121.5],
    stats: {
      scale: [
        { text: "153,336 acres", className: "text-[#F15D59]" },
        { text: " | 17 days" },
      ],
      delay: [
        { text: "10-90", className: "text-[#F15D59]" },
        { text: " mins to detect" },
      ],
      impact: [
        { text: "18,804", className: "text-[#F15D59]" },
        { text: " structures destroyed | $16.5B losses" },
      ],
    },
    className: "left-[56%] top-[11%]",
    enterFrom: "right",
    range: [0.46, 0.58],
    mobileCardPosition: "left",
    mobileExpandDirection: "down",
    sourceUrl: "https://science.nasa.gov/missions/landsat/the-synoptic-view-of-californias-camp-fire-a-scorching-reality-of-todays-fires/",
    sourceName: "NASA.GOV",
  },
  {
    label: "August Complex (2020)",
    image: "/images/august-complex.png",
    coordinates: [39.2, -122.2],
    stats: {
      scale: [
        { text: "1,032,648 acres", className: "text-[#F15D59]" },
        { text: " | ~87 days" },
      ],
      delay: [
        { text: "~180", className: "text-[#F15D59]" },
        { text: " mins to detect" },
      ],
      impact: [
        { text: "935", className: "text-[#F15D59]" },
        { text: " structures destroyed | $2B+ losses" },
      ],
    },
    className: "left-[35%] top-[25%]",
    enterFrom: "left",
    range: [0.52, 0.64],
    markerPosition: "left",
    mobileCardPosition: "right",
    sourceUrl: "https://www.nbcnews.com/news/weather/satellite-images-show-western-fires-producing-massive-clouds-smoke-pollutants-n1240137",
    sourceName: "NBC NEWS",
  },
  {
    label: "Dixie Fire (2021)",
    image: "/images/dixie-fire.png",
    coordinates: [40.3, -121.3],
    stats: {
      scale: [
        { text: "963,309 acres", className: "text-[#F15D59]" },
        { text: " | ~104 days" },
      ],
      delay: [
        { text: "~120-180", className: "text-[#F15D59]" },
        { text: " mins to detect" },
      ],
      impact: [
        { text: "1,311", className: "text-[#F15D59]" },
        { text: " structures destroyed | $1.2B+ losses" },
      ],
    },
    className: "left-[65%] top-[13%]",
    enterFrom: "right",
    range: [0.58, 0.72],
    markerPosition: "left",
    mobileCardPosition: "right",
    sourceUrl: "https://www.techtimes.com/articles/264181/20210815/dixie-fire-before-scenes-caught-worldview-1-satellite.htm",
    sourceName: "TECH TIMES",
  },
  {
    label: "Palisades Fire (2025*)",
    image: "/images/palisades-fire.png",
    coordinates: [34.1, -118.8],
    stats: {
      scale: [
        { text: "~20,000-25,000 acres", className: "text-[#F15D59]" },
        { text: " | 23 days" },
      ],
      delay: [
        { text: "~45", className: "text-[#F15D59]" },
        { text: " mins to detect" },
      ],
      impact: [
        { text: "~100+", className: "text-[#F15D59]" },
        { text: " structures destroyed | ~$1M losses" },
      ],
    },
    className: "left-[40%] top-[87%]",
    enterFrom: "left",
    range: [0.7, 0.86],
    markerPosition: "right",
    mobileCardPosition: "left",
    mobileExpandDirection: "up",
    expandDirection: "up",
    doesHaveAsterisk:
      "*Recent incident context; figures may evolve with final reporting",
    defaultOpenOnMobile: true,
    sourceUrl: "https://www.bbc.com/future/article/20250109-five-images-that-explain-why-the-la-fires-spread-so-fast",
    sourceName: "BBC.COM",
  },
] satisfies FireCalloutProps[];
