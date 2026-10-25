import React from "react";
import { ArrowUp, MessageCircle, MapPin, Phone, Sparkles } from "lucide-react";
import { siteConfig } from "../data/siteConfig";

function InstagramIcon({ size = 16, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function Footer({ onOpenRegister, onNavigate }) {
  const currentYear = new Date().getFullYear();

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLinkClick = (item) => {
    if (onNavigate) {
      onNavigate(item.toLowerCase());
    } else {
      const el = document.getElementById(item.toLowerCase());
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#09090B] text-white pt-14 pb-12 border-t border-[#27272A] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 pb-10 border-b border-[#27272A]">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-black font-['Space_Grotesk'] text-sm">
                A
              </div>
              <span className="font-black text-xl font-['Space_Grotesk'] tracking-tight text-white">
                ASTRA <span className="text-[#0055FF] text-xs font-mono">2K27</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#A1A1AA] max-w-sm leading-relaxed">
              The flagship national inter-college arts and cultural confluence of Don Bosco College,
              Mampetta.
            </p>

            <div className="pt-2 text-xs text-[#71717A] space-y-1.5 font-mono">
              <div className="flex items-center gap-2">
                <MapPin size={13} className="text-[#0055FF]" />
                <span>Mampetta, Mukkam, Kozhikode, Kerala 673602</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={13} className="text-[#0055FF]" />
                <span>Helpline: +91 8075480258</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3 space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#71717A] block mb-2">
              NAVIGATION
            </span>
            <ul className="space-y-1.5 text-xs sm:text-sm font-medium text-[#A1A1AA]">
              {["Home", "Programs", "Gallery", "Contact"].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => handleLinkClick(item)}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    ✦ {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect & Socials */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#71717A] block mb-2">
              OFFICIAL DESK
            </span>

            <div className="flex flex-wrap gap-2.5">
              <a
                href={siteConfig.socials[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#18181B] hover:bg-white hover:text-black text-white text-xs font-mono font-bold transition-colors border border-[#27272A]"
              >
                <InstagramIcon size={14} />
                <span>Instagram</span>
              </a>

              <a
                href={siteConfig.socials[1].url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#18181B] hover:bg-[#25D366] text-white text-xs font-mono font-bold transition-colors border border-[#27272A]"
              >
                <MessageCircle size={14} />
                <span>WhatsApp</span>
              </a>
            </div>

            <button
              onClick={onOpenRegister}
              className="mt-3 w-full py-2.5 px-4 rounded-xl bg-white hover:bg-[#0055FF] text-black hover:text-white font-mono font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles size={13} />
              <span>Registration Status</span>
            </button>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#71717A] font-mono">
          <p>
            © {currentYear} ASTRA 2K27 | Don Bosco College, Mampetta.
          </p>

          <button
            onClick={handleScrollTop}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#18181B] hover:bg-white hover:text-black text-[#A1A1AA] transition-all text-xs border border-[#27272A] cursor-pointer"
            aria-label="Back to top of page"
          >
            <span>Back to top</span>
            <ArrowUp size={12} />
          </button>
        </div>

      </div>
    </footer>
  );
}
