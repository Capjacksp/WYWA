import {
  useEffect,
  useRef,
  useState,
  type VideoHTMLAttributes,
} from "react";

interface LazyVideoProps
  extends Omit<VideoHTMLAttributes<HTMLVideoElement>, "autoPlay" | "src"> {
  src: string;
  playWhenVisible?: boolean;
  rootMargin?: string;
}

export function LazyVideo({
  src,
  playWhenVisible = false,
  rootMargin = "400px 0px",
  preload = "metadata",
  ...props
}: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          setShouldLoad(true);
        }
      },
      { rootMargin },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [rootMargin]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad || !playWhenVisible) return;

    if (isVisible) {
      void video.play().catch(() => undefined);
      return;
    }

    video.pause();
  }, [isVisible, playWhenVisible, shouldLoad]);

  return (
    <video
      ref={videoRef}
      src={shouldLoad ? src : undefined}
      preload={shouldLoad ? preload : "none"}
      {...props}
    />
  );
}
