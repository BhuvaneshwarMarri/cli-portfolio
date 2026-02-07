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

export const sections: Record<
  Section,
  { icon: any; content: string }
> = {
  home: {
    icon: User,
    content: "Welcome to my TUI portfolio.",
  },
  education: {
    icon: GraduationCap,
    content: "B.Tech in Computer Science",
  },
  skills: {
    icon: Code,
    content: "React, TypeScript, Linux",
  },
  projects: {
    icon: Folder,
    content: "Terminal Portfolio, Dev Tools",
  },
  experience: {
    icon: Briefcase,
    content: "Full Stack Developer",
  },
  contact: {
    icon: Mail,
    content: "bhuvan@example.com",
  },
};
