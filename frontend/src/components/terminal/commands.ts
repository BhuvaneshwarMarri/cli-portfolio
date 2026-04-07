// commands.ts — API-driven version

import type { HistoryLine, ThemeName } from "../../portfolioTypes.ts";
import { THEMES, FONTS } from "./constants.ts";

const API = import.meta.env.VITE_API_URL;

// ─── HistoryLine builders ─────────────────────────────────────────────────────

const L    = (text: string): HistoryLine => ({ text });
const LA   = (text: string): HistoryLine => ({ text, colour: "accent"  });
const LB   = (text: string): HistoryLine => ({ text, colour: "accent2" });
const LC   = (text: string): HistoryLine => ({ text, colour: "accent3" });
const LD   = (text: string): HistoryLine => ({ text, colour: "dim"     });
const BLANK: HistoryLine                  = { text: "" };

const HEADER = (title: string, icon: string): HistoryLine[] => [
  LA("┌─────────────────────────────────────────────────┐"),
  LA(`│          ${icon} ${title.padEnd(38)}│`),
  LA("└─────────────────────────────────────────────────┘"),
  BLANK,
];

// ─── Command context ──────────────────────────────────────────────────────────

export type CommandContext = {
  theme:           ThemeName;
  fontIdx:         number;
  fontSize:        number;
  setTheme:        (t: ThemeName) => void;
  setFontIdx:      (value: number | ((i: number) => number)) => void;
  setFontSize:     (value: number | ((s: number) => number)) => void;
  setHistory:      (fn: (h: HistoryLine[]) => HistoryLine[]) => void;
  setInput:        (v: string) => void;
  setHistoryIndex: (v: number) => void;
  onEnterBvim:     () => void;
  onNavigate:      (section: string) => void;
};

export type CommandFn = (cmd: string, ctx: CommandContext) => void;

// ─── Generic async runner ─────────────────────────────────────────────────────
// Shows "loading…" immediately, then replaces with real lines (or error).

function asyncCommand(
  cmd: string,
  ctx: CommandContext,
  headerLines: HistoryLine[],
  fetcher: () => Promise<HistoryLine[]>,
) {
  const loadingMarker: HistoryLine = LD("  ⟳ Loading...");

  // Append header + spinner immediately
  ctx.setHistory(h => [...h, LA(`$ ${cmd}`), BLANK, ...headerLines, loadingMarker]);

  fetcher()
    .then(lines => {
      ctx.setHistory(h => {
        // Remove the spinner line, keep everything else
        const idx = h.lastIndexOf(loadingMarker);
        const before = idx >= 0 ? h.slice(0, idx) : h;
        return [...before, ...lines, BLANK];
      });
    })
    .catch(err => {
      console.error(err);
      ctx.setHistory(h => {
        const idx = h.lastIndexOf(loadingMarker);
        const before = idx >= 0 ? h.slice(0, idx) : h;
        return [...before, LC("  ✗ Failed to load data. Is the backend running?"), BLANK];
      });
    });
}

// ─── home ─────────────────────────────────────────────────────────────────────
// Endpoints: /home/links, /home/interests
// (skip /home/commands — it's meta-info we already have statically)

async function fetchHomeLines(): Promise<HistoryLine[]> {
  const [linksRes, interestsRes] = await Promise.all([
    fetch(`${API}/home/links`),
    fetch(`${API}/home/interests`),
  ]);

  const links:     Array<{ icon: string; label: string; val: string }>   = await linksRes.json();
  const interests: Array<{ icon: string; text: string }>                 = await interestsRes.json();

  return [
    LD("  $ whoami"),   LB("    ✓ Bhuvaneshwar Marri"),
    LD("  $ role"),     L ("    Full Stack Developer · AI Enthusiast"),
    LD("  $ location"), L ("    India"),
    LD("  $ focus"),    L ("    AI · Web · Systems"),
    LD("  $ status"),   LB("    ● Open to opportunities"),
    BLANK,

    LD("  $ interests"),
    ...interests.map(i => L(`    ${i.icon}  ${i.text}`)),
    BLANK,

    LD("  $ links"),
    ...links.map(l => LA(`    ${l.icon}  ${l.label.padEnd(10)} ${l.val}`)),
    BLANK,

    LD("  tip: type 'bvim' to explore the interactive portfolio."),
  ];
}

// ─── education ────────────────────────────────────────────────────────────────
// Endpoints: /education (timeline), /education/courses

