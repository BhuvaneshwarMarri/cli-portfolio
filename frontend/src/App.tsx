import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TerminalView from "./components/terminal/TerminalView.tsx";
import BvimView     from "./components/bvim/BvimView";
import type { ThemeName, HistoryLine } from "./portfolioTypes";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [mode, setMode] = useState<"terminal" | "bvim">("terminal");

  // ── Persisted terminal state ────────────────────────────────────────────────
  const [history, setHistory] = useState<HistoryLine[]>([]);
  const [input,   setInput]   = useState("");

  // ── Theme initialization with localStorage persistence ──────────────────────
  const DEFAULT_THEME: ThemeName = "catppuccin";
  const [theme, setTheme] = useState<ThemeName>(() => {
    const saved = localStorage.getItem("portfolio_theme");
    return (saved as ThemeName) || DEFAULT_THEME;
  });

  // ── Persist theme changes to localStorage ────────────────────────────────────
  useEffect(() => {
    localStorage.setItem("portfolio_theme", theme);
  }, [theme]);

  // ── Font settings ───────────────────────────────────────────────────────────
  const [fontIdx,  setFontIdx]  = useState(0);
  const [fontSize, setFontSize] = useState<number>(15);

  const handleNavigate  = (section: string) => navigate(`/${section}`);
  const handleExitBvim  = () => setMode("terminal");
  const handleEnterBvim = (section?: string) => {
    setMode("bvim");
    if (section) navigate(`/${section}`);
    else if (location.pathname === "/") navigate("/home");
  };

  const themeProps = { theme, setTheme, fontIdx, setFontIdx, fontSize, setFontSize };

  return mode === "terminal" ? (
    <TerminalView
      history={history} setHistory={setHistory}
      input={input}     setInput={setInput}
      onEnterBvim={handleEnterBvim}
      onNavigate={handleNavigate}
      {...themeProps}
    />
  ) : (
    <BvimView onExit={handleExitBvim} {...themeProps} />
  );
}