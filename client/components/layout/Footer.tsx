import { useState } from "react";
import { Link } from "react-router-dom";
import ConnectPopup from "@/components/common/ConnectPopup";

const footerNavLinks = [
  { label: "BLOG", path: "/blog" },
  { label: "FAQS", path: "/faqs" },
  { label: "T&C", path: "/terms" },
] as const;

const partners = [
  { name: "GRAVIKY LABS", logo: "/images/graviky.png" },
  { name: "", logo: "/images/aikiran.png" },
] as const;

export default function Footer() {
  const [connectOpen, setConnectOpen] = useState(false);

  return (
    <>
      <footer
        id="site-footer"
        className="w-full mt-0"
        style={{ backgroundColor: "#242425" }}
      >
        <div className="mx-auto mt-0">
          {/* ===== TOP ROW ===== */}
          <div className="flex items-center justify-between px-[50px] py-8 max-md:flex-col max-md:gap-6 max-md:items-start border-b border-white/20">
            {/* Left — nav links */}
            <nav
              className="flex items-center gap-8 max-md:gap-6"
              aria-label="Footer navigation"
            >
              {footerNavLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-body font-[300] tracking-[0.15em] text-white hover:text-white transition-colors uppercase font-body"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right — partners */}
            <div className="flex items-center gap-8 max-md:gap-6">
              <span className="text-body font-[300] tracking-[0.15em] text-white uppercase font-body">
                OUR PARTNERS
              </span>
              {partners.map((partner, index) => (
                <span
                  key={partner.name}
                  className="text-sm tracking-[0.1em] text-white/80 uppercase font-body flex items-center gap-2"
                >
                  <img
                    src={partner.logo}
                    className="h-[36px] w-auto object-cover"
                    alt={partner.name}
                  />
                </span>
              ))}
            </div>
          </div>

          {/* ===== BOTTOM ROW ===== */}
          <div className="flex items-center justify-between px-[50px] py-6 max-md:flex-col max-md:gap-4 max-md:items-start">
            {/* Left — LinkedIn + Connect */}
            <div className="flex items-center gap-4">
              {/* LinkedIn icon */}
              <a
                href="https://www.linkedin.com/company/wywa"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WYWA on LinkedIn"
                className="text-white/80 hover:text-white transition-colors"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>

              <button
                onClick={() => setConnectOpen(true)}
                className="text-body tracking-[0.15em] font-[300] text-white uppercase font-body hover:text-white/80 transition-colors cursor-pointer"
              >
                CONNECT
              </button>
            </div>

            {/* Right — copyright */}
            <p className="text-xs tracking-[0.1em] text-white font-[400] uppercase font-body">
              COPYRIGHT © {new Date().getFullYear()} WYWA.COM
            </p>
          </div>
        </div>
      </footer>
      <ConnectPopup open={connectOpen} onOpenChange={setConnectOpen} />
    </>
  );
}
