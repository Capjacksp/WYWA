export const blogPosts = [
  {
    date: "December 2, 2025",
    titleLines: ["Before", "We Build,"],
    highlightedTitle: "We Listen",
    body: "We spoke with firefighters across the U.S. to understand what early wildfire detection looks like on the ground, not in a lab. The reality: fires are still reported via 911, wrong locations waste critical time, and specialized tools barely exist. That's the problem we're designing for.",
    image: "/images/blog-before-we-build.png",
    postUrl:
      "https://wywaaiblog.wordpress.com/2025/12/02/before-we-build-we-listen",
  },
  {
    date: "January 2, 2026",
    titleLines: ["Building", "Nature's"],
    highlightedTitle: "Sixth Sense",
    body: "Building smart nodes detect wildfire chemistry in real time, filter false alarms on-device, and when multiple nodes agree, a camera activates, and a vision model analyzes smoke, wind, and spread, giving first responders actionable intelligence before the fire spreads.",
    image: "/images/blog-sixth-sense.png",
    postUrl:
      "https://wywaaiblog.wordpress.com/2026/01/02/building-the-natures-sixth-sense/",
  },
] as const;
