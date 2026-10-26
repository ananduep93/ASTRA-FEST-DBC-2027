import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollFloat from "./ScrollFloat";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const logoRef = useRef(null);

  // 1. Initial State: Full blank black screen for 1 second, then logo appears on the center
  const [logoReady, setLogoReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLogoReady(true);
    }, 1000); // 1 second later logo appears on the center
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!logoReady) return;

    const container = containerRef.current;
    const stage = stageRef.current;
    const logo = logoRef.current;

    if (!container || !stage || !logo) return;

    // Use GSAP xPercent & yPercent to ensure origin stays perfectly centered across both mobile & desktop
    gsap.set(logo, { xPercent: -50, yPercent: -50, x: 0, y: 0 });

    const getDestination = () => {
      const targetSlot = document.getElementById("navbar-logo-target");
      const isMobile = window.innerWidth < 640;
      const baseLogoWidth = isMobile ? 128 : 176;

      if (!targetSlot || !logo) {
        return {
          x: -window.innerWidth / 2 + (isMobile ? 32 : 48),
          y: -window.innerHeight / 2 + 28,
          scale: 32 / baseLogoWidth,
        };
      }
      const slotRect = targetSlot.getBoundingClientRect();

      // Exact vector from screen center to the navbar logo slot center
      const x = slotRect.left + slotRect.width / 2 - window.innerWidth / 2;
      const y = slotRect.top + slotRect.height / 2 - window.innerHeight / 2;
      const scale = 32 / baseLogoWidth;

      return { x, y, scale };
    };

    // Sequence 1: Center logo travels smoothly to the exact navbar logo slot on both mobile and desktop
    const logoTl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "25% top",
        scrub: 0.5,
        invalidateOnRefresh: true,
      },
    });

    logoTl.to(
      logo,
      {
        x: () => getDestination().x,
        y: () => getDestination().y,
        scale: () => getDestination().scale,
        opacity: 1, // Remains visible as it docks on top of the navbar
        duration: 1,
        ease: "power2.inOut",
      },
      0
    );

    return () => {
      logoTl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === container) st.kill();
      });
    };
  }, [logoReady]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[420vh] w-full bg-[#09090B]"
    >
      {/* 1. Official Center ASTRA Logo (Fixed z-50 so it glides ON TOP of the navbar) */}
      <div
        ref={logoRef}
        className={`fixed top-1/2 left-1/2 z-50 pointer-events-none flex items-center justify-center will-change-transform transition-opacity duration-700 ease-out ${
          logoReady ? "opacity-100" : "opacity-0"
        }`}
      >
        <img
          src="/astra-logo.png"
          alt="ASTRA Emblem"
          className="w-32 h-32 sm:w-44 sm:h-44 object-contain filter drop-shadow-[0_0_35px_rgba(255,255,255,0.25)]"
        />
      </div>

      {/* Sticky Fullscreen Stage (Pinned Viewport) */}
      <div
        ref={stageRef}
        className="sticky top-0 h-[100dvh] w-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 overflow-hidden select-none bg-[#09090B]"
      >
        {/* Center Stage */}
        <div className="relative w-full flex flex-col items-center justify-center text-center">
          {/* 2. Pure Colossal ASTRA Heading: Floats up unhurriedly from under the screen ONLY AFTER logo is docked */}
          <div className="w-full flex flex-col items-center justify-center relative z-10 overflow-visible">
            <ScrollFloat
              triggerElement={containerRef.current}
              scrollStart="28% top"
              scrollEnd="58% top"
              effect="float"
              splitBy="chars"
              direction="up"
              order="start"
              ease="back.out(1.4)"
              stagger={0.08}
              distance={550}
              stretch={2.2}
              smoothing={0.6}
              containerClassName="w-full text-center overflow-visible"
              textClassName="text-[28vw] sm:text-[25vw] md:text-[22vw] font-black font-['Space_Grotesk'] text-white tracking-tighter leading-[0.76] uppercase select-none whitespace-nowrap"
            >
              ASTRA
            </ScrollFloat>
          </div>
        </div>
      </div>
    </section>
  );
}
