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


// ── Exported mutable constants ─────────────────────────────────────────────
export let PROJECTS: Project[] = [];
export let STATS: { label: string; value: string; color: string }[] = [];

export interface Project {
  id:           number;
  name:         string;
  full_name:    string;
  owner:        string;
  owner_avatar: string;
  description:  string;
  language:     string;
  langColor:    string;
  stars:        number;
  watchers:     number;
  forks:        number;
  open_issues:  number;
  size:         number;
  status:       Status;
  visibility:   string;
  topics:       string[];
  homepage:     string | null;
  license:      string | null;
  created_at:   string;
  updated_at:   string;
  pushed_at:    string;
  is_fork:      boolean;
  archived:     boolean;
  has_wiki:     boolean;
  has_pages:    boolean;
  href:         string;
}

interface GithubRepoResponse {
  id:            number;
  name:          string;
  full_name:     string;
  owner:         string;
  owner_avatar:  string;
  description:   string | null;
  language:      string;
  stars:         number;
  watchers:      number;
  forks:         number;
  open_issues:   number;
  network_count: number;
  size:          number;
  topics:        string[];
  visibility:    string;
  status:        Status;
  created_at:    string;
  updated_at:    string;
  pushed_at:     string;
  homepage:      string | null;
  license:       string | null;
  url:           string;
  is_fork:       boolean;
  archived:      boolean;
  disabled:      boolean;
  has_wiki:      boolean;
  has_pages:     boolean;
  is_template:   boolean;
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
    id:           r.id,
    name:         r.name,
    full_name:    r.full_name,
    owner:        r.owner,
    owner_avatar: r.owner_avatar,
    description:  r.description ?? "",
    language:     r.language ?? "Unknown",
    langColor:    LANGUAGE_COLORS[r.language] ?? "#8b8b8b",
    stars:        r.stars,
    watchers:     r.watchers,
    forks:        r.forks,
    open_issues:  r.open_issues,
    size:         r.size,
    status:       r.status,
    visibility:   r.visibility,
    topics:       r.topics ?? [],
    homepage:     r.homepage,
    license:      r.license,
    created_at:   r.created_at,
    updated_at:   r.updated_at,
    pushed_at:    r.pushed_at,
    is_fork:      r.is_fork,
    archived:     r.archived,
    has_wiki:     r.has_wiki,
    has_pages:    r.has_pages,
    href:         r.url,
  }));

  STATS = [
    { label: "Repositories", value: `${statsData.repositories}+`, color: "var(--accent)"  },
    { label: "Open Source",  value: `${statsData.open_source}`,   color: "var(--accent2)" },
    { label: "Total Stars",  value: `${statsData.total_stars}`,   color: "var(--accent3)" },
  ];

  return { projects: PROJECTS, stats: STATS };
}