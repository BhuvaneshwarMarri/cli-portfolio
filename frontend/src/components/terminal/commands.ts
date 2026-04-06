import type { HistoryLine, ThemeName } from "../../portfolioTypes.ts";
import { THEMES, FONTS } from "./constants.ts";

// ─── HistoryLine builders ─────────────────────────────────────────────────────

const L    = (text: string): HistoryLine => ({ text });
const LA   = (text: string): HistoryLine => ({ text, colour: "accent"  });
const LB   = (text: string): HistoryLine => ({ text, colour: "accent2" });
const LC   = (text: string): HistoryLine => ({ text, colour: "accent3" });
const LD   = (text: string): HistoryLine => ({ text, colour: "dim"     });
const BLANK: HistoryLine                  = { text: "" };

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

// ─── Section content builders ─────────────────────────────────────────────────

function homeLines(cmd: string): HistoryLine[] {
  return [
    LA(`$ ${cmd}`), BLANK,
    LA("┌─────────────────────────────────────────────────┐"),
    LA("│                   ~ ABOUT ME                   │"),
    LA("└─────────────────────────────────────────────────┘"),
    BLANK,
    LD("  $ whoami"),   LB("    ✓ Bhuvaneshwar Marri"),
    LD("  $ role"),     L ("    Full Stack Developer · AI Enthusiast"),
    LD("  $ location"), L ("    India"),
    LD("  $ focus"),    L ("    AI · Web · Systems"),
    LD("  $ status"),   LB("    ● Open to opportunities"),
    LD("  $ bio"),
    L ("    Passionate about building innovative solutions at the"),
    L ("    intersection of software engineering and AI."),
    BLANK,
    LD("  $ links"),
    LA("    ◈  github.com/BhuvaneshwarMarri"),
    LA("    ⬡  linkedin.com/in/bhuvan"),
    LA("    @  bhuvan@example.com"),
    LA("    ✦  @bhuvan (Twitter)"),
    BLANK,
    LD("  tip: type 'bvim' to explore the interactive portfolio."),
    BLANK,
  ];
}

function educationLines(cmd: string): HistoryLine[] {
  return [
    LA(`$ ${cmd}`), BLANK,
    LA("┌─────────────────────────────────────────────────┐"),
    LA("│                  ∑ EDUCATION                   │"),
    LA("└─────────────────────────────────────────────────┘"),
    BLANK,
    LB("  ─── Degree ─────────────────────────────────────"),
    LD("  $ degree"),     LB("    ✓ B.Tech — Computer Science Engineering"),
    LD("  $ university"), L ("    University Name"),
    LD("  $ period"),     L ("    2020 – 2024  (Expected)"),
    LD("  $ gpa"),        LA("    8.9 / 10"),
    LD("  $ speciality"), L ("    AI & Machine Learning"),
    BLANK,
    LB("  ─── Timeline ───────────────────────────────────"),
    LD("  2020  ●  Enrolled — B.Tech CSE · University Name"),
    L ("         └─ C · Python · Math · Logic"),
    LD("  2021  ●  Linux System Administration · Linux Foundation"),
    L ("         └─ Linux · Bash · Networking"),
    LD("  2022  ●  Docker & Kubernetes · CNCF"),
    L ("         └─ Docker · K8s · DevOps"),
    LD("  2022  ●  Internship — Startup Inc."),
    L ("         └─ React · TypeScript · Git"),
    LD("  2023  ●  Advanced React & TypeScript · Udemy"),
    L ("         └─ React · TypeScript · Hooks"),
    LD("  2023  ●  Cloud Computing & AWS"),
    L ("         └─ AWS · Cloud · Lambda · S3"),
    LB("  2024  ◉  Graduating — B.Tech CSE  [CURRENT]"),
    L ("         └─ System Design · AI · Capstone"),
    LC("  →     ◌  What's Next — Open to opportunities  [NEXT]"),
    BLANK,
    LB("  ─── Core Courses ────────────────────────────────"),
    LB("  01  ✓ Data Structures & Algorithms"),
    LB("  02  ✓ Machine Learning"),
    LD("  03    Database Management Systems"),
    LD("  04    Operating Systems"),
    LD("  05    Computer Networks"),
    LD("  06    Software Engineering"),
    LD("  07    Distributed Systems"),
    LD("  08    System Design"),
    BLANK,
    LD("  tip: type 'bvim' to see the full visual timeline."),
    BLANK,
  ];
}

