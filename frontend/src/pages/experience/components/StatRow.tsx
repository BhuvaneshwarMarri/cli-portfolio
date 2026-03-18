export function StatRow({ label, value, color, active = false }: { label: string; value: string; color: string; active?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <span style={{ color: "var(--text-dim)", fontSize: "0.82em", flex: 1 }}>
        {active && <span style={{ color: "var(--accent2)" }}>✓ </span>}{label}
      </span>
      <span style={{
        color, fontWeight: 700, fontSize: "0.82em",
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