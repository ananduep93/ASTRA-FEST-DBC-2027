import React from "react";

export function Starburst({ size = 32, fill = "currentColor", className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M50 0L57 35L92 15L71 46L100 50L71 54L92 85L57 65L50 100L43 65L8 85L29 54L0 50L29 46L8 15L43 35L50 0Z"
        fill={fill}
      />
    </svg>
  );
}

export function FourPointStar({ size = 24, fill = "currentColor", className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M24 0 C24 13.25 34.75 24 48 24 C34.75 24 24 34.75 24 48 C24 34.75 13.25 24 0 24 C13.25 24 24 13.25 24 0 Z"
        fill={fill}
      />
    </svg>
  );
}

export function PulseWave({ className = "" }) {
  return (
    <svg
      viewBox="0 0 300 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M0 20 H60 L75 5 L90 35 L105 10 L120 30 L135 20 H300"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function OrbitalRings({ className = "" }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="100" cy="100" r="95" stroke="#20263A" strokeWidth="2" strokeDasharray="6 6" />
      <circle cx="100" cy="100" r="70" stroke="#F4775B" strokeWidth="2.5" />
      <circle cx="100" cy="100" r="45" stroke="#355CDE" strokeWidth="2" strokeDasharray="3 3" />
      <circle cx="100" cy="100" r="15" fill="#F2CC57" stroke="#20263A" strokeWidth="2" />
    </svg>
  );
}

export function FestivalStamp({ text = "ASTRA 2K27 • DON BOSCO • PULSE • ", className = "" }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`} aria-hidden="true">
      <svg
        className="w-24 h-24 sm:w-28 sm:h-28 animate-spin-slow"
        viewBox="0 0 120 120"
      >
        <path
          id="textRing"
          fill="none"
          d="M 60,60 m -45,0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0"
        />
        <text className="text-[10px] uppercase font-bold tracking-widest fill-[#20263A]">
          <textPath href="#textRing" startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>
      <div className="absolute w-10 h-10 rounded-full bg-[#F4775B] border-2 border-[#20263A] flex items-center justify-center">
        <FourPointStar size={16} fill="#F7F3EA" />
      </div>
    </div>
  );
}
