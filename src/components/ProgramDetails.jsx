import React, { useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  X,
  Clock,
  MapPin,
  Users,
  Trophy,
  Phone,
  CheckCircle2,
  FileText,
  Sparkles,
} from "lucide-react";
import { EASE_EDITORIAL } from "./motion/Reveal";

export function ProgramDetails({ program, isOpen, onClose, onRegister }) {
  const shouldReduceMotion = useReducedMotion();

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

  if (!program) return null;

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
            className="relative w-full max-w-2xl bg-[#121215] border-t sm:border border-[#27272A] rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] sm:max-h-[90vh] flex flex-col z-10 text-white"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-program-title"
          >
            {/* Modal Header Media & Close */}
            <div className="relative h-44 sm:h-52 bg-[#09090B] shrink-0 border-b border-[#27272A]">
              <img
                src={program.image}
                alt={program.name}
                className="w-full h-full object-cover object-center opacity-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121215] via-[#121215]/50 to-transparent" />

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 w-10 h-10 rounded-full bg-[#18181B] text-[#A1A1AA] hover:text-white border border-[#27272A] hover:border-[#3F3F46] transition-colors flex items-center justify-center cursor-pointer z-10"
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>

              <div className="absolute bottom-3 left-4 right-4 sm:bottom-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#18181B] border border-[#27272A] font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#A1A1AA]">
                    #{program.number} • {program.category}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#0055FF] text-white font-mono text-[10px] font-bold uppercase tracking-wider">
                    {program.badge}
                  </span>
                </div>
                <h2
                  id="modal-program-title"
                  className="text-xl sm:text-3xl font-black font-['Space_Grotesk'] tracking-tight uppercase"
                >
                  {program.name}
                </h2>
                <p className="text-xs sm:text-sm text-[#A1A1AA] font-mono">
                  {program.subtitle}
                </p>
              </div>
            </div>

            {/* Scrollable Content Body */}
            <div className="p-4 sm:p-7 overflow-y-auto space-y-5 text-[#A1A1AA]">
              {/* Quick Info Badges Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                <div className="p-3 rounded-xl bg-[#18181B] border border-[#27272A]">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#71717A] block mb-0.5">
                    Entry Format
                  </span>
                  <span className="text-xs font-bold flex items-center gap-1.5 text-white">
                    <Users size={14} className="text-[#0055FF]" />
                    {program.teamSize}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[#18181B] border border-[#27272A]">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#71717A] block mb-0.5">
                    Tentative Fee
                  </span>
                  <span className="text-xs font-bold font-mono text-white">
                    {program.fee}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[#18181B] border border-[#27272A]">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#71717A] block mb-0.5">
                    Time Window
                  </span>
                  <span className="text-xs font-bold flex items-center gap-1.5 truncate text-white">
                    <Clock size={14} className="text-[#71717A]" />
                    {program.time.split(" ")[0]} {program.time.split(" ")[1]}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[#18181B] border border-[#27272A]">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#71717A] block mb-0.5">
                    Prize / Glory
                  </span>
                  <span className="text-xs font-bold flex items-center gap-1.5 truncate text-[#0055FF]">
                    <Trophy size={14} />
                    {program.prize.split("+")[0]}
                  </span>
                </div>
              </div>

              {/* Event Overview */}
              <div>
                <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider font-mono text-white mb-2 flex items-center gap-2">
                  <FileText size={15} className="text-[#0055FF]" />
                  <span>Event Overview</span>
                </h4>
                <p className="text-xs sm:text-sm text-[#D4D4D8] leading-relaxed bg-[#18181B] p-3.5 sm:p-4 rounded-xl border border-[#27272A]">
                  {program.description}
                </p>
              </div>

              {/* Venue & Eligibility */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="p-3.5 sm:p-4 rounded-xl bg-[#18181B] border border-[#27272A]">
                  <span className="text-[11px] font-mono font-bold uppercase text-[#71717A] block mb-1">
                    Designated Venue
                  </span>
                  <p className="text-xs sm:text-sm font-bold flex items-center gap-1.5 text-white">
                    <MapPin size={15} className="text-[#0055FF] shrink-0" />
                    <span>{program.venue}</span>
                  </p>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl bg-[#18181B] border border-[#27272A]">
                  <span className="text-[11px] font-mono font-bold uppercase text-[#71717A] block mb-1">
                    Eligibility Criteria
                  </span>
                  <p className="text-xs text-[#D4D4D8]">
                    {program.eligibility}
                  </p>
                </div>
              </div>

              {/* Official Rules */}
              {program.rules && program.rules.length > 0 && (
                <div>
                  <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider font-mono text-white mb-2 flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-[#0055FF]" />
                    <span>Official Guidelines & Rules</span>
                  </h4>
                  <ul className="space-y-2 bg-[#18181B] p-3.5 sm:p-4 rounded-xl border border-[#27272A]">
                    {program.rules.map((rule, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-[#D4D4D8]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0055FF] mt-1.5 shrink-0" />
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Assigned Event Coordinators */}
              {program.coordinators && (
                <div className="p-3.5 sm:p-4 rounded-xl bg-[#18181B] border border-[#27272A]">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#71717A] block mb-2">
                    Event Coordinators & Helpline
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                    {program.coordinators.map((coord, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs">
                        <div>
                          <span className="font-bold text-white block">{coord.name}</span>
                          <span className="text-[11px] text-[#71717A]">{coord.role}</span>
                        </div>
                        {coord.phone && (
                          <a
                            href={`tel:${coord.phone}`}
                            className="min-h-[34px] inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#27272A] text-white hover:bg-[#0055FF] font-mono font-bold text-xs transition-colors"
                          >
                            <Phone size={12} />
                            <span>Call</span>
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Bottom Actions */}
            <div className="p-4 sm:p-5 bg-[#09090B] border-t border-[#27272A] flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="text-xs text-[#71717A] hidden sm:block font-mono">
                Status: Slots pending official portal release
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  onClick={onClose}
                  className="flex-1 sm:flex-none min-h-[44px] px-5 py-2.5 rounded-xl border border-[#27272A] bg-[#121215] hover:bg-[#1A1A1E] text-white font-mono font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onRegister(program);
                  }}
                  className="flex-1 sm:flex-none min-h-[44px] px-6 py-2.5 rounded-xl bg-[#0055FF] hover:bg-[#2563EB] text-white font-mono font-bold text-xs uppercase tracking-wider shadow-md shadow-[#0055FF]/20 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Sparkles size={14} />
                  <span>Register Info</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
