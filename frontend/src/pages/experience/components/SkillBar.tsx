export function SkillBar({ label, level, color }: { label: string; level: number; color: string }) {
  return (
    <div style={{ marginBottom: "12px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75em", marginBottom: "4px" }}>
        <span style={{ color: "var(--text)" }}>{label}</span>
        <span style={{ color: "var(--text-dim)" }}>{level}/10</span>
      </div>
      <div style={{ display: "flex", gap: "3px" }}>
        {[...Array(10)].map((_, i) => (
          <div key={i} style={{
            height      : "6px",
            flex        : 1,
            background  : i < level ? color : "var(--border-dim)",
            borderRadius: "1px",
            opacity     : i < level ? 1 : 0.3,
          }} />
        ))}
      </div>
    </div>
  );
}