// constants.ts

export type Section =
  | "home"
  | "education"
  | "skills"
  | "projects"
  | "experience"
  | "contact";

export type FocusArea = "sidebar" | "content";

export const FONTS = [
  { name: "JetBrains Mono", css: "'JetBrains Mono', monospace" },
  { name: "Fira Code", css: "'Fira Code', monospace" },
  { name: "Courier New", css: "'Courier New', monospace" },
  { name: "IBM Plex Mono", css: "'IBM Plex Mono', monospace" },
  { name: "Source Code Pro", css: "'Source Code Pro', monospace" },
];

export const SECTIONS: Section[] = [
  "home",
  "education",
  "skills",
  "projects",
  "experience",
  "contact",
];

export const SECTION_ICONS: Record<Section, string> = {
  home: "~",
  education: "∑",
  skills: "λ",
  projects: "◈",
  experience: "⌘",
  contact: "@",
};

export const SECTION_LABELS: Record<Section, string> = {
  home: "home.md",
  education: "education.md",
  skills: "skills.md",
  projects: "projects.md",
  experience: "experience.md",
  contact: "contact.md",
};