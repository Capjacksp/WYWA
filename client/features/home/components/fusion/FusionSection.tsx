import { motion } from "framer-motion";
import Section from "@/components/common/Section";
import { ScrollTextLines } from "@/components/ui/scroll-text-lines";

export function FusionSection() {
  return (
    <Section
      data-header-class="header-dark"
      className="relative flex min-h-[200vh] flex-col items-center justify-center overflow-hidden bg-bg-light pb-16 pt-28"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            "linear-gradient(#242425 1px, transparent 1px), linear-gradient(90deg, #242425 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <ScrollTextLines
        className="relative z-10 mx-auto mb-[-80px] max-w-[1800px] text-center"
        lineClassName="block text-huge"
        lines={[
          <span className="text-[#F15D59]">MULTIMODAL FUSION</span>,
          <span className="text-dark">THREE SIGNALS.</span>,
          <span className="text-dark">ONE INTELLIGENCE.</span>,
        ]}
      />

      <motion.div
        className="relative -top-20 z-30 mx-auto h-full w-full overflow-visible align-top pointer-events-none"
        animate={{ y: [-10, 12, -10], rotate: [-0.4, 0.4, -0.4] }}
        transition={{
          duration: 6.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <img
          src="/images/sensor.png"
          alt="Exploded view of the sensor"
          className="h-auto w-full rotate-[-30deg] object-contain"
        />
      </motion.div>

      <JaggedRedBackground />

      <div className="relative z-10 mx-auto mb-0 mt-auto flex max-w-[1700px] items-end gap-32 px-[50px] max-lg:flex-col max-md:px-5">
        <div className="max-w-[850px] flex-[1.5]">
          <ScrollTextLines
            as="h2"
            className="text-justify text-h1-md uppercase text-white text-balance"
            lines={[
              <>
                SENSING SUBTLE SHIFTS IN THE ENVIRONMENT ACROSS
                <span className="font-bold text-bg-dark">
                  {" "}
                  CHEMICAL, VISUAL, AND TEMPORAL SIGNALS,
                </span>
              </>,
              "DETECTING IGNITION BEFORE CATASTROPHE UNFOLDS.",
            ]}
          />
        </div>

        <div className="ml-auto max-w-[260px] flex-1">
          <ScrollTextLines
            as="p"
            className="align-right font-figtree text-body font-[400] leading-relaxed text-white opacity-90"
            delay={0.1}
            lines={[
              "Our models are trained on VOC signatures from fast-igniting fuels like Red Brome, Medusahead, Cheatgrass, and Wild Oats to detect wildfire-specific combustion signatures in real time, filtering out false triggers like diesel emissions or dust.",
              "Edge AI then verifies ignition by interpreting motion patterns in flame and rising smoke.",
              "Trained in simulated wildfire environments using real-world and simulated data, the system detects fire alerts within a minute, providing a critical 15-minute head start.",
            ]}
          />
        </div>
      </div>
    </Section>
  );
}

function JaggedRedBackground() {
  return (
    <div className="pointer-events-none absolute bottom-0 left-0 z-0 h-full w-full">
      <svg
        className="absolute bottom-0 h-[80vh] w-full object-cover object-bottom"
        viewBox="100 0 1857 1000.13"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M736 120.251L736.331 84.2318L768.177 84.0747L768.383 68.8783L832.57 68.8506L832.735 83.9916L896.881 84.0932L896.22 59.8066L960.945 59.862L961.193 84.047C972.263 84.1856 981.515 84.2041 993.163 84.0285L993.287 30.319L1089.65 30.2913L1089.82 51.1783C1100.35 51.3261 1109.93 51.3169 1121.66 51.2338L1121.87 -9.8838e-06L1218.07 -8.74529e-06L1218.35 51.28L1282.38 51.28L1282.54 88.3889L1314.51 88.6383L1314.8 105.867C1326.78 106.135 1336.82 105.673 1346.73 106.107L1346.85 140.796L1378.78 140.897L1379.07 175.734L1410.96 175.845L1411.2 212.852L1443.13 212.981L1443.5 233.36C1454.62 233.656 1462.71 233.545 1475.02 233.48L1475.35 194.764L1507.24 194.579L1507.57 175.817C1518.43 175.595 1528.22 176.177 1539.29 175.484L1539.66 194.616C1550.32 194.783 1559.49 194.736 1571.22 194.644L1571.75 175.891L1603.48 175.743L1603.85 156.953L1635.78 156.805L1635.78 112.592L1667.79 112.408L1667.99 74.3934L1700.05 74.2455L1700.21 41.3676L1796.74 41.3676L1796.95 74.2455L1828.87 74.3472L1829.04 102.957L1860.76 103.16L1860.76 121.877L1892.9 122.015L1892.98 156.796L1925.11 156.981L1925.11 247.005L1957 247.143L1957 1000.13L-67.1633 1000.13L-67.5766 244.511L-36.3501 244.289C-34.6567 243.079 -34.7806 241.998 -36.2675 240.788L-43.0002 242.173L-43.1242 234.413C-43.7438 234.127 -46.6347 233.794 -47.0065 234.229C-43.2891 237.591 -46.0568 235.032 -46.1807 238.598L-46.3047 243.042C-48.7416 243.189 -49.4437 243.236 -49.8567 243.31C-50.8481 243.457 -54.6891 243.365 -51.0956 242.931L-51.6326 228.381C-57.6218 227.679 -52.9135 238.912 -55.6396 237.471C-53.9874 238.349 -53.409 239.559 -56.5069 239.938C-57.1678 240.021 -60.1004 240.058 -59.7699 239.781C-57.2917 237.665 -59.398 235.707 -59.4393 233.628L-59.8526 219.651C-67.4526 219.115 -60.0179 222.081 -64.4787 222.469C-70.1374 222.949 -67.2459 212.843 -67.3698 211.355L-67.7411 206.422L-67.1217 183.697C-62.9086 183.577 -58.82 183.614 -54.0286 183.614C-53.6982 184.639 -55.8871 185.267 -54.8131 186.376C-46.0567 185.849 -40.2328 185.434 -41.5546 183.669L-4.29801 183.752L-3.71964 178.034L67.5719 177.96L68.2736 161.369L100.037 161.092L100.491 155.521L192.931 155.447L193.219 127.798L224.57 127.53C225.85 125.599 225.643 123.9 224.693 122.477L317.959 122.542L317.711 111.465C328.037 111.715 338.074 111.715 350.3 111.484L350.3 85.7099L382.518 85.5343L382.518 29.968L511.304 29.9864L511.304 85.3865C522.663 85.8669 533.485 85.5251 543.728 85.599L543.481 120.334C556.987 120.537 567.313 120.167 575.739 120.509L575.244 184.842L607.296 184.981L607.378 203.66L670.616 203.743L672.144 183.531L703.948 183.411L703.948 120.26C712.787 120.426 721.792 120.472 735.918 120.278L736 120.251Z"
          fill="#F15D59"
        />
      </svg>
    </div>
  );
}
