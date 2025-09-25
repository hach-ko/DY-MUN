import { BookOpen, FileText, Video, Download, Play } from "lucide-react";

export interface ResourceLink {
  icon: any;
  text: string;
  href?: string;
}

export interface ResourceCategory {
  icon: any;
  title: string;
  description: string;
  links: ResourceLink[];
}

export const committeeResources: Record<string, ResourceCategory[]> = {
  "All Committees": [
    {
      icon: BookOpen,
      title: "General Study Guides",
      description: "Comprehensive guides covering UN procedures, diplomatic protocols, and committee structures.",
      links: [
        { icon: Download, text: "Rules of Procedure", href: "#" },
        { icon: Download, text: "Delegate Handbook", href: "#" },
        { icon: Download, text: "Research Techniques", href: "#" },
      ],
    },
    {
      icon: FileText,
      title: "General Templates",
      description: "Ready-to-use templates for position papers, resolutions, and working papers.",
      links: [
        { icon: Download, text: "Position Paper Template", href: "#" },
        { icon: Download, text: "Resolution Format", href: "#" },
        { icon: Download, text: "Working Paper Guide", href: "#" },
      ],
    },
    {
      icon: Video,
      title: "General Video Tutorials",
      description: "Expert-led video content covering speaking techniques, negotiation skills, and debate strategies.",
      links: [
        { icon: Play, text: "Public Speaking Mastery", href: "#" },
        { icon: Play, text: "Negotiation Tactics", href: "#" },
        { icon: Play, text: "Committee Dynamics", href: "#" },
      ],
    },
  ],
  "Harry Potter": [
    {
      icon: BookOpen,
      title: "Magical World Study Guides",
      description: "Essential guides for understanding wizarding law, magical infrastructure, and post-war governance.",
      links: [
        { icon: Download, text: "Wizarding Law Handbook", href: "#" },
        { icon: Download, text: "Magical Infrastructure Guide", href: "#" },
        { icon: Download, text: "Post-War Recovery Strategies", href: "#" },
      ],
    },
    {
      icon: FileText,
      title: "Magical Templates",
      description: "Specialized templates for magical legislation and wizarding world documentation.",
      links: [
        { icon: Download, text: "Magical Legislation Template", href: "#" },
        { icon: Download, text: "Wizarding Constitution Format", href: "#" },
        { icon: Download, text: "Magic Rights Declaration", href: "#" },
      ],
    },
  ],
  "Disney": [
    {
      icon: BookOpen,
      title: "Magical Regulation Studies",
      description: "Resources for understanding magical abilities governance and fantasy world law.",
      links: [
        { icon: Download, text: "Magic Regulation Handbook", href: "#" },
        { icon: Download, text: "Fantasy Character Rights", href: "#" },
        { icon: Download, text: "Magical Law Enforcement", href: "#" },
      ],
    },
  ],
  "FIFA": [
    {
      icon: BookOpen,
      title: "Sports Ethics & Equality",
      description: "Resources addressing discrimination, equality, and fair play in global football.",
      links: [
        { icon: Download, text: "Anti-Discrimination Policies", href: "#" },
        { icon: Download, text: "Football Equality Guidelines", href: "#" },
        { icon: Download, text: "Fair Play Protocols", href: "#" },
      ],
    },
  ],
  "CTC": [
    {
      icon: BookOpen,
      title: "Counter-Terrorism Resources",
      description: "Specialized materials on terrorist financing, financial networks, and security measures.",
      links: [
        { icon: Download, text: "Terrorist Financing Analysis", href: "#" },
        { icon: Download, text: "Financial Network Mapping", href: "#" },
        { icon: Download, text: "Security Resolution Templates", href: "#" },
      ],
    },
    {
      icon: Video,
      title: "Security Committee Training",
      description: "Expert analysis on counter-terrorism strategies and international security.",
      links: [
        { icon: Play, text: "Counter-Terrorism Strategies", href: "#" },
        { icon: Play, text: "Financial Crime Investigation", href: "#" },
        { icon: Play, text: "International Security Law", href: "#" },
      ],
    },
  ],
  "UNOOSA": [
    {
      icon: BookOpen,
      title: "Space Law & Policy",
      description: "Comprehensive resources on space governance, technology regulation, and international space law.",
      links: [
        { icon: Download, text: "Space Law Compendium", href: "#" },
        { icon: Download, text: "Space Technology Guidelines", href: "#" },
        { icon: Download, text: "Outer Space Treaty Analysis", href: "#" },
      ],
    },
  ],
  "IPL": [
    {
      icon: FileText,
      title: "Auction Strategy Materials",
      description: "Resources for understanding cricket economics, player valuation, and auction dynamics.",
      links: [
        { icon: Download, text: "Auction Strategy Guide", href: "#" },
        { icon: Download, text: "Player Valuation Matrix", href: "#" },
        { icon: Download, text: "Team Building Framework", href: "#" },
      ],
    },
  ],
  "SDG 5": [
    {
      icon: BookOpen,
      title: "Gender Equality Resources",
      description: "Materials focusing on gender representation, political participation, and equality frameworks.",
      links: [
        { icon: Download, text: "Gender Equality Framework", href: "#" },
        { icon: Download, text: "Political Representation Guide", href: "#" },
        { icon: Download, text: "Women's Rights Handbook", href: "#" },
      ],
    },
  ],
  "ECOFIN": [
    {
      icon: BookOpen,
      title: "Economic & Financial Studies",
      description: "Advanced materials on global economics, currency systems, and financial policy.",
      links: [
        { icon: Download, text: "Multi-Currency System Analysis", href: "#" },
        { icon: Download, text: "Dollar Dominance Report", href: "#" },
        { icon: Download, text: "Global Financial Architecture", href: "#" },
      ],
    },
    {
      icon: Video,
      title: "Economic Policy Seminars",
      description: "Expert lectures on international finance and economic diplomacy.",
      links: [
        { icon: Play, text: "Currency Wars & Policy", href: "#" },
        { icon: Play, text: "International Trade Systems", href: "#" },
        { icon: Play, text: "Financial Crisis Management", href: "#" },
      ],
    },
  ],
  "UNSC": [
    {
      icon: BookOpen,
      title: "Security Council Resources",
      description: "Essential materials on international security, conflict resolution, and peacekeeping.",
      links: [
        { icon: Download, text: "Security Council Handbook", href: "#" },
        { icon: Download, text: "Conflict Resolution Guide", href: "#" },
        { icon: Download, text: "Peacekeeping Operations Manual", href: "#" },
      ],
    },
    {
      icon: Video,
      title: "Security Council Simulations",
      description: "Training videos on Security Council procedures and crisis management.",
      links: [
        { icon: Play, text: "Crisis Management Simulation", href: "#" },
        { icon: Play, text: "Security Council Procedures", href: "#" },
        { icon: Play, text: "Resolution Drafting Workshop", href: "#" },
      ],
    },
  ],
  "AIPPM": [
    {
      icon: BookOpen,
      title: "Indian Political System",
      description: "Resources on Indian democracy, judicial systems, and political party dynamics.",
      links: [
        { icon: Download, text: "Indian Judicial System Guide", href: "#" },
        { icon: Download, text: "Political Party Handbook", href: "#" },
        { icon: Download, text: "Democratic Reform Analysis", href: "#" },
      ],
    },
  ],
  "ICJ": [
    {
      icon: BookOpen,
      title: "International Legal Resources",
      description: "Materials on international law, genocide convention, and judicial procedures.",
      links: [
        { icon: Download, text: "International Law Compendium", href: "#" },
        { icon: Download, text: "Genocide Convention Analysis", href: "#" },
        { icon: Download, text: "ICJ Procedures Manual", href: "#" },
      ],
    },
    {
      icon: FileText,
      title: "Legal Case Templates",
      description: "Specialized templates for legal briefs and international court submissions.",
      links: [
        { icon: Download, text: "Legal Brief Template", href: "#" },
        { icon: Download, text: "Court Submission Format", href: "#" },
        { icon: Download, text: "Evidence Presentation Guide", href: "#" },
      ],
    },
  ],
  "HCC": [
    {
      icon: BookOpen,
      title: "Cold War Historical Resources",
      description: "Comprehensive materials on Cold War history, nuclear policy, and crisis management.",
      links: [
        { icon: Download, text: "Cold War Timeline", href: "#" },
        { icon: Download, text: "Nuclear Policy Analysis", href: "#" },
        { icon: Download, text: "Crisis Documentation", href: "#" },
      ],
    },
  ],
  "IP": [
    {
      icon: BookOpen,
      title: "International Press Guidelines",
      description: "Resources for international journalism, press ethics, and media coverage of diplomatic events.",
      links: [
        { icon: Download, text: "Press Ethics Handbook", href: "#" },
        { icon: Download, text: "Diplomatic Reporting Guide", href: "#" },
        { icon: Download, text: "Media Coverage Standards", href: "#" },
      ],
    },
    {
      icon: Video,
      title: "Journalism Training",
      description: "Professional training materials for international press coverage and reporting.",
      links: [
        { icon: Play, text: "Diplomatic Journalism", href: "#" },
        { icon: Play, text: "International Reporting", href: "#" },
        { icon: Play, text: "Press Conference Coverage", href: "#" },
      ],
    },
  ],
};