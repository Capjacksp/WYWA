import { useEffect, useState } from "react";

const COMPACT_VIDEO_QUERY =
  "(max-width: 767px), (pointer: coarse) and (max-width: 1024px)";

type ResponsiveVideoSources = {
  desktop: string;
  mobile: string;
};

export function useResponsiveVideoSource({
  desktop,
  mobile,
}: ResponsiveVideoSources) {
  const [source, setSource] = useState(() =>
    typeof window !== "undefined" && window.matchMedia(COMPACT_VIDEO_QUERY).matches
      ? mobile
      : desktop,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(COMPACT_VIDEO_QUERY);
    const updateSource = () => setSource(mediaQuery.matches ? mobile : desktop);

    updateSource();
    mediaQuery.addEventListener("change", updateSource);

    return () => mediaQuery.removeEventListener("change", updateSource);
  }, [desktop, mobile]);

  return source;
}
