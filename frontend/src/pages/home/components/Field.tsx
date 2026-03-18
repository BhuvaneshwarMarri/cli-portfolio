export function Field({ label, value, highlight = false, valueColor }: {
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
