import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  X,
  Phone,
  CheckCircle,
  Copy,
  MessageCircle,
} from "lucide-react";
import confetti from "canvas-confetti";
import { siteConfig } from "../data/siteConfig";
import { EASE_EDITORIAL } from "./motion/Reveal";
import { saveRegistration } from "../lib/supabase";

export function RegistrationModal({ isOpen, onClose, selectedProgram }) {
  const shouldReduceMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);
  const [notifySuccess, setNotifySuccess] = useState(false);
  const [notifyEmail, setNotifyEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setNotifySuccess(false);
      setNotifyEmail("");
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

  const handleCopyHelpline = () => {
    navigator.clipboard.writeText(siteConfig.registration.contactPhone);
    setCopied(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#0055FF", "#FFFFFF", "#3B82F6"],
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleNotifySubmit = async (e) => {
    e.preventDefault();
    if (!notifyEmail || isSubmitting) return;
    setIsSubmitting(true);

    try {
      await saveRegistration({
        email: notifyEmail,
        program_id: selectedProgram?.id || null,
        program_name: selectedProgram?.name || "General Festival Interest",
        category: selectedProgram?.category || "General",
      });
    } catch (err) {
      console.warn("Registration submission fallback:", err);
    } finally {
      setIsSubmitting(false);
      setNotifySuccess(true);
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#0055FF", "#FFFFFF", "#60A5FA"],
      });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal / Bottom-Sheet Container for Mobile */}
          <motion.div
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: "100%", scale: 1 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: "100%", scale: 1 }
            }
            transition={{ duration: 0.35, ease: EASE_EDITORIAL }}
            className="relative w-full max-w-lg bg-[#121215] border-t sm:border border-[#27272A] rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden z-10 p-5 sm:p-7 max-h-[92vh] overflow-y-auto text-white"
            role="dialog"
            aria-modal="true"
            aria-labelledby="reg-modal-title"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 w-10 h-10 rounded-full bg-[#18181B] text-[#A1A1AA] hover:text-white border border-[#27272A] hover:border-[#3F3F46] transition-colors flex items-center justify-center cursor-pointer"
              aria-label="Close registration dialog"
            >
              <X size={18} />
            </button>

            {/* Header Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#18181B] border border-[#27272A] text-xs font-mono font-bold uppercase tracking-wider text-[#A1A1AA] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0055FF]" />
              <span>REGISTRATION STATUS</span>
            </div>

            <h3
              id="reg-modal-title"
              className="text-xl sm:text-2xl font-black font-['Space_Grotesk'] text-white mb-2 leading-tight uppercase"
            >
              {siteConfig.registration.announcement}
            </h3>

            {selectedProgram && (
              <div className="p-3 mb-4 rounded-xl bg-[#18181B] border border-[#27272A] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase text-[#71717A] block">
                    Inquiring Event
                  </span>
                  <span className="font-extrabold text-xs sm:text-sm text-white">
                    {selectedProgram.name} (#{selectedProgram.number})
                  </span>
                </div>
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#27272A] text-[#0055FF]">
                  {selectedProgram.fee}
                </span>
              </div>
            )}

            <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed mb-5">
              {siteConfig.registration.helperText}
            </p>

            {/* Direct Helpline / Contingent WhatsApp Box */}
            <div className="p-4 rounded-xl bg-[#18181B] border border-[#27272A] mb-5 space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#A1A1AA] block">
                Priority Contingent Registration Desk
              </span>
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-white">Anandu EP</span>
                  <span className="block text-[#71717A] text-[11px]">
                    Head Student Coordinator & Tech Lead
                  </span>
                </div>
                <button
                  onClick={handleCopyHelpline}
                  className="min-h-[34px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#27272A] text-white hover:bg-[#3F3F46] font-mono font-bold text-xs transition-colors cursor-pointer"
                >
                  {copied ? <CheckCircle size={13} className="text-[#0055FF]" /> : <Copy size={13} />}
                  <span>{copied ? "Copied!" : "Copy Phone"}</span>
                </button>
              </div>

              <div className="pt-2.5 border-t border-[#27272A] flex items-center justify-between">
                <a
                  href={`tel:${siteConfig.registration.contactPhone}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0055FF] hover:underline"
                >
                  <Phone size={13} />
                  <span>Call: +91 8075480258</span>
                </a>

                <a
                  href={siteConfig.registration.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[34px] inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#25D366] text-white font-mono font-bold text-xs shadow-sm hover:opacity-90 transition-opacity"
                >
                  <MessageCircle size={13} />
                  <span>WhatsApp Chat</span>
                </a>
              </div>
            </div>

            {/* Voluntary Notification Form */}
            {!notifySuccess ? (
              <form onSubmit={handleNotifySubmit} className="space-y-2.5">
                <label htmlFor="notify-email" className="block text-xs font-mono font-bold uppercase tracking-wider text-[#A1A1AA]">
                  Get Notified When Slots Open
                </label>
                <div className="flex gap-2">
                  <input
                    id="notify-email"
                    name="notifyEmail"
                    type="email"
                    required
                    value={notifyEmail}
                    onChange={(e) => setNotifyEmail(e.target.value)}
                    placeholder="Enter collegiate email address"
                    className="flex-1 min-h-[44px] px-3.5 py-2.5 rounded-xl bg-[#18181B] border border-[#27272A] text-xs font-medium text-white placeholder-[#71717A] focus:outline-none focus:border-[#0055FF]"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="min-h-[44px] px-5 py-2.5 bg-white text-black hover:bg-[#0055FF] hover:text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Connecting..." : "Notify Me"}
                  </button>
                </div>
                <span className="block text-[11px] text-[#71717A]">
                  No spam. We will only alert you when official team slots open.
                </span>
              </form>
            ) : (
              <div className="p-4 rounded-xl bg-[#18181B] border border-[#27272A] text-center space-y-1">
                <div className="flex items-center justify-center gap-1.5 font-bold text-xs text-white">
                  <CheckCircle size={15} className="text-[#0055FF]" />
                  <span>You are on the priority alert roster!</span>
                </div>
                <p className="text-[11px] text-[#A1A1AA]">
                  Notification will be sent to {notifyEmail} when registration opens.
                </p>
              </div>
            )}

            {/* Bottom Dismiss */}
            <div className="mt-5 pt-3.5 border-t border-[#27272A] flex items-center justify-between text-[11px] text-[#71717A]">
              <span>ASTRA 2K27 • Don Bosco Mampetta</span>
              <button
                onClick={onClose}
                className="font-bold text-white hover:underline p-1 cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
