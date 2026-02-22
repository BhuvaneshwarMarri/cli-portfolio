import BvimLayout from "../components/BvimLayout";

const skillGroups = [
  {
    label: "Languages",
    color: "var(--accent2)",
    skills: ["Python", "Java", "TypeScript", "JavaScript", "C++", "SQL"],
  },
  {
    label: "Frontend",
    color: "var(--accent)",
    skills: ["React", "TypeScript", "Tailwind CSS", "Vite", "Framer Motion"],
  },
  {
    label: "Backend & Tools",
    color: "var(--accent3)",
    skills: ["Node.js", "Express", "MongoDB", "PostgreSQL", "Docker", "Git"],
  },
  {
    label: "AI & Systems",
    color: "var(--cursor)",
    skills: ["Agentic AI", "LangChain", "Linux", "Bash", "System Design"],
  },
];

export default function Skills() {
  return (
    <BvimLayout>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px", color: "var(--text)" }}>
        <h1 style={{ color: "var(--accent)", margin: 0, fontSize: "1.1em", letterSpacing: "0.08em" }}>
          λ TECHNICAL SKILLS
        </h1>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "14px" }}>
          {skillGroups.map(group => (
            <div key={group.label} style={{
              border: "1px solid var(--border-dim)",
              borderRadius: "4px",
              padding: "14px",
              background: "color-mix(in srgb, var(--bg-sidebar) 60%, transparent)",
            }}>
              <p style={{ color: group.color, margin: "0 0 10px", fontWeight: 700, fontSize: "0.85em", letterSpacing: "0.1em" }}>
                ▸ {group.label.toUpperCase()}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {group.skills.map(s => (
                  <span key={s} style={{
                    padding: "3px 9px",
                    border: `1px solid ${group.color}`,
                    borderRadius: "2px",
                    fontSize: "0.8em",
                    color: group.color,
                    background: `color-mix(in srgb, ${group.color} 10%, transparent)`,
                  }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px dashed var(--border-dim)", paddingTop: "14px" }}>
          <p style={{ color: "var(--accent)", margin: "0 0 8px", fontSize: "0.85em", fontWeight: 700 }}>▸ CORE COMPETENCIES</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
            {["Full-stack web development", "RESTful API design", "Database architecture", "DevOps & CI/CD", "Agentic AI systems", "System design"].map(c => (
              <p key={c} style={{ margin: 0, color: "var(--text-dim)", fontSize: "0.88em" }}>
                <span style={{ color: "var(--accent2)" }}>✓ </span>{c}
              </p>
            ))}
          </div>
        </div>
      </div>
    </BvimLayout>
  );
}