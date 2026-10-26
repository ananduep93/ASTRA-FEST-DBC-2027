import React, { useState, useEffect } from "react";
import { Menu, Sparkles } from "lucide-react";
import { MobileMenu } from "./MobileMenu";

export function Navbar({ onOpenRegister, activeView = "home", onNavigate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", id: "home", subtitle: "Main Festival Hub" },
    { name: "Programs", id: "programs", subtitle: "15 Official Arenas" },
    { name: "Gallery", id: "gallery", subtitle: "Moments & Archive" },
    { name: "Contact", id: "contact", subtitle: "Helpline & Liaison" },
  ];

  // Track scroll position: Navbar starts hidden on home, then fades in as user scrolls
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSelectLink = (id) => {
    if (onNavigate) {
      onNavigate(id);
    }
  };

  const isNavbarVisible = activeView !== "home" || isScrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 w-full z-40 py-2.5 sm:py-3 transition-opacity duration-500 ease-out ${
          isNavbarVisible
            ? "opacity-100 pointer-events-auto bg-[#09090B]/90 backdrop-blur-md border-b border-[#27272A]"
            : "opacity-0 pointer-events-none bg-transparent"
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3">
            {/* Logo & Brand Wordmark */}
            <button
              onClick={() => handleSelectLink("home")}
              className="flex items-center gap-2.5 group min-w-0 shrink text-left cursor-pointer"
              aria-label="ASTRA 2K27 Home"
            >
              {/* Target slot for the logo to land on while scrolling */}
              <div
                id="navbar-logo-target"
                className="w-8 h-8 shrink-0 flex items-center justify-center relative"
              >
                {activeView !== "home" && (
                  <img
                    src="/astra-logo.png"
                    alt="ASTRA Emblem"
                    className="w-8 h-8 shrink-0 object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.25)]"
                  />
                )}
              </div>

              <div className="flex flex-col min-w-0">
                <span className="font-black text-base sm:text-lg font-['Space_Grotesk'] tracking-tight text-white leading-none truncate">
                  ASTRA <span className="text-[#0055FF] text-xs font-mono">2K27</span>
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono tracking-wider uppercase text-[#71717A] mt-0.5 truncate">
                  Don Bosco Mampetta
                </span>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 bg-[#121215]/80 p-1 rounded-full border border-[#27272A] backdrop-blur-md">
              {navLinks.map((link) => {
                const isActive = activeView === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleSelectLink(link.id)}
                    className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-white text-black shadow-sm"
                        : "text-[#A1A1AA] hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.name}
                  </button>
                );
              })}
            </nav>

            {/* Right Action CTA & Mobile Trigger */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <button
                onClick={onOpenRegister}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-[#0055FF] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-full hover:bg-[#2563EB] active:scale-95 transition-all cursor-pointer shadow-md shadow-[#0055FF]/20"
              >
                <Sparkles size={13} />
                <span>Registration</span>
              </button>

              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden p-2.5 rounded-xl border border-[#27272A] bg-[#121215] text-white hover:border-[#3F3F46] active:scale-95 transition-all cursor-pointer shrink-0 flex items-center justify-center min-w-[42px] min-h-[42px]"
                aria-label="Open mobile navigation menu"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navLinks={navLinks}
        activeView={activeView}
        onNavigate={(id) => handleSelectLink(id)}
        onOpenRegister={onOpenRegister}
      />
    </>
  );
}
