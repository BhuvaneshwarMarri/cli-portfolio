import BvimLayout from "../components/BvimLayout";

export default function Experience() {
  return (
    <BvimLayout>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px", color: "var(--text)" }}>
        <h1 style={{ color: "var(--accent)", margin: 0, fontSize: "1.1em", letterSpacing: "0.08em" }}>⌘ WORK EXPERIENCE</h1>

        {[
          {
            role: "Full Stack Developer",
            company: "Tech Company",
            period: "2023 – Present",
            current: true,
            color: "var(--accent2)",
            bullets: [
              "Developed and maintained full-stack web applications using React and Node.js",
              "Implemented RESTful APIs and integrated third-party services",
              "Optimized application performance, reducing load time by 40%",
              "Collaborated with cross-functional teams using Agile methodology",
            ],
          },
          {
            role: "Software Engineering Intern",
            company: "Startup Inc.",
            period: "2022 – 2023",
            color: "var(--accent)",
            bullets: [
              "Built responsive web interfaces using React and TypeScript",
              "Participated in code reviews and pair programming sessions",
              "Contributed to open-source projects and internal tools",
            ],
          },
        ].map(exp => (
          <div key={exp.role} style={{ border: "1px solid var(--border-dim)", borderRadius: "4px", padding: "16px", background: "color-mix(in srgb, var(--bg-sidebar) 40%, transparent)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
              <span style={{ color: exp.color, fontWeight: 700 }}>{exp.role}</span>
              {exp.current && <span style={{ fontSize: "0.72em", padding: "1px 7px", border: "1px solid var(--accent2)", borderRadius: "2px", color: "var(--accent2)" }}>Current</span>}
            </div>
            <p style={{ color: "var(--text-dim)", fontSize: "0.82em", margin: "0 0 10px" }}>{exp.company} · {exp.period}</p>
            {exp.bullets.map(b => (
              <p key={b} style={{ margin: "3px 0", fontSize: "0.88em", color: "var(--text-dim)" }}>
                <span style={{ color: exp.color }}>▸ </span>{b}
              </p>
            ))}
          </div>
        ))}

        <div style={{ border: "1px solid var(--border-dim)", borderRadius: "4px", padding: "16px", background: "color-mix(in srgb, var(--bg-sidebar) 40%, transparent)" }}>
          <p style={{ color: "var(--accent3)", fontWeight: 700, margin: "0 0 8px", fontSize: "0.85em" }}>▸ KEY ACHIEVEMENTS</p>
          {["Led migration of legacy codebase to modern tech stack", "Mentored junior developers and conducted technical workshops", "Implemented CI/CD pipeline reducing deployment time by 60%", "Received 'Developer of the Quarter' award"].map(a => (
            <p key={a} style={{ margin: "3px 0", fontSize: "0.88em", color: "var(--text-dim)" }}>
              <span style={{ color: "var(--accent3)" }}>• </span>{a}
            </p>
          ))}
        </div>
      </div>
    </BvimLayout>
  );
}