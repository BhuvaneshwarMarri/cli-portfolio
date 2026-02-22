import BvimLayout from "../components/BvimLayout";

const projects = [
  {
    name: "CLI Portfolio",
    status: "Active",
    statusColor: "var(--accent2)",
    desc: "A unique terminal-inspired portfolio with Vim-like navigation and dual-mode interface.",
    tags: ["React", "TypeScript", "Vite"],
    bullets: ["Dual-mode interface (Terminal & Bvim)", "Custom command-line parser", "Vim-inspired keyboard shortcuts", "Multi-theme system"],
    icon: "◈",
    href: "https://github.com/BhuvaneshwarMarri",
  },
  {
    name: "SG Games Platform",
    status: "In Progress",
    statusColor: "var(--accent)",
    desc: "A comprehensive gaming platform with real-time multiplayer capabilities.",
    tags: ["React", "Node.js", "WebSocket"],
    bullets: ["Real-time multiplayer via WebSocket", "User authentication & leaderboards", "Responsive game UI"],
    icon: "⬡",
    href: "#",
  },
  {
    name: "Agentic AI Tools",
    status: "Research",
    statusColor: "var(--accent3)",
    desc: "AI-powered automation tools for developers — autonomous task execution and NL code gen.",
    tags: ["Python", "LangChain", "OpenAI"],
    bullets: ["Autonomous task execution", "Natural language code generation", "Multi-agent orchestration"],
    icon: "⬟",
    href: "#",
  },
];

export default function Projects() {
  return (
    <BvimLayout>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px", color: "var(--text)" }}>
        <h1 style={{ color: "var(--accent)", margin: 0, fontSize: "1.1em", letterSpacing: "0.08em" }}>
          ◈ PROJECTS
        </h1>

        {projects.map(p => (
          <div key={p.name} style={{
            border: "1px solid var(--border-dim)",
            borderRadius: "4px",
            padding: "16px",
            background: "color-mix(in srgb, var(--bg-sidebar) 40%, transparent)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
              <span style={{ color: p.statusColor, fontSize: "1.1em" }}>{p.icon}</span>
              <span style={{ color: "var(--text)", fontWeight: 700, fontSize: "1em" }}>{p.name}</span>
              <span style={{
                marginLeft: "auto",
                fontSize: "0.75em",
                padding: "2px 8px",
                border: `1px solid ${p.statusColor}`,
                borderRadius: "2px",
                color: p.statusColor,
              }}>
                {p.status}
              </span>
            </div>

            <p style={{ color: "var(--text-dim)", margin: "0 0 10px", fontSize: "0.88em", lineHeight: 1.5 }}>{p.desc}</p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "10px" }}>
              {p.tags.map(t => (
                <span key={t} style={{
                  fontSize: "0.75em",
                  padding: "2px 7px",
                  background: "var(--selection)",
                  borderRadius: "2px",
                  color: "var(--text-dim)",
                }}>
                  {t}
                </span>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
              {p.bullets.map(b => (
                <p key={b} style={{ margin: 0, color: "var(--text-dim)", fontSize: "0.85em" }}>
                  <span style={{ color: p.statusColor }}>▸ </span>{b}
                </p>
              ))}
            </div>
          </div>
        ))}

        <p style={{ color: "var(--text-dim)", fontSize: "0.85em", margin: 0 }}>
          ◈ More on{" "}
          <a href="https://github.com/BhuvaneshwarMarri" style={{ color: "var(--accent)" }} target="_blank" rel="noopener noreferrer">
            github.com/BhuvaneshwarMarri
          </a>
        </p>
      </div>
    </BvimLayout>
  );
}