async function fetchEducationLines(): Promise<HistoryLine[]> {
  const [timelineRes, coursesRes] = await Promise.all([
    fetch(`${API}/education`),
    fetch(`${API}/education/courses`),
  ]);

  const timeline: Array<{
    year: string; title: string; place: string;
    detail: string; tags: string[]; status: "done" | "active" | "next";
  }> = await timelineRes.json();

  const courses: string[] = await coursesRes.json();

  const timelineLines: HistoryLine[] = [
    LB("  ─── Timeline ───────────────────────────────────"),
    ...timeline.flatMap(item => {
      const marker = item.status === "active" ? "◉" : item.status === "next" ? "◌" : "●";
      const lineColour = item.status === "active" ? LB : item.status === "next" ? LC : LD;
      return [
        lineColour(`  ${item.year}  ${marker}  ${item.title} · ${item.place}`),
        L(`           └─ ${item.tags.join(" · ")}`),
      ];
    }),
    BLANK,
  ];

  const courseLines: HistoryLine[] = [
    LB("  ─── Core Courses ────────────────────────────────"),
    ...courses.map((c, i) => LB(`  ${String(i + 1).padStart(2, "0")}  ✓ ${c}`)),
    BLANK,
  ];

  return [
    ...timelineLines,
    ...courseLines,
    LD("  tip: type 'bvim' to see the full visual timeline."),
  ];
}

// ─── skills ───────────────────────────────────────────────────────────────────
// Endpoint: /skills (SkillGroup[])

async function fetchSkillsLines(): Promise<HistoryLine[]> {
  const res    = await fetch(`${API}/skills`);
  const groups: Array<{
    title: string; icon: string; color: string;
    skills: Array<{ name: string; level: number; tag: string }>;
  }> = await res.json();

  const bar = (pct: number): string =>
    "█".repeat(Math.round(pct / 10)) + "░".repeat(10 - Math.round(pct / 10)) + `  ${pct}%`;

  return groups.flatMap(group => [
    LB(`  ─── ${group.icon} ${group.title} ${"─".repeat(Math.max(0, 38 - group.title.length))}`),
    ...group.skills.flatMap(s => [
      L(`  ${s.name}`),
      { text: `    ${bar(s.level)}`, colour: "accent" as const },
    ]),
    BLANK,
  ]);
}

// ─── projects ─────────────────────────────────────────────────────────────────
// Endpoint: /projects, /projects/stats

// const LANGUAGE_COLORS: Record<string, string> = {
//   TypeScript: "#3178c6", JavaScript: "#f7df1e", Python: "#3572A5",
// };

