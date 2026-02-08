import {
  User,
  GraduationCap,
  Code,
  Folder,
  Briefcase,
  Mail,
} from "lucide-react";

export type Section =
  | "home"
  | "education"
  | "skills"
  | "projects"
  | "experience"
  | "contact";

export const sectionMetadata: Record<
  Section,
  { icon: any; title: string; description: string }
> = {
  home: {
    icon: User,
    title: "About Me",
    description: "Welcome to my TUI portfolio.",
  },
  education: {
    icon: GraduationCap,
    title: "Education",
    description: "My academic background and achievements.",
  },
  skills: {
    icon: Code,
    title: "Skills",
    description: "Technologies and tools I work with.",
  },
  projects: {
    icon: Folder,
    title: "Projects",
    description: "Things I've built and contributed to.",
  },
  experience: {
    icon: Briefcase,
    title: "Experience",
    description: "My professional journey.",
  },
  contact: {
    icon: Mail,
    title: "Contact",
    description: "Let's connect!",
  },
};