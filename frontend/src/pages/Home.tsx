"use client";
import { useEffect, useState } from "react";
import BvimLayout from "../components/BvimLayout";

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
      <div style={styles.page}>
        <div style={styles.nameBlock}>
          <pre style={styles.namePre}>{`
 ██████╗ ██╗  ██╗██╗   ██╗██╗   ██╗ █████╗ ███╗   ██╗
 ██╔══██╗██║  ██║██║   ██║██║   ██║██╔══██╗████╗  ██║
 ██████╔╝███████║██║   ██║██║   ██║███████║██╔██╗ ██║
 ██╔══██╗██╔══██║██║   ██║╚██╗ ██╔╝██╔══██║██║╚██╗██║
 ██████╔╝██║  ██║╚██████╔╝ ╚████╔╝ ██║  ██║██║ ╚████║
 ╚═════╝ ╚═╝  ╚═╝ ╚═════╝   ╚═══╝  ╚═╝  ╚═╝╚═╝  ╚═══╝`}</pre>
        </div>

        <div style={styles.grid}>
          <div style={styles.infoBlock}>
            <p style={styles.label}>$ whoami</p>
            <p style={styles.value}>Bhuvaneshwar Marri</p>

            <p style={styles.label}>$ role</p>
            <p style={styles.value}>Full Stack Developer · AI Enthusiast</p>

            <p style={styles.label}>$ location</p>
            <p style={styles.value}>India</p>

            <p style={styles.label}>$ status</p>
            <p style={{ ...styles.value, color: "var(--accent2)" }}>
              ● Open to opportunities
            </p>

            <p style={styles.label}>$ description</p>
            <p style={styles.desc}>
              Passionate about building innovative, elegant solutions at the intersection
              of software engineering and AI. I love creating tools that feel like magic.
            </p>

            <div style={styles.linkRow}>
              <a href="https://github.com/BhuvaneshwarMarri" target="_blank" rel="noopener noreferrer" style={styles.link}>
                ◈ GitHub
              </a>
              <a href="https://linkedin.com/in/bhuvan" target="_blank" rel="noopener noreferrer" style={styles.link}>
                ◈ LinkedIn
              </a>
              <a href="mailto:bhuvan@example.com" style={styles.link}>
                ◈ Email
              </a>
            </div>
          </div>

          {asciiArt && (
            <div style={styles.asciiBlock}>
              <pre style={styles.asciiPre}>{asciiArt}</pre>
            </div>
          )}
        </div>

        <div style={styles.hint}>
          Type <span style={{ color: "var(--accent)" }}>:theme dracula</span> ·{" "}
          <span style={{ color: "var(--accent)" }}>:theme nord</span> ·{" "}
          <span style={{ color: "var(--accent)" }}>:theme gruvbox</span> ·{" "}
          <span style={{ color: "var(--accent)" }}>:font</span> to customise
        </div>
      </div>
    </BvimLayout>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    color: "var(--text)",
  },
  nameBlock: {
    overflowX: "auto",
  },
  namePre: {
    color: "var(--accent)",
    fontSize: "clamp(5px, 0.9vw, 11px)",
    lineHeight: 1.1,
    margin: 0,
    whiteSpace: "pre",
    fontFamily: "inherit",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr auto",
    gap: "24px",
    alignItems: "start",
  },
  infoBlock: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    color: "var(--accent3)",
    fontSize: "0.8em",
    margin: "8px 0 2px",
  },
  value: {
    color: "var(--text)",
    margin: 0,
    fontWeight: 600,
  },
  desc: {
    color: "var(--text-dim)",
    margin: "4px 0",
    lineHeight: 1.6,
    maxWidth: "480px",
  },
  linkRow: {
    display: "flex",
    gap: "16px",
    marginTop: "12px",
    flexWrap: "wrap",
  },
  link: {
    color: "var(--accent)",
    textDecoration: "none",
    borderBottom: "1px dashed var(--border-dim)",
    paddingBottom: "2px",
    fontSize: "0.9em",
  },
  asciiBlock: {
    overflow: "hidden",
    maxWidth: "240px",
  },
  asciiPre: {
    fontSize: "clamp(3px, 0.4vw, 7px)",
    lineHeight: 0.8,
    color: "var(--text-dim)",
    margin: 0,
    opacity: 0.7,
  },
  hint: {
    borderTop: "1px dashed var(--border-dim)",
    paddingTop: "12px",
    color: "var(--text-dim)",
    fontSize: "0.8em",
  },
};