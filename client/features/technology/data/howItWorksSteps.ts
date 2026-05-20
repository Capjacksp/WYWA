export const howItWorksSteps = [
  {
    number: "1.",
    title: "Deploy",
    image: "/images/tech-deploy.png",
    body: "Deploy-and-forget sensor nodes detect real brush fire combustion while rejecting incense, diesel exhaust, dust, or fog, eliminating false alarms at the source. Fully solar-powered with energy harvesting and supercapacitor storage, the system operates battery-free. Integrated VOC, CO2, and particulate sensors communicate over a secure LoRa mesh network for continuous, distributed wildfire monitoring.",
  },
  {
    number: "2.",
    title: "Analyse",
    image: "/images/tech-analyse.png",
    body: "Data from sensor nodes is processed locally through a 10-mile edge network that operates fully offline. On-device AI, software-defined radio (SDR), and satellite link capability ensure reliable monitoring in remote terrain. Integrated cameras provide visual confirmation, while edge analytics interpret environmental signals in real time.",
  },
  {
    number: "3.",
    title: "Interpret",
    image: "/images/tech-interpret.png",
    body: "Edge inference runs directly on local compute hardware, with no cloud dependency. A cross-attention transformer fuses chemical, visual, and temporal signals to classify ignition events. Real-time VOC pattern matching, smoke detection, and flame motion analysis enable early detection with fewer false positives.",
  },
  {
    number: "4.",
    title: "ACT",
    image: "/images/tech-act.png",
    body: "A live dashboard provides real-time visibility across all deployed nodes, temperature, humidity, GPS location, and signal strength. When ignition is confirmed, alerts are broadcasted instantly via software-defined radio(SDR) and text-to-speech radio transmission, no internet required.",
  },
] as const;
