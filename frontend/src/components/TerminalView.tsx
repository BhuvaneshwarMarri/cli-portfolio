import { useEffect, useRef, useState } from "react";
import type { ThemeName, HistoryLine } from "../portfolioTypes";

// ─── Props ────────────────────────────────────────────────────────────────────

type Props = {
  history    : HistoryLine[];
  setHistory : React.Dispatch<React.SetStateAction<HistoryLine[]>>;
  input      : string;
  setInput   : React.Dispatch<React.SetStateAction<string>>;
  onEnterBvim: (section?: string) => void;
  onNavigate : (section: string) => void;
  // shared state from App
  theme      : ThemeName;
  setTheme   : (t: ThemeName) => void;
  fontIdx    : number;
  setFontIdx : (i: number) => void;
  fontSize   : number;
  setFontSize: React.Dispatch<React.SetStateAction<number>>;
};

// ─── Themes ───────────────────────────────────────────────────────────────────

const THEMES: Record<ThemeName, Record<string, string>> = {
  catppuccin: {
    "--bg": "#1e1e2e", "--bg-sidebar": "#181825", "--bg-content": "#1e1e2e",
    "--border": "#89b4fa", "--border-dim": "#313244",
    "--text": "#cdd6f4", "--text-dim": "#6c7086",
    "--accent": "#89b4fa", "--accent2": "#a6e3a1", "--accent3": "#f38ba8",
    "--selection": "#45475a", "--cursor": "#89b4fa",
  },
  dracula: {
    "--bg": "#282a36", "--bg-sidebar": "#21222c", "--bg-content": "#282a36",
    "--border": "#6272a4", "--border-dim": "#44475a",
    "--text": "#f8f8f2", "--text-dim": "#6272a4",
    "--accent": "#bd93f9", "--accent2": "#50fa7b", "--accent3": "#ff79c6",
    "--selection": "#44475a", "--cursor": "#bd93f9",
  },
  nord: {
    "--bg": "#2e3440", "--bg-sidebar": "#242933", "--bg-content": "#2e3440",
    "--border": "#5e81ac", "--border-dim": "#3b4252",
    "--text": "#eceff4", "--text-dim": "#4c566a",
    "--accent": "#88c0d0", "--accent2": "#a3be8c", "--accent3": "#bf616a",
    "--selection": "#3b4252", "--cursor": "#88c0d0",
  },
  gruvbox: {
    "--bg": "#282828", "--bg-sidebar": "#1d2021", "--bg-content": "#282828",
    "--border": "#d79921", "--border-dim": "#3c3836",
    "--text": "#ebdbb2", "--text-dim": "#665c54",
    "--accent": "#fabd2f", "--accent2": "#b8bb26", "--accent3": "#fb4934",
    "--selection": "#3c3836", "--cursor": "#fabd2f",
  },
  tokyo: {
    "--bg": "#1a1b26", "--bg-sidebar": "#16161e", "--bg-content": "#1a1b26",
    "--border": "#7aa2f7", "--border-dim": "#2a2b3d",
    "--text": "#c0caf5", "--text-dim": "#565f89",
    "--accent": "#7aa2f7", "--accent2": "#9ece6a", "--accent3": "#f7768e",
    "--selection": "#2a2b3d", "--cursor": "#7aa2f7",
  },
  nothing: {
    "--bg": "#0a0a0a", "--bg-sidebar": "#000000", "--bg-content": "#0a0a0a",
    "--border": "#ffffff", "--border-dim": "#222222",
    "--text": "#ff0000", "--text-dim": "#aaaaaa",
    "--accent": "#ffffff", "--accent2": "#ff0000", "--accent3": "#ffe566",
    "--selection": "#1a1a1a", "--cursor": "#ffffff",
  },
  cyberpunk: {
  "--bg": "#0f0f1a", "--bg-sidebar": "#141426", "--bg-content": "#0f0f1a",
  "--border": "#00f5ff", "--border-dim": "#1f1f33",
  "--text": "#e0e0ff", "--text-dim": "#5c5c99",
  "--accent": "#00f5ff", "--accent2": "#39ff14", "--accent3": "#ff007c",
  "--selection": "#1f1f33", "--cursor": "#00f5ff",
  },
  forest: {
  "--bg": "#0f1a14", "--bg-sidebar": "#13221b", "--bg-content": "#0f1a14",
  "--border": "#4caf50", "--border-dim": "#1f2e25",
  "--text": "#d8f3dc", "--text-dim": "#52796f",
  "--accent": "#4caf50", "--accent2": "#a7c957", "--accent3": "#ff6b6b",
  "--selection": "#1f2e25", "--cursor": "#4caf50",
  },
};

