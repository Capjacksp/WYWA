export const howItWorksSteps = [
  {
    number: "1.",
    title: "Deploy",
    image: "/images/tech-deploy-2.png",
    customCSS: "",
    body: "Solar-powered sensor nodes detect real brush fire combustion while filtering out false triggers like diesel exhaust, dust, or fog. Battery-free, always-on, and connected over a secure LoRa mesh network for continuous wildfire monitoring.",
  },
  {
    number: "2.",
    title: "Analyse",
    image: "/images/tech-analyse-2.png",
    customCSS: "",
    body: "Data is processed locally through a 10-mile edge network that works fully offline. On-device AI, software-defined radio (SDR), and satellite links ensure reliable monitoring even in remote terrain, while integrated cameras and edge analytics confirm fires in real time.",
  },
  {
    number: "3.",
    title: "Interpret",
    image: "/images/tech-interpret-2.png",
    customCSS: "",
    body: "Edge inference runs entirely on local hardware, with no cloud dependency. A cross-attention transformer fuses chemical, visual, and motion signals to classify ignition events in real time, enabling early detection with fewer false positives.",
  },
  {
    number: "4.",
    title: "ACT",
    image: "/images/tech-act-2.png",
    customCSS: "scale-200",
    body: "A live dashboard provides real-time visibility across all nodes, tracking temperature, humidity, GPS location, and signal strength. When ignition is confirmed, alerts are broadcast instantly via SDR using text-to-speech transmission, no internet required.",
  },
] as const;
