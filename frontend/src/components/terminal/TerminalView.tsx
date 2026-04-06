import { useEffect, useRef, useState } from "react";
import type { HistoryLine } from "../../portfolioTypes.ts";
import './terminal.css';
import { FONTS, type Props, BANNER } from "./constants.ts";
import { applyTheme, applyFont } from "./helpers.ts";
import { COMMANDS, COLON_COMMANDS, AUTOCOMPLETE_COMMANDS, type CommandContext } from "./commands.ts";

const BLANK: HistoryLine = { text: "" };

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
  useEffect(() => { applyTheme(theme); },                      [theme]);
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
        const matches = AUTOCOMPLETE_COMMANDS.filter(c =>
          c.startsWith(input.toLowerCase())
        );
        if (matches.length === 1) {
          setInput(matches[0]);
        } else if (matches.length > 1) {
          setHistory(h => [
            ...h,
            { text: `$ ${input}` },
            { text: matches.join("  ") },
            BLANK,
          ]);
        }
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

    // Track non-colon commands in history
    if (!cmd.startsWith(":")) {
      setCommandHistory(p => [...p, cmd]);
      setHistoryIndex(-1);
    }

    // Build context object passed to every command handler
    const ctx: CommandContext = {
      theme, fontIdx, fontSize,
      setTheme,
      setFontIdx,
      setFontSize,
      setHistory,
      setInput,
      setHistoryIndex,
      onEnterBvim,
      onNavigate,
    };

    // ── Colon commands (:theme, :font, :font+, :font-) ────────────────────────
    if (lower.startsWith(":")) {
      const colonKey = Object.keys(COLON_COMMANDS)
        .sort((a, b) => b.length - a.length)
        .find(k => lower.startsWith(k));
      if (colonKey) COLON_COMMANDS[colonKey](cmd, ctx);
      // Unknown colon commands are silently ignored (vim-style behaviour)
      setInput("");
      return;
    }

    // ── Named commands ────────────────────────────────────────────────────────
    if (lower in COMMANDS) {
      COMMANDS[lower](cmd, ctx);
      setInput("");
      return;
    }

    // ── Unknown command ───────────────────────────────────────────────────────
    setHistory(h => [
      ...h,
      { text: `$ ${cmd}`, colour: "accent" },
      { text: `  bash: ${cmd}: command not found`, colour: "accent3" },
      { text: "  Type 'help' to see available commands.", colour: "dim" },
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