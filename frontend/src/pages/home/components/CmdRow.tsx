export function CmdRow({ cmd, desc, active = false }: { cmd: string; desc: string; active?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
      <span style={{
        color: active ? "var(--accent)" : "var(--text-dim)",
        fontSize: "0.75em", fontWeight: active ? 700 : 400,
        minWidth: "110px", flexShrink: 0, whiteSpace: "nowrap",
      }}>
        {cmd}
      </span>
      <span style={{ color: "var(--text-dim)", fontSize: "0.68em", opacity: 0.5 }}>
        — {desc}
      </span>
    </div>
  );
}