// ─── Fonts ────────────────────────────────────────────────────────────────────

const FONTS = [
  { name: "JetBrains Mono", css: "'JetBrains Mono', monospace" },
  { name: "Fira Code",      css: "'Fira Code', monospace" },
  { name: "Courier New",    css: "'Courier New', monospace" },
  { name: "IBM Plex Mono",  css: "'IBM Plex Mono', monospace" },
  { name: "Source Code Pro",css: "'Source Code Pro', monospace" },
];

// ─── DOM helpers ──────────────────────────────────────────────────────────────

function applyTheme(t: ThemeName) {
  Object.entries(THEMES[t]).forEach(([k, v]) =>
    document.documentElement.style.setProperty(k, v)
  );
}
function applyFont(css: string, size: number) {
  document.documentElement.style.setProperty("--font-family", css);
  document.documentElement.style.setProperty("--font-size", `${size}px`);
}

// ─── HistoryLine builders ─────────────────────────────────────────────────────

const L    = (text: string): HistoryLine => ({ text });
const LA   = (text: string): HistoryLine => ({ text, colour: "accent"  });
const LB   = (text: string): HistoryLine => ({ text, colour: "accent2" });
const LC   = (text: string): HistoryLine => ({ text, colour: "accent3" });
const LD   = (text: string): HistoryLine => ({ text, colour: "dim"     });
const BLANK: HistoryLine                  = { text: "" };

// ─── Section content ──────────────────────────────────────────────────────────

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
    LB("  ✓ Python"),     bar(92, "accent2"),
    L ("    TypeScript"), bar(88, "accent"),
    L ("    JavaScript"), bar(85, "accent"),
    LC("    Java"),        bar(75, "accent3"),
    LC("    C++"),         bar(65, "accent3"),
    L ("    SQL"),         bar(80, "accent2"),
    BLANK,
    LA("  ─── Frontend ───────────────────────────────────"),
    LA("  ✓ React"),          bar(90, "accent"),
    L ("    Tailwind CSS"),   bar(85, "accent"),
    LB("    Vite"),           bar(82, "accent2"),
    LC("    Framer Motion"),  bar(70, "accent3"),
    L ("    Next.js"),        bar(72, "accent"),
    BLANK,
    LB("  ─── Backend & Tools ────────────────────────────"),
    LB("  ✓ Node.js"),    bar(85, "accent2"),
    LB("    Express"),    bar(82, "accent2"),
    L ("    PostgreSQL"), bar(78, "accent"),
    LB("    MongoDB"),    bar(75, "accent2"),
    LC("    Docker"),     bar(70, "accent3"),
    L ("    Git"),        bar(90, "accent"),
    BLANK,
    LC("  ─── AI & Systems ───────────────────────────────"),
    LC("  ✓ Agentic AI"),   bar(80, "accent3"),
    LC("    LangChain"),    bar(75, "accent3"),
    L ("    OpenAI API"),   bar(82, "accent"),
    LB("    Linux / Bash"), bar(78, "accent2"),
    LC("    System Design"),bar(70, "accent3"),
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

const SECTION_FN: Record<string, (cmd: string) => HistoryLine[]> = {
  home: homeLines, education: educationLines, skills: skillsLines,
  projects: projectsLines, experience: experienceLines, contact: contactLines,
};

// ─── Banner ───────────────────────────────────────────────────────────────────

