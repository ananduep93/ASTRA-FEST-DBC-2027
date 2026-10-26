import React, { useState, useEffect, useMemo } from "react";
import {
  Trophy,
  Sparkles,
  Gamepad2,
  Camera,
  Crown
} from "lucide-react";
import ScrollExpand from "./ScrollExpand";
import CardSwap from "./CardSwap";
import { programsData } from "../data/programs";

function getCategoryIcon(category) {
  switch (category) {
    case "Management":
      return <Trophy size={16} className="text-[#0055FF]" />;
    case "Stage & Runway":
      return <Crown size={16} className="text-[#0055FF]" />;
    case "Tech & Gaming":
      return <Gamepad2 size={16} className="text-[#0055FF]" />;
    case "Media & Arts":
      return <Camera size={16} className="text-[#0055FF]" />;
    default:
      return <Sparkles size={16} className="text-[#0055FF]" />;
  }
}

export function EventsPortalSection({ onSelectProgram }) {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // All 15 official arenas in the 3D CardSwap stack
  const cardSwapItems = useMemo(() => {
    return programsData.map((prog) => ({
      title: prog.name,
      image: `/images/programs-generated/${prog.id}.svg`,
      alt: `${prog.name} - Arena ${prog.number}`,
      icon: getCategoryIcon(prog.category),
      program: prog,
    }));
  }, []);

  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  // Enlarged dimensions per user request: "kurach veluthaakk"
  const cardWidth = isMobile
    ? Math.min(windowWidth - 28, 360)
    : isTablet
    ? 480
    : 600;
  const cardHeight = isMobile ? 260 : isTablet ? 330 : 390;
  const cardDistance = isMobile ? 22 : isTablet ? 38 : 48;
  const verticalDistance = isMobile ? 26 : isTablet ? 42 : 52;
  const depth = isMobile ? 65 : isTablet ? 85 : 100;
  const skewAmount = isMobile ? 3 : 5;

  const handleCardClick = (index, isFront) => {
    const selected = cardSwapItems[index]?.program;
    if (isFront && selected && onSelectProgram) {
      onSelectProgram(selected);
    }
  };

  return (
    <section id="programs" className="relative w-full bg-[#09090B]">
      <ScrollExpand
        src=""
        alt="ASTRA 2K27 Event Arenas"
        title="15 ARENAS"
        scrollHint="Scroll to enter the arenas ↓"
        startWidth={isMobile ? 42 : 18}
        startHeight={isMobile ? 19.5 : 27}
        startRadius={28}
        endRadius={0}
        mediaZoom={1}
        scrollDistance={1.4}
        holdDistance={0.55}
        smoothing={0.08}
        overlayScrim={0}
        useWindowScroll={true}
        className="w-full"
      >
        {/* Popped-up Content: Prominent, enlarged CardSwap in the center */}
        <div className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center px-2 sm:px-4 py-2 text-center select-none">
          {/* CardSwap 3D Interactive Stack */}
          <div
            className="w-full relative flex items-center justify-center"
            style={{ height: isMobile ? 360 : isTablet ? 450 : 540 }}
          >
            <CardSwap
              items={cardSwapItems}
              width={cardWidth}
              height={cardHeight}
              cardDistance={cardDistance}
              verticalDistance={verticalDistance}
              depth={depth}
              skewAmount={skewAmount}
              visibleCards={4}
              delay={3800}
              autoplay={true}
              pauseOnHover={true}
              draggable={true}
              speed={1}
              bounce={0.3}
              cardRadius={22}
              theme="dark"
              onCardClick={handleCardClick}
              className="mx-auto"
            />
          </div>
        </div>
      </ScrollExpand>
    </section>
  );
}
export default EventsPortalSection;