function skillsLines(cmd: string): HistoryLine[] {
  const bar = (pct: number, colour: HistoryLine["colour"]): HistoryLine => ({
    text: "    " + "█".repeat(Math.round(pct / 10)) + "░".repeat(10 - Math.round(pct / 10)) + `  ${pct}%`,
    colour,
  });
  return [
    LA(`$ ${cmd}`), BLANK,
    LA("┌─────────────────────────────────────────────────┐"),
    LA("│               λ TECHNICAL SKILLS               │"),
    LA("└─────────────────────────────────────────────────┘"),
    BLANK,
    LB("  ─── Languages ──────────────────────────────────"),
    LB("  ✓ Python"),      bar(92, "accent2"),
    L ("    TypeScript"),  bar(88, "accent"),
    L ("    JavaScript"),  bar(85, "accent"),
    LC("    Java"),         bar(75, "accent3"),
    LC("    C++"),          bar(65, "accent3"),
    L ("    SQL"),          bar(80, "accent2"),
    BLANK,
    LA("  ─── Frontend ───────────────────────────────────"),
    LA("  ✓ React"),           bar(90, "accent"),
    L ("    Tailwind CSS"),    bar(85, "accent"),
    LB("    Vite"),            bar(82, "accent2"),
    LC("    Framer Motion"),   bar(70, "accent3"),
    L ("    Next.js"),         bar(72, "accent"),
    BLANK,
    LB("  ─── Backend & Tools ────────────────────────────"),
    LB("  ✓ Node.js"),     bar(85, "accent2"),
    LB("    Express"),     bar(82, "accent2"),
    L ("    PostgreSQL"),  bar(78, "accent"),
    LB("    MongoDB"),     bar(75, "accent2"),
    LC("    Docker"),      bar(70, "accent3"),
    L ("    Git"),         bar(90, "accent"),
    BLANK,
    LC("  ─── AI & Systems ───────────────────────────────"),
    LC("  ✓ Agentic AI"),    bar(80, "accent3"),
    LC("    LangChain"),     bar(75, "accent3"),
    L ("    OpenAI API"),    bar(82, "accent"),
    LB("    Linux / Bash"),  bar(78, "accent2"),
    LC("    System Design"), bar(70, "accent3"),
    BLANK,
    LD("  tip: type 'bvim' to see the interactive skill view."),
    BLANK,
  ];
}

function projectsLines(cmd: string): HistoryLine[] {
  return [
    LA(`$ ${cmd}`), BLANK,
    LA("┌─────────────────────────────────────────────────┐"),
    LA("│                 ◈ PROJECTS                     │"),
    LA("└─────────────────────────────────────────────────┘"),
    BLANK,
    LB("  ─── CLI Portfolio ── [Active] ──────────────────"),
    LD("  $ status"), LB("    ● Active"),
    LD("  $ stack"),  L ("    React · TypeScript · Vite"),
    LD("  $ repo"),   LA("    github.com/BhuvaneshwarMarri"),
    BLANK,
    LB("  ✓ Dual-mode interface — Terminal & Bvim"),
    L ("  ▸ Vim-inspired keyboard navigation"),
    L ("  ▸ Multi-theme system via CSS variables"),
    L ("  ▸ Custom command-line parser"),
    BLANK,
    LA("  ─── SG Games Platform ── [In Progress] ─────────"),
    LD("  $ status"), LA("    ◐ In Progress"),
    LD("  $ stack"),  L ("    React · Node.js · WebSocket"),
    BLANK,
    LA("  ✓ Real-time multiplayer via WebSocket"),
    L ("  ▸ User authentication & leaderboards"),
    L ("  ▸ Responsive game UI components"),
    BLANK,
    LC("  ─── Agentic AI Tools ── [Research] ─────────────"),
    LD("  $ status"), LC("    ◑ Research"),
    LD("  $ stack"),  L ("    Python · LangChain · OpenAI"),
    BLANK,
    LC("  ✓ Autonomous task execution"),
    L ("  ▸ Natural language code generation"),
    L ("  ▸ Multi-agent orchestration pipelines"),
    BLANK,
    LD("  tip: type 'bvim' to explore full project details."),
    BLANK,
  ];
}