const BANNER = `
 ██████╗ ██╗  ██╗██╗   ██╗██╗   ██╗ █████╗ ███╗   ██╗███████╗███████╗██╗  ██╗██╗    ██╗ █████╗ ██████╗ 
 ██╔══██╗██║  ██║██║   ██║██║   ██║██╔══██╗████╗  ██║██╔════╝██╔════╝██║  ██║██║    ██║██╔══██╗██╔══██╗
 ██████╔╝███████║██║   ██║██║   ██║███████║██╔██╗ ██║█████╗  ███████╗███████║██║ █╗ ██║███████║██████╔╝
 ██╔══██╗██╔══██║██║   ██║╚██╗ ██╔╝██╔══██║██║╚██╗██║██╔══╝  ╚════██║██╔══██║██║███╗██║██╔══██║██╔══██╗
 ██████╔╝██║  ██║╚██████╔╝ ╚████╔╝ ██║  ██║██║ ╚████║███████╗███████║██║  ██║╚███╔███╔╝██║  ██║██║  ██║
 ╚═════╝ ╚═╝  ╚═╝ ╚═════╝   ╚═══╝  ╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝╚══════╝╚═╝  ╚═╝ ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝

 [ Bhuvaneshwar Marri | CLI Portfolio ]

 Welcome! Type 'help' to see available commands.
`;

// ─── Component ────────────────────────────────────────────────────────────────

