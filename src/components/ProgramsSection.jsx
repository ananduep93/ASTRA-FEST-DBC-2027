import React, { useState, useMemo } from "react";
import { SectionHeading } from "./SectionHeading";
import { ProgramFilters } from "./ProgramFilters";
import { ProgramCard } from "./ProgramCard";
import { ProgramDetails } from "./ProgramDetails";
import { programsData } from "../data/programs";
import { Reveal } from "./motion/Reveal";
import { Sparkles, RefreshCcw } from "lucide-react";

export function ProgramsSection({ onOpenRegister }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProgram, setSelectedProgram] = useState(null);

  // Filter programs based on active category and search query
  const filteredPrograms = useMemo(() => {
    return programsData.filter((prog) => {
      const matchesCategory =
        activeCategory === "All" || prog.category === activeCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        prog.name.toLowerCase().includes(q) ||
        prog.subtitle.toLowerCase().includes(q) ||
        prog.category.toLowerCase().includes(q) ||
        prog.description.toLowerCase().includes(q) ||
        prog.badge.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleResetFilters = () => {
    setActiveCategory("All");
    setSearchQuery("");
  };

  return (
    <section id="programs" className="py-16 sm:py-24 bg-[#09090B] border-b border-[#27272A] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Step 1 & 2: Section Heading and Sequential Intro */}
        <Reveal direction="up" amount={0.2}>
          <SectionHeading
            tag="01 // COMPETITIONS & ARENAS"
            title="15 Official Arenas"
            subtitle="Explore the complete spectrum of flagship competitions hosted at Don Bosco College, Mampetta. Review event rules, eligibility, squad sizes, and coordinator contacts."
          />
        </Reveal>

        {/* Step 3: Filters Reveal */}
        <Reveal direction="up" delay={0.12} amount={0.2} className="w-full max-w-full overflow-hidden">
          <ProgramFilters
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            totalCount={programsData.length}
            filteredCount={filteredPrograms.length}
          />
        </Reveal>

        {/* Step 4+: Sequential Program Cards Unfolding */}
        {filteredPrograms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredPrograms.map((prog, index) => (
              <ProgramCard
                key={prog.id}
                program={prog}
                index={index}
                onSelect={(p) => setSelectedProgram(p)}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <Reveal direction="scale">
            <div className="bg-[#121215] border border-dashed border-[#27272A] rounded-2xl p-8 sm:p-12 text-center max-w-md mx-auto my-12">
              <div className="w-12 h-12 rounded-full bg-[#18181B] border border-[#27272A] flex items-center justify-center mx-auto mb-4 text-[#0055FF]">
                <Sparkles size={22} />
              </div>
              <h4 className="text-xl font-bold font-['Space_Grotesk'] text-white mb-2 uppercase">
                No matching events found
              </h4>
              <p className="text-xs sm:text-sm text-[#A1A1AA] mb-6">
                No events matched "{searchQuery}" in category "{activeCategory}". Try clearing your search term or exploring All categories.
              </p>
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black font-mono font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#0055FF] hover:text-white transition-all min-h-[44px] cursor-pointer"
              >
                <RefreshCcw size={14} />
                <span>Reset All Filters</span>
              </button>
            </div>
          </Reveal>
        )}

      </div>

      {/* Program Details Modal */}
      <ProgramDetails
        program={selectedProgram}
        isOpen={!!selectedProgram}
        onClose={() => setSelectedProgram(null)}
        onRegister={(p) => onOpenRegister(p)}
      />
    </section>
  );
}
