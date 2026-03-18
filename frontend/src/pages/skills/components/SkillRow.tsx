export function SkillRow({ name, level, color, primary }: {
  name: string; level: number; color: string; primary: boolean;
}) {
  const blocks  = 20;
  const filled  = Math.round((level / 100) * blocks);
  
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      {/* Primary marker */}
      <span style={{
        color      : primary ? color : "transparent",
        fontSize   : "0.65em",
        flexShrink : 0,
        lineHeight : 1,
      }}>★</span>

      {/* Name */}
      <span style={{
        color    : primary ? "var(--text)" : "var(--text-dim)",
        fontSize : "0.82em",
        fontWeight: primary ? 700 : 400,
        minWidth : "100px",
        flexShrink: 0,
      }}>
        {name}
      </span>

      {/* Bar */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "1px", position: "relative" }}>
        {[...Array(blocks)].map((_, i) => (
          <div key={i} style={{
            height      : i < filled ? "8px" : "5px",
            flex        : 1,
            borderRadius: "1px",
            background  : i < filled
              ? `color-mix(in srgb, ${color} ${70 + Math.round((i / blocks) * 30)}%, transparent)`
              : "var(--border-dim)",
            opacity     : i < filled ? 1 : 0.3,
            transition  : "height 0.2s ease",
          }} />
        ))}
      </div>

      {/* Percentage */}
      <span style={{
        color    : level >= 85 ? color : "var(--text-dim)",
        fontSize : "0.72em",
        minWidth : "34px",
        textAlign: "right",
        fontWeight: level >= 85 ? 700 : 400,
        flexShrink: 0,
      }}>
        {level}%
      </span>
    </div>
  );
}