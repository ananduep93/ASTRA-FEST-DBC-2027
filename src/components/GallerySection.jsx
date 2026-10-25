import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal, StaggerContainer, StaggerItem, EASE_EDITORIAL } from "./motion/Reveal";

const galleryItems = [
  {
    id: "gal-1",
    src: "/images/cards/fashnshow.jpeg",
    title: "Flagship Runway Spectacle",
    category: "Stage & Runway",
    caption: "The flagship group fashion championship under amphitheatre spotlights.",
  },
  {
    id: "gal-2",
    src: "/images/cards/THEMEDANCE.jpeg",
    title: "Choreography Showdown",
    category: "Stage & Runway",
    caption: "Collegiate crews executing narrative choreography clashes.",
  },
  {
    id: "gal-3",
    src: "/images/cards/ESP.jpeg",
    title: "Esports & BGMI Arena",
    category: "Tech & Gaming",
    caption: "Mobile battlegrounds and live spectator stream arena.",
  },
  {
    id: "gal-4",
    src: "/images/cards/coprtwalk.jpeg",
    title: "Corporate Walk Poise",
    category: "Stage & Runway",
    caption: "Boardroom executive elegance and impromptu Q&A defense.",
  },
  {
    id: "gal-5",
    src: "/images/cards/codingcomp.jpeg",
    title: "Algorithmic Bug Duel",
    category: "Tech & Gaming",
    caption: "Data structure speed sprints in Computing Lab B2.",
  },
  {
    id: "gal-6",
    src: "/images/cards/facepainting.jpeg",
    title: "Living Canvas Art",
    category: "Media & Arts",
    caption: "Fine arts thematic gradients and face painting brushwork.",
  },
  {
    id: "gal-7",
    src: "/images/cards/bestmanager.jpeg",
    title: "Best Manager Arena",
    category: "Management",
    caption: "Stress interview defense and multi-round corporate simulation.",
  },
];

export function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev + 1) % galleryItems.length);
      }
      if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex]);

  const activeItem = lightboxIndex !== null ? galleryItems[lightboxIndex] : null;

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-[#09090B] border-b border-[#27272A] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Step 1: Section Heading Reveal */}
        <Reveal direction="up" amount={0.25}>
          <SectionHeading
            tag="02 // VISUAL CHRONICLES"
            title="Moments of High Voltage Pulse"
            subtitle="A visual tribute to the collegiate energy, design craft, stage spotlights, and competitive spirit that define ASTRA."
          />
        </Reveal>

        {/* Step 2: Dynamic Bento Gallery Grid */}
        <StaggerContainer
          staggerDelay={0.09}
          amount={0.15}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6"
        >
          {galleryItems.map((item, idx) => (
            <StaggerItem
              key={item.id}
              className={`${idx === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
            >
              <div
                className={`group relative rounded-xl overflow-hidden border border-[#27272A] bg-[#121215] cursor-pointer min-h-[240px] sm:min-h-[260px] hover:border-[#3F3F46] transition-all duration-300 ${
                  idx === 0 ? "md:min-h-[380px]" : ""
                }`}
                onClick={() => setLightboxIndex(idx)}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  width="400"
                  height="260"
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-85 group-hover:opacity-90 transition-opacity" />

                <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                  <span className="px-2.5 py-1 rounded bg-[#09090B]/90 backdrop-blur-md border border-[#27272A] text-white text-[10px] font-mono font-bold uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>

                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#18181B] border border-[#27272A] flex items-center justify-center text-white opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                  <ZoomIn size={14} />
                </div>

                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 text-white">
                  <h4 className="text-base sm:text-xl font-black font-['Space_Grotesk'] leading-snug uppercase">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#A1A1AA] mt-0.5 line-clamp-1">
                    {item.caption}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>

      {/* Accessible Interactive Lightbox */}
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxIndex(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md"
              aria-hidden="true"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.3, ease: EASE_EDITORIAL }}
              className="relative max-w-4xl w-full bg-[#121215] border border-[#27272A] rounded-2xl shadow-2xl overflow-hidden z-10 text-white"
              role="dialog"
              aria-modal="true"
              aria-label="Image Lightbox"
            >
              <button
                onClick={() => setLightboxIndex(null)}
                className="absolute top-3 right-3 z-20 w-10 h-10 rounded-full bg-[#18181B] border border-[#27272A] text-[#A1A1AA] hover:text-white transition-colors flex items-center justify-center cursor-pointer shadow-md"
                aria-label="Close lightbox"
              >
                <X size={18} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#18181B] border border-[#27272A] text-white hover:bg-[#0055FF] transition-colors shadow-md flex items-center justify-center cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) => (prev + 1) % galleryItems.length);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#18181B] border border-[#27272A] text-white hover:bg-[#0055FF] transition-colors shadow-md flex items-center justify-center cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight size={20} />
              </button>

              <div className="bg-black max-h-[60vh] sm:max-h-[68vh] flex items-center justify-center overflow-hidden">
                <img
                  src={activeItem.src}
                  alt={activeItem.title}
                  className="w-full h-auto max-h-[60vh] sm:max-h-[68vh] object-contain"
                />
              </div>

              <div className="p-4 sm:p-5 bg-[#09090B] border-t border-[#27272A] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded bg-[#0055FF] text-white text-[10px] font-mono font-bold uppercase tracking-wider">
                      {activeItem.category}
                    </span>
                    <span className="text-xs font-mono text-[#71717A]">
                      {lightboxIndex + 1} of {galleryItems.length}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold font-['Space_Grotesk'] text-white uppercase">
                    {activeItem.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#A1A1AA] mt-0.5">
                    {activeItem.caption}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
