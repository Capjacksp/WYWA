import { Link } from "react-router-dom";
import Logo from "@/components/common/Logo";
import Menu from "./Menu";
import { useState, useEffect } from "react";

interface HeaderProps {
  onConnectClick: () => void;
}

export default function Header({ onConnectClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        className={`sticky top-0 z-50 w-full bg-transparent transition-colors duration-300 ${isMenuOpen
          ? "bg-transparent border-b border-transparent"
          : "bg-transparent border-b border-transparent"
          }`}
      >
        <div className="mx-auto px-[50px] max-md:px-5">
          <div className="flex items-center justify-between h-16 pt-[40px] mix-blend-difference">
            {/* Logo */}
            <Link
              to="/"
              className="relative z-50"
              onClick={closeMenu}
            >
              <Logo
                width={100}
                color="#FFFFFF"
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
                  className={`absolute left-0 w-full h-[2px] transition-all duration-300 ease-in-out ${isMenuOpen ? "bg-white" : "bg-white"
                    }`}
                  style={{
                    top: isMenuOpen ? "50%" : "0",
                    transform: isMenuOpen
                      ? "translateY(-50%) rotate(45deg)"
                      : "translateY(0) rotate(0deg)",
                  }}
                />
                <span
                  className={`absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] transition-all duration-300 ease-in-out ${isMenuOpen
                    ? "bg-white opacity-0 scale-x-0"
                    : "bg-white opacity-100 scale-x-100"
                    }`}
                />
                <span
                  className={`absolute left-0 w-full h-[2px] transition-all duration-300 ease-in-out ${isMenuOpen ? "bg-white" : "bg-white"
                    }`}
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
