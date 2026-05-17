import { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import ConnectPopup from "@/components/common/ConnectPopup";

interface PageLayoutProps {
  children: React.ReactNode;
  headerClassName?: string;
}

/**
 * Top-level page wrapper.
 * Every page should be wrapped in <PageLayout> to get:
 * - Sticky Header with nav
 * - Connect popup (controlled from here)
 * - Footer
 */
export default function PageLayout({ children, headerClassName }: PageLayoutProps) {
  const [connectOpen, setConnectOpen] = useState(false);
  const [dynamicHeaderClass, setDynamicHeaderClass] = useState(headerClassName || "");

  useEffect(() => {
    const headerWatchY = 64;
    let animationFrame = 0;

    const updateHeaderClass = () => {
      animationFrame = 0;

      const trackedElements = Array.from(
        document.querySelectorAll<HTMLElement>("[data-header-class]"),
      );

      if (trackedElements.length === 0) {
        setDynamicHeaderClass(headerClassName || "");
        return;
      }

      const activeElement = trackedElements.find((element) => {
        const rect = element.getBoundingClientRect();
        return rect.top <= headerWatchY && rect.bottom > headerWatchY;
      });

      setDynamicHeaderClass(
        activeElement?.getAttribute("data-header-class") ?? headerClassName ?? "",
      );
    };

    const requestUpdate = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(updateHeaderClass);
    };

    updateHeaderClass();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [children, headerClassName]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        onConnectClick={() => setConnectOpen(true)}
        className={dynamicHeaderClass}
      />

      <main className="flex-1 p-0 m-0 relative">{children}</main>

      <Footer />

      <ConnectPopup open={connectOpen} onOpenChange={setConnectOpen} />
    </div>
  );
}
