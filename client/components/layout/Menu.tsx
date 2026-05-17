import { Link, useLocation } from "react-router-dom";

const menuLinks = [
  { label: "HOME", path: "/" },
  { label: "TECHNOLOGY", path: "/technology" },
  { label: "PEOPLE", path: "/people" },
  { label: "CONNECT", path: "/connect" },
] as const;

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
  onConnectClick: () => void;
}

/**
 * Fullscreen dark overlay menu.
 *
 * - Covers the entire viewport
 * - Large uppercase navigation links (Pennypacker heading font)
 * - WYWA logo top-left, X close top-right (handled by Header)
 * - Copyright bottom-right
 */
export default function Menu({ isOpen, onClose, onConnectClick }: MenuProps) {
  const location = useLocation();

  const handleLinkClick = (path: string) => {
    if (path === "/connect") {
      onClose();
      setTimeout(() => onConnectClick(), 150);
    } else {
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-40 transition-all duration-500 ease-in-out ${isOpen
        ? "opacity-100 pointer-events-auto"
        : "opacity-0 pointer-events-none"
        }`}
      style={{ backgroundColor: "#242425" }}
    >
      {/* Navigation links */}
      <nav className="absolute left-[50px] max-md:left-6 top-1/2 -translate-y-1/2 flex flex-col gap-2">
        {menuLinks.map((link, index) => {
          const isActive = location.pathname === link.path;

          if (link.path === "/connect") {
            return (
              <button
                key={link.path}
                onClick={() => handleLinkClick(link.path)}
                className={`text-left text-huge font-[350] font-heading uppercase transition-all duration-500 ease-out hover:opacity-70 ${isOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
                  } ${isActive ? "text-cta" : "text-white"}`}
                style={{
                  fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                  lineHeight: 1.15,
                  fontWeight: 350,
                  letterSpacing: "-0.01em",
                  transitionDelay: isOpen ? `${150 + index * 80}ms` : "0ms",
                }}
              >
                {link.label}
              </button>
            );
          }

          return (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => handleLinkClick(link.path)}
              className={`font-heading uppercase transition-all duration-500 ease-out hover:opacity-70 ${isOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
                } ${isActive ? "text-cta" : "text-white"}`}
              style={{
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                lineHeight: 1.15,
                fontWeight: 350,
                letterSpacing: "-0.01em",
                transitionDelay: isOpen ? `${150 + index * 80}ms` : "0ms",
              }}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Copyright — bottom right */}
      <p
        className={`absolute bottom-8 right-[50px] max-md:right-6 text-xs text-white/50 uppercase tracking-wider transition-all duration-400 ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        style={{ transitionDelay: isOpen ? "500ms" : "0ms" }}
      >
        © {new Date().getFullYear()} WYWA
      </p>
    </div>
  );
}
