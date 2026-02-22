import { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AppRouter from "../router/AppRouter";

// ─── Types ───────────────────────────────────────────────────────────────────

type Section = "home" | "education" | "skills" | "projects" | "experience" | "contact";
type FocusArea = "sidebar" | "content";

// ─── Theme Definitions ───────────────────────────────────────────────────────

const THEMES = {
  dracula: {
    "--bg":          "#282a36",
    "--bg-sidebar":  "#21222c",
    "--bg-content":  "#282a36",
    "--border":      "#6272a4",
    "--border-dim":  "#44475a",
    "--text":        "#f8f8f2",
    "--text-dim":    "#6272a4",
    "--accent":      "#bd93f9",
    "--accent2":     "#50fa7b",
    "--accent3":     "#ff79c6",
    "--selection":   "#44475a",
    "--cursor":      "#bd93f9",
  },
  nord: {
    "--bg":          "#2e3440",
    "--bg-sidebar":  "#242933",
    "--bg-content":  "#2e3440",
    "--border":      "#5e81ac",
    "--border-dim":  "#3b4252",
    "--text":        "#eceff4",
    "--text-dim":    "#4c566a",
    "--accent":      "#88c0d0",
    "--accent2":     "#a3be8c",
    "--accent3":     "#bf616a",
    "--selection":   "#3b4252",
    "--cursor":      "#88c0d0",
  },
  catppuccin: {
    "--bg":          "#1e1e2e",
    "--bg-sidebar":  "#181825",
    "--bg-content":  "#1e1e2e",
    "--border":      "#89b4fa",
    "--border-dim":  "#313244",
    "--text":        "#cdd6f4",
    "--text-dim":    "#6c7086",
    "--accent":      "#89b4fa",
    "--accent2":     "#a6e3a1",
    "--accent3":     "#f38ba8",
    "--selection":   "#45475a",
    "--cursor":      "#89b4fa",
  },
  gruvbox: {
    "--bg":          "#282828",
    "--bg-sidebar":  "#1d2021",
    "--bg-content":  "#282828",
    "--border":      "#d79921",
    "--border-dim":  "#3c3836",
    "--text":        "#ebdbb2",
    "--text-dim":    "#665c54",
    "--accent":      "#fabd2f",
    "--accent2":     "#b8bb26",
    "--accent3":     "#fb4934",
    "--selection":   "#3c3836",
    "--cursor":      "#fabd2f",
  },
  tokyo: {
    "--bg":          "#1a1b26",
    "--bg-sidebar":  "#16161e",
    "--bg-content":  "#1a1b26",
    "--border":      "#7aa2f7",
    "--border-dim":  "#2a2b3d",
    "--text":        "#c0caf5",
    "--text-dim":    "#565f89",
    "--accent":      "#7aa2f7",
    "--accent2":     "#9ece6a",
    "--accent3":     "#f7768e",
    "--selection":   "#2a2b3d",
    "--cursor":      "#7aa2f7",
  },
} as const;

type ThemeName = keyof typeof THEMES;

// ─── Font Definitions ────────────────────────────────────────────────────────

const FONTS = [
  { name: "JetBrains Mono", css: "'JetBrains Mono', monospace" },
  { name: "Fira Code",      css: "'Fira Code', monospace" },
  { name: "Courier New",    css: "'Courier New', monospace" },
  { name: "IBM Plex Mono",  css: "'IBM Plex Mono', monospace" },
  { name: "Source Code Pro",css: "'Source Code Pro', monospace" },
];

// ─── Section Config ──────────────────────────────────────────────────────────

const SECTIONS: Section[] = ["home", "education", "skills", "projects", "experience", "contact"];

const SECTION_ICONS: Record<Section, string> = {
  home:       "~",
  education:  "∑",
  skills:     "λ",
  projects:   "◈",
  experience: "⌘",
  contact:    "@",
};

const SECTION_LABELS: Record<Section, string> = {
  home:       "home.md",
  education:  "education.md",
  skills:     "skills.md",
  projects:   "projects.md",
  experience: "experience.md",
  contact:    "contact.md",
};

// ─── Apply theme to document ─────────────────────────────────────────────────

function applyTheme(theme: ThemeName) {
  const vars = THEMES[theme];
  const root = document.documentElement;
  Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
}

function applyFont(fontCss: string, sizePx: number) {
  document.documentElement.style.setProperty("--font-family", fontCss);
  document.documentElement.style.setProperty("--font-size", `${sizePx}px`);
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function BvimView({ onExit }: { onExit: () => void }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Navigation state
  const getCurrentSection = useCallback((): Section => {
    const path = location.pathname.slice(1) as Section;
    return SECTIONS.includes(path) ? path : "home";
  }, [location.pathname]);

  const [active,    setActive]    = useState<Section>(getCurrentSection());
  const [focus,     setFocus]     = useState<FocusArea>("sidebar");
  const [cmdBuffer, setCmdBuffer] = useState("");
  const [cmdMsg,    setCmdMsg]    = useState("");

  // Theme / font state
  const [theme,     setTheme]     = useState<ThemeName>("catppuccin");
  const [fontIdx,   setFontIdx]   = useState(0);
  const [fontSize,  setFontSize]  = useState(15);

  // Sidebar collapsed when focus is on content
  const sidebarHidden = focus === "content";

  // Ensure initial navigation to home if on root
  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "") {
      navigate("/home");
    }
  }, []);

  // Sync URL → active
  useEffect(() => {
    setActive(getCurrentSection());
  }, [location.pathname, getCurrentSection]);

  // Sync active → URL
  useEffect(() => {
    if (location.pathname !== `/${active}` && location.pathname !== "/") {
      navigate(`/${active}`);
    }
  }, [active, navigate, location.pathname]);

  // Apply theme on mount + change
  useEffect(() => { applyTheme(theme); }, [theme]);

  // Apply font on mount + change
  useEffect(() => {
    applyFont(FONTS[fontIdx].css, fontSize);
  }, [fontIdx, fontSize]);

  // ── Command Executor ────────────────────────────────────────────────────────

  const executeCmd = useCallback((cmd: string) => {
    const trimmed = cmd.slice(1).trim(); // remove leading ':'

    // :q / :quit / :q!
    if (["q", "quit", "q!"].includes(trimmed)) { onExit(); return; }

    // :theme <name>
    const themeMatch = trimmed.match(/^theme\s+(\w+)$/);
    if (themeMatch) {
      const t = themeMatch[1] as ThemeName;
      if (t in THEMES) {
        setTheme(t);
        setCmdMsg(`Theme switched to ${t}`);
      } else {
        setCmdMsg(`Unknown theme. Available: ${Object.keys(THEMES).join(", ")}`);
      }
      return;
    }

    // :font
    if (trimmed === "font") {
      const next = (fontIdx + 1) % FONTS.length;
      setFontIdx(next);
      setCmdMsg(`Font: ${FONTS[next].name}`);
      return;
    }

    // :font+ / :font-
    if (trimmed === "font+") { setFontSize(s => Math.min(s + 1, 24)); setCmdMsg("Font size increased"); return; }
    if (trimmed === "font-") { setFontSize(s => Math.max(s - 1, 10)); setCmdMsg("Font size decreased"); return; }

    // :themes
    if (trimmed === "themes") {
      setCmdMsg(`Themes: ${Object.keys(THEMES).join(" | ")}`);
      return;
    }

    setCmdMsg(`E492: Not an editor command: ${trimmed}`);
  }, [fontIdx, onExit]);

  // ── Global Keyboard Handler ─────────────────────────────────────────────────

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      // Don't interfere with input elements (other than our hidden flow)
      if ((e.target as HTMLElement).tagName === "INPUT" ||
          (e.target as HTMLElement).tagName === "TEXTAREA") return;

      // Prevent default for nav keys
      if (["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.key)) {
        e.preventDefault();
      }

      // ── CMD buffer mode ──────────────────────────────────────────────────
      if (cmdBuffer.startsWith(":")) {
        if (e.key === "Enter") {
          executeCmd(cmdBuffer);
          setCmdBuffer("");
          setTimeout(() => setCmdMsg(""), 3000);
          return;
        }
        if (e.key === "Escape") { setCmdBuffer(""); setCmdMsg(""); return; }
        if (e.key === "Backspace") {
          setCmdBuffer(c => c.length <= 1 ? "" : c.slice(0, -1));
          return;
        }
        if (e.key.length === 1) { setCmdBuffer(c => c + e.key); return; }
        return;
      }

      // ── Start cmd buffer ─────────────────────────────────────────────────
      if (e.key === ":") { setCmdBuffer(":"); setCmdMsg(""); return; }

      // ── Escape exits ─────────────────────────────────────────────────────
      if (e.key === "Escape") {
        if (focus === "content") { setFocus("sidebar"); return; }
        onExit();
        return;
      }

      // ── Right arrow: sidebar → content (hide sidebar) ───────────────────
      if ((e.key === "ArrowRight" || e.key === "l") && focus === "sidebar") {
        setFocus("content");
        return;
      }

      // ── Left arrow: content → sidebar (show sidebar) ────────────────────
      if ((e.key === "ArrowLeft" || e.key === "h") && focus === "content") {
        setFocus("sidebar");
        return;
      }

      // ── Vertical nav (sidebar only) ──────────────────────────────────────
      if (focus === "sidebar") {
        const i = SECTIONS.indexOf(active);
        if (e.key === "ArrowDown" || e.key === "j") {
          setActive(SECTIONS[(i + 1) % SECTIONS.length]);
        }
        if (e.key === "ArrowUp" || e.key === "k") {
          setActive(SECTIONS[(i - 1 + SECTIONS.length) % SECTIONS.length]);
        }
        // Enter / right from sidebar → focus content
        if (e.key === "Enter" || e.key === "ArrowRight" || e.key === "l") {
          setFocus("content");
        }
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [active, cmdBuffer, focus, executeCmd, onExit]);

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="bvim-root" style={{ fontFamily: "var(--font-family)", fontSize: "var(--font-size)" }}>

      {/* ── Sidebar ─────────────────────────────────────────────────────── */}
      <aside className={`bvim-sidebar ${sidebarHidden ? "bvim-sidebar--hidden" : ""} ${focus === "sidebar" ? "bvim-sidebar--focused" : ""}`}>
        {/* Explorer header */}
        <div className="bvim-sidebar-header">
          <span className="bvim-sidebar-header-icon">⎇</span>
          <span className="bvim-sidebar-header-text">EXPLORER</span>
          <span className="bvim-sidebar-header-hint">{focus === "sidebar" ? "↑↓ nav · → open" : ""}</span>
        </div>

        {/* Section tree */}
        <div className="bvim-sidebar-tree">
          <div className="bvim-tree-root">
            <span className="bvim-tree-caret">▾</span>
            <span className="bvim-tree-folder">portfolio</span>
          </div>
          <ul className="bvim-tree-list">
            {SECTIONS.map((sec, idx) => (
              <li
                key={sec}
                className={`bvim-tree-item ${sec === active ? "bvim-tree-item--active" : ""}`}
                onClick={() => { setActive(sec); setFocus("content"); }}
              >
                <span className="bvim-tree-linenum">{String(idx + 1).padStart(2, " ")}</span>
                <span className="bvim-tree-icon">{SECTION_ICONS[sec]}</span>
                <span className="bvim-tree-label">{SECTION_LABELS[sec]}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Theme info at bottom */}
        <div className="bvim-sidebar-footer">
          <span className="bvim-footer-theme">◐ {theme}</span>
          <span className="bvim-footer-font">{FONTS[fontIdx].name.split(" ")[0]}</span>
        </div>
      </aside>

      {/* ── Main area ───────────────────────────────────────────────────── */}
      <main className={`bvim-main ${sidebarHidden ? "bvim-main--full" : ""}`}>

        {/* Double border content frame */}
        <div className={`bvim-frame ${focus === "content" ? "bvim-frame--focused" : ""}`}>
          {/* Title bar */}
          <div className="bvim-frame-titlebar">
            <span className="bvim-frame-corner">╔══</span>
            <span className="bvim-frame-tabs">
              {SECTIONS.map(sec => (
                <span
                  key={sec}
                  className={`bvim-tab ${sec === active ? "bvim-tab--active" : ""}`}
                  onClick={() => { setActive(sec); setFocus("content"); }}
                >
                  {SECTION_ICONS[sec]} {SECTION_LABELS[sec]}
                  {sec === active && focus === "content" && <span className="bvim-tab-dot">●</span>}
                </span>
              ))}
            </span>
            <span className="bvim-frame-corner-right">══╗</span>
          </div>

          {/* Inner double border + content */}
          <div className="bvim-frame-inner">
            <div className="bvim-frame-border-top">
              <span className="bvim-frame-filename">
                ║ <span className="bvim-frame-icon">{SECTION_ICONS[active]}</span>
                {" "}<span className="bvim-frame-name">{active.toUpperCase()}</span>
                {focus === "sidebar" && <span className="bvim-frame-hint"> [← to focus]</span>}
                {focus === "content" && <span className="bvim-frame-hint bvim-frame-hint--active"> [NORMAL]</span>}
              </span>
              <span className="bvim-frame-line-fill" />
              <span>║</span>
            </div>

            <div className="bvim-frame-content-wrapper">
              <div className="bvim-frame-left-border">║</div>
              <div className="bvim-frame-content">
                <AppRouter />
              </div>
              <div className="bvim-frame-right-border">║</div>
            </div>

            <div className="bvim-frame-border-bottom">
              <span>╚</span>
              <span className="bvim-frame-line-fill" />
              <span>╝</span>
            </div>
          </div>
        </div>

        {/* Status bar */}
        <div className="bvim-statusbar">
          <span className="bvim-status-mode">
            {cmdBuffer ? "COMMAND" : focus === "content" ? "NORMAL" : "SIDEBAR"}
          </span>
          <span className="bvim-status-sep">░</span>
          <span className="bvim-status-file">{SECTION_ICONS[active]} {active}</span>
          <span className="bvim-status-spacer" />
          <span className="bvim-status-hint">
            {cmdMsg || (focus === "sidebar"
              ? "↑↓ navigate · → focus content · : command"
              : "← sidebar · :q quit · :theme <name> · :font")}
          </span>
          <span className="bvim-status-sep">░</span>
          <span className="bvim-status-theme">⬛ {theme}</span>
        </div>

        {/* Vim command line */}
        {cmdBuffer && (
          <div className="bvim-cmdline">
            <span className="bvim-cmdline-text">{cmdBuffer}</span>
            <span className="bvim-cmdline-cursor">█</span>
          </div>
        )}
      </main>

      <style>{CSS}</style>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const CSS = `
  /* CSS variables set at :root by JS, fallback here */
  :root {
    --bg:          #1e1e2e;
    --bg-sidebar:  #181825;
    --bg-content:  #1e1e2e;
    --border:      #89b4fa;
    --border-dim:  #313244;
    --text:        #cdd6f4;
    --text-dim:    #6c7086;
    --accent:      #89b4fa;
    --accent2:     #a6e3a1;
    --accent3:     #f38ba8;
    --selection:   #45475a;
    --cursor:      #89b4fa;
    --font-family: 'JetBrains Mono', monospace;
    --font-size:   15px;
  }

  .bvim-root {
    display: flex;
    height: 100vh;
    width: 100vw;
    background: var(--bg);
    color: var(--text);
    font-family: var(--font-family);
    font-size: var(--font-size);
    overflow: hidden;
  }

  /* ── Sidebar ──────────────────────────────────────────────────────────── */

  .bvim-sidebar {
    width: 220px;
    min-width: 220px;
    background: var(--bg-sidebar);
    border-right: 1px solid var(--border-dim);
    display: flex;
    flex-direction: column;
    transition: width 0.18s cubic-bezier(0.4, 0, 0.2, 1),
                min-width 0.18s cubic-bezier(0.4, 0, 0.2, 1),
                opacity 0.18s ease;
    overflow: hidden;
  }

  .bvim-sidebar--hidden {
    width: 0;
    min-width: 0;
    opacity: 0;
    border-right: none;
    pointer-events: none;
  }

  .bvim-sidebar--focused .bvim-sidebar-header {
    border-bottom-color: var(--accent);
  }

  .bvim-sidebar-header {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 10px 6px;
    border-bottom: 1px solid var(--border-dim);
    font-size: 0.72em;
    letter-spacing: 0.12em;
    color: var(--text-dim);
    user-select: none;
    white-space: nowrap;
  }

  .bvim-sidebar-header-icon { color: var(--accent); font-size: 1em; }
  .bvim-sidebar-header-text { color: var(--text-dim); font-weight: 700; }
  .bvim-sidebar-header-hint { color: var(--text-dim); opacity: 0.5; font-size: 0.85em; margin-left: auto; }

  .bvim-sidebar-tree {
    flex: 1;
    overflow-y: auto;
    padding: 6px 0;
  }

  .bvim-tree-root {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px 10px;
    color: var(--text-dim);
    font-size: 0.85em;
    user-select: none;
  }

  .bvim-tree-caret  { color: var(--accent);   font-size: 0.8em; }
  .bvim-tree-folder { color: var(--accent2);  font-weight: 600; }

  .bvim-tree-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .bvim-tree-item {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 5px 12px 5px 20px;
    cursor: pointer;
    color: var(--text-dim);
    font-size: 0.88em;
    border-left: 2px solid transparent;
    transition: background 0.1s, color 0.1s, border-left-color 0.1s;
    white-space: nowrap;
    user-select: none;
  }

  .bvim-tree-item:hover {
    background: var(--selection);
    color: var(--text);
  }

  .bvim-tree-item--active {
    background: color-mix(in srgb, var(--accent) 15%, transparent);
    color: var(--accent);
    border-left-color: var(--accent);
    font-weight: 600;
  }

  .bvim-tree-linenum { color: var(--text-dim); opacity: 0.4; font-size: 0.8em; min-width: 18px; text-align: right; }
  .bvim-tree-icon    { color: var(--accent3); font-size: 0.9em; }
  .bvim-tree-label   {}

  .bvim-sidebar-footer {
    display: flex;
    justify-content: space-between;
    padding: 6px 10px;
    border-top: 1px solid var(--border-dim);
    font-size: 0.72em;
    color: var(--text-dim);
    opacity: 0.6;
    white-space: nowrap;
  }

  /* ── Main ─────────────────────────────────────────────────────────────── */

  .bvim-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
    transition: all 0.18s ease;
  }

  /* ── Frame ────────────────────────────────────────────────────────────── */

  .bvim-frame {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
  }

  /* Tab bar (top of frame, outer border top) */
  .bvim-frame-titlebar {
    display: flex;
    align-items: center;
    background: var(--bg-sidebar);
    border-bottom: 1px solid var(--border-dim);
    overflow-x: auto;
    scrollbar-width: none;
  }

  .bvim-frame-titlebar::-webkit-scrollbar { display: none; }

  .bvim-frame-corner       { color: var(--border-dim); padding: 0 4px; font-size: 0.8em; flex-shrink: 0; }
  .bvim-frame-corner-right { color: var(--border-dim); padding: 0 4px; font-size: 0.8em; flex-shrink: 0; margin-left: auto; }

  .bvim-frame-tabs {
    display: flex;
    flex: 1;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .bvim-tab {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 6px 14px;
    font-size: 0.82em;
    color: var(--text-dim);
    cursor: pointer;
    border-right: 1px solid var(--border-dim);
    white-space: nowrap;
    transition: background 0.1s, color 0.1s;
    flex-shrink: 0;
  }

  .bvim-tab:hover { background: var(--selection); color: var(--text); }

  .bvim-tab--active {
    background: var(--bg-content);
    color: var(--text);
    border-bottom: 2px solid var(--accent);
    padding-bottom: 4px;
  }

  .bvim-tab-dot { color: var(--accent2); font-size: 0.6em; }

  /* Inner double-border frame */
  .bvim-frame-inner {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
    padding: 0 12px;
    background: var(--bg-content);
  }

  .bvim-frame-border-top,
  .bvim-frame-border-bottom {
    display: flex;
    align-items: center;
    color: var(--border-dim);
    font-size: 0.82em;
    flex-shrink: 0;
    line-height: 1.4;
    white-space: nowrap;
  }

  .bvim-frame--focused .bvim-frame-border-top,
  .bvim-frame--focused .bvim-frame-border-bottom {
    color: var(--border);
  }

  .bvim-frame-filename {
    color: var(--accent);
    padding-right: 6px;
    font-size: 0.88em;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .bvim-frame-icon   { color: var(--accent3); }
  .bvim-frame-name   { font-weight: 700; letter-spacing: 0.05em; }
  .bvim-frame-hint   { color: var(--text-dim); font-size: 0.85em; font-weight: 400; }
  .bvim-frame-hint--active { color: var(--accent2); }

  .bvim-frame-line-fill {
    flex: 1;
    border-bottom: 1px dashed var(--border-dim);
    margin: 0 4px;
    height: 0;
    align-self: center;
  }

  .bvim-frame--focused .bvim-frame-line-fill {
    border-bottom-color: var(--border);
    border-bottom-style: solid;
  }

  .bvim-frame-content-wrapper {
    flex: 1;
    display: flex;
    min-height: 0;
  }

  .bvim-frame-left-border,
  .bvim-frame-right-border {
    color: var(--border-dim);
    font-size: 0.82em;
    display: flex;
    align-items: stretch;
    padding-top: 2px;
    line-height: 1;
    flex-shrink: 0;
    /* Vertical line using repeated char trick */
    writing-mode: vertical-lr;
    letter-spacing: -2px;
  }

  .bvim-frame--focused .bvim-frame-left-border,
  .bvim-frame--focused .bvim-frame-right-border {
    color: var(--border);
  }

  .bvim-frame-content {
    flex: 1;
    overflow-y: auto;
    padding: 12px 16px;
    scrollbar-width: thin;
    scrollbar-color: var(--selection) transparent;
  }

  .bvim-frame-content::-webkit-scrollbar { width: 6px; }
  .bvim-frame-content::-webkit-scrollbar-track { background: transparent; }
  .bvim-frame-content::-webkit-scrollbar-thumb { background: var(--selection); border-radius: 3px; }

  /* ── Status bar ───────────────────────────────────────────────────────── */

  .bvim-statusbar {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 3px 10px;
    background: var(--accent);
    color: var(--bg);
    font-size: 0.78em;
    font-weight: 600;
    flex-shrink: 0;
    white-space: nowrap;
    overflow: hidden;
  }

  .bvim-status-mode   { letter-spacing: 0.08em; font-weight: 700; }
  .bvim-status-sep    { opacity: 0.4; }
  .bvim-status-file   { }
  .bvim-status-spacer { flex: 1; }
  .bvim-status-hint   { font-weight: 400; opacity: 0.85; overflow: hidden; text-overflow: ellipsis; }
  .bvim-status-theme  { opacity: 0.7; margin-left: auto; }

  /* ── Command line ─────────────────────────────────────────────────────── */

  .bvim-cmdline {
    display: flex;
    align-items: center;
    gap: 2px;
    padding: 4px 10px;
    background: var(--bg-sidebar);
    border-top: 1px solid var(--border-dim);
    font-size: 0.9em;
    color: var(--text);
    flex-shrink: 0;
  }

  .bvim-cmdline-text   { }
  .bvim-cmdline-cursor { color: var(--cursor); animation: blink 1s step-end infinite; }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
  }

  /* ── Scrollbar global ─────────────────────────────────────────────────── */

  .bvim-sidebar-tree::-webkit-scrollbar { width: 4px; }
  .bvim-sidebar-tree::-webkit-scrollbar-track { background: transparent; }
  .bvim-sidebar-tree::-webkit-scrollbar-thumb { background: var(--selection); border-radius: 2px; }

  /* ── Selection ────────────────────────────────────────────────────────── */

  .bvim-root ::selection { background: var(--selection); color: var(--text); }

  /* ── Mobile ───────────────────────────────────────────────────────────── */

  @media (max-width: 600px) {
    .bvim-sidebar { width: 180px; min-width: 180px; }
    .bvim-frame-inner { padding: 0 4px; }
    .bvim-frame-content { padding: 8px 10px; }
    .bvim-tab { padding: 6px 8px; font-size: 0.78em; }
  }
`;