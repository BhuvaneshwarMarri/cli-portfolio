import BvimLayout from "../components/BvimLayout";
export default function Education() {
  return (
    <BvimLayout>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px", color: "var(--text)" }}>
        <h1 style={{ color: "var(--accent)", margin: 0, fontSize: "1.1em", letterSpacing: "0.08em" }}>∑ EDUCATION</h1>

        <div style={{ border: "1px solid var(--border-dim)", borderRadius: "4px", padding: "16px", background: "color-mix(in srgb, var(--bg-sidebar) 40%, transparent)" }}>
          <p style={{ color: "var(--accent2)", fontWeight: 700, margin: "0 0 4px" }}>B.Tech in Computer Science Engineering</p>
          <p style={{ color: "var(--text-dim)", fontSize: "0.82em", margin: "0 0 10px" }}>University Name · Expected 2024</p>
          {["Focused on software engineering and system design", "Core courses: Data Structures, Algorithms, Database Systems", "Specialization in AI and Machine Learning"].map(b => (
            <p key={b} style={{ margin: "3px 0", fontSize: "0.88em", color: "var(--text-dim)" }}>
              <span style={{ color: "var(--accent2)" }}>▸ </span>{b}
            </p>
          ))}
        </div>

        <div style={{ border: "1px solid var(--border-dim)", borderRadius: "4px", padding: "16px", background: "color-mix(in srgb, var(--bg-sidebar) 40%, transparent)" }}>
          <p style={{ color: "var(--accent)", fontWeight: 700, margin: "0 0 10px", fontSize: "0.85em", letterSpacing: "0.1em" }}>▸ CERTIFICATIONS</p>
          {["Advanced React & TypeScript Development", "Cloud Computing & AWS Architecture", "Linux System Administration"].map(c => (
            <p key={c} style={{ margin: "4px 0", fontSize: "0.88em", color: "var(--text-dim)" }}>
              <span style={{ color: "var(--accent)" }}>• </span>{c}
            </p>
          ))}
        </div>
      </div>
    </BvimLayout>
  );
}
