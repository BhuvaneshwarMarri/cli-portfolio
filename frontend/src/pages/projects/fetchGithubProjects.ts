// ── Types ──────────────────────────────────────────────────────────────────
export type Status = "Active" | "In Progress" | "Research";

// ── Style map (static) ─────────────────────────────────────────────────────
export const STATUS_STYLE: Record<Status, { text: string; border: string; bg: string }> = {
  "Active"     : { text: "var(--accent2)", border: "var(--accent2)", bg: "color-mix(in srgb, var(--accent2) 12%, transparent)" },
  "In Progress": { text: "var(--accent)",  border: "var(--accent)",  bg: "color-mix(in srgb, var(--accent)  12%, transparent)" },
  "Research"   : { text: "var(--accent3)", border: "var(--accent3)", bg: "color-mix(in srgb, var(--accent3) 12%, transparent)" },
};

// ── Helpers ────────────────────────────────────────────────────────────────
const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  Python:     "#3572A5",
  HCL:        "#844fba",
  Rust:       "#dea584",
  Go:         "#00ADD8",
  Java:       "#b07219",
  "C++":      "#f34b7d",
  Ruby:       "#701516",
  Shell:      "#89e051",
};

const STATUS_OVERRIDES: Record<string, Status> = {
  // "sg-games-platform": "In Progress",
};

function inferStatus(name: string, topics: string[]): Status {
  if (STATUS_OVERRIDES[name])         return STATUS_OVERRIDES[name];
  if (topics.includes("research"))    return "Research";
  if (topics.includes("in-progress")) return "In Progress";
  return "Active";
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86_400_000);
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 7)  return `${days} days ago`;
  if (days < 14) return "1 week ago";
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  if (days < 60) return "1 month ago";
  return `${Math.floor(days / 30)} months ago`;
}

// ── Exported mutable constants ─────────────────────────────────────────────
export let PROJECTS: Project[] = [];
export let STATS: { label: string; value: string; color: string }[] = [];

export interface Project {
  name:        string;
  owner:       string;
  description: string;
  language:    string;
  langColor:   string;
  stars:       number;
  status:      Status;
  visibility:  string;
  topics:      string[];
  updatedAgo:  string;
  href:        string;
}

interface GithubRepoResponse {
  name: string;
  description: string | null;
  language: string ;
  stars: number;
  topics: string[];
  visibility: string;
  updated_at: string;
  url: string;
}

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

// ── Main fetch — hits your FastAPI backend ─────────────────────────────────
export async function fetchGithubProjects() {
  const [reposRes, statsRes] = await Promise.all([
    fetch(`${API_BASE}/projects`),
    fetch(`${API_BASE}/projects/stats`),
  ]);

  if (!reposRes.ok) throw new Error(`Repos fetch failed: ${reposRes.status}`);
  if (!statsRes.ok) throw new Error(`Stats fetch failed: ${statsRes.status}`);

  const repos = await reposRes.json();
  const statsData = await statsRes.json();

  PROJECTS = repos.map((r: GithubRepoResponse): Project => ({
    name:        r.name,
    owner:       "BhuvaneshwarMarri",           // or add owner to backend response
    description: r.description ?? "",
    language:    r.language ?? "Unknown",
    langColor:   LANGUAGE_COLORS[r.language] ?? "#8b8b8b",
    stars:       r.stars,
    status:      inferStatus(r.name, r.topics ?? []),
    visibility:  r.visibility,
    topics:      r.topics ?? [],
    updatedAgo:  timeAgo(r.updated_at),
    href:        r.url,
  }));

  STATS = [
    { label: "Repositories", value: `${statsData.repositories}+`, color: "var(--accent)"  },
    { label: "Open Source",  value: `${statsData.open_source}`,   color: "var(--accent2)" },
    { label: "Total Stars",  value: `${statsData.total_stars}`,   color: "var(--accent3)" },
  ];

  return { projects: PROJECTS, stats: STATS };
}