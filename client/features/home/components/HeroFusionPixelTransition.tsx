import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import HomeHero from "@/features/home/components/HomeHero";
import { FusionSection } from "@/features/home/components/HomeSections";

const PIXEL_COLUMNS = 10;
const PIXEL_ROWS = 6;
const PIXEL_COUNT = PIXEL_COLUMNS * PIXEL_ROWS;
const FILL_DURATION_MS = 800;
const TOTAL_DURATION_MS = 2000;

type TransitionPhase =
  | "hero"
  | "forward-filling"
  | "forward-revealing"
  | "fusion"
  | "reverse-filling"
  | "reverse-revealing";

function shuffledPixelOrder(count: number, initialSeed: number) {
  const order = Array.from({ length: count }, (_, index) => index);
  let seed = initialSeed;

  for (let index = count - 1; index > 0; index -= 1) {
    seed = (seed * 16807) % 2147483647;
    const swapIndex = seed % (index + 1);
    [order[index], order[swapIndex]] = [order[swapIndex], order[index]];
  }

  return order;
}

function pixelRanks(order: number[]) {
  return order.reduce<number[]>((ranks, pixelIndex, rank) => {
    ranks[pixelIndex] = rank;
    return ranks;
  }, []);
}

const FILL_RANKS = pixelRanks(shuffledPixelOrder(PIXEL_COUNT, 48271));
const REVEAL_RANKS = pixelRanks(shuffledPixelOrder(PIXEL_COUNT, 91573));

