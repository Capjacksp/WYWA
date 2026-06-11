import { useEffect, useState } from "react";

type PeriodicAnimationOptions = {
  activeDuration?: number;
  pauseDuration?: number;
  resetKey?: string;
};

export function usePeriodicAnimation({
  activeDuration = 4000,
  pauseDuration = 3500,
  resetKey,
}: PeriodicAnimationOptions = {}) {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    let timeoutId = 0;
    let isDisposed = false;

    const startCycle = () => {
      if (isDisposed) return;

      setIsAnimating(true);
      timeoutId = window.setTimeout(() => {
        setIsAnimating(false);
        timeoutId = window.setTimeout(startCycle, pauseDuration);
      }, activeDuration);
    };

    startCycle();

    return () => {
      isDisposed = true;
      window.clearTimeout(timeoutId);
    };
  }, [activeDuration, pauseDuration, resetKey]);

  return isAnimating;
}
