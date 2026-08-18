import { Link } from "react-router-dom";
import Logo from "@/components/common/Logo";
import Menu from "./Menu";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onConnectClick: () => void;
  className?: string;
}

export default function Header({ onConnectClick, className }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const shouldRestoreScrollRef = useRef(true);

  const isDark = className?.includes("header-dark") && !isMenuOpen;
  const logoColor = isDark ? "#242425" : "#FFFFFF";
  const barBg = isDark ? "bg-bg-dark" : "bg-white";

  useEffect(() => {
    if (!isMenuOpen) return;

    const scrollY = window.scrollY;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    const { body, documentElement } = document;
    const previousStyles = {
      htmlOverflow: documentElement.style.overflow,
      bodyPaddingRight: body.style.paddingRight,
    };

    documentElement.style.overflow = "hidden";

    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      documentElement.style.overflow = previousStyles.htmlOverflow;
      body.style.paddingRight = previousStyles.bodyPaddingRight;

      // Keep the current position when simply closing the overlay, but do not
      // overwrite the route scroll handling after a menu navigation.
      if (shouldRestoreScrollRef.current) {
        window.scrollTo(0, scrollY);
      }
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    if (isMenuOpen) {
      shouldRestoreScrollRef.current = true;
      setIsMenuOpen(false);
      return;
    }

    shouldRestoreScrollRef.current = true;
    setIsMenuOpen(true);
  };

  const closeMenu = (shouldRestoreScroll = true) => {
    shouldRestoreScrollRef.current = shouldRestoreScroll;
    setIsMenuOpen(false);
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-[1010] w-full backdrop-blur-[4px] transition-colors duration-300",
          isMenuOpen && "bg-transparent backdrop-blur-none",
          className
        )}
      >
        <div className="mx-auto px-[20px] max-md:px-4">
          <div>
            <div className="flex items-center justify-between h-16 px-8 max-md:px-4">
              {/* Logo */}
              <Link
                to="/"
                className="relative z-50"
                onClick={() => closeMenu(false)}
              >
                <Logo
                  width={100}
                  color={logoColor}
                />
              </Link>

              {/* Hamburger / X toggle button */}
              <button
                className="relative z-50 w-10 h-16 flex items-center justify-center cursor-pointer"
                onClick={toggleMenu}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
              >
                {/*
                Three bars that morph into an X.
                - Top bar: rotates +45° and moves down to center
                - Middle bar: fades out
                - Bottom bar: rotates -45° and moves up to center
              */}
                <div className="relative w-6 h-4">
                  <span
                    className={cn(
                      "absolute left-0 w-full h-[2px] transition-all duration-300 ease-in-out",
                      isMenuOpen ? "bg-white" : barBg
                    )}
                    style={{
                      top: isMenuOpen ? "50%" : "0",
                      transform: isMenuOpen
                        ? "translateY(-50%) rotate(45deg)"
                        : "translateY(0) rotate(0deg)",
                    }}
                  />
                  <span
                    className={cn(
                      "absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] transition-all duration-300 ease-in-out",
                      isMenuOpen
                        ? "bg-white opacity-0 scale-x-0"
                        : cn(barBg, "opacity-100 scale-x-100")
                    )}
                  />
                  <span
                    className={cn(
                      "absolute left-0 w-full h-[2px] transition-all duration-300 ease-in-out",
                      isMenuOpen ? "bg-white" : barBg
                    )}
                    style={{
                      bottom: isMenuOpen ? "auto" : "0",
                      top: isMenuOpen ? "50%" : "auto",
                      transform: isMenuOpen
                        ? "translateY(-50%) rotate(-45deg)"
                        : "translateY(0) rotate(0deg)",
                    }}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Fullscreen menu overlay */}
      <Menu
        isOpen={isMenuOpen}
        onClose={closeMenu}
        onConnectClick={onConnectClick}
      />
    </>
  );
}
