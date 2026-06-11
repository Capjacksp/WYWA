import { Button } from "@/components/common/Button";
import { LoadTextLines } from "@/components/ui/scroll-text-lines";
import { motion } from "framer-motion";

const HERO_TEXT_MOTION = {
  duration: 1.3,
  stagger: 0.16,
  distance: 110,
} as const;

function HomeHero() {
  return (
    <section
      data-header-class=""
      className="relative h-screen w-full overflow-hidden p-0 -mt-16 max-md:flex max-md:h-auto max-md:min-h-screen max-md:flex-col max-md:bg-bg-dark min-md:h-screen"
    >
      <HeroImagePanel />
      <DesktopContentPanel />
      <DesktopHeroTitle />
      <MobileHeroContent />
    </section>
  );
}

function HeroImagePanel() {
  return (
    <div className="absolute inset-0 w-[70%] max-lg:w-full max-md:relative max-md:h-[578px] max-md:shrink-0">
      <img
        src="/images/home-img.png"
        alt="Aerial view of forests and farmland"
        className="h-full w-full object-cover max-md:object-[55%_top]"
      />
      <div className="absolute inset-0 bg-black/40 max-md:bg-black/45" />
      <DesktopGeometryOverlay />
      <MobileGeometryOverlay />
    </div>
  );
}

function DesktopContentPanel() {
  return (
    <div className="absolute right-0 top-0 flex h-full w-[30%] flex-col justify-end bg-bg-dark p-10 max-lg:hidden">
      <div className="mb-12">
        <LoadTextLines
          as="h2"
          className="font-heading text-[28px] font-[300] leading-[1] text-white"
          delay={0.38}
          {...HERO_TEXT_MOTION}
          lines={[
            "SYSTEMS THAT",
            "DETECT WILDFIRES",
            "BEFORE THEY",
            "BECOME VISIBLE",
          ]}
        />

        <motion.div
          initial={{ opacity: 0, x: 160 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 1.1,
            delay: 1.05,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Button variant="primary" className="mt-6">
            <a href="#book-demo">BOOK A DEMO</a>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

function DesktopHeroTitle() {
  return (
    <div className="absolute left-[50px] top-[20%] z-10 max-md:hidden max-lg:top-[40%]">
      <LoadTextLines
        as="h1"
        className="font-heading text-h1"
        style={{ fontWeight: 350 }}
        delay={0.12}
        {...HERO_TEXT_MOTION}
        lines={[
          <span className="text-white">BUILDING NATURE&rsquo;S</span>,
          <span className="text-cta">SIXTH SENSE</span>,
        ]}
      />
    </div>
  );
}

function MobileHeroContent() {
  return (
    <>
      <div className="absolute left-[27px] right-5 top-[104px] z-10 hidden max-md:block">
        <h1 className="font-heading text-[42px] font-[350] uppercase leading-[0.94] tracking-normal text-white min-[390px]:text-[42px]">
          Building
          <br />
          Nature&rsquo;s
          <br />
          <span className="text-cta">Sixth Sense</span>
        </h1>
      </div>

      <div className="relative z-10 hidden min-h-[max(266px,calc(100svh-578px))] flex-1 bg-bg-dark px-[26px] pb-8 pt-12 max-md:block">
        <h2 className="max-w-[340px] font-heading text-[28px] font-[350] uppercase leading-[0.91] tracking-normal text-white">
          Systems that
          <br />
          detect wildfires
          <br />
          before they
          <br />
          become visible
        </h2>

        <Button
          variant="primary"
          className="mt-7 h-[30px] px-[18px] py-0 font-figtree text-[14px] font-[600] leading-none tracking-[0.22em]"
        >
          <a href="#book-demo">BOOK A DEMO</a>
        </Button>
      </div>
    </>
  );
}

function DesktopGeometryOverlay() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full max-md:hidden"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
    >
      <line x1="0" y1="50%" x2="3%" y2="50%" stroke="white" strokeWidth="0.15" />
      <line x1="0" y1="12.5%" x2="3%" y2="12.5%" stroke="white" strokeWidth="0.15" />
      <line x1="0" y1="25%" x2="3%" y2="25%" stroke="white" strokeWidth="0.15" />
      <line x1="0" y1="37.5%" x2="100%" y2="37.5%" stroke="white" strokeWidth="0.15" />
      <line x1="0" y1="62.5%" x2="3%" y2="62.5%" stroke="white" strokeWidth="0.15" />
      <line x1="3%" y1="66%" x2="100%" y2="66%" stroke="white" strokeWidth="0.15" />
      <line x1="0" y1="75%" x2="3%" y2="75%" stroke="white" strokeWidth="0.15" />
      <line x1="0" y1="87.5%" x2="3%" y2="87.5%" stroke="white" strokeWidth="0.15" />
      <line x1="3%" y1="82.5%" x2="30%" y2="82.5%" stroke="white" strokeWidth="0.15" />
      <line x1="57%" y1="37.5%" x2="57%" y2="100%" stroke="white" strokeWidth="0.15" />
      <line x1="3%" y1="0" x2="3%" y2="100%" stroke="white" strokeWidth="0.15" />
      <line x1="30%" y1="66%" x2="30%" y2="100%" stroke="white" strokeWidth="0.15" />
      <line x1="16%" y1="66%" x2="16%" y2="100%" stroke="white" strokeWidth="0.15" />
      <path
        d="M 70 37.5 A 9.1 10 0 0 0 70 66"
        fill="none"
        stroke="white"
        strokeWidth="0.15"
        transform="rotate(180 57 51.75)"
      />
      <path
        d="M 70 66 A 16 18 0 0 0 70 100"
        fill="none"
        stroke="white"
        strokeWidth="0.15"
        transform="translate(-2.3 0)"
      />
    </svg>
  );
}

function MobileGeometryOverlay() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 hidden h-full w-full max-md:block"
      viewBox="0 0 390 578"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g stroke="white" strokeOpacity="0.92" strokeWidth="1">
        <line x1="19" y1="0" x2="19" y2="578" />
        <line x1="0" y1="18" x2="19" y2="18" />
        <line x1="0" y1="90" x2="19" y2="90" />
        <line x1="0" y1="161" x2="19" y2="161" />
        <line x1="0" y1="232" x2="390" y2="232" />
        <line x1="0" y1="303" x2="19" y2="303" />
        <line x1="0" y1="374" x2="19" y2="374" />
        <line x1="0" y1="445" x2="19" y2="445" />
        <line x1="19" y1="488" x2="204" y2="488" />
        <line x1="0" y1="530" x2="19" y2="530" />
        <line x1="112" y1="396" x2="112" y2="578" />
        <line x1="204" y1="396" x2="204" y2="578" />
        <line x1="19" y1="396" x2="390" y2="396" />
        <path d="M204 232H306C352.4 232 390 268.7 390 314C390 359.3 352.4 396 306 396H19" />
      </g>
    </svg>
  );
}

export default HomeHero;
