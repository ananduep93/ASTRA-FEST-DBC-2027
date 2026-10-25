import React from "react";
import { Search, X } from "lucide-react";
import { PROGRAM_CATEGORIES } from "../data/programs";

export function ProgramFilters({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  totalCount,
  filteredCount,
}) {
  return (
    <div className="mb-10 space-y-4">
      {/* Search and Metadata Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#71717A]">
            <Search size={16} />
          </div>
          <label htmlFor="event-search" className="sr-only">
            Search events
          </label>
          <input
            id="event-search"
            name="eventSearch"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search events (e.g. Fashion, Coding, Quiz)..."
            className="w-full pl-10 pr-10 py-2.5 bg-[#121215] border border-[#27272A] rounded-xl text-xs sm:text-sm font-medium text-white placeholder-[#71717A] focus:outline-none focus:border-[#0055FF] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#71717A] hover:text-white"
              aria-label="Clear search"
            >
              <X size={15} />
            </button>
          )}
        </div>

        {/* Results Counter Pill */}
        <div className="inline-flex items-center gap-2 self-start sm:self-center px-3.5 py-1.5 rounded-full bg-[#121215] border border-[#27272A] text-xs font-mono font-bold text-[#A1A1AA]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0055FF]" />
          <span>
            {filteredCount} of {totalCount} Events
          </span>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {PROGRAM_CATEGORIES.map((cat) => {
          const isSelected = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 border cursor-pointer ${
                isSelected
                  ? "bg-white text-black border-white shadow-sm"
                  : "bg-[#121215] text-[#A1A1AA] border-[#27272A] hover:border-[#3F3F46] hover:text-white"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}
