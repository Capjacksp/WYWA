export function RadioGlitchFilter() {
  const horizontalNoiseMatrix =
    "1 0 0 0 0  0 0 0 0 0.5  0 0 0 0 0  0 0 0 1 0";

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute h-0 w-0"
      focusable="false"
    >
      <defs>
        <filter
          id="hero-radio-glitch-filter"
          x="-38%"
          y="-12%"
          width="176%"
          height="124%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.006 0.78"
            numOctaves="1"
            seed="8"
            result="radioNoise"
          />
          <feColorMatrix
            in="radioNoise"
            type="matrix"
            values={horizontalNoiseMatrix}
            result="horizontalNoise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="horizontalNoise"
            scale="0"
            xChannelSelector="R"
            yChannelSelector="G"
            result="distortedText"
          >
            <animate
              attributeName="scale"
              dur="6.8s"
              calcMode="linear"
              keyTimes="0;0.12;0.135;0.16;0.18;0.21;0.34;0.355;0.38;0.4;0.43;0.58;0.595;0.62;0.64;0.67;0.7;0.84;0.855;0.88;0.9;0.93;1"
              values="0;0;19;8;24;0;0;15;5;20;0;0;28;11;23;7;0;0;18;6;25;0;0"
              repeatCount="indefinite"
            />
          </feDisplacementMap>
        </filter>

        <filter
          id="hero-radio-glitch-filter-static"
          x="-38%"
          y="-12%"
          width="176%"
          height="124%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.006 0.78"
            numOctaves="1"
            seed="8"
            result="radioNoise"
          />
          <feColorMatrix
            in="radioNoise"
            type="matrix"
            values={horizontalNoiseMatrix}
            result="horizontalNoise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="horizontalNoise"
            scale="0"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
