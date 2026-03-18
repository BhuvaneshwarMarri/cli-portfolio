"use client";
import { useEffect, useState } from "react";
import BvimLayout from "../../components/BvimLayout";
import SectionBox from "../../components/SectionBox";
import useHomeData from "./useHomeData";
import {CmdRow,Field} from './components/helper'
import './home.css'

export default function Home() {
  const [asciiArt, setAsciiArt] = useState("");
  const [uptime,   setUptime]   = useState(0);
  const { INTERESTS, LINKS, COMMANDS } = useHomeData();

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
      <div className="hm-container">
        {/* ── BANNER ──────────────────────────────────────────────────────── */}
        <SectionBox title="">
          <div className="hm-banner">
            <div className="hm-banner-left">
              <pre className="hm-banner-title">{`\
 ██████╗ ██╗  ██╗██╗   ██╗██╗   ██╗ █████╗ ███╗   ██╗███████╗███████╗██╗  ██╗██╗    ██╗ █████╗ ██████╗ 
 ██╔══██╗██║  ██║██║   ██║██║   ██║██╔══██╗████╗  ██║██╔════╝██╔════╝██║  ██║██║    ██║██╔══██╗██╔══██╗
 ██████╔╝███████║██║   ██║██║   ██║███████║██╔██╗ ██║█████╗  ███████╗███████║██║ █╗ ██║███████║██████╔╝
 ██╔══██╗██╔══██║██║   ██║╚██╗ ██╔╝██╔══██║██║╚██╗██║██╔══╝  ╚════██║██╔══██║██║███╗██║██╔══██║██╔══██╗
 ██████╔╝██║  ██║╚██████╔╝ ╚████╔╝ ██║  ██║██║ ╚████║███████╗███████║██║  ██║╚███╔███╔╝██║  ██║██║  ██║
 ╚═════╝ ╚═╝  ╚═╝ ╚═════╝   ╚═══╝  ╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝╚══════╝╚═╝  ╚═╝ ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝`}
              </pre>
              <div className="hm-banner-meta">
                <span className="hm-banner-text">
                  Full Stack Developer &nbsp;·&nbsp; AI Enthusiast &nbsp;·&nbsp; India
                </span>
                <span className="hm-badge">● Open to work</span>
                <span className="hm-uptime">
                  uptime {fmtUptime(uptime)}
                </span>
              </div>
            </div>
            {asciiArt && (
              <pre className="hm-ascii">
                {asciiArt}
              </pre>
            )}
          </div>
        </SectionBox>

        {/* ── GRID ────────────────────────────────────────────────────────── */}
        <div className="hm-grid">

          {/* ── TOP LEFT: whoami (compact) ── */}
          <SectionBox title="$ whoami" style={{ margin: 0 }}>
            <div className="hm-stack">
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
            <p className="hm-bio">
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
            <div className="hm-split" >
              {/* Interests */}
              <div className="hm-interest-list">
                {INTERESTS?.map(item => (
                  <div key={item.text} className="hm-interest-row">
                    <span className="hm-interest-icon">
                      {item.icon}
                    </span>
                    <span className="hm-interest-text">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
              {/* Divider */}
              <div className="hm-divider"/>
              {/* Links */}
              <div className="hm-links">
                {LINKS?.map(link => (
                  <div key={link.label} className="hm-link-row">
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
            <div className="hm-command-box">
              {/* Theme commands */}
              <div className="hm-command-list">
                <span className="hm-command-title">THEMES</span>
                {COMMANDS?.slice(0, 6).map(c => (
                  <CmdRow key={c.cmd} cmd={c.cmd} desc={c.desc} />
                ))}
              </div>
              {/* Divider */}
              <div className="hm-divider"/>
              {/* Font + misc commands */}
              <div className="hm-command-column">
                <span className="hm-command-title">EDITOR</span>
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