export default function TerminalView({
  history, setHistory, input, setInput,
  onEnterBvim, onNavigate,
  theme, setTheme, fontIdx, setFontIdx, fontSize, setFontSize,
}: Props) {
  const [cursorVisible,  setCursorVisible]  = useState(true);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex,   setHistoryIndex]   = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef   = useRef<HTMLDivElement>(null);

  // Focus input on mount
  useEffect(() => { inputRef.current?.focus(); }, []);

  // Apply theme & font whenever props change
  useEffect(() => { applyTheme(theme); },                     [theme]);
  useEffect(() => { applyFont(FONTS[fontIdx].css, fontSize); }, [fontIdx, fontSize]);

  // Blinking cursor
  useEffect(() => {
    const id = setInterval(() => setCursorVisible(v => !v), 530);
    return () => clearInterval(id);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, input]);

  // Keyboard shortcuts (Ctrl+L, arrow history, Tab autocomplete)
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.ctrlKey && e.key.toLowerCase() === "l") {
        e.preventDefault();
        setHistory([]); setInput(""); setHistoryIndex(-1);
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (commandHistory.length > 0) {
          const next = Math.min(historyIndex + 1, commandHistory.length - 1);
          setHistoryIndex(next);
          setInput(commandHistory[commandHistory.length - 1 - next]);
        }
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (historyIndex > 0) {
          const next = historyIndex - 1;
          setHistoryIndex(next);
          setInput(commandHistory[commandHistory.length - 1 - next]);
        } else { setHistoryIndex(-1); setInput(""); }
        return;
      }
      if (e.key === "Tab") {
        e.preventDefault();
        const cmds = [
          "help", "clear", "bvim", "themes",
          "home", "education", "skills", "projects", "experience", "contact",
          "whoami", "pwd", "ls", "date",
          ":theme", ":font", ":font+", ":font-",
        ];
        const matches = cmds.filter(c => c.startsWith(input.toLowerCase()));
        if (matches.length === 1) setInput(matches[0]);
        else if (matches.length > 1)
          setHistory(h => [...h, { text: `$ ${input}` }, { text: matches.join("  ") }, BLANK]);
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [input, commandHistory, historyIndex, setHistory, setInput]);

  // ── Command runner ──────────────────────────────────────────────────────────

  function runCommand(e: React.FormEvent) {
    e.preventDefault();
    const cmd   = input.trim();
    const lower = cmd.toLowerCase();

    if (!cmd) { setHistory(h => [...h, BLANK]); setInput(""); return; }

    if (!cmd.startsWith(":")) {
      setCommandHistory(p => [...p, cmd]);
      setHistoryIndex(-1);
    }

    // ── :theme ───────────────────────────────────────────────────────────────
    if (lower.startsWith(":theme")) {
      const parts = lower.split(/\s+/);
      const name  = parts[1] as ThemeName | undefined;
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
      setInput(""); return;
    }

    // ── :font ─────────────────────────────────────────────────────────────────
    if (lower === ":font") {
      const next = (fontIdx + 1) % FONTS.length;
      setFontIdx(next);
      setHistory(h => [...h, LA(":font"), LB(`  ✓ Font → ${FONTS[next].name}`), BLANK]);
      setInput(""); return;
    }
    if (lower === ":font+") {
      setFontSize(s => Math.min(s + 1, 24));
      setHistory(h => [...h, LA(":font+"), LB(`  ✓ Font size → ${Math.min(fontSize + 1, 24)}px`), BLANK]);
      setInput(""); return;
    }
    if (lower === ":font-") {
      setFontSize(s => Math.max(s - 1, 10));
      setHistory(h => [...h, LA(":font-"), LB(`  ✓ Font size → ${Math.max(fontSize - 1, 10)}px`), BLANK]);
      setInput(""); return;
    }

    // Ignore other vim-style commands silently
    if (cmd.startsWith(":")) { setInput(""); return; }

    // ── clear ─────────────────────────────────────────────────────────────────
    if (lower === "clear" || lower === "cls") { setHistory([]); setInput(""); return; }

    // ── help ──────────────────────────────────────────────────────────────────
    if (lower === "help" || lower === "?") {
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
      setInput(""); return;
    }

    // ── themes ────────────────────────────────────────────────────────────────
    if (lower === "themes") {
      const themeKeys = Object.keys(THEMES) as ThemeName[];
      setHistory(h => [
        ...h, LA(`$ ${cmd}`), BLANK,
        LB("  Available themes:"),
        ...themeKeys.map(t =>
          t === theme ? LB(`  ✓  ${t}  (active)`) : LD(`     ${t}`)
        ),
        BLANK, LD("  Usage: :theme dracula"), BLANK,
      ]);
      setInput(""); return;
    }

    // ── section commands ──────────────────────────────────────────────────────
    if (lower in SECTION_FN) {
      setHistory(h => [...h, ...SECTION_FN[lower](cmd)]);
      setInput("");
      onNavigate(lower);
      return;
    }

    // ── bvim ──────────────────────────────────────────────────────────────────
    if (lower === "bvim") {
      setHistory(h => [...h, LA(`$ ${cmd}`), BLANK, LB("  ✓ Launching bvim..."), BLANK]);
      setInput("");
      setTimeout(() => onEnterBvim(), 250);
      return;
    }

    // ── easter eggs ───────────────────────────────────────────────────────────
    if (lower === "whoami") {
      setHistory(h => [...h, LA(`$ ${cmd}`), LB("  bhuvaneshwar"), BLANK]);
      setInput(""); return;
    }
    if (lower === "pwd") {
      setHistory(h => [...h, LA(`$ ${cmd}`), L("  /home/bhuvan/portfolio"), BLANK]);
      setInput(""); return;
    }
    if (lower === "ls" || lower === "dir") {
      setHistory(h => [
        ...h, LA(`$ ${cmd}`),
        LB("  home/  education/  skills/  projects/  experience/  contact/"),
        BLANK,
        LD("  Tip: type a section name to view details, or 'bvim' for the full UI."),
        BLANK,
      ]);
      setInput(""); return;
    }
    if (lower === "hello" || lower === "echo hello") {
      setHistory(h => [...h, LA(`$ ${cmd}`), LB("  Hello! Welcome to my portfolio!"), BLANK]);
      setInput(""); return;
    }
    if (lower === "date") {
      setHistory(h => [...h, LA(`$ ${cmd}`), L(`  ${new Date().toString()}`), BLANK]);
      setInput(""); return;
    }

    // ── unknown ───────────────────────────────────────────────────────────────
    setHistory(h => [
      ...h, LA(`$ ${cmd}`),
      LC(`  bash: ${cmd}: command not found`),
      LD("  Type 'help' to see available commands."),
      BLANK,
    ]);
    setInput("");
  }

  // ── Colour class helper ─────────────────────────────────────────────────────

  function lineClass(colour?: HistoryLine["colour"]) {
    switch (colour) {
      case "accent":  return "trm-line trm-c-accent";
      case "accent2": return "trm-line trm-c-green";
      case "accent3": return "trm-line trm-c-red";
      case "dim":     return "trm-line trm-c-dim";
      default:        return "trm-line";
    }
  }

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <>
      <style>{CSS}</style>
      <div className="trm-root" onClick={() => inputRef.current?.focus()}>

        <pre className="trm-banner">{BANNER}</pre>

        {history.map((line, i) => (
          <div key={i} className={lineClass(line.colour)}>{line.text}</div>
        ))}

        <form onSubmit={runCommand} className="trm-prompt">
          <div className="trm-prompt-line">
            <span className="trm-c-accent">┌──(</span>
            <span className="trm-c-green trm-bold">bhuvaneshwar㉿marri</span>
            <span className="trm-c-accent">)-[</span>
            <span className="trm-c-accent">portfolio</span>
            <span className="trm-c-accent">]</span>
          </div>
          <div className="trm-prompt-line">
            <span className="trm-c-accent">└─</span>
            <span className="trm-c-red">$</span>
            <span className="trm-input-text"> {input}</span>
            <span className="trm-cursor" style={{ opacity: cursorVisible ? 1 : 0 }} />
          </div>
          <input
            ref={inputRef}
            className="trm-hidden-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            autoComplete="off"
            spellCheck={false}
          />
        </form>

        <div ref={endRef} />
      </div>
    </>
  );
}