function timeAgo(dateStr: string): string {
  const days = Math.floor((Date.now() - new Date(dateStr).getTime()) / 86_400_000);
  if (days === 0) return "today";
  if (days < 7)  return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

async function fetchProjectsLines(): Promise<HistoryLine[]> {
  const [reposRes, statsRes] = await Promise.all([
    fetch(`${API}/projects`),
    fetch(`${API}/projects/stats`),
  ]);

  const repos: Array<{
    name: string; description: string | null; language: string;
    stars: number; topics: string[]; visibility: string;
    updated_at: string; url: string;
  }> = await reposRes.json();

  const stats: { repositories: number; open_source: number; total_stars: number }
    = await statsRes.json();

  const statsLines: HistoryLine[] = [
    LB("  ─── Stats ───────────────────────────────────────"),
    L (`  Repos: ${stats.repositories}+   Open Source: ${stats.open_source}   Stars: ${stats.total_stars}`),
    BLANK,
  ];

  const repoLines: HistoryLine[] = repos.flatMap(r => {
    const status = r.topics?.includes("in-progress")
      ? "◐ In Progress"
      : r.topics?.includes("research")
      ? "◑ Research"
      : "● Active";

    return [
      LB(`  ─── ${r.name} ──────────────────────────────────`),
      LD("  $ status"), LB(`    ${status}`),
      LD("  $ lang"),   L (`    ${r.language ?? "Unknown"}`),
      LD("  $ stars"),  L (`    ★ ${r.stars}   updated ${timeAgo(r.updated_at)}`),
      L (`  ▸ ${r.description ?? "No description"}`),
      LA(`    → ${r.url}`),
      BLANK,
    ];
  });

  return [...statsLines, ...repoLines, LD("  tip: type 'bvim' to explore full project details.")];
}

// ─── experience ───────────────────────────────────────────────────────────────
// Endpoint: /experience

async function fetchExperienceLines(): Promise<HistoryLine[]> {
  const res  = await fetch(`${API}/experience`);
  const jobs: Array<{
    title: string; company: string; period: string;
    status: "ACTIVE" | "PAST"; stack: string[];
    bullets: string[];
    metrics: Array<{ label: string; value: string }>;
  }> = await res.json();

  return jobs.flatMap(job => {
    const statusMark = job.status === "ACTIVE" ? LB : LA;
    // const statusText = job.status === "ACTIVE" ? "● Current" : "○ Past";

    return [
      statusMark(`  ─── ${job.title} ── [${job.status === "ACTIVE" ? "Current" : "Past"}] ──`),
      LD("  $ company"), statusMark(`    ✓ ${job.company}`),
      LD("  $ period"),  statusMark(`    ${job.period}`),
      LD("  $ stack"),   L (`    ${job.stack.join(" · ")}`),
      BLANK,
      ...job.bullets.map((b, i) =>
        i === 0 ? statusMark(`  ✓ ${b}`) : L(`  ▸ ${b}`)
      ),
      ...(job.metrics.length ? [
        BLANK,
        ...job.metrics.map(m => LC(`  ★ ${m.label}: ${m.value}`)),
      ] : []),
      BLANK,
    ];
  });
}

// ─── contact ──────────────────────────────────────────────────────────────────
// Endpoint: /home/links (reuse — has email, github, linkedin etc.)

async function fetchContactLines(): Promise<HistoryLine[]> {
  const res   = await fetch(`${API}/home/links`);
  const links: Array<{ icon: string; label: string; val: string; href: string }> = await res.json();

  return [
    LB("  ─── Contact Info ───────────────────────────────"),
    ...links.map(l => LA(`  ${l.icon}  ${l.label.padEnd(10)} ${l.val}`)),
    BLANK,

    LB("  ─── Availability ────────────────────────────────"),
    LD("  $ status"),    LB("    ● Open to work"),
    LD("  $ type"),      L ("    Full-time / Freelance"),
    LD("  $ timezone"),  L ("    IST (UTC +5:30)"),
    LD("  $ response"),  L ("    Within 24–48 hours"),
    LD("  $ preferred"), L ("    Email or LinkedIn"),
    BLANK,

    LA("  ─── Open To ─────────────────────────────────────"),
    LB("  ✓ Full-time engineering roles"),
    L ("  ▸ Freelance & contract work"),
    L ("  ▸ Open-source collaborations"),
    L ("  ▸ Pair programming & mentoring"),
    BLANK,

    LD("  tip: type 'bvim' to see the full contact page."),
  ];
}

// ─── Command dictionary ───────────────────────────────────────────────────────

export const COMMANDS: Record<string, CommandFn> = {

  // ── help ──────────────────────────────────────────────────────────────────
  help: (cmd, { setHistory }) => {
    setHistory(h => [
      ...h, LA(`$ ${cmd}`), BLANK,
      LA("┌─────────────────────────────────────────────────┐"),
      LA("│               AVAILABLE COMMANDS                │"),
      LA("├─────────────────────────────────────────────────┤"),
      L ("│  help, ?        show this help message          │"),
      L ("│  clear, cls     clear the terminal              │"),
      L ("│  bvim           open full TUI portfolio         │"),
      LA("├─────────────────────────────────────────────────┤"),
      LA("│                    SECTIONS                     │"),
      LA("├─────────────────────────────────────────────────┤"),
      L ("│  home           about me                        │"),
      L ("│  education      education & certifications      │"),
      L ("│  skills         technical skills & levels       │"),
      L ("│  projects       projects overview               │"),
      L ("│  experience     work experience                 │"),
      L ("│  contact        contact information             │"),
      LA("├─────────────────────────────────────────────────┤"),
      LA("│                THEME & FONT                     │"),
      LA("├─────────────────────────────────────────────────┤"),
      L ("│  :theme <name>  switch colour theme             │"),
      L ("│  themes         list available themes           │"),
      L ("│  :font          cycle monospace font            │"),
      L ("│  :font+         increase font size              │"),
      L ("│  :font-         decrease font size              │"),
      LA("└─────────────────────────────────────────────────┘"),
      BLANK,
    ]);
  },

  "?": (cmd, ctx) => COMMANDS.help(cmd, ctx),

  // ── clear ─────────────────────────────────────────────────────────────────
  clear: (_, { setHistory, setInput }) => {
    setHistory(() => []);
    setInput("");
  },
  cls: (cmd, ctx) => COMMANDS.clear(cmd, ctx),

  // ── themes ────────────────────────────────────────────────────────────────
  themes: (cmd, { theme, setHistory }) => {
    const themeKeys = Object.keys(THEMES) as ThemeName[];
    setHistory(h => [
      ...h, LA(`$ ${cmd}`), BLANK,
      LB("  Available themes:"),
      ...themeKeys.map(t =>
        t === theme ? LB(`  ✓  ${t}  (active)`) : LD(`     ${t}`)
      ),
      BLANK, LD("  Usage: :theme dracula"), BLANK,
    ]);
  },

  // ── sections (all async) ──────────────────────────────────────────────────
  home: (cmd, ctx) => {
    ctx.onNavigate("home");
    asyncCommand(cmd, ctx, HEADER("ABOUT ME", "~"), fetchHomeLines);
  },

  education: (cmd, ctx) => {
    ctx.onNavigate("education");
    asyncCommand(cmd, ctx, HEADER("EDUCATION", "∑"), fetchEducationLines);
  },

  skills: (cmd, ctx) => {
    ctx.onNavigate("skills");
    asyncCommand(cmd, ctx, HEADER("TECHNICAL SKILLS", "λ"), fetchSkillsLines);
  },

  projects: (cmd, ctx) => {
    ctx.onNavigate("projects");
    asyncCommand(cmd, ctx, HEADER("PROJECTS", "◈"), fetchProjectsLines);
  },

  experience: (cmd, ctx) => {
    ctx.onNavigate("experience");
    asyncCommand(cmd, ctx, HEADER("WORK EXPERIENCE", "⌘"), fetchExperienceLines);
  },

  contact: (cmd, ctx) => {
    ctx.onNavigate("contact");
    asyncCommand(cmd, ctx, HEADER("CONTACT", "@"), fetchContactLines);
  },

  // ── bvim ──────────────────────────────────────────────────────────────────
  bvim: (cmd, { setHistory, setInput, onEnterBvim }) => {
    setHistory(h => [...h, LA(`$ ${cmd}`), BLANK, LB("  ✓ Launching bvim..."), BLANK]);
    setInput("");
    setTimeout(() => onEnterBvim(), 250);
  },

  // ── easter eggs ───────────────────────────────────────────────────────────
  whoami: (cmd, { setHistory }) => {
    setHistory(h => [...h, LA(`$ ${cmd}`), LB("  bhuvaneshwar"), BLANK]);
  },
  pwd: (cmd, { setHistory }) => {
    setHistory(h => [...h, LA(`$ ${cmd}`), L("  /home/bhuvan/portfolio"), BLANK]);
  },
  ls: (cmd, { setHistory }) => {
    setHistory(h => [
      ...h, LA(`$ ${cmd}`),
      LB("  home/  education/  skills/  projects/  experience/  contact/"),
      BLANK,
      LD("  Tip: type a section name to view details, or 'bvim' for the full UI."),
      BLANK,
    ]);
  },
  dir: (cmd, ctx) => COMMANDS.ls(cmd, ctx),
  hello: (cmd, { setHistory }) => {
    setHistory(h => [...h, LA(`$ ${cmd}`), LB("  Hello! Welcome to my portfolio!"), BLANK]);
  },
  "echo hello": (cmd, ctx) => COMMANDS.hello(cmd, ctx),
  date: (cmd, { setHistory }) => {
    setHistory(h => [...h, LA(`$ ${cmd}`), L(`  ${new Date().toString()}`), BLANK]);
  },
};

// ─── Vim-style colon commands ─────────────────────────────────────────────────

export const COLON_COMMANDS: Record<string, CommandFn> = {
  ":theme": (cmd, { setTheme, setHistory }) => {
    const name = cmd.trim().split(/\s+/)[1] as ThemeName | undefined;
    if (name && name in THEMES) {
      setTheme(name);
      setHistory(h => [...h, LA(`:theme ${name}`), LB(`  ✓ Theme switched to "${name}"`), BLANK]);
    } else {
      setHistory(h => [
        ...h, LC(`:theme ${name ?? ""}`),
        LC(`  Error: unknown theme "${name ?? ""}"`),
        LD(`  Available: ${Object.keys(THEMES).join(" | ")}`), BLANK,
      ]);
    }
  },
  ":font": (_, { fontIdx, setFontIdx, setHistory }) => {
    const next = (fontIdx + 1) % FONTS.length;
    setFontIdx(() => next);
    setHistory(h => [...h, LA(":font"), LB(`  ✓ Font → ${FONTS[next].name}`), BLANK]);
  },
  ":font+": (_, { fontSize, setFontSize, setHistory }) => {
    const next = Math.min(fontSize + 1, 24);
    setFontSize(() => next);
    setHistory(h => [...h, LA(":font+"), LB(`  ✓ Font size → ${next}px`), BLANK]);
  },
  ":font-": (_, { fontSize, setFontSize, setHistory }) => {
    const next = Math.max(fontSize - 1, 10);
    setFontSize(() => next);
    setHistory(h => [...h, LA(":font-"), LB(`  ✓ Font size → ${next}px`), BLANK]);
  },
};

// ─── Tab-autocomplete candidates ──────────────────────────────────────────────

export const AUTOCOMPLETE_COMMANDS = [
  ...Object.keys(COMMANDS).filter(k => !k.includes(" ")),
  ...Object.keys(COLON_COMMANDS),
];