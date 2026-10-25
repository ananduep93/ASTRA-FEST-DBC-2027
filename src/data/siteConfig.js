/**
 * ASTRA 2K27 | ASTRA: PULSE - Central Site Configuration
 * All official details are kept separate and easily configurable.
 */

export const siteConfig = {
  festivalName: "ASTRA 2K27",
  edition: "2K27",
  variant: "PULSE",
  tagline: "A NEW WAVE. A NEW ENERGY.",
  subtitle: "Inter-College Arts & Cultural Festival",
  college: {
    name: "Don Bosco College",
    campus: "Mampetta",
    location: "Mampetta, Mukkam, Kozhikode, Kerala 673602",
    affiliation: "Affiliated to the University of Calicut",
    mapUrl: "https://maps.google.com/?q=Don+Bosco+College+Mampetta+Mukkam+Kerala",
  },
  dates: {
    display: "February 20, 2027",
    statusNote: "Official Date Announcement (Tentative Schedule)",
    duration: "One-Day Mega Festival",
  },
  registration: {
    // Current registration phase: 'comingSoon' | 'open' | 'closed'
    status: "comingSoon",
    announcement: "Online Registration Portal Opens Shortly",
    helperText: "Online slot booking and team entries will go live upon official release. In the meantime, you can review program rules and contact event coordinators.",
    contactLead: "Anandu EP",
    contactPhone: "+91 8075480258",
    whatsappUrl: "https://wa.me/918075480258?text=Hello%20Anandu,%20I%20have%20an%20inquiry%20regarding%20ASTRA%202K27%20registration.",
  },
  stats: [
    { label: "Flagship Events", value: "15" },
    { label: "Competing Colleges", value: "40+" },
    { label: "Prize Pool Value", value: "₹75K+" },
    { label: "Cultural Stages", value: "4" },
  ],
  coordinators: {
    facultyLead: [
      { name: "Liju Joseph", role: "General Faculty Coordinator" },
      { name: "Vidhya", role: "Finance & General Coordinator" },
      { name: "Akshaya", role: "Stage & General Coordinator" },
      { name: "Rabith", role: "Finance & General Coordinator" },
      { name: "Santhosh", role: "General Coordinator" },
    ],
    departmentCoordinators: [
      { dept: "Computer Science", leads: ["Amrutha", "Archana"] },
      { dept: "Management (BBA)", leads: ["Pranav", "Aswani"] },
      { dept: "Commerce (B.Com)", leads: ["Sheeja", "Yadhav"] },
      { dept: "Social Work (BSW)", leads: ["Athira", "Harsha"] },
    ],
    studentCore: [
      { name: "Anandu EP", role: "Head Student Coordinator & Tech Lead", phone: "8075480258" },
      { name: "Shimil Manoj", role: "Technical Coordinator" },
      { name: "Safwan", role: "Media & Broadcast Lead" },
      { name: "Sharon", role: "Media Coordinator" },
      { name: "Anjana Johnson", role: "Registration Desk Lead" },
      { name: "Leena Kumari", role: "Registration Desk Lead" },
      { name: "Jibin Jimmi", role: "Sound & Stage Operations" },
      { name: "Irfan", role: "Promotions & Public Relations" },
    ],
  },
  socials: [
    { name: "Instagram", url: "https://instagram.com/astrafest", label: "@astrafest" },
    { name: "WhatsApp Desk", url: "https://wa.me/918075480258", label: "+91 80754 80258" },
  ],
};
