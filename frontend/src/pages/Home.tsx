"use client";
import { useEffect, useState } from "react";
import BvimLayout from "../components/BvimLayout";
import SectionBox from "../components/SectionBox";

const INTERESTS = [
  { icon: "⬡", text: "Agentic AI & LLM tooling"    },
  { icon: "◈", text: "Full-stack web systems"        },
  { icon: "⌘", text: "Developer tooling & TUI apps" },
  { icon: "λ", text: "Open-source contributions"    },
];

const LINKS = [
  { icon: "◈", label: "github",   href: "https://github.com/BhuvaneshwarMarri", val: "BhuvaneshwarMarri",      active: true  },
  { icon: "⬡", label: "linkedin", href: "https://linkedin.com/in/bhuvan",       val: "linkedin.com/in/bhuvan", active: false },
  { icon: "@", label: "email",    href: "mailto:bhuvan@example.com",            val: "bhuvan@example.com",     active: false },
  { icon: "✦", label: "twitter",  href: "https://twitter.com/bhuvan",           val: "@bhuvan",                active: false },
];

const COMMANDS = [
  { cmd: ":theme catppuccin", desc: "Catppuccin"  },
  { cmd: ":theme dracula",    desc: "Dracula"      },
  { cmd: ":theme nord",       desc: "Nord"         },
  { cmd: ":theme gruvbox",    desc: "Gruvbox"      },
  { cmd: ":theme tokyo",      desc: "Tokyo Night"  },
  { cmd: ":theme nothing",    desc: "Nothing OS"   },
  { cmd: ":font",             desc: "cycle font"   },
  { cmd: ":font+ / :font-",   desc: "resize"       },
  { cmd: ":q",                desc: "exit bvim", active: true },
];

