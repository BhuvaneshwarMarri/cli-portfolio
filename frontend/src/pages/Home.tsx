"use client";
import { useEffect, useState } from "react";
import BvimLayout from "../components/BvimLayout";
import SectionBox from "../components/SectionBox";

export default function Home() {
  const [asciiArt, setAsciiArt] = useState("");

  useEffect(() => {
    fetch("/ascii-art.txt")
      .then((res) => res.text())
      .then((data) => setAsciiArt(data))
      .catch(() => {});
  }, []);

  return (
    <BvimLayout>
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        height: "100%",
        color: "var(--text)",
        fontFamily: "var(--font-family, 'JetBrains Mono', monospace)",
      }}>

        {/* ── TOP: ASCII Banner + Character side by side ────────────────── */}
        <SectionBox title="">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>

            {/* Left: name + tagline */}
            <div style={{ flex: 1, overflow: "hidden" }}>
              <pre style={{
                color: "var(--accent)",
                fontSize: "clamp(4px, 0.75vw, 10px)",
                lineHeight: 1.15,
                margin: "0 0 10px 0",
                whiteSpace: "pre",
                fontFamily: "monospace",
              }}>{`\
 ██████╗ ██╗  ██╗██╗   ██╗██╗   ██╗ █████╗ ███╗   ██╗███████╗███████╗██╗  ██╗██╗    ██╗ █████╗ ██████╗ 
 ██╔══██╗██║  ██║██║   ██║██║   ██║██╔══██╗████╗  ██║██╔════╝██╔════╝██║  ██║██║    ██║██╔══██╗██╔══██╗
 ██████╔╝███████║██║   ██║██║   ██║███████║██╔██╗ ██║█████╗  ███████╗███████║██║ █╗ ██║███████║██████╔╝
 ██╔══██╗██╔══██║██║   ██║╚██╗ ██╔╝██╔══██║██║╚██╗██║██╔══╝  ╚════██║██╔══██║██║███╗██║██╔══██║██╔══██╗
 ██████╔╝██║  ██║╚██████╔╝ ╚████╔╝ ██║  ██║██║ ╚████║███████╗███████║██║  ██║╚███╔███╔╝██║  ██║██║  ██║
 ╚═════╝ ╚═╝  ╚═╝ ╚═════╝   ╚═══╝  ╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝╚══════╝╚═╝  ╚═╝ ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝`}
              </pre>
              <p style={{ margin: 0, color: "var(--text-dim)", fontSize: "0.82em", letterSpacing: "0.05em" }}>
                Full Stack Developer &nbsp;·&nbsp; AI Enthusiast &nbsp;·&nbsp; India
              </p>
            </div>

            {/* Right: ASCII character art */}
            {asciiArt && (
              <pre style={{
                fontSize: "clamp(3px, 0.38vw, 6px)",
                lineHeight: 0.82,
                color: "var(--text-dim)",
                margin: 0,
                opacity: 0.65,
                flexShrink: 0,
                letterSpacing: "-0.5px",
                fontFamily: "monospace",
              }}>
                {asciiArt}
              </pre>
            )}
          </div>
        </SectionBox>

        {/* ── BOTTOM: Two-column grid ───────────────────────────────────── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "auto auto",
          gap: "16px",
          flex: 1,
        }}>

          {/* About Me */}
          <SectionBox title="About Me" style={{ margin: 0 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <InfoRow label="whoami"   value="Bhuvaneshwar Marri" active />
              <InfoRow label="role"     value="Full Stack Developer" />
              <InfoRow label="focus"    value="AI · Web · Systems" />
              <InfoRow label="location" value="India" />
              <InfoRow
                label="status"
                value="● Open to opportunities"
                valueColor="var(--accent2)"
              />
              <InfoRow
                label="bio"
                value="Passionate about building innovative solutions at the intersection of software engineering and AI."
              />
            </div>
          </SectionBox>

          {/* Links */}
          <SectionBox title="Links" style={{ margin: 0 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
              <LinkRow icon="◈" label="GitHub"
                href="https://github.com/BhuvaneshwarMarri"
                val="github.com/BhuvaneshwarMarri"
                active
              />
              <LinkRow icon="⬡" label="LinkedIn"
                href="https://linkedin.com/in/bhuvan"
                val="linkedin.com/in/bhuvan"
              />
              <LinkRow icon="@" label="Email"
                href="mailto:bhuvan@example.com"
                val="bhuvan@example.com"
              />
              <LinkRow icon="✦" label="Twitter"
                href="https://twitter.com/bhuvan"
                val="@bhuvan"
              />
            </div>
          </SectionBox>

          {/* Quick Stats */}
          <SectionBox title="Quick Stats" style={{ margin: 0 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <StatRow label="Projects"     value="10+"  color="var(--accent)"  />
              <StatRow label="Experience"   value="2 yr" color="var(--accent2)" />
              <StatRow label="Stack"        value="Full" color="var(--accent3)" />
              <StatRow label="Open Source"  value="Yes"  color="var(--accent2)" active />
              <StatRow label="Coffee / day" value="∞"    color="var(--accent3)" />
            </div>
          </SectionBox>

          {/* Tip */}
          <SectionBox title="Commands" style={{ margin: 0 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
              <CmdRow cmd=":theme dracula" desc="switch to Dracula theme" active />
              <CmdRow cmd=":theme nord"    desc="switch to Nord theme" />
              <CmdRow cmd=":theme gruvbox" desc="switch to Gruvbox theme" />
              <CmdRow cmd=":theme tokyo"   desc="switch to Tokyo Night theme" />
              <CmdRow cmd=":font"          desc="cycle monospace font" />
              <CmdRow cmd=":font+"         desc="increase font size" />
              <CmdRow cmd=":font-"         desc="decrease font size" />
              <CmdRow cmd=":q"             desc="exit bvim" />
            </div>
          </SectionBox>

        </div>
      </div>
    </BvimLayout>
  );
}

/* ── Sub-components ─────────────────────────────────────────────────────── */

function InfoRow({
  label,
  value,
  active = false,
  valueColor,
}: {
  label: string;
  value: string;
  active?: boolean;
  valueColor?: string;
}) {
  return (
    <div style={{ display: "flex", gap: "8px", alignItems: "baseline" }}>
      <span style={{
        color: "var(--accent3)",
        fontSize: "0.76em",
        minWidth: "68px",
        flexShrink: 0,
      }}>
        $ {label}
      </span>
      <span style={{
        color: valueColor ?? (active ? "var(--accent)" : "var(--text)"),
        fontSize: "0.88em",
        fontWeight: active ? 700 : 400,
        lineHeight: 1.5,
      }}>
        {active && <span style={{ color: "var(--accent3)" }}>✓ </span>}
        {value}
      </span>
    </div>
  );
}

function LinkRow({
  icon,
  label,
  href,
  val,
  active = false,
}: {
  icon: string;
  label: string;
  href: string;
  val: string;
  active?: boolean;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <span style={{ color: active ? "var(--accent)" : "var(--accent3)", minWidth: "14px", fontSize: "0.9em" }}>
        {icon}
      </span>
      <span style={{ color: "var(--text-dim)", fontSize: "0.76em", minWidth: "58px", flexShrink: 0 }}>
        {label}
      </span>
      <a
        href={href}
        target={href.startsWith("mailto") ? "_self" : "_blank"}
        rel="noopener noreferrer"
        style={{
          color: active ? "var(--accent)" : "var(--text)",
          fontWeight: active ? 700 : 400,
          textDecoration: "none",
          fontSize: "0.86em",
          borderBottom: `1px dashed ${active ? "var(--accent)" : "var(--border-dim)"}`,
          paddingBottom: "1px",
        }}
      >
        {val}
        {active && <span style={{ color: "var(--accent)", marginLeft: "6px" }}>✓</span>}
      </a>
    </div>
  );
}

function StatRow({
  label,
  value,
  color,
  active = false,
}: {
  label: string;
  value: string;
  color: string;
  active?: boolean;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <span style={{ color: "var(--text-dim)", fontSize: "0.82em", flex: 1 }}>
        {active && <span style={{ color: "var(--accent2)" }}>✓ </span>}
        {label}
      </span>
      <span style={{
        color,
        fontWeight: 700,
        fontSize: "0.9em",
        padding: "1px 8px",
        border: `1px solid ${color}`,
        borderRadius: "2px",
        background: `color-mix(in srgb, ${color} 10%, transparent)`,
      }}>
        {value}
      </span>
    </div>
  );
}

function CmdRow({
  cmd,
  desc,
  active = false,
}: {
  cmd: string;
  desc: string;
  active?: boolean;
}) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
      <span style={{
        color: active ? "var(--accent)" : "var(--text-dim)",
        fontWeight: active ? 700 : 400,
        fontSize: "0.82em",
        minWidth: "120px",
        flexShrink: 0,
      }}>
        {active && <span style={{ color: "var(--accent3)" }}>✓ </span>}
        {cmd}
      </span>
      <span style={{ color: "var(--text-dim)", fontSize: "0.76em", opacity: 0.7 }}>
        {desc}
      </span>
    </div>
  );
}