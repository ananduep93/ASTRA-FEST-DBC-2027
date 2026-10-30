import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollFloat from "./ScrollFloat";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const logoWrapRef = useRef(null);

  // 1. Initial State: Full blank black screen for 1 second, then logo appears in the center
  const [logoReady, setLogoReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLogoReady(true);
    }, 1000); // 1 second later logo appears on the center
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const stage = stageRef.current;
    const logoWrap = logoWrapRef.current;

    if (!container || !stage || !logoWrap) return;

    // Center logo fades out cleanly as user scrolls down (without moving to navbar)
    const logoTl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "14% top",
        scrub: 0.3,
        invalidateOnRefresh: true,
      },
    });

    logoTl.fromTo(
      logoWrap,
      { opacity: 1, scale: 1 },
      {
        opacity: 0,
        scale: 0.88,
        ease: "power1.out",
      }
    );

    return () => {
      logoTl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === container) st.kill();
      });
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[420vh] w-full bg-[#09090B]"
    >
      {/* Sticky Fullscreen Stage (Pinned Viewport) */}
      <div
        ref={stageRef}
        className="sticky top-0 h-[100dvh] w-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 overflow-hidden select-none bg-[#09090B]"
      >
        {/* 1. Official Center ASTRA Logo (Fades in after 1s, then fades out as user scrolls) */}
        <div
          ref={logoWrapRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
        >
          <div
            className={`transition-opacity duration-700 ease-out ${
              logoReady ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src="/astra-logo.png"
              alt="ASTRA Emblem"
              className="w-32 h-32 sm:w-44 sm:h-44 object-contain filter drop-shadow-[0_0_35px_rgba(255,255,255,0.25)]"
            />
          </div>
        </div>

        {/* Center Stage */}
        <div className="relative w-full flex flex-col items-center justify-center text-center">
          {/* 2. Pure Colossal ASTRA Heading: Floats up unhurriedly from under the screen */}
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
export default Hero;