export default function HeroFusionPixelTransition() {
  const sceneRef = useRef<HTMLElement>(null);
  const lastScrollYRef = useRef(0);
  const isMobile = useIsMobile();
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<TransitionPhase>("hero");

  const startForwardTransition = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    lastScrollYRef.current = 0;
    setPhase((currentPhase) =>
      currentPhase === "hero" ? "forward-filling" : currentPhase,
    );
  }, []);

  const startReverseTransition = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    lastScrollYRef.current = 0;
    setPhase((currentPhase) =>
      currentPhase === "fusion" ? "reverse-filling" : currentPhase,
    );
  }, []);

  useEffect(() => {
    if (isMobile || reduceMotion || (phase !== "hero" && phase !== "fusion")) return;
    lastScrollYRef.current = window.scrollY;

    const handleWheel = (event: WheelEvent) => {
      const atPageTop = window.scrollY <= 2;
      if (!atPageTop) return;

      const movingForward = phase === "hero" && event.deltaY > 2;
      const movingBackward = phase === "fusion" && event.deltaY < -2;
      if (!movingForward && !movingBackward) return;

      event.preventDefault();
      if (movingForward) startForwardTransition();
      if (movingBackward) startReverseTransition();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const atPageTop = window.scrollY <= 2;
      if (!atPageTop) return;

      const movingForward = phase === "hero" && ["ArrowDown", "PageDown", " "].includes(event.key);
      const movingBackward = phase === "fusion" && ["ArrowUp", "PageUp"].includes(event.key);
      if (!movingForward && !movingBackward) return;

      event.preventDefault();
      if (movingForward) startForwardTransition();
      if (movingBackward) startReverseTransition();
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const previousScrollY = lastScrollYRef.current;
      lastScrollYRef.current = currentScrollY;

      if (phase === "hero" && currentScrollY > 2) {
        startForwardTransition();
        return;
      }

      if (
        phase === "fusion" &&
        currentScrollY <= 2 &&
        previousScrollY > 2
      ) {
        startReverseTransition();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobile, phase, reduceMotion, startForwardTransition, startReverseTransition]);

  useEffect(() => {
    if (phase !== "forward-filling" && phase !== "reverse-filling") return;

    const revealTimer = window.setTimeout(() => {
      setPhase((currentPhase) =>
        currentPhase === "forward-filling"
          ? "forward-revealing"
          : "reverse-revealing",
      );
    }, FILL_DURATION_MS);
    return () => {
      window.clearTimeout(revealTimer);
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "forward-revealing" && phase !== "reverse-revealing") return;

    const completeTimer = window.setTimeout(() => {
      setPhase((currentPhase) =>
        currentPhase === "forward-revealing" ? "fusion" : "hero",
      );
    }, TOTAL_DURATION_MS - FILL_DURATION_MS);

    return () => window.clearTimeout(completeTimer);
  }, [phase]);

  useEffect(() => {
    const animationFrame = window.requestAnimationFrame(() => {
      window.dispatchEvent(new Event("header-class-change"));
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, [phase]);

  useEffect(() => {
    const transitionIsActive =
      phase === "forward-filling" ||
      phase === "forward-revealing" ||
      phase === "reverse-filling" ||
      phase === "reverse-revealing";
    if (!transitionIsActive) return;

    const body = document.body;
    const previousBodyTouchAction = body.style.touchAction;

    window.scrollTo({ top: 0, behavior: "auto" });
    body.style.touchAction = "none";

    const preventScroll = (event: Event) => event.preventDefault();
    const preventScrollKeys = (event: KeyboardEvent) => {
      if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(event.key)) {
        event.preventDefault();
      }
    };
    const holdAtTop = () => {
      if (window.scrollY !== 0) {
        window.scrollTo({ top: 0, behavior: "auto" });
      }
    };

    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });
    window.addEventListener("keydown", preventScrollKeys);
    window.addEventListener("scroll", holdAtTop, { passive: true });

    return () => {
      body.style.touchAction = previousBodyTouchAction;
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("keydown", preventScrollKeys);
      window.removeEventListener("scroll", holdAtTop);
      window.scrollTo({ top: 0, behavior: "auto" });
      lastScrollYRef.current = 0;
    };
  }, [phase]);

  if (isMobile || reduceMotion) {
    return (
      <>
        <HomeHero />
        <FusionSection />
      </>
    );
  }

  return (
    <section
      ref={sceneRef}
      data-header-class={
        phase === "forward-revealing" ||
        phase === "fusion" ||
        phase === "reverse-filling"
          ? "header-dark"
          : ""
      }
      className="relative -mt-16"
    >
      <div className="relative z-0">
        <FusionSection />
      </div>

      <motion.div
        className="absolute inset-x-0 top-0 z-20 h-screen overflow-hidden"
        animate={{
          opacity:
            phase === "hero" ||
            phase === "forward-filling" ||
            phase === "reverse-revealing"
              ? 1
              : 0,
        }}
        transition={{ duration: 0.01 }}
        aria-hidden={
          phase === "forward-revealing" ||
          phase === "fusion" ||
          phase === "reverse-filling"
        }
      >
        <HomeHero embedded trackHeader={false} />
      </motion.div>

      {phase !== "hero" && phase !== "fusion" && <PixelField phase={phase} />}
    </section>
  );
}

function PixelField({ phase }: { phase: TransitionPhase }) {
  const tiles = useMemo(
    () => Array.from({ length: PIXEL_COUNT }, (_, pixelIndex) => pixelIndex),
    [],
  );

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 z-30 grid h-screen overflow-hidden"
      style={{
        gridTemplateColumns: `repeat(${PIXEL_COLUMNS}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${PIXEL_ROWS}, minmax(0, 1fr))`,
      }}
    >
      {tiles.map((pixelIndex) => (
        <Pixel key={pixelIndex} phase={phase} pixelIndex={pixelIndex} />
      ))}
    </div>
  );
}

function Pixel({
  phase,
  pixelIndex,
}: {
  phase: TransitionPhase;
  pixelIndex: number;
}) {
  const fillDelay = (FILL_RANKS[pixelIndex] / PIXEL_COUNT) * 0.68;
  const revealDelay = (REVEAL_RANKS[pixelIndex] / PIXEL_COUNT) * 1.12;
  const isFilling =
    phase === "forward-filling" || phase === "reverse-filling";
  const isRevealing =
    phase === "forward-revealing" || phase === "reverse-revealing";

  return (
    <motion.div
      className="bg-[#F15D59]"
      initial={{ opacity: 0 }}
      animate={{
        opacity: isFilling ? 1 : 0,
      }}
      transition={
        isFilling
          ? { delay: fillDelay, duration: 0.01 }
          : isRevealing
            ? { delay: revealDelay, duration: 0.01 }
            : { duration: 0 }
      }
    />
  );
}
