import { Link } from "react-router-dom";
import { LinkedInIcon } from "@/components/common/LinkedInIcon";
import { useIsMobile } from "@/hooks/use-mobile";

const footerNavLinks = [
  { label: "BLOG", path: "/blog" },
] as const;

const partners = [
  { name: "GRAVIKY LABS", logo: "/images/graviky.png", link: "https://graviky.com/" },
  { name: "AI KIRAN", logo: "/images/aikiran.png", link: "https://www.aikiran.org/" },
] as const;

interface FooterProps {
  onConnectClick: () => void;
}

export default function Footer({ onConnectClick }: FooterProps) {
  const isMobile = useIsMobile();

  return (
    <>
      <footer
        id="site-footer"
        className="w-full mt-0"
        style={{ backgroundColor: "#242425" }}
      >
        <div className="mx-auto mt-0">
          {/* ===== TOP ROW ===== */}
          <div className="flex items-center justify-between px-[50px] py-8 max-md:flex-col max-md:py-0 max-md:gap-0 max-md:px-[0px] max-md:items-stretch border-b border-white/20">
            {/* Left — nav links */}
            <nav
              className="flex text-center items-center gap-8 max-md:justify-center max-md:px-8 max-md:py-6 max-md:w-full max-md:border-b max-md:border-white/20"
              aria-label="Footer navigation"
            >
              {footerNavLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-body text-center font-[300] tracking-[0.15em] text-white hover:text-white transition-colors uppercase font-body
                  max-md:font-heading max-md:font-[350] max-md:text-[12px]
                  "
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={onConnectClick}
                className="text-body tracking-[0.15em] font-[300] text-white uppercase font-body hover:text-white/80 transition-colors cursor-pointer
                max-md:font-heading max-md:font-[350] max-md:text-[12px]
                "
              >
                CONNECT
              </button>
            </nav>

            {/* Right — partners */}
            <div
              className="flex items-center gap-8 px-8 max-md:py-6 max-md:justify-between max-md:gap-0 max-md:w-full max-md:border-b max-md:border-white/20 md:p-0"
            >
              <span className="text-body font-[300] tracking-[0.15em] text-white uppercase font-body
              max-md:font-heading max-md:font-[350] max-md:text-[10px] ">
                OUR PARTNERS
              </span>
              {partners.map((partner) => (
                <a
                  key={partner.name}
                  className="text-sm tracking-[0.1em] text-white/80 uppercase font-body flex items-center gap-2"
                  href={partner.link}
                  target="_blank"
                >
                  <img
                    src={partner.logo}
                    className="max-md:h-[18px] h-[30px] w-auto object-cover"
                    alt={partner.name}
                  />
                </a>
              ))}
            </div>
          </div>

          {/* ===== BOTTOM ROW ===== */}
          <div className="flex items-center justify-between px-[50px] py-8 max-md:px-8 max-md:flex-col max-md:gap-4 max-md:justify-center">
            {/* Left — LinkedIn + Connect */}
            <div className="flex items-center gap-4 max-md:w-full max-md:justify-between">
              {/* LinkedIn icon */}
              <a
                href="https://www.linkedin.com/company/wywa-ai"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WYWA on LinkedIn"
                className="text-white transition-colors"
              >
                <LinkedInIcon className="h-6 w-6" />
              </a>
            </div>

            {/* Right — copyright */}
            <div className="flex flex-col items-end max-md:flex-row max-md:w-full max-md:justify-between max-md:items-end">
              <p className="text-xs tracking-[0.1em] text-white font-[400] uppercase font-body">
                {isMobile ? "" : "Copyright "}© {new Date().getFullYear()} WYWA.COM
              </p>
              <span className="flex items-end lowercase text-xs tracking-[0.1em] text-white font-[300] font-body">
                designed by
                <a href="https://www.antkind.in/" target="_blank"><img className="h-[18px]" src="/images/antkind-logo.webp" /></a>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