// ─── CSS ──────────────────────────────────────────────────────────────────────

const CSS = `
  .trm-root {
    background : var(--bg,          #1e1e2e);
    color      : var(--text,        #cdd6f4);
    font-family: var(--font-family, 'JetBrains Mono', 'Fira Code', monospace);
    font-size  : var(--font-size,   15px);
    padding    : 2rem;
    min-height : 100vh;
    cursor     : text;
    overflow-y : auto;
    line-height: 1.7;
    box-sizing : border-box;
  }
  .trm-banner {
    color        : var(--accent, #89b4fa);
    font-family  : monospace;
    font-size    : 0.72rem;
    line-height  : 1.2;
    margin-bottom: 2rem;
    opacity      : 0.9;
    overflow-x   : auto;
    white-space  : pre;
  }
  .trm-line {
    margin                : 0.12rem 0;
    white-space           : pre;
    font-variant-ligatures: none;
    animation             : trm-fadein 0.12s ease-out;
  }
  @keyframes trm-fadein {
    from { opacity: 0; transform: translateX(-3px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  .trm-prompt      { margin-top: 1rem; }
  .trm-prompt-line { display: flex; align-items: center; margin: 0.12rem 0; }
  .trm-input-text  { color: var(--text, #cdd6f4); margin-left: 0.3rem; }
  .trm-cursor {
    display: inline-block; width: 0.55rem; height: 1.1rem;
    background: var(--cursor, #89b4fa);
    margin-left: 0.15rem; vertical-align: text-bottom;
    transition: opacity 0.08s ease;
  }
  .trm-c-accent { color: var(--accent,   #89b4fa); }
  .trm-c-green  { color: var(--accent2,  #a6e3a1); }
  .trm-c-red    { color: var(--accent3,  #f38ba8); }
  .trm-c-dim    { color: var(--text-dim, #6c7086); }
  .trm-bold     { font-weight: 700; }
  .trm-hidden-input { position: absolute; left: -9999px; width: 1px; height: 1px; opacity: 0; }
  .trm-root::-webkit-scrollbar       { width: 6px; }
  .trm-root::-webkit-scrollbar-track { background: var(--bg-sidebar, #181825); }
  .trm-root::-webkit-scrollbar-thumb { background: var(--selection, #45475a); border-radius: 3px; }
  .trm-root::-webkit-scrollbar-thumb:hover { background: var(--border-dim, #313244); }
  .trm-root ::selection { background: var(--selection, #45475a); color: var(--text, #cdd6f4); }
  @media (max-width: 768px) { .trm-root { padding: 1.5rem; } .trm-banner { font-size: 0.58rem; } }
  @media (max-width: 480px) { .trm-root { padding: 1rem; }   .trm-banner { font-size: 0.48rem; } }
  @media (prefers-reduced-motion: reduce) { .trm-line, .trm-cursor { animation: none; transition: none; } }
`;