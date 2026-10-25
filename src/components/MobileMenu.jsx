import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowRight, Phone, Sparkles } from "lucide-react";
import { EASE_EDITORIAL } from "./motion/Reveal";

export function MobileMenu({
  isOpen,
  onClose,
  navLinks,
  activeView = "home",
  onNavigate,
  onOpenRegister,
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 md:hidden"
            aria-hidden="true"
          />

          {/* Drawer Menu */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: EASE_EDITORIAL }}
            className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-[#09090B] border-l border-[#27272A] z-50 p-6 flex flex-col justify-between overflow-y-auto md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
          >
            <div>
              {/* Top Bar */}
              <div className="flex items-center justify-between pb-5 border-b border-[#27272A]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-black font-['Space_Grotesk'] text-sm">
                    A
                  </div>
                  <div>
                    <span className="font-extrabold text-base tracking-wider text-white font-['Space_Grotesk']">
                      ASTRA <span className="text-[#0055FF]">2K27</span>
                    </span>
                    <span className="block text-[9px] uppercase font-mono tracking-widest text-[#71717A]">
                      Don Bosco Mampetta
                    </span>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full border border-[#27272A] bg-[#121215] text-[#A1A1AA] hover:text-white hover:border-[#3F3F46] transition-colors flex items-center justify-center cursor-pointer"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="mt-8 flex flex-col gap-2.5">
                {navLinks.map((link, idx) => {
                  const isActive = activeView === link.id;
                  return (
                    <button
                      key={link.id}
                      onClick={() => {
                        onNavigate(link.id);
                        onClose();
                      }}
                      className={`min-h-[50px] flex items-center justify-between w-full px-4 py-3 rounded-xl border text-left font-bold text-base font-['Space_Grotesk'] transition-all cursor-pointer ${
                        isActive
                          ? "bg-white text-black border-white shadow-sm"
                          : "bg-[#121215] text-[#D4D4D8] border-[#27272A] hover:border-[#3F3F46] hover:text-white"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="text-xs font-mono opacity-50">0{idx + 1}</span>
                        <span className="flex flex-col">
                          <span>{link.name}</span>
                          {link.subtitle && (
                            <span
                              className={`text-[10px] font-mono tracking-wider font-normal ${
                                isActive ? "text-black/70" : "text-[#71717A]"
                              }`}
                            >
                              {link.subtitle}
                            </span>
                          )}
                        </span>
                      </span>
                      <ArrowRight size={18} className={isActive ? "text-black" : "opacity-40"} />
                    </button>
                  );
                })}
              </nav>

              {/* Primary Action Button */}
              <div className="mt-8">
                <button
                  onClick={() => {
                    onClose();
                    onOpenRegister();
                  }}
                  className="min-h-[48px] w-full py-3 px-5 bg-[#0055FF] text-white font-extrabold rounded-xl shadow-lg shadow-[#0055FF]/20 flex items-center justify-center gap-2 hover:bg-[#2563EB] active:scale-95 transition-all text-xs font-mono uppercase tracking-wider cursor-pointer"
                >
                  <Sparkles size={16} />
                  <span>Register Portal Info</span>
                </button>
              </div>
            </div>

            {/* Footer / Contact in Mobile Menu */}
            <div className="pt-5 mt-6 border-t border-[#27272A] text-xs text-[#71717A]">
              <p className="font-bold text-white mb-0.5">Don Bosco College, Mampetta</p>
              <p className="mb-2 text-[11px] leading-relaxed">Mukkam, Kozhikode, Kerala - 673602</p>
              <a
                href="tel:8075480258"
                className="inline-flex items-center gap-1.5 font-bold text-[#0055FF] hover:underline"
              >
                <Phone size={13} />
                <span>Desk: +91 8075480258</span>
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
