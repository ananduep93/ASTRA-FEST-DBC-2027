import React, { useState } from "react";
import {
  MapPin,
  Phone,
  MessageCircle,
  ExternalLink,
  Send,
  Copy,
  Check,
} from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { siteConfig } from "../data/siteConfig";
import { Reveal } from "./motion/Reveal";

export function ContactSection() {
  const [copiedNumber, setCopiedNumber] = useState(false);
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryCollege, setInquiryCollege] = useState("");
  const [inquiryText, setInquiryText] = useState("");

  const handleCopyPhone = () => {
    navigator.clipboard.writeText("8075480258");
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2500);
  };

  const handleSendInquiry = (e) => {
    e.preventDefault();
    const message = encodeURIComponent(
      `Hello ASTRA 2K27 Committee,\n\nName: ${inquiryName || "Collegiate Representative"}\nCollege: ${inquiryCollege || "College Contingent"}\nInquiry: ${inquiryText || "Regarding event registration and schedule"}`
    );
    window.open(`https://wa.me/918075480258?text=${message}`, "_blank");
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-[#09090B] border-b border-[#27272A] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Step 1: Heading Reveal */}
        <Reveal direction="up" amount={0.25}>
          <SectionHeading
            tag="03 // LIAISON & HELPLINE"
            title="Direct Campus Contacts"
            subtitle="Reach out to the Don Bosco College organizing committee for contingency group registration, rules clarification, and venue logistics."
          />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Left Column: Campus Info & Key Coordinators */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* College Venue Information Card */}
            <Reveal direction="up" delay={0.1} amount={0.2}>
              <div className="bg-[#121215] p-6 sm:p-8 rounded-xl border border-[#27272A]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0055FF]">
                    VENUE IDENTIFICATION
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black font-['Space_Grotesk'] text-white mb-1 uppercase">
                  Don Bosco College, Mampetta
                </h3>
                <p className="text-xs sm:text-sm text-[#71717A] mb-4 font-mono">
                  Affiliated to the University of Calicut
                </p>

                <div className="space-y-3 text-xs sm:text-sm text-[#A1A1AA] mb-6">
                  <div className="flex items-start gap-2.5">
                    <MapPin size={16} className="text-[#0055FF] shrink-0 mt-0.5" />
                    <span>
                      Mampetta, Mukkam, Kozhikode District, Kerala, India - 673602
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone size={16} className="text-[#0055FF] shrink-0" />
                    <span>Desk: +91 8075480258 (Head Student Coordinator)</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={siteConfig.college.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[44px] inline-flex items-center gap-1.5 px-4 py-2.5 bg-white text-black hover:bg-[#0055FF] hover:text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
                  >
                    <MapPin size={14} />
                    <span>Open in Maps</span>
                    <ExternalLink size={12} />
                  </a>

                  <button
                    onClick={handleCopyPhone}
                    className="min-h-[44px] inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#18181B] text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl border border-[#27272A] hover:border-[#3F3F46] transition-colors cursor-pointer"
                  >
                    {copiedNumber ? <Check size={14} className="text-[#0055FF]" /> : <Copy size={14} />}
                    <span>{copiedNumber ? "Copied +91 8075480258" : "Copy Helpline"}</span>
                  </button>
                </div>
              </div>
            </Reveal>

            {/* Department Coordinators Roster Card */}
            <Reveal direction="up" delay={0.15} amount={0.2}>
              <div className="bg-[#121215] p-6 sm:p-8 rounded-xl border border-[#27272A]">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#27272A]">
                  <h4 className="text-base sm:text-lg font-bold font-['Space_Grotesk'] text-white uppercase">
                    Departmental Coordinators
                  </h4>
                  <span className="text-[10px] font-mono font-bold uppercase bg-[#18181B] text-[#A1A1AA] px-2 py-0.5 rounded border border-[#27272A]">
                    FACULTY & LEADS
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {siteConfig.coordinators.departmentCoordinators.map((dept) => (
                    <div
                      key={dept.dept}
                      className="p-3 bg-[#18181B] rounded-xl border border-[#27272A]"
                    >
                      <span className="text-[10px] font-mono font-bold uppercase text-[#0055FF] block mb-0.5">
                        {dept.dept}
                      </span>
                      <p className="font-extrabold text-white">
                        {dept.leads.join(" & ")}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-[#27272A] text-xs text-[#71717A]">
                  <span className="font-bold text-white">Faculty Leads: </span>
                  <span>Liju Joseph, Vidhya, Akshaya, Rabith, Santhosh</span>
                </div>
              </div>
            </Reveal>

          </div>

          {/* Right Column: Direct WhatsApp Query / Contingent Desk */}
          <div className="lg:col-span-5">
            <Reveal direction="left" delay={0.2} amount={0.2}>
              <div className="bg-[#121215] p-6 sm:p-8 rounded-xl border border-[#27272A]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-[#25D366] text-white flex items-center justify-center font-bold">
                    <MessageCircle size={18} />
                  </div>
                  <div>
                    <h4 className="text-lg sm:text-xl font-bold font-['Space_Grotesk'] text-white uppercase">
                      WhatsApp Desk
                    </h4>
                    <span className="text-[11px] font-mono text-[#71717A]">
                      Anandu EP (Student Lead)
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#A1A1AA] mb-5 leading-relaxed">
                  Representing a college contingent or need priority registration assistance?
                  Drop your details below to start a direct WhatsApp inquiry.
                </p>

                <form onSubmit={handleSendInquiry} className="space-y-4">
                  <div>
                    <label htmlFor="inquiry-name" className="block text-xs font-mono font-bold uppercase tracking-wider text-[#A1A1AA] mb-1">
                      Your Name
                    </label>
                    <input
                      id="inquiry-name"
                      name="inquiryName"
                      type="text"
                      required
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      placeholder="e.g. Rahul Menon"
                      className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-[#18181B] border border-[#27272A] text-xs sm:text-sm font-medium text-white placeholder-[#71717A] focus:outline-none focus:border-[#0055FF]"
                    />
                  </div>

                  <div>
                    <label htmlFor="inquiry-college" className="block text-xs font-mono font-bold uppercase tracking-wider text-[#A1A1AA] mb-1">
                      College / Institution
                    </label>
                    <input
                      id="inquiry-college"
                      name="inquiryCollege"
                      type="text"
                      required
                      value={inquiryCollege}
                      onChange={(e) => setInquiryCollege(e.target.value)}
                      placeholder="e.g. Farook College, Calicut"
                      className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-[#18181B] border border-[#27272A] text-xs sm:text-sm font-medium text-white placeholder-[#71717A] focus:outline-none focus:border-[#0055FF]"
                    />
                  </div>

                  <div>
                    <label htmlFor="inquiry-text" className="block text-xs font-mono font-bold uppercase tracking-wider text-[#A1A1AA] mb-1">
                      Query / Message
                    </label>
                    <textarea
                      id="inquiry-text"
                      name="inquiryText"
                      rows={3}
                      required
                      value={inquiryText}
                      onChange={(e) => setInquiryText(e.target.value)}
                      placeholder="Ask about team slots, accommodation, or rules..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#18181B] border border-[#27272A] text-xs sm:text-sm font-medium text-white placeholder-[#71717A] focus:outline-none focus:border-[#0055FF]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full min-h-[44px] py-3 px-5 bg-[#0055FF] text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-[#0055FF]/20 hover:bg-[#2563EB] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send size={14} />
                    <span>Start Direct WhatsApp Chat</span>
                  </button>
                </form>
              </div>
            </Reveal>
          </div>

        </div>

      </div>
    </section>
  );
}