export default function Home() {
  const [asciiArt, setAsciiArt] = useState("");
  const [uptime,   setUptime]   = useState(0);

  useEffect(() => {
    fetch("/ascii-art.txt")
      .then(r => r.text())
      .then(d => setAsciiArt(d))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const t = setInterval(() => setUptime(s => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const fmtUptime = (s: number) => {
    const h   = Math.floor(s / 3600);
    const m   = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(sec).padStart(2,"0")}`;
  };

  return (
    <BvimLayout>
      <div style={{
        display      : "flex",
        flexDirection: "column",
        height       : "100%",
        gap          : "14px",
        color        : "var(--text)",
        fontFamily   : "var(--font-family, 'JetBrains Mono', monospace)",
        overflow     : "hidden",
      }}>

        {/* ── BANNER ──────────────────────────────────────────────────────── */}
        <SectionBox title="">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
            <div style={{ flex: 1, overflow: "hidden" }}>
              <pre style={{
                color: "var(--accent)", fontSize: "clamp(4px, 0.75vw, 10px)",
                lineHeight: 1.15, margin: "0 0 10px 0", whiteSpace: "pre", fontFamily: "monospace",
              }}>{`\
 ██████╗ ██╗  ██╗██╗   ██╗██╗   ██╗ █████╗ ███╗   ██╗███████╗███████╗██╗  ██╗██╗    ██╗ █████╗ ██████╗ 
 ██╔══██╗██║  ██║██║   ██║██║   ██║██╔══██╗████╗  ██║██╔════╝██╔════╝██║  ██║██║    ██║██╔══██╗██╔══██╗
 ██████╔╝███████║██║   ██║██║   ██║███████║██╔██╗ ██║█████╗  ███████╗███████║██║ █╗ ██║███████║██████╔╝
 ██╔══██╗██╔══██║██║   ██║╚██╗ ██╔╝██╔══██║██║╚██╗██║██╔══╝  ╚════██║██╔══██║██║███╗██║██╔══██║██╔══██╗
 ██████╔╝██║  ██║╚██████╔╝ ╚████╔╝ ██║  ██║██║ ╚████║███████╗███████║██║  ██║╚███╔███╔╝██║  ██║██║  ██║
 ╚═════╝ ╚═╝  ╚═╝ ╚═════╝   ╚═══╝  ╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝╚══════╝╚═╝  ╚═╝ ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝`}
              </pre>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ color: "var(--text-dim)", fontSize: "0.82em", letterSpacing: "0.05em" }}>
                  Full Stack Developer &nbsp;·&nbsp; AI Enthusiast &nbsp;·&nbsp; India
                </span>
                <span style={{
                  fontSize: "0.67em", padding: "2px 9px",
                  border: "1px solid var(--accent2)", borderRadius: "99px",
                  color: "var(--accent2)",
                  background: "color-mix(in srgb, var(--accent2) 10%, transparent)",
                  fontWeight: 600, letterSpacing: "0.04em", flexShrink: 0,
                }}>● Open to work</span>
                <span style={{ marginLeft: "auto", fontSize: "0.68em", color: "var(--text-dim)", opacity: 0.38, flexShrink: 0, letterSpacing: "0.03em" }}>
                  uptime {fmtUptime(uptime)}
                </span>
              </div>
            </div>
            {asciiArt && (
              <pre style={{
                fontSize: "clamp(5px, 0.75vw, 6px)", lineHeight: 0.66,
                color: "var(--text-dim)", margin: 0, opacity: 1,
                flexShrink: 0, letterSpacing: "-0.5px", fontFamily: "monospace",
              }}>
                {asciiArt}
              </pre>
            )}
          </div>
        </SectionBox>

        {/* ── GRID ────────────────────────────────────────────────────────── */}
        <div style={{
          display            : "grid",
          gridTemplateColumns: "1fr 2fr",
          gridTemplateRows   : "auto auto",
          gap                : "14px",
          flex               : 1,
          minHeight          : 0,
        }}>

          {/* ── TOP LEFT: whoami (compact) ── */}
          <SectionBox title="$ whoami" style={{ margin: 0 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <Field label="name"   value="Bhuvaneshwar Marri" highlight />
              <Field label="role"   value="Full Stack Dev"       />
              <Field label="focus"  value="AI · Web · Systems"   />
              <Field label="based"  value="India 🇮🇳"             />
              <Field label="status" value="● Available"          valueColor="var(--accent2)" />
              <Field label="type"   value="Full-time / Freelance" />
            </div>
          </SectionBox>

          {/* ── TOP RIGHT: bio (wider) ── */}
          <SectionBox title="$ cat bio.md" style={{ margin: 0 }}>
            <p style={{ margin: 0, color: "var(--text-dim)", fontSize: "0.86em", lineHeight: 1.9 }}>
              Hi, I'm{" "}
              <span style={{ color: "var(--accent)", fontWeight: 700 }}>Bhuvaneshwar</span>{" "}
              — a Full Stack Developer passionate about building at the intersection of
              <span style={{ color: "var(--accent2)" }}> software engineering</span> and
              <span style={{ color: "var(--accent3)" }}> artificial intelligence</span>.
              <br /><br />
              I enjoy crafting developer tools, scalable web systems, and AI-powered
              applications that feel genuinely useful — where great
              <span style={{ color: "var(--accent)" }}> experience</span> matters as much
              as great code. When I'm not shipping features, I'm exploring agentic AI,
              contributing to open source, or going down a distributed systems rabbit hole.
            </p>
          </SectionBox>

          {/* ── BOTTOM LEFT: interests + links ── */}
          <SectionBox title="$ interests  &  links" style={{ margin: 0 }}>
            <div style={{ display: "flex", gap: "20px" }}>
              {/* Interests */}
              <div style={{ display: "flex", flexDirection: "column", gap: "9px", flex: 1 }}>
                {INTERESTS.map(item => (
                  <div key={item.text} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                    <span style={{ color: "var(--accent3)", fontSize: "0.82em", flexShrink: 0, marginTop: "1px" }}>
                      {item.icon}
                    </span>
                    <span style={{ color: "var(--text-dim)", fontSize: "0.82em", lineHeight: 1.4 }}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
              {/* Divider */}
              <div style={{ width: "1px", background: "var(--border-dim)", flexShrink: 0 }} />
              {/* Links */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
                {LINKS.map(link => (
                  <div key={link.label} style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                    <span style={{ color: link.active ? "var(--accent)" : "var(--accent3)", fontSize: "0.85em", flexShrink: 0, width: "14px" }}>
                      {link.icon}
                    </span>
                    <span style={{ color: "var(--text-dim)", fontSize: "0.7em", minWidth: "48px", flexShrink: 0 }}>
                      {link.label}
                    </span>
                    <a
                      href={link.href}
                      target={link.href.startsWith("mailto") ? "_self" : "_blank"}
                      rel="noopener noreferrer"
                      style={{
                        color: link.active ? "var(--accent)" : "var(--text)",
                        fontWeight: link.active ? 600 : 400,
                        textDecoration: "none", fontSize: "0.8em",
                        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                        borderBottom: `1px dashed ${link.active ? "var(--accent)" : "var(--border-dim)"}`,
                        paddingBottom: "1px",
                      }}
                      onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "var(--accent)")}
                      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = link.active ? "var(--accent)" : "var(--text)")}
                    >
                      {link.val}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </SectionBox>

          {/* ── BOTTOM RIGHT: commands ── */}
          <SectionBox title="$ :help" style={{ margin: 0 }}>
            <div style={{ display: "flex", gap: "20px" }}>
              {/* Theme commands */}
              <div style={{ display: "flex", flexDirection: "column", gap: "5px", flex: 1 }}>
                <span style={{ color: "var(--text-dim)", fontSize: "0.68em", opacity: 0.5, marginBottom: "3px", letterSpacing: "0.06em" }}>THEMES</span>
                {COMMANDS.slice(0, 6).map(c => (
                  <CmdRow key={c.cmd} cmd={c.cmd} desc={c.desc} />
                ))}
              </div>
              {/* Divider */}
              <div style={{ width: "1px", background: "var(--border-dim)", flexShrink: 0 }} />
              {/* Font + misc commands */}
              <div style={{ display: "flex", flexDirection: "column", gap: "5px", flex: 1 }}>
                <span style={{ color: "var(--text-dim)", fontSize: "0.68em", opacity: 0.5, marginBottom: "3px", letterSpacing: "0.06em" }}>EDITOR</span>
                {COMMANDS.slice(6).map(c => (
                  <CmdRow key={c.cmd} cmd={c.cmd} desc={c.desc} active={!!c.active} />
                ))}
              </div>
            </div>
          </SectionBox>

        </div>
      </div>
    </BvimLayout>
  );
}

/* ── Sub-components ─────────────────────────────────────────────────────── */

function Field({ label, value, highlight = false, valueColor }: {
  label: string; value: string; highlight?: boolean; valueColor?: string;
}) {
  return (
    <div style={{ display: "flex", gap: "6px", alignItems: "baseline" }}>
      <span style={{ color: "var(--accent3)", fontSize: "0.7em", minWidth: "52px", flexShrink: 0 }}>
        {label}:
      </span>
      <span style={{
        color: valueColor ?? (highlight ? "var(--accent)" : "var(--text)"),
        fontSize: "0.83em", fontWeight: highlight ? 700 : 400, lineHeight: 1.4,
      }}>
        {highlight && <span style={{ color: "var(--accent3)", marginRight: "3px" }}>✓</span>}
        {value}
      </span>
    </div>
  );
}

function CmdRow({ cmd, desc, active = false }: { cmd: string; desc: string; active?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
      <span style={{
        color: active ? "var(--accent)" : "var(--text-dim)",
        fontSize: "0.75em", fontWeight: active ? 700 : 400,
        minWidth: "110px", flexShrink: 0, whiteSpace: "nowrap",
      }}>
        {cmd}
      </span>
      <span style={{ color: "var(--text-dim)", fontSize: "0.68em", opacity: 0.5 }}>
        — {desc}
      </span>
    </div>
  );
}