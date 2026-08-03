import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop - Resets the window scroll position to (0,0) whenever the route changes.
 * This is essential for SPAs to ensure users start at the top of a new page.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const animationFrame = window.requestAnimationFrame(() => {
      if (hash) {
        const target = document.getElementById(hash.slice(1));

        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
      }

      window.scrollTo(0, 0);
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, [pathname, hash]);

  return null;
}
