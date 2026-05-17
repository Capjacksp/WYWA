import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop - Resets the window scroll position to (0,0) whenever the route changes.
 * This is essential for SPAs to ensure users start at the top of a new page.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