function experienceLines(cmd: string): HistoryLine[] {
  return [
    LA(`$ ${cmd}`), BLANK,
    LA("┌─────────────────────────────────────────────────┐"),
    LA("│               ⌘ WORK EXPERIENCE                │"),
    LA("└─────────────────────────────────────────────────┘"),
    BLANK,
    LB("  ─── Full Stack Developer ── [Current] ──────────"),
    LD("  $ company"), LB("    ✓ Tech Company"),
    LD("  $ period"),  LB("    2023 – Present"),
    LD("  $ stack"),   L ("    React · Node.js · PostgreSQL"),
    BLANK,
    LB("  ✓ Built & maintained full-stack web applications"),
    L ("  ▸ Implemented RESTful APIs & third-party integrations"),
    L ("  ▸ Reduced load time by 40% via performance optimisation"),
    L ("  ▸ Agile collaboration with cross-functional teams"),
    BLANK,
    LA("  ─── Software Engineering Intern ─────────────────"),
    LD("  $ company"), LA("    ✓ Startup Inc."),
    LD("  $ period"),  LD("    2022 – 2023"),
    LD("  $ stack"),   L ("    React · TypeScript · Git"),
    BLANK,
    LA("  ✓ Built responsive UIs with React & TypeScript"),
    L ("  ▸ Code reviews and pair programming sessions"),
    L ("  ▸ Contributed to open-source and internal tools"),
    BLANK,
    LC("  ─── Key Achievements ────────────────────────────"),
    LC("  ★ Developer of the Quarter award"),
    L ("  ▸ CI/CD pipeline cut deploy time by 60%"),
    L ("  ▸ Led legacy → modern tech stack migration"),
    L ("  ▸ Mentored junior devs & ran technical workshops"),
    BLANK,
    LD("  tip: type 'bvim' to view the full work history."),
    BLANK,
  ];
}

function contactLines(cmd: string): HistoryLine[] {
  return [
    LA(`$ ${cmd}`), BLANK,
    LA("┌─────────────────────────────────────────────────┐"),
    LA("│                  @ CONTACT                     │"),
    LA("└─────────────────────────────────────────────────┘"),
    BLANK,
    LB("  ─── Contact Info ───────────────────────────────"),
    LA("  ✓ @  email     bhuvan@example.com"),
    L ("  ◈  github    github.com/BhuvaneshwarMarri"),
    L ("  ⬡  linkedin  linkedin.com/in/bhuvan"),
    LC("  ✦  twitter   @bhuvan"),
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
    L ("  ▸ Tech talks & community events"),
    BLANK,
    LD("  tip: type 'bvim' to see the full contact page."),
    BLANK,
  ];
}

// ─── Command dictionary ───────────────────────────────────────────────────────

export const COMMANDS: Record<string, CommandFn> = {

  // ── help ────────────────────────────────────────────────────────────────────
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
      LA("├─────────────────────────────────────────────────┤"),
      LA("│                   SHORTCUTS                     │"),
      LA("├─────────────────────────────────────────────────┤"),
      L ("│  Ctrl + L       clear screen                    │"),
      L ("│  ↑ / ↓          command history                 │"),
      L ("│  Tab            autocomplete                    │"),
      LA("└─────────────────────────────────────────────────┘"),
      BLANK,
    ]);
  },

  "?": (cmd, ctx) => COMMANDS.help(cmd, ctx),

  // ── clear ───────────────────────────────────────────────────────────────────
  clear: (_, { setHistory, setInput }) => {
    setHistory(() => []);
    setInput("");
  },

  cls: (cmd, ctx) => COMMANDS.clear(cmd, ctx),

  // ── themes ──────────────────────────────────────────────────────────────────
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

  // ── sections ─────────────────────────────────────────────────────────────────
  home: (cmd, { setHistory, onNavigate }) => {
    setHistory(h => [...h, ...homeLines(cmd)]);
    onNavigate("home");
  },

  education: (cmd, { setHistory, onNavigate }) => {
    setHistory(h => [...h, ...educationLines(cmd)]);
    onNavigate("education");
  },

  skills: (cmd, { setHistory, onNavigate }) => {
    setHistory(h => [...h, ...skillsLines(cmd)]);
    onNavigate("skills");
  },

  projects: (cmd, { setHistory, onNavigate }) => {
    setHistory(h => [...h, ...projectsLines(cmd)]);
    onNavigate("projects");
  },

  experience: (cmd, { setHistory, onNavigate }) => {
    setHistory(h => [...h, ...experienceLines(cmd)]);
    onNavigate("experience");
  },

  contact: (cmd, { setHistory, onNavigate }) => {
    setHistory(h => [...h, ...contactLines(cmd)]);
    onNavigate("contact");
  },

  // ── bvim ────────────────────────────────────────────────────────────────────
  bvim: (cmd, { setHistory, setInput, onEnterBvim }) => {
    setHistory(h => [...h, LA(`$ ${cmd}`), BLANK, LB("  ✓ Launching bvim..."), BLANK]);
    setInput("");
    setTimeout(() => onEnterBvim(), 250);
  },

  // ── easter eggs ──────────────────────────────────────────────────────────────
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
// Handled separately because they need prefix matching (":theme <arg>") and
// don't belong in command history tracking.

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
// Exported so TerminalView can reference this without duplicating the list.

export const AUTOCOMPLETE_COMMANDS = [
  ...Object.keys(COMMANDS).filter(k => !k.includes(" ")),
  ...Object.keys(COLON_COMMANDS),
];