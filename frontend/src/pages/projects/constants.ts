// ─── Project data ──────────────────────────────────────────────────────────────

export const PROJECTS = [
  {
    name       : "cli-portfolio",
    owner      : "BhuvaneshwarMarri",
    description: "A dual-mode interactive portfolio — Terminal CLI and Bvim TUI — built with React & TypeScript. Vim-inspired keyboard nav, 5 themes, custom command parser.",
    language   : "TypeScript",
    langColor  : "#3178c6",
    stars      : 12,
    forks      : 3,
    status     : "Active" as const,
    visibility : "Public",
    topics     : ["react", "typescript", "vite", "tui", "portfolio"],
    updatedAgo : "2 days ago",
    href       : "https://github.com/BhuvaneshwarMarri/cli-portfolio",
    size       : "142 KB",
    issues     : 2,
  },
  {
    name       : "sg-games-platform",
    owner      : "BhuvaneshwarMarri",
    description: "Real-time multiplayer gaming platform with WebSocket, user auth, and leaderboards. Responsive game UI components built with React.",
    language   : "JavaScript",
    langColor  : "#f7df1e",
    stars      : 7,
    forks      : 1,
    status     : "In Progress" as const,
    visibility : "Public",
    topics     : ["react", "nodejs", "websocket", "multiplayer"],
    updatedAgo : "1 week ago",
    href       : "https://github.com/BhuvaneshwarMarri/sg-games-platform",
    size       : "89 KB",
    issues     : 4,
  },
  {
    name       : "agentic-ai-tools",
    owner      : "BhuvaneshwarMarri",
    description: "Autonomous AI developer tooling — natural language code generation, multi-agent orchestration pipelines powered by LangChain and OpenAI.",
    language   : "Python",
    langColor  : "#3572A5",
    stars      : 29,
    forks      : 5,
    status     : "Research" as const,
    visibility : "Public",
    topics     : ["python", "langchain", "openai", "agents", "ai"],
    updatedAgo : "3 days ago",
    href       : "https://github.com/BhuvaneshwarMarri/agentic-ai-tools",
    size       : "234 KB",
    issues     : 1,
  },
  {
    name       : "devops-automation",
    owner      : "BhuvaneshwarMarri",
    description: "Infrastructure-as-code toolkit with Terraform, Ansible playbooks, and GitHub Actions workflows for automated cloud deployments.",
    language   : "HCL",
    langColor  : "#844fba",
    stars      : 5,
    forks      : 0,
    status     : "Active" as const,
    visibility : "Public",
    topics     : ["terraform", "ansible", "devops", "cicd"],
    updatedAgo : "2 weeks ago",
    href       : "https://github.com/BhuvaneshwarMarri/devops-automation",
    size       : "56 KB",
    issues     : 0,
  },
];

export type Status = "Active" | "In Progress" | "Research";

export const STATUS_STYLE: Record<Status, { text: string; border: string; bg: string }> = {
  "Active"     : { text: "var(--accent2)", border: "var(--accent2)", bg: "color-mix(in srgb, var(--accent2) 12%, transparent)" },
  "In Progress": { text: "var(--accent)",  border: "var(--accent)",  bg: "color-mix(in srgb, var(--accent)  12%, transparent)" },
  "Research"   : { text: "var(--accent3)", border: "var(--accent3)", bg: "color-mix(in srgb, var(--accent3) 12%, transparent)" },
};

export const STATS = [
  { label: "Repositories", value: "10+",  color: "var(--accent)"  },
  { label: "Open Source",  value: "6",    color: "var(--accent2)" },
  { label: "Total Stars",  value: "53",   color: "var(--accent3)" },
  { label: "Total Forks",  value: "9",    color: "var(--text-dim)"},
];
