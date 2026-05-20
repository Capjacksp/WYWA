import {
  LoadTextLines,
  ScrollTextLines,
} from "@/components/ui/scroll-text-lines";

export function TechnologyHero() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden  bg-[#242425] -mt-16 px-[50px] pb-20 pt-32 text-white max-md:px-5 max-md:pt-10">

      <div className="relative z-10 max-w-[1340px]">
        <LoadTextLines
          as="h1"
          className="max-w-[1200px] font-body font-normal text-display uppercase tracking-normal"
          lines={["Most wildfire detection systems depend on a single sense."]}
        />
        <div className="mt-20 grid max-w-[600px] gap-14 max-md:mt-12 max-md:gap-10">
          <div>
            <svg
              className="mb-5 h-16 w-20 text-cta"
              viewBox="0 0 93 58"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M46.5 4C25.5 4 8 29 8 29s17.5 25 38.5 25S85 29 85 29 67.5 4 46.5 4Z"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              <circle
                cx="46.5"
                cy="29"
                r="12"
                stroke="currentColor"
                strokeWidth="3"
              />
            </svg>
            <LoadTextLines
              as="p"
              className="font-figtree font-normal text-h3 leading-snug"
              delay={0.1}
              lines={[
                "Satellites and ground cameras watch for heat or smoke.",
                "But satellites can take 15-45 minutes to confirm thermal signatures, while ground cameras must wait for visible smoke.",
                "Fog, dust, glare, and reflections often mimic smoke or flame, leading to unreliable alerts.",
              ]}
            />
          </div>

          <div>
            <svg className="mb-5 h-16 w-20 text-cta" width="61" height="72" viewBox="0 0 61 72" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M49.5165 66.88C46.6665 67.37 43.9665 66.92 41.3765 65.62C37.7465 70.53 31.6065 72.51 25.7265 70.7C22.9165 69.83 20.6065 68.06 18.7465 65.63C11.6265 69.29 3.00652 65.75 0.636518 58.29C-1.26348 52.32 1.19652 46.04 6.59652 43.04C8.60652 41.92 9.69652 40.15 10.3565 37.97L19.2965 8.30998C20.4265 4.56998 22.9065 1.54998 26.7565 0.469981C29.7865 -0.380019 33.0965 -0.110019 35.7965 1.52998C37.5365 2.57998 39.2065 4.29998 39.9665 6.12998C41.0865 8.82998 41.7665 11.52 42.6165 14.34L49.8065 38.11C50.4665 40.3 51.6165 42 53.6365 43.12C56.4765 44.71 58.5765 47.33 59.5265 50.43C61.7965 57.83 57.2065 65.56 49.5165 66.89V66.88ZM19.0965 60.62C20.4465 65.65 25.1865 68.94 30.1865 68.88C35.1465 68.82 39.7865 65.49 41.0265 60.55C41.5765 58.37 42.9165 56.42 45.3565 56.19C46.8365 56.05 48.4365 56.16 49.9365 56.19C50.6065 56.19 50.9165 56.96 50.8965 57.45C50.8765 58.03 50.4665 58.6 49.8065 58.61L45.9965 58.66C45.0065 58.67 44.0765 59.27 43.8065 60.25C43.5065 61.32 43.1465 62.31 42.6965 63.41C47.0065 65.69 52.0265 64.6 55.1265 60.98C57.8865 57.77 58.3965 53.29 56.4065 49.48C55.4365 47.62 53.8765 46.15 52.0465 45.1C49.9065 43.88 48.3965 41.96 47.6565 39.54L38.0665 8.14998C36.8865 4.28998 33.0365 2.13998 29.1365 2.54998C25.9865 2.87998 23.0365 4.86998 22.0865 7.99998L12.4565 39.54C11.7265 41.94 10.1865 43.88 8.06652 45.1C2.97652 48.03 0.956518 53.85 3.71652 59.07C6.31652 63.99 12.3365 66.08 17.4165 63.42C16.9965 62.38 16.6365 61.5 16.3965 60.5C16.1365 59.4 15.2365 58.67 14.1065 58.65L10.1665 58.58C9.50652 58.57 9.17652 57.88 9.20652 57.31C9.22652 56.87 9.54652 56.18 10.1765 56.18C11.7365 56.18 13.3765 56.02 14.9065 56.21C17.2365 56.5 18.5065 58.44 19.0965 60.63V60.62Z"
                fill="#90E8FF"
              />
            </svg>

            <LoadTextLines
              as="p"
              className="font-figtree font-normal text-h3 leading-snug"
              delay={0.18}
              lines={[
                "Other systems monitor gases released during combustion, detecting chemical traces in the air.",
                "But isolated signals often create noise and false alarms without additional verification.",
              ]}
            />
          </div>
        </div>

        <ScrollTextLines
          as="p"
          className="mt-20 max-w-[1280px] font-body font-normal text-display font-light uppercase tracking-normal text-cta max-md:mt-14"
          lines={[
            "The result",
            "is a 20-60 minute",
            "blind spot after ignition.",
          ]}
        />
      </div>

      <img
        src="/images/earth.png"
        alt=""
        className="pointer-events-none absolute right-[0vw] top-[21vh] w-[52vw] min-w-[350px] max-w-[600px] opacity-95 max-lg:right-[-28vw] max-md:top-[56vh] max-md:w-[105vw] max-md:min-w-0 max-md:opacity-40"
      />
    </section>
  );
}
