import { Link } from "react-router-dom";
import Logo from "@/components/common/Logo";
import Menu from "./Menu";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onConnectClick: () => void;
  className?: string;
}

export default function Header({ onConnectClick, className }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isDark = className?.includes("header-dark") && !isMenuOpen;
  const logoColor = isDark ? "#242425" : "#FFFFFF";
  const barBg = isDark ? "bg-bg-dark" : "bg-white";

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header
        className={cn(
          "sticky top-8 z-50 w-full bg-transparent transition-colors duration-300",
          className
        )}
      >
        <div className="mx-auto px-[20px] max-md:px-5">
          <div className={cn(
            "rounded-[16px] bg-[#F1F1F15C] backdrop-blur-[4px] transition-colors duration-300",
            isMenuOpen && "bg-transparent backdrop-blur-none"
          )}>
            <div className="flex items-center justify-between h-12 px-8 max-md:px-6">
              {/* Logo */}
              <Link
                to="/"
                className="relative z-50"
                onClick={closeMenu}
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
