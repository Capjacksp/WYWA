export const fusionCards = [
  {
    eyebrow: "Encoder 1",
    title: "Chemical",
    body: "1D convolutions capture VOC concentration slopes, enabling detection 45 seconds earlier.",
    iconSrc: "/images/tech-multimodal-1.png",
  },
  {
    eyebrow: "Encoder 2",
    title: "Visual",
    body: "A vision transformer scans live camera feeds to flag anomalous regions.",
    iconSrc: "/images/tech-multimodal-2.png",
  },
  {
    eyebrow: "Encoder 3",
    title: "Temporal",
    body: "Motion vectors over 5-second clips distinguish rising smoke from drifting fog.",
    iconSrc: "/images/tech-multimodal-3.png",
  },
  {
    eyebrow: "",
    title: "Fusion Layer",
    body: "A cross-attention transformer fuses encodings, dynamically learning contextual weighting of chemical data at dawn and visual data in dry conditions.",
    iconSrc: "/images/tech-multimodal-4.png",
  },
] as const;

export const wildfireClassCards = [
  {
    image: "/images/wildfire-class-fire-flames.webp",
    desktopVideo: "/videos/class-a.webm",
    mobileVideo: "/videos/class-a-480p.webm",
    label: "Class A",
    title: "Fire Flames",
    body: "Visible growth or flicker",
  },
  {
    image: "/images/wildfire-class-smoke-plumes.webp",
    desktopVideo: "/videos/class-b.webm",
    mobileVideo: "/videos/class-b-480p.webm",
    label: "Class B",
    title: "Smoke Plumes",
    body: "Rising, drifting, expanding",
  },
  {
    image: "/images/wildfire-class-fire-smoke.webp",
    desktopVideo: "/videos/class-c.webm",
    mobileVideo: "/videos/class-c-480p.webm",
    label: "Class C",
    title: "Fire and Smoke",
    body: "Combined detection",
  },
] as const;

export const labTestCards = [
  {
    image: "/images/lab-test-incense-smoke.webp",
    video: "/videos/incense-smoke-rejected.webm",
    title: "Incense Smoke",
    result: "Rejected",
  },
  {
    image: "/images/lab-test-brush-fire-smoke.webp",
    video: "/videos/brush-fire-smoke-detected.webm",
    title: "Brush Fire Smoke",
    result: "Detected",
  },
] as const;
