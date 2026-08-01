import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";

interface UseScrollStepNavigationOptions {
  itemCount: number;
  sectionRef: RefObject<HTMLElement>;
  targetProgressEnd?: number;
  getActiveIndexForProgress?: (sectionProgress: number) => number;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function useScrollStepNavigation({
  itemCount,
  sectionRef,
  targetProgressEnd = 1,
  getActiveIndexForProgress,
}: UseScrollStepNavigationOptions) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const scrollTargetRef = useRef<{ index: number; y: number } | null>(null);
  const scrollSettledTimeoutRef = useRef<number | null>(null);
  const scrollAnimationFrameRef = useRef<number | null>(null);
  const hasMultipleItems = itemCount > 1;

  const setActiveIndexWithDirection = useCallback((nextIndex: number) => {
    setActiveIndex((previous) => {
      if (previous !== nextIndex) {
        setDirection(nextIndex > previous ? 1 : -1);
      }

      return nextIndex;
    });
  }, []);

  const getScrollMetrics = useCallback(() => {
    const section = sectionRef.current;
    if (!section || itemCount === 0) return null;

    const scrollDistance = Math.max(
      1,
      section.offsetHeight - window.innerHeight,
    );
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const sectionProgress = clamp(
      (window.scrollY - sectionTop) / scrollDistance,
      0,
      1,
    );

    return {
      scrollDistance,
      sectionProgress,
      sectionTop,
    };
  }, [itemCount, sectionRef]);

  const getIndexFromProgress = useCallback(
    (sectionProgress: number) => {
      if (getActiveIndexForProgress) {
        return clamp(
          getActiveIndexForProgress(sectionProgress),
          0,
          itemCount - 1,
        );
      }

      const normalizedProgress = clamp(
        sectionProgress / targetProgressEnd,
        0,
        1,
      );
      return clamp(
        Math.round(normalizedProgress * (itemCount - 1)),
        0,
        itemCount - 1,
      );
    },
    [getActiveIndexForProgress, itemCount, targetProgressEnd],
  );

  const cancelScrollAnimation = useCallback(() => {
    if (scrollAnimationFrameRef.current !== null) {
      window.cancelAnimationFrame(scrollAnimationFrameRef.current);
      scrollAnimationFrameRef.current = null;
    }
  }, []);

  const clearScrollTarget = useCallback(() => {
    scrollTargetRef.current = null;
    cancelScrollAnimation();

    if (scrollSettledTimeoutRef.current !== null) {
      window.clearTimeout(scrollSettledTimeoutRef.current);
      scrollSettledTimeoutRef.current = null;
    }
  }, [cancelScrollAnimation]);

  const syncActiveIndexFromScroll = useCallback(() => {
    if (!hasMultipleItems) return;

    const target = scrollTargetRef.current;
    if (target !== null) {
      if (Math.abs(window.scrollY - target.y) > 2) {
        return;
      }

      clearScrollTarget();
    }

    const metrics = getScrollMetrics();
    if (!metrics) return;

    setActiveIndexWithDirection(getIndexFromProgress(metrics.sectionProgress));
  }, [
    clearScrollTarget,
    getIndexFromProgress,
    getScrollMetrics,
    hasMultipleItems,
    setActiveIndexWithDirection,
  ]);

  useEffect(() => {
    setActiveIndex(0);
    setDirection(1);
    clearScrollTarget();
    syncActiveIndexFromScroll();
  }, [clearScrollTarget, itemCount, syncActiveIndexFromScroll]);

  useEffect(() => clearScrollTarget, [clearScrollTarget]);

  useEffect(() => {
    if (!hasMultipleItems) return;

    let animationFrame = 0;
    const queueSync = () => {
      if (animationFrame !== 0) {
        window.cancelAnimationFrame(animationFrame);
      }

      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = 0;
        syncActiveIndexFromScroll();
      });
    };

    window.addEventListener("scroll", queueSync, { passive: true });
    window.addEventListener("resize", queueSync);
    queueSync();

    return () => {
      window.removeEventListener("scroll", queueSync);
      window.removeEventListener("resize", queueSync);

      if (animationFrame !== 0) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, [hasMultipleItems, syncActiveIndexFromScroll]);

  useEffect(() => {
    const cancelProgrammaticTarget = () => {
      clearScrollTarget();
      syncActiveIndexFromScroll();
    };

    window.addEventListener("wheel", cancelProgrammaticTarget, {
      passive: true,
    });
    window.addEventListener("touchstart", cancelProgrammaticTarget, {
      passive: true,
    });
    window.addEventListener("keydown", cancelProgrammaticTarget);

    return () => {
      window.removeEventListener("wheel", cancelProgrammaticTarget);
      window.removeEventListener("touchstart", cancelProgrammaticTarget);
      window.removeEventListener("keydown", cancelProgrammaticTarget);
    };
  }, [clearScrollTarget, syncActiveIndexFromScroll]);

  const animateWindowScroll = useCallback(
    (targetY: number) => {
      cancelScrollAnimation();

      const startY = window.scrollY;
      const distance = targetY - startY;

      if (Math.abs(distance) <= 2) {
        window.scrollTo(0, targetY);
        return;
      }

      const duration = Math.min(900, Math.max(380, Math.abs(distance) * 0.35));
      const startedAt = window.performance.now();
      const easeOutCubic = (progress: number) => 1 - Math.pow(1 - progress, 3);

      const step = (timestamp: number) => {
        const elapsed = timestamp - startedAt;
        const progress = Math.min(1, elapsed / duration);

        window.scrollTo(0, startY + distance * easeOutCubic(progress));

        if (progress < 1 && scrollTargetRef.current?.y === targetY) {
          scrollAnimationFrameRef.current = window.requestAnimationFrame(step);
          return;
        }

        scrollAnimationFrameRef.current = null;
        window.scrollTo(0, targetY);

        if (scrollTargetRef.current?.y === targetY) {
          scrollTargetRef.current = null;
        }

        if (scrollSettledTimeoutRef.current !== null) {
          window.clearTimeout(scrollSettledTimeoutRef.current);
          scrollSettledTimeoutRef.current = null;
        }
      };

      scrollAnimationFrameRef.current = window.requestAnimationFrame(step);
    },
    [cancelScrollAnimation],
  );

  const scrollToIndex = useCallback(
    (index: number) => {
      const metrics = getScrollMetrics();
      if (!metrics) return;

      const nextIndex = clamp(index, 0, itemCount - 1);
      const targetProgress =
        itemCount > 1 ? (nextIndex / (itemCount - 1)) * targetProgressEnd : 0;
      const maxScrollY = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      const targetY = clamp(
        metrics.sectionTop + metrics.scrollDistance * targetProgress,
        0,
        maxScrollY,
      );

      setDirection(nextIndex > activeIndex ? 1 : -1);
      setActiveIndex(nextIndex);
      clearScrollTarget();
      scrollTargetRef.current = { index: nextIndex, y: targetY };

      scrollSettledTimeoutRef.current = window.setTimeout(() => {
        clearScrollTarget();
        syncActiveIndexFromScroll();
      }, 2500);

      animateWindowScroll(targetY);
    },
    [
      activeIndex,
      animateWindowScroll,
      clearScrollTarget,
      getScrollMetrics,
      itemCount,
      syncActiveIndexFromScroll,
      targetProgressEnd,
    ],
  );

  return {
    activeIndex,
    direction,
    hasMultipleItems,
    isFirstItem: activeIndex === 0,
    isLastItem: activeIndex === itemCount - 1,
    scrollToIndex,
  };
}
