export const JOBS = [
  {
    title   : "Full Stack Developer",
    company : "Tech Company",
    period  : "Jan 2023 – Present",
    duration: "1 yr 2 mo",
    status  : "ACTIVE" as const,
    type    : "Full-time",
    location: "Remote",
    stack   : ["React", "Node.js", "PostgreSQL", "AWS", "Docker"],
    bullets : [
      "Built & maintained full-stack web applications serving 10k+ daily users.",
      "Reduced page load time by 40% through code splitting, caching & lazy loading.",
      "Mentored 3 junior developers; led weekly code reviews and pair sessions.",
      "Architected CI/CD pipelines, cutting deployment time by 60%.",
    ],
    metrics: [
      { label: "Performance", value: "+40%", color: "var(--accent)"  },
      { label: "Deploy Speed", value: "+60%", color: "var(--accent2)" },
      { label: "Coverage",    value: "92%",  color: "var(--accent3)" },
    ],
  },
  {
    title   : "Software Engineering Intern",
    company : "Startup Inc.",
    period  : "Jun 2022 – Dec 2022",
    duration: "7 mo",
    status  : "PAST" as const,
    type    : "Internship",
    location: "Hybrid",
    stack   : ["React", "TypeScript", "Redux", "Git", "REST APIs"],
    bullets : [
      "Engineered responsive UIs and internal dashboard tools used daily by 200+ employees.",
      "Migrated legacy codebase from JavaScript to TypeScript, reducing runtime errors by 35%.",
      "Collaborated in Agile sprints — delivered 8 features across 4 release cycles.",
    ],
    metrics: [
      { label: "Bug Reduction", value: "−35%", color: "var(--accent2)" },
      { label: "Features",     value: "8",    color: "var(--accent)"  },
      { label: "Sprints",      value: "4",    color: "var(--accent3)" },
    ],
  },
];

export const SKILL_MATRIX = [
  { label: "React / TS",    level: 9, color: "var(--accent)"  },
  { label: "Node / Express",level: 8, color: "var(--accent2)" },
  { label: "Databases",     level: 8, color: "var(--accent2)" },
  { label: "Docker / K8s",  level: 6, color: "var(--accent3)" },
  { label: "System Design", level: 7, color: "var(--accent)"  },
  { label: "UI / UX",       level: 6, color: "var(--text-dim)"},
];
