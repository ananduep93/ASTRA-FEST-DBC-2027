import React from "react";

export function SectionHeading({
  tag,
  title,
  subtitle,
  centered = false,
}) {
  return (
    <div className={`mb-10 sm:mb-14 ${centered ? "text-center mx-auto max-w-2xl" : "max-w-3xl"}`}>
      {tag && (
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 text-[11px] sm:text-xs font-mono font-bold tracking-widest uppercase border border-[#27272A] bg-[#121215] text-[#A1A1AA] rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0055FF]" />
          <span>{tag}</span>
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-['Space_Grotesk'] leading-[1.08] mb-3 uppercase">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed font-normal">
          {subtitle}
        </p>
      )}
    </div>
  );
}
