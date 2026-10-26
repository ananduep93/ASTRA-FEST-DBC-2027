import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { EventsPortalSection } from "./components/EventsPortalSection";
import { ProgramsSection } from "./components/ProgramsSection";
import { GallerySection } from "./components/GallerySection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { RegistrationModal } from "./components/RegistrationModal";

export default function App() {
  const [activeView, setActiveView] = useState("home"); // "home" | "programs" | "gallery" | "contact"
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [registerTargetProgram, setRegisterTargetProgram] = useState(null);

  const handleOpenRegister = (program = null) => {
    setRegisterTargetProgram(program);
    setIsRegisterOpen(true);
  };

  const handleCloseRegister = () => {
    setIsRegisterOpen(false);
    setRegisterTargetProgram(null);
  };

  const handleNavigate = (viewId) => {
    setActiveView(viewId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-white flex flex-col font-sans selection:bg-[#0055FF] selection:text-white w-full">
      {/* Skip to Content for Screen Readers & Keyboard Nav */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#0055FF] focus:text-white focus:rounded-lg focus:font-bold focus:shadow-lg"
      >
        Skip to main content
      </a>

      {/* Primary Sticky Header */}
      <Navbar
        onOpenRegister={() => handleOpenRegister()}
        activeView={activeView}
        onNavigate={handleNavigate}
      />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1 w-full">
        {activeView !== "home" && (
          <div className="pt-20 pb-3 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex items-center justify-between border-b border-[#27272A] bg-[#09090B]/60 backdrop-blur-sm">
            <button
              onClick={() => handleNavigate("home")}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121215] border border-[#27272A] hover:border-[#0055FF] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer group"
            >
              <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to Home</span>
            </button>
            <div className="text-[11px] font-mono text-[#71717A] uppercase tracking-wider">
              {activeView === "programs" && "15 Official Arenas"}
              {activeView === "gallery" && "Moments Archive"}
              {activeView === "contact" && "Liaison Desk"}
            </div>
          </div>
        )}

        {/* View-Based Content Rendering */}
        {activeView === "home" && (
          <>
            <Hero onOpenRegister={() => handleOpenRegister()} />
            <EventsPortalSection
              onSelectProgram={(p) => handleOpenRegister(p)}
              onNavigate={handleNavigate}
            />
            <GallerySection />
            <ContactSection />
            <Footer
              onOpenRegister={() => handleOpenRegister()}
              onNavigate={handleNavigate}
            />
          </>
        )}
        {activeView === "programs" && (
          <>
            <ProgramsSection onOpenRegister={handleOpenRegister} />
            <Footer onOpenRegister={() => handleOpenRegister()} onNavigate={handleNavigate} />
          </>
        )}
        {activeView === "gallery" && (
          <>
            <GallerySection />
            <Footer onOpenRegister={() => handleOpenRegister()} onNavigate={handleNavigate} />
          </>
        )}
        {activeView === "contact" && (
          <>
            <ContactSection />
            <Footer onOpenRegister={() => handleOpenRegister()} onNavigate={handleNavigate} />
          </>
        )}
      </main>

      {/* Central Registration Information Modal */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={handleCloseRegister}
        selectedProgram={registerTargetProgram}
      />
    </div>
  );
}
