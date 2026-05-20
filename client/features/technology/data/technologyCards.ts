export const fusionCards = [
  {
    eyebrow: "Encoder 1",
    title: "Chemical",
    body: "VOC, CO2, and particulate signatures identify early combustion chemistry before visible smoke forms.",
    iconSrc: "/images/tech-multi-1.png",
  },
  {
    eyebrow: "Encoder 2",
    title: "Visual",
    body: "Live camera feeds are processed by a vision transformer that extracts spatial features and identifies anomalous regions.",
    iconSrc: "/images/tech-multi-2.png",
  },
  {
    eyebrow: "Encoder 3",
    title: "Temporal",
    body: "Motion vectors across 5-second clips are analyzed to distinguish rising smoke plumes from drifting fog.",
    iconSrc: "/images/tech-multi-3.png",
  },
  {
    eyebrow: "Encoder 4",
    title: "Fusion Layer",
    body: "A cross-attention transformer fuses the encodings. The model dynamically learns contextual weighting; chemical data is weighted higher at dawn, and visual data is weighted higher in dry conditions.",
    iconSrc: "/images/tech-multi-4.png",
  },
] as const;

export const wildfireClassCards = [
  {
    image: "/images/wildfire-class-fire-flames.png",
    label: "Class A",
    title: "Fire Flames",
    body: "Visible growth or flicker",
  },
  {
    image: "/images/wildfire-class-smoke-plumes.png",
    label: "Class B",
    title: "Smoke Plumes",
    body: "Rising, drifting, expanding",
  },
  {
    image: "/images/wildfire-class-fire-smoke.png",
    label: "Class C",
    title: "Fire and Smoke",
    body: "Combined detection",
  },
] as const;

export const labTestCards = [
  {
    image: "/images/lab-test-incense-smoke.png",
    title: "Incense Smoke",
    result: "Rejected",
  },
  {
    image: "/images/lab-test-brush-fire-smoke.png",
    title: "Brush Fire Smoke",
    result: "Detected",
  },
] as const;
