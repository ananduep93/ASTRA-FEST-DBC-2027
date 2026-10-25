import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { Clock, MapPin, Users, ArrowUpRight } from "lucide-react";
import { EASE_EDITORIAL } from "./motion/Reveal";

export function ProgramCard({ program, onSelect, index }) {
  const shouldReduceMotion = useReducedMotion();

  // Controlled stagger delay for sequential unfolding:
  const staggerDelay = shouldReduceMotion ? 0 : Math.min((index % 6) * 0.12, 0.45);

  return (
    <motion.article
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 35, scale: 0.98 }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -40px 0px" }}
      transition={{
        duration: 0.5,
        delay: staggerDelay,
        ease: EASE_EDITORIAL,
      }}
      className="group bg-[#121215] rounded-xl border border-[#27272A] hover:border-[#3F3F46] hover:-translate-y-1 active:translate-y-0 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm"
    >
      <div>
        {/* Card Header Media */}
        <div className="relative h-48 sm:h-52 overflow-hidden border-b border-[#27272A] bg-[#09090B]">
          <img
            src={program.image}
            alt={program.name}
            width="400"
            height="220"
            loading="lazy"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
          />

          {/* Number Stamp */}
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#09090B]/90 backdrop-blur-md border border-[#27272A] font-mono text-xs font-bold tracking-wider text-white">
            #{program.number}
          </div>

          {/* Category Tag */}
          <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#09090B]/90 backdrop-blur-md border border-[#27272A] text-white text-[10px] font-mono font-bold uppercase tracking-wider">
            {program.category}
          </div>

          {/* Badge Ribbon */}
          <div className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-[#0055FF] text-white">
            {program.badge}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-5">
          <div className="mb-2">
            <h3 className="text-xl sm:text-2xl font-black text-white font-['Space_Grotesk'] tracking-tight group-hover:text-[#0055FF] transition-colors leading-tight uppercase">
              {program.name}
            </h3>
            <span className="block text-xs font-mono font-bold uppercase tracking-wider text-[#A1A1AA] mt-1">
              {program.subtitle}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[#A1A1AA] line-clamp-2 leading-relaxed mb-4">
            {program.shortDescription}
          </p>

          {/* Metadata Grid */}
          <div className="space-y-2 pt-3 border-t border-[#27272A] text-xs text-[#A1A1AA]">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-medium text-white">
                <Users size={14} className="text-[#0055FF]" />
                {program.teamSize}
              </span>
              <span className="flex items-center gap-1.5 font-medium text-white">
                <Clock size={14} className="text-[#71717A]" />
                {program.time.split("-")[0]}
              </span>
            </div>

            <div className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-1.5 text-[11px] font-medium text-[#71717A] truncate">
                <MapPin size={13} className="text-[#71717A] shrink-0" />
                <span className="truncate">{program.venue}</span>
              </span>
              <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-[#18181B] border border-[#27272A] text-white shrink-0">
                {program.fee}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Action Button */}
      <div className="p-4 sm:p-5 pt-0">
        <button
          onClick={() => onSelect(program)}
          className="w-full min-h-[44px] py-2.5 px-4 rounded-xl border border-[#27272A] bg-[#18181B] hover:bg-[#0055FF] text-white font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
        >
          <span>View Rules & Brief</span>
          <ArrowUpRight size={15} />
        </button>
      </div>
    </motion.article>
  );
}
