import { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AppRouter from "../router/AppRouter";
import type { ThemeName } from "../portfolioTypes";

// ─── Types ────────────────────────────────────────────────────────────────────

type Section   = "home" | "education" | "skills" | "projects" | "experience" | "contact";
type FocusArea = "sidebar" | "content";

// ─── Theme definitions ────────────────────────────────────────────────────────

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

// ─── Sections ─────────────────────────────────────────────────────────────────

const SECTIONS: Section[] = ["home", "education", "skills", "projects", "experience", "contact"];

const SECTION_ICONS: Record<Section, string> = {
  home: "~", education: "∑", skills: "λ",
  projects: "◈", experience: "⌘", contact: "@",
};

const SECTION_LABELS: Record<Section, string> = {
  home: "home.md", education: "education.md", skills: "skills.md",
  projects: "projects.md", experience: "experience.md", contact: "contact.md",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function applyTheme(t: ThemeName) {
  Object.entries(THEMES[t]).forEach(([k, v]) =>
    document.documentElement.style.setProperty(k, v)
  );
}

function applyFont(css: string, size: number) {
  document.documentElement.style.setProperty("--font-family", css);
  document.documentElement.style.setProperty("--font-size", `${size}px`);
}

function sectionFromPath(pathname: string): Section {
  const p = pathname.slice(1) as Section;
  return SECTIONS.includes(p) ? p : "home";
}

// ─── Props ────────────────────────────────────────────────────────────────────

type BvimProps = {
  onExit    : () => void;
  theme     : ThemeName;
  setTheme  : (t: ThemeName) => void;
  fontIdx   : number;
  setFontIdx: (i: number) => void;
  fontSize  : number;
  setFontSize: React.Dispatch<React.SetStateAction<number>>;
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function BvimView({
  onExit, theme, setTheme, fontIdx, setFontIdx, fontSize, setFontSize,
}: BvimProps) {
  const navigate = useNavigate();
  const location = useLocation();

  // Derive active section purely from URL — single source of truth.
  // This eliminates the dual-useEffect navigation loop.
  const active = sectionFromPath(location.pathname);

  const [focus,  setFocus]  = useState<FocusArea>("sidebar");
  const [cmdBuf, setCmdBuf] = useState("");
  const [cmdMsg, setCmdMsg] = useState("");

  const sidebarHidden = focus === "content";

  // Helper: navigate to a section (updates URL → active re-derives)
  const goTo = useCallback((sec: Section) => {
    navigate(`/${sec}`);
  }, [navigate]);

  // Apply theme & font on mount / prop change
  useEffect(() => { applyTheme(theme); },                     [theme]);
  useEffect(() => { applyFont(FONTS[fontIdx].css, fontSize); }, [fontIdx, fontSize]);

  // ── Command executor ──────────────────────────────────────────────────────

  const executeCmd = useCallback((cmd: string) => {
    const t = cmd.slice(1).trim();

    if (["q", "quit", "q!"].includes(t)) { onExit(); return; }

    const themeMatch = t.match(/^theme\s+(\w+)$/);
    if (themeMatch) {
      const n = themeMatch[1] as ThemeName;
      if (n in THEMES) {
        setTheme(n);
        setCmdMsg(`Theme → ${n}`);
      } else {
        setCmdMsg(`Unknown theme. Try: ${Object.keys(THEMES).join(", ")}`);
      }
      return;
    }

    if (t === "themes") {
      setCmdMsg(`Themes: ${Object.keys(THEMES).join(" | ")}`);
      return;
    }

    if (t === "font") {
      const next = (fontIdx + 1) % FONTS.length;
      setFontIdx(next);
      setCmdMsg(`Font → ${FONTS[next].name}`);
      return;
    }
    if (t === "font+") {
      setFontSize(s => Math.min(s + 1, 24));
      setCmdMsg(`Font size ↑`);
      return;
    }
    if (t === "font-") {
      setFontSize(s => Math.max(s - 1, 10));
      setCmdMsg(`Font size ↓`);
      return;
    }

    // :goto <section>
    const gotoMatch = t.match(/^(goto|go|e)\s+(\w+)$/);
    if (gotoMatch) {
      const sec = gotoMatch[2] as Section;
      if (SECTIONS.includes(sec)) {
        goTo(sec);
        setCmdMsg(`→ ${sec}`);
      } else {
        setCmdMsg(`Unknown section: ${sec}`);
      }
      return;
    }

    setCmdMsg(`E492: Not an editor command: ${t}`);
  }, [fontIdx, onExit, setTheme, setFontIdx, setFontSize, goTo]);

  // ── Keyboard handler ──────────────────────────────────────────────────────

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
      }

      // ── In command buffer mode ─────────────────────────────────────────────
      if (cmdBuf.startsWith(":")) {
        if (e.key === "Enter") {
          executeCmd(cmdBuf);
          setCmdBuf("");
          setTimeout(() => setCmdMsg(""), 3000);
          return;
        }
        if (e.key === "Escape")    { setCmdBuf(""); setCmdMsg(""); return; }
        if (e.key === "Backspace") { setCmdBuf(c => c.length <= 1 ? "" : c.slice(0, -1)); return; }
        if (e.key.length === 1)    { setCmdBuf(c => c + e.key); return; }
        return;
      }

      // ── Normal mode ────────────────────────────────────────────────────────
      if (e.key === ":") { setCmdBuf(":"); setCmdMsg(""); return; }

      if (e.key === "Escape") {
        if (focus === "content") { setFocus("sidebar"); return; }
        onExit();
        return;
      }

      if ((e.key === "ArrowRight" || e.key === "l") && focus === "sidebar") {
        setFocus("content");
        return;
      }
      if ((e.key === "ArrowLeft" || e.key === "h") && focus === "content") {
        setFocus("sidebar");
        return;
      }

      if (focus === "sidebar") {
        const i = SECTIONS.indexOf(active);
        if (e.key === "ArrowDown" || e.key === "j") {
          goTo(SECTIONS[(i + 1) % SECTIONS.length]);
        }
        if (e.key === "ArrowUp" || e.key === "k") {
          goTo(SECTIONS[(i - 1 + SECTIONS.length) % SECTIONS.length]);
        }
        if (e.key === "Enter") {
          setFocus("content");
        }
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [active, cmdBuf, focus, executeCmd, onExit, goTo]);

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="bv-root">

      {/* ════ SIDEBAR ════ */}
      <aside className={[
        "bv-sidebar",
        sidebarHidden       ? "bv-sidebar--hidden"  : "",
        focus === "sidebar" ? "bv-sidebar--focused" : "",
      ].join(" ")}>

        <div className="bv-sidebar-head">
          <span className="bv-sidebar-head-icon">⎇</span>
          <span className="bv-sidebar-head-text">EXPLORER</span>
          {focus === "sidebar" && <span className="bv-sidebar-head-hint">↑↓ nav · → open</span>}
        </div>

        <div className="bv-tree">
          <div className="bv-tree-root">
            <span className="bv-tree-caret">▾</span>
            <span className="bv-tree-folder">portfolio</span>
          </div>
          <ul className="bv-tree-list">
            {SECTIONS.map((sec, idx) => (
              <li
                key={sec}
                className={`bv-tree-item${sec === active ? " bv-tree-item--active" : ""}`}
                onClick={() => { goTo(sec); setFocus("content"); }}
              >
                <span className="bv-tree-num">{String(idx + 1).padStart(2, " ")}</span>
                <span className="bv-tree-icon">{SECTION_ICONS[sec]}</span>
                <span className="bv-tree-label">{SECTION_LABELS[sec]}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bv-sidebar-foot">
          <span>◐ {theme}</span>
          <span>{FONTS[fontIdx].name.split(" ")[0]}</span>
        </div>
      </aside>

      {/* ════ MAIN ════ */}
      <main className={`bv-main${sidebarHidden ? " bv-main--full" : ""}`}>

        {/* Tab row */}
        <div className="bv-tabrow">
          {SECTIONS.map(sec => (
            <button
              key={sec}
              className={`bv-tab${sec === active ? " bv-tab--active" : ""}`}
              onClick={() => { goTo(sec); setFocus("content"); }}
            >
              <span className="bv-tab-icon">{SECTION_ICONS[sec]}</span>
              <span className="bv-tab-label">{SECTION_LABELS[sec]}</span>
              {sec === active && <span className="bv-tab-active-mark">◀</span>}
            </button>
          ))}
        </div>

        {/* Content frame */}
        <div className={`bv-frame${focus === "content" ? " bv-frame--focused" : ""}`}>
          <span className="bv-frame-label">
            <span className="bv-frame-label-icon">{SECTION_ICONS[active]}</span>
            &nbsp;{active}
            <span className="bv-frame-label-dot">{focus === "content" ? " ●" : " ○"}</span>
          </span>
          <div className="bv-content">
            <AppRouter />
          </div>
        </div>

        {/* Status bar */}
        <div className="bv-statusbar">
          <span className="bv-st-left">
            <span className="bv-st-mode">
              {cmdBuf ? "COMMAND" : focus === "content" ? "NORMAL" : "SIDEBAR"}
            </span>
            <span className="bv-st-divider">│</span>
            <span className="bv-st-branch">⎇ {theme}</span>
            <span className="bv-st-divider">│</span>
            <span className="bv-st-file">{SECTION_ICONS[active]} {active}.md</span>
          </span>
          <span className="bv-st-center">
            {cmdMsg
              ? <span className="bv-st-msg">{cmdMsg}</span>
              : <span className="bv-st-hint">
                  {focus === "sidebar"
                    ? "↑↓ navigate · → open · : command"
                    : "← sidebar · :q quit · :theme <n> · :font"}
                </span>
            }
          </span>
          <span className="bv-st-right">
            <span className="bv-st-font">{FONTS[fontIdx].name.split(" ")[0]} {fontSize}px</span>
            <span className="bv-st-divider">│</span>
            <span className="bv-st-pos">{SECTIONS.indexOf(active) + 1}/{SECTIONS.length}</span>
          </span>
        </div>

        {/* Vim command line */}
        {cmdBuf && (
          <div className="bv-cmdline">
            <span>{cmdBuf}</span>
            <span className="bv-cmdline-cursor">█</span>
          </div>
        )}
      </main>

      <style>{CSS}</style>
    </div>
  );
}

// ─── CSS ──────────────────────────────────────────────────────────────────────

const CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .bv-root {
    display    : flex;
    height     : 100vh;
    width      : 100vw;
    overflow   : hidden;
    background : var(--bg);
    color      : var(--text);
    font-family: var(--font-family);
    font-size  : var(--font-size);
  }

  /* ═════ SIDEBAR ═════ */

  .bv-sidebar {
    width      : 220px;
    min-width  : 220px;
    background : var(--bg-sidebar);
    border-right: 1px solid var(--border-dim);
    display    : flex;
    flex-direction: column;
    flex-shrink: 0;
    overflow   : hidden;
    transition : width .18s cubic-bezier(.4,0,.2,1),
                 min-width .18s cubic-bezier(.4,0,.2,1),
                 opacity .18s ease;
  }
  .bv-sidebar--hidden  { width: 0; min-width: 0; opacity: 0; border-right: none; pointer-events: none; }
  .bv-sidebar--focused .bv-sidebar-head { border-bottom-color: var(--accent); }

  .bv-sidebar-head {
    display       : flex;
    align-items   : center;
    gap           : 6px;
    padding       : 8px 10px 6px;
    border-bottom : 1px solid var(--border-dim);
    font-size     : .72em;
    letter-spacing: .12em;
    color         : var(--text-dim);
    user-select   : none;
    white-space   : nowrap;
    flex-shrink   : 0;
  }
  .bv-sidebar-head-icon { color: var(--accent); }
  .bv-sidebar-head-text { color: var(--text-dim); font-weight: 700; }
  .bv-sidebar-head-hint { color: var(--text-dim); opacity: .45; font-size: .85em; margin-left: auto; }

  .bv-tree { flex: 1; overflow-y: auto; padding: 6px 0; scrollbar-width: thin; scrollbar-color: var(--selection) transparent; }
  .bv-tree::-webkit-scrollbar { width: 4px; }
  .bv-tree::-webkit-scrollbar-thumb { background: var(--selection); border-radius: 2px; }

  .bv-tree-root { display: flex; align-items: center; gap: 4px; padding: 4px 10px; color: var(--text-dim); font-size: .85em; user-select: none; }
  .bv-tree-caret  { color: var(--accent); font-size: .8em; }
  .bv-tree-folder { color: var(--accent2); font-weight: 600; }

  .bv-tree-list { list-style: none; }

  .bv-tree-item {
    display     : flex;
    align-items : center;
    gap         : 6px;
    padding     : 5px 12px 5px 20px;
    cursor      : pointer;
    color       : var(--text-dim);
    font-size   : .88em;
    border-left : 2px solid transparent;
    transition  : background .1s, color .1s, border-left-color .1s;
    white-space : nowrap;
    user-select : none;
  }
  .bv-tree-item:hover        { background: var(--selection); color: var(--text); }
  .bv-tree-item--active      { background: color-mix(in srgb, var(--accent) 12%, transparent); color: var(--accent); border-left-color: var(--accent); font-weight: 600; }
  .bv-tree-num               { color: var(--text-dim); opacity: .35; font-size: .78em; min-width: 18px; text-align: right; }
  .bv-tree-icon              { color: var(--accent3); font-size: .9em; }

  .bv-sidebar-foot {
    display        : flex;
    justify-content: space-between;
    padding        : 6px 10px;
    border-top     : 1px solid var(--border-dim);
    font-size      : .7em;
    color          : var(--text-dim);
    opacity        : .55;
    white-space    : nowrap;
    flex-shrink    : 0;
  }

  /* ═════ MAIN ═════ */

  .bv-main { flex: 1; display: flex; flex-direction: column; min-width: 0; overflow: hidden; }
  .bv-main--full { width: 100%; }

  /* ─── Tab row ─── */
  .bv-tabrow {
    display      : flex;
    align-items  : stretch;
    background   : var(--bg-sidebar);
    border-bottom: 1px solid var(--border-dim);
    flex-shrink  : 0;
    overflow-x   : auto;
    scrollbar-width: none;
  }
  .bv-tabrow::-webkit-scrollbar { display: none; }

  .bv-tab {
    display        : flex;
    align-items    : center;
    gap            : 5px;
    padding        : 5px 14px;
    background     : transparent;
    border         : none;
    border-right   : 1px solid var(--border-dim);
    color          : var(--text-dim);
    font-family    : var(--font-family);
    font-size      : .8em;
    cursor         : pointer;
    white-space    : nowrap;
    flex-shrink    : 0;
    transition     : color .1s, background .1s;
    letter-spacing : .02em;
  }
  .bv-tab:hover     { color: var(--text); background: color-mix(in srgb, var(--selection) 60%, transparent); }
  .bv-tab--active   { color: var(--accent3); font-weight: 700; background: color-mix(in srgb, var(--accent3) 8%, transparent); }
  .bv-tab-icon      { font-size: .85em; }
  .bv-tab-active-mark { color: var(--accent3); font-size: .7em; margin-left: 2px; }

  /* ─── Content frame ─── */
  .bv-frame {
    position      : relative;
    flex          : 1;
    margin        : 14px 12px 8px;
    border        : 1px solid var(--border-dim);
    border-radius : 6px;
    display       : flex;
    flex-direction: column;
    min-height    : 0;
    transition    : border-color .15s ease;
    overflow      : visible;
  }
  .bv-frame--focused { border-color: var(--border); }

  .bv-frame-label {
    position      : absolute;
    top           : -10px;
    left          : 14px;
    background    : var(--bg);
    color         : var(--text-dim);
    font-size     : .78em;
    font-weight   : 700;
    letter-spacing: .07em;
    padding       : 0 8px;
    user-select   : none;
    white-space   : nowrap;
    font-family   : var(--font-family);
    transition    : color .15s ease;
    z-index       : 1;
  }
  .bv-frame--focused .bv-frame-label { color: var(--accent3); }
  .bv-frame-label-icon { color: var(--accent3); margin-right: 3px; }
  .bv-frame-label-dot  { font-size: .8em; margin-left: 4px; }
  .bv-frame--focused .bv-frame-label-dot { color: var(--accent2); }

  .bv-content {
    flex          : 1;
    overflow-y    : auto;
    padding       : 16px 18px 12px;
    scrollbar-width: thin;
    scrollbar-color: var(--selection) transparent;
  }
  .bv-content::-webkit-scrollbar       { width: 6px; }
  .bv-content::-webkit-scrollbar-track { background: transparent; }
  .bv-content::-webkit-scrollbar-thumb { background: var(--selection); border-radius: 3px; }

  /* ─── Status bar ─── */
  .bv-statusbar {
    display        : flex;
    align-items    : center;
    justify-content: space-between;
    padding        : 3px 10px;
    background     : var(--bg-sidebar);
    border-top     : 1px solid var(--border-dim);
    font-size      : .76em;
    color          : var(--text-dim);
    flex-shrink    : 0;
    white-space    : nowrap;
    overflow       : hidden;
    gap            : 8px;
  }
  .bv-st-left, .bv-st-right { display: flex; align-items: center; gap: 6px; flex-shrink: 0; }
  .bv-st-center { flex: 1; text-align: center; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .bv-st-mode    { color: var(--accent);    font-weight: 700; letter-spacing: .08em; }
  .bv-st-divider { color: var(--border-dim); }
  .bv-st-branch  { color: var(--text-dim); }
  .bv-st-file    { color: var(--accent3); }
  .bv-st-font    { color: var(--text-dim); }
  .bv-st-pos     { color: var(--text-dim); }
  .bv-st-hint    { color: var(--text-dim); opacity: .6; }
  .bv-st-msg     { color: var(--accent2); }

  /* ─── Command line ─── */
  .bv-cmdline {
    display    : flex;
    align-items: center;
    gap        : 2px;
    padding    : 4px 10px;
    background : var(--bg-sidebar);
    border-top : 1px solid var(--border-dim);
    font-size  : .9em;
    color      : var(--text);
    flex-shrink: 0;
  }
  .bv-cmdline-cursor { color: var(--cursor); animation: bv-blink 1s step-end infinite; }
  @keyframes bv-blink { 0%,100% { opacity:1; } 50% { opacity:0; } }

  .bv-root ::selection { background: var(--selection); color: var(--text); }

  @media (max-width: 600px) {
    .bv-sidebar { width: 180px; min-width: 180px; }
    .bv-frame   { margin: 10px 6px 6px; }
    .bv-content { padding: 10px 10px 8px; }
    .bv-tab     { padding: 5px 9px; font-size: .75em; }
  }
`;