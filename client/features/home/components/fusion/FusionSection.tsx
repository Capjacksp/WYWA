import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import Section from "@/components/common/Section";
import { ScrollTextLines } from "@/components/ui/scroll-text-lines";

export function FusionSection() {
  return (
    <>
      <DesktopFusionSection />
      <MobileFusionSection />
    </>
  );
}

function DesktopFusionSection() {
  const revealRef = useRef<HTMLDivElement>(null);
  const redAreaInView = useInView(revealRef, { amount: 0.25, once: true });
  const reduceMotion = useReducedMotion();
  const revealCopy = redAreaInView || reduceMotion;

  return (
    <Section
      data-header-class="header-dark"
      className="relative z-10 flex min-h-230vh flex-col items-center justify-center overflow-hidden bg-bg-light pb-28 pt-28 shadow-[0_-24px_60px_rgba(0,0,0,0.18)] max-md:hidden"
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
        motionPreset="fusion-converge"
        lines={[
          <span className="text-[#F15D59]">MULTIMODAL FUSION</span>,
          <span className="text-dark">THREE SIGNALS.</span>,
          <span className="text-dark">ONE INTELLIGENCE.</span>,
        ]}
      />

      <motion.div
        className="relative -top-20 z-30 mx-auto h-full w-full overflow-visible align-top pointer-events-none"
        initial={reduceMotion ? false : { opacity: 0, y: 70, scale: 0.94 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          animate={reduceMotion ? undefined : { y: -18, rotate: 0.4 }}
          initial={{ y: 0, rotate: -0.4 }}
          transition={{ duration: 3.5, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        >
          <img
            src="/images/sensor-mob.png"
            alt="Exploded view of the sensor"
            className="mx-auto block h-auto w-[700px] object-contain"
          />
        </motion.div>
      </motion.div>

      <div
        ref={revealRef}
        className="pointer-events-none absolute bottom-0 left-0 h-[80vh] w-full"
      />

      <JaggedRedBackground active={redAreaInView} />

      <div className="relative z-10 mx-auto mb-0 mt-auto flex max-w-[1700px] items-end gap-32 px-[50px] max-lg:flex-col max-md:px-5">
        <div className="max-w-[850px] flex-[1.5]">
          <CharacterReveal
            className="text-justify text-h1-md uppercase text-white"
            active={revealCopy}
            delay={1.7}
            segments={[
              { text: "SENSING SUBTLE SHIFTS IN THE ENVIRONMENT ACROSS " },
              {
                text: "CHEMICAL, VISUAL, AND TEMPORAL SIGNALS, ",
                className: "font-bold text-bg-dark",
              },
              { text: "DETECTING IGNITION BEFORE CATASTROPHE UNFOLDS." },
            ]}
          />
        </div>

        <div className="ml-auto max-w-[260px] flex-1">
          <motion.div
            className="align-right font-figtree text-body font-[400] leading-relaxed text-white opacity-90"
            initial="hidden"
            animate={revealCopy ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0, y: 48 },
              visible: {
                opacity: 0.9,
                y: 0,
                transition: {
                  delay: reduceMotion ? 0 : 1,
                  duration: reduceMotion ? 0 : 0.75,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
          >
            <p>Our models are trained on VOC signatures from fast-igniting fuels like Red Brome, Medusahead, Cheatgrass, and Wild Oats to detect wildfire-specific combustion signatures in real time, filtering out false triggers like diesel emissions or dust.</p>
            <p>Edge AI then verifies ignition by interpreting motion patterns in flame and rising smoke.</p>
            <p>Trained in simulated wildfire environments using real-world and simulated data, the system detects fire alerts within a minute, providing a critical 15-minute head start.</p>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

function MobileFusionSection() {
  return (
    <div className="relative z-10 shadow-[0_-18px_44px_rgba(0,0,0,0.2)] md:hidden">
      <MobileFusionSensorScreen />
      <MobileFusionCopyScreen />
    </div>
  );
}

function MobileFusionCopyScreen() {
  return (
    <section
      data-header-class=""
      className="flex min-h-[80vh] flex-col bg-[#F15D59] px-3 pb-16 pt-[120px] text-white"
    >
      <ScrollTextLines
        as="h2"
        className="mx-auto max-w-[370px] text-center font-heading text-[28px] font-[400] uppercase leading-[0.94] tracking-normal"
        lines={[
          "Sensing subtle",
          "shifts in the",
          "environment",
          "across",
          <span className="font-[700] text-bg-dark">Chemical, visual,</span>,
          <span className="font-[700] text-bg-dark">and</span>,
          <span className="font-[700] text-bg-dark">temporal signals,</span>,
          "detecting ignition",
          "before",
          "catastrophe",
          "unfolds.",
        ]}
      />

      <ScrollTextLines
        as="p"
        className="mx-auto mt-[66px] w-full max-w-[242px] font-figtree text-[14px] font-[400] leading-[1.15] text-white"
        lineClassName="mb-2 block last:mb-0"
        delay={0.1}
        lines={[
          <>Our models are trained on VOC signatures from fast-igniting fuels like Red Brome, Medusahead, Cheatgrass, and Wild Oats to detect wildfire-specific combustion signatures in real time, filtering out false triggers like diesel emissions or dust.<br /><br /></>,
          <>Edge AI then verifies ignition by interpreting motion patterns in flame and rising smoke.<br /><br /></>,
          <>Trained in simulated wildfire environments using real-world and simulated data, the system detects fire alerts within a minute, providing a critical 15-minute head start.</>,
        ]}
      />
    </section>
  );
}

function MobileFusionSensorScreen() {
  return (
    <section
      data-header-class="header-dark"
      className="relative min-h-[max(800px,100vh)] overflow-hidden bg-[#FFFFFF] px-5 pt-[112px] text-bg-dark"
    >
      <MobileGridBackground />

      <ScrollTextLines
        as="h2"
        className="relative z-10 mx-auto max-w-[360px] text-center font-heading text-[43px] font-[350] uppercase leading-[0.94] tracking-normal"
        motionPreset="fusion-converge"
        lines={[
          <span className="text-[#F15D59]">Multimodal</span>,
          <span className="text-[#F15D59]">Fusion</span>,
          "Three",
          "Signals.",
          "One",
          "Intelligence.",
        ]}
      />

      <div className="relative z-10 left-1/2 -translate-x-1/2 mt-[-34px] w-[400px] pointer-events-none">
        <motion.div
          animate={{ y: -18, rotate: 0.4 }}
          initial={{ y: 0, rotate: -0.4 }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        >
          <img
            src="/images/sensor-mob.png"
            alt="Exploded view of the WYWA sensor"
            className="w-full max-w-none object-contain"
          />
        </motion.div>
      </div>

      <MobileRedTerrain />
    </section>
  );
}

function MobileGridBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.10]"
      style={{
        backgroundImage:
          "linear-gradient(#242425 1px, transparent 1px), linear-gradient(90deg, #242425 0.21px, transparent 1px)",
        backgroundSize: "16px 16px",
      }}
    />
  );
}

function MobileRedTerrain() {
  const terrainRef = useRef<SVGSVGElement>(null);
  const terrainInView = useInView(terrainRef, { amount: 0.25, once: true });

  return (
    <svg
      ref={terrainRef}
      className="absolute bottom-0 left-0 z-0 h-[118px] w-full"
      viewBox="0 0 390 118"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <mask id="mobile-fusion-terrain-pixels" maskUnits="userSpaceOnUse" x="0" y="0" width="390" height="118" style={{ maskType: "alpha" }}>
          <FusionPixelMask width={390} height={118} columns={12} rows={5} active={terrainInView} />
        </mask>
      </defs>
      <path d="M147.031 28.3534L147.101 20.7204L153.849 20.6871L153.893 17.4667L167.496 17.4608L167.531 20.6695L181.124 20.691L180.984 15.5443L194.7 15.556L194.753 20.6812C197.099 20.7106 199.06 20.7145 201.528 20.6773L201.554 9.29535L221.975 9.28948L222.01 13.7158C224.242 13.7471 226.273 13.7452 228.759 13.7275L228.803 2.87023L249.189 2.87024L249.25 13.7373L262.817 13.7373L262.852 21.6014L269.627 21.6542L269.688 25.3053C272.227 25.3621 274.354 25.2642 276.454 25.3562L276.481 32.7073L283.247 32.7288L283.308 40.1112L290.066 40.1347L290.118 47.9772L296.884 48.0046L296.963 52.3233C299.318 52.3859 301.033 52.3624 303.641 52.3487L303.712 44.1441L310.469 44.1049L310.539 40.1289C312.841 40.0819 314.915 40.2052 317.261 40.0584L317.34 44.1128C319.598 44.148 321.542 44.1382 324.027 44.1186L324.141 40.1445L330.864 40.1132L330.942 36.1313L337.709 36.1L337.709 26.7305L344.492 26.6913L344.536 18.6355L351.328 18.6041L351.363 11.6367L371.819 11.6367L371.863 18.6041L378.629 18.6257L378.664 24.6886L385.387 24.7317L385.387 28.698L392.197 28.7273L392.214 36.098L399.024 36.1372L399.024 55.2148L405.781 55.2441L405.781 214.814L-23.1734 214.814L-23.2609 54.6862L-16.6435 54.6392C-16.2846 54.3828 -16.3109 54.1537 -16.626 53.8973L-18.0528 54.1909L-18.0791 52.5465C-18.2104 52.4858 -18.823 52.4153 -18.9018 52.5073C-18.114 53.2199 -18.7005 52.6776 -18.7268 53.4333L-18.7531 54.3749C-19.2695 54.4063 -19.4183 54.416 -19.5058 54.4317C-19.7159 54.463 -20.5299 54.4434 -19.7684 54.3514L-19.8822 51.2681C-21.1513 51.1193 -20.1536 53.4998 -20.7313 53.1944C-20.3812 53.3804 -20.2586 53.6369 -20.9151 53.7171C-21.0551 53.7348 -21.6766 53.7426 -21.6066 53.6839C-21.0814 53.2356 -21.5278 52.8205 -21.5365 52.3801L-21.6241 49.4181C-23.2347 49.3045 -21.6591 49.9329 -22.6045 50.0152C-23.8036 50.117 -23.1909 47.9753 -23.2171 47.6601L-23.2958 46.6147L-23.1646 41.7988C-22.2717 41.7733 -21.4053 41.7811 -20.3899 41.7811C-20.3199 41.9984 -20.7838 42.1316 -20.5562 42.3665C-18.7005 42.2549 -17.4663 42.1668 -17.7464 41.7929L-9.85114 41.8105L-9.72858 40.5987L5.37929 40.583L5.52804 37.0671L12.2592 37.0083L12.3555 35.8278L31.945 35.8122L32.0062 29.9528L38.6499 29.8961C38.9212 29.4869 38.8774 29.1267 38.6761 28.8252L58.4406 28.8389L58.3881 26.4916C60.5763 26.5445 62.7034 26.5445 65.2943 26.4956L65.2943 21.0336L72.1217 20.9964L72.1217 9.22096L99.4138 9.22487L99.4138 20.9651C101.821 21.0669 104.114 20.9945 106.285 21.0101L106.233 28.371C109.095 28.4141 111.283 28.3358 113.069 28.4082L112.964 42.0415L119.756 42.0709L119.774 46.0293L133.175 46.0469L133.498 41.7635L140.238 41.7381L140.238 28.3554C142.112 28.3906 144.02 28.4004 147.013 28.3593L147.031 28.3534Z" fill="#F15D59" mask="url(#mobile-fusion-terrain-pixels)" />
    </svg>
  );
}

function JaggedRedBackground({ active }: { active: boolean }) {
  return (
    <div className="pointer-events-none absolute bottom-0 left-0 z-0 h-full w-full">
      <svg
        className="absolute bottom-0 h-[82vh] w-full object-cover object-bottom"
        viewBox="100 0 1857 1000.13"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <mask id="desktop-fusion-terrain-pixels" maskUnits="userSpaceOnUse" x="100" y="0" width="1857" height="1000.13" style={{ maskType: "alpha" }}>
            <FusionPixelMask width={2057} height={1000.13} columns={18} rows={10} active={active} />
          </mask>
        </defs>
        <path
          d="M736 120.251L736.331 84.2318L768.177 84.0747L768.383 68.8783L832.57 68.8506L832.735 83.9916L896.881 84.0932L896.22 59.8066L960.945 59.862L961.193 84.047C972.263 84.1856 981.515 84.2041 993.163 84.0285L993.287 30.319L1089.65 30.2913L1089.82 51.1783C1100.35 51.3261 1109.93 51.3169 1121.66 51.2338L1121.87 -9.8838e-06L1218.07 -8.74529e-06L1218.35 51.28L1282.38 51.28L1282.54 88.3889L1314.51 88.6383L1314.8 105.867C1326.78 106.135 1336.82 105.673 1346.73 106.107L1346.85 140.796L1378.78 140.897L1379.07 175.734L1410.96 175.845L1411.2 212.852L1443.13 212.981L1443.5 233.36C1454.62 233.656 1462.71 233.545 1475.02 233.48L1475.35 194.764L1507.24 194.579L1507.57 175.817C1518.43 175.595 1528.22 176.177 1539.29 175.484L1539.66 194.616C1550.32 194.783 1559.49 194.736 1571.22 194.644L1571.75 175.891L1603.48 175.743L1603.85 156.953L1635.78 156.805L1635.78 112.592L1667.79 112.408L1667.99 74.3934L1700.05 74.2455L1700.21 41.3676L1796.74 41.3676L1796.95 74.2455L1828.87 74.3472L1829.04 102.957L1860.76 103.16L1860.76 121.877L1892.9 122.015L1892.98 156.796L1925.11 156.981L1925.11 247.005L1957 247.143L1957 1000.13L-67.1633 1000.13L-67.5766 244.511L-36.3501 244.289C-34.6567 243.079 -34.7806 241.998 -36.2675 240.788L-43.0002 242.173L-43.1242 234.413C-43.7438 234.127 -46.6347 233.794 -47.0065 234.229C-43.2891 237.591 -46.0568 235.032 -46.1807 238.598L-46.3047 243.042C-48.7416 243.189 -49.4437 243.236 -49.8567 243.31C-50.8481 243.457 -54.6891 243.365 -51.0956 242.931L-51.6326 228.381C-57.6218 227.679 -52.9135 238.912 -55.6396 237.471C-53.9874 238.349 -53.409 239.559 -56.5069 239.938C-57.1678 240.021 -60.1004 240.058 -59.7699 239.781C-57.2917 237.665 -59.398 235.707 -59.4393 233.628L-59.8526 219.651C-67.4526 219.115 -60.0179 222.081 -64.4787 222.469C-70.1374 222.949 -67.2459 212.843 -67.3698 211.355L-67.7411 206.422L-67.1217 183.697C-62.9086 183.577 -58.82 183.614 -54.0286 183.614C-53.6982 184.639 -55.8871 185.267 -54.8131 186.376C-46.0567 185.849 -40.2328 185.434 -41.5546 183.669L-4.29801 183.752L-3.71964 178.034L67.5719 177.96L68.2736 161.369L100.037 161.092L100.491 155.521L192.931 155.447L193.219 127.798L224.57 127.53C225.85 125.599 225.643 123.9 224.693 122.477L317.959 122.542L317.711 111.465C328.037 111.715 338.074 111.715 350.3 111.484L350.3 85.7099L382.518 85.5343L382.518 29.968L511.304 29.9864L511.304 85.3865C522.663 85.8669 533.485 85.5251 543.728 85.599L543.481 120.334C556.987 120.537 567.313 120.167 575.739 120.509L575.244 184.842L607.296 184.981L607.378 203.66L670.616 203.743L672.144 183.531L703.948 183.411L703.948 120.26C712.787 120.426 721.792 120.472 735.918 120.278L736 120.251Z"
          fill="#F15D59"
          mask="url(#desktop-fusion-terrain-pixels)"
        />
      </svg>
    </div>
  );
}

function FusionPixelMask({
  width,
  height,
  columns,
  rows,
  active,
}: {
  width: number;
  height: number;
  columns: number;
  rows: number;
  active: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const tileWidth = width / columns;
  const tileHeight = height / rows;

  return (
    <>
      {Array.from({ length: columns * rows }, (_, index) => {
        const row = Math.floor(index / columns);
        const column = index % columns;
        const delayRank = rows - row + column * 0.35 + ((index * 7) % 5) * 0.55;
        const x = column * tileWidth;
        const y = row * tileHeight;
        const insetX = tileWidth * 0.425;
        const insetY = tileHeight * 0.425;

        return (
          <motion.rect
            key={index}
            fill="white"
            initial={reduceMotion ? false : {
              opacity: 0,
              x: x + insetX,
              y: y + insetY,
              width: tileWidth * 0.15,
              height: tileHeight * 0.15,
            }}
            animate={{
              opacity: active || reduceMotion ? 1 : 0,
              x: active || reduceMotion ? x : x + insetX,
              y: active || reduceMotion ? y : y + insetY,
              width: active || reduceMotion ? tileWidth + 1 : tileWidth * 0.15,
              height: active || reduceMotion ? tileHeight + 1 : tileHeight * 0.15,
            }}
            transition={{
              delay: active && !reduceMotion ? delayRank * 0.065 : 0,
              duration: reduceMotion ? 0 : active ? 0.45 : 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        );
      })}
    </>
  );
}

function CharacterReveal({
  active,
  className,
  delay,
  segments,
}: {
  active: boolean;
  className: string;
  delay: number;
  segments: Array<{ text: string; className?: string }>;
}) {
  const reduceMotion = useReducedMotion();
  let characterIndex = 0;

  return (
    <motion.h2
      className={className}
      initial="hidden"
      animate={active || reduceMotion ? "visible" : "hidden"}
    >
      {segments.map((segment, segmentIndex) =>
        segment.text.split(/(\s+)/).map((word, wordIndex) => {
          if (/^\s+$/.test(word)) return " ";

          return (
            <span
              key={`${segmentIndex}-${wordIndex}`}
              className={`inline-block whitespace-nowrap ${segment.className ?? ""}`}
            >
              {Array.from(word).map((character) => {
                const index = characterIndex++;

                return (
                  <span key={index} className="inline-block overflow-hidden align-bottom">
                    <motion.span
                      className="inline-block"
                      variants={{
                        hidden: { opacity: 0, y: "110%" },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: {
                            delay: reduceMotion ? 0 : delay + index * 0.012,
                            duration: reduceMotion ? 0 : 0.48,
                            ease: [0.22, 1, 0.36, 1],
                          },
                        },
                      }}
                    >
                      {character}
                    </motion.span>
                  </span>
                );
              })}
            </span>
          );
        }),
      )}
    </motion.h2>
  );
}
