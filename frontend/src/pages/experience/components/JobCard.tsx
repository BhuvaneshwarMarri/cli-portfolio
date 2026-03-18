import {JOBS} from "../constants";

export function JobCard({ job: j, isLast }: { job: typeof JOBS[number]; isLast: boolean }) {
  const isActive  = j.status === "ACTIVE";
  const accentCol = isActive ? "var(--accent2)" : "var(--border-dim)";

  return (
    <div style={{ display: "flex", gap: "12px", marginBottom: isLast ? 0 : "16px" }}>

      {/* Timeline spine */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, width: "16px" }}>
        <div style={{
          width       : "12px",
          height      : "12px",
          borderRadius: "50%",
          background  : isActive ? "var(--accent2)" : "var(--border-dim)",
          boxShadow   : isActive ? "0 0 8px var(--accent2)" : "none",
          flexShrink  : 0,
          marginTop   : "5px",
        }} />
        {!isLast && (
          <div style={{
            flex      : 1,
            width     : "1px",
            minHeight : "20px",
            margin    : "4px 0",
            background: isActive
              ? `repeating-linear-gradient(to bottom, var(--accent2) 0, var(--accent2) 4px, transparent 4px, transparent 8px)`
              : "var(--border-dim)",
          }} />
        )}
      </div>

      {/* Card body */}
      <div style={{
        flex        : 1,
        border      : `1px solid ${isActive ? "var(--accent2)" : "var(--border-dim)"}`,
        borderRadius: "6px",
        padding     : "12px 14px",
        background  : isActive
          ? "color-mix(in srgb, var(--accent2) 5%, transparent)"
          : "transparent",
      }}>

        {/* Top row: title + badge */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "8px", marginBottom: "4px" }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: "0.92em", color: isActive ? "var(--accent2)" : "var(--accent)", marginBottom: "2px" }}>
              {isActive && "✓ "}{j.title}
            </div>
            <div style={{ fontSize: "0.78em", color: "var(--text-dim)" }}>
              {j.company} &nbsp;·&nbsp; {j.type} &nbsp;·&nbsp; {j.location}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "3px", flexShrink: 0 }}>
            <span style={{
              fontSize    : "0.65em",
              padding     : "2px 7px",
              borderRadius: "3px",
              border      : `1px solid ${accentCol}`,
              color       : accentCol,
              fontWeight  : 600,
              letterSpacing: "0.04em",
            }}>
              [{j.status}]
            </span>
            <span style={{ fontSize: "0.68em", color: "var(--text-dim)", opacity: 0.7 }}>{j.period}</span>
          </div>
        </div>

        {/* Duration pill */}
        <div style={{ marginBottom: "10px" }}>
          <span style={{
            fontSize    : "0.68em",
            color       : "var(--text-dim)",
            background  : "color-mix(in srgb, var(--selection) 60%, transparent)",
            border      : "1px solid var(--border-dim)",
            borderRadius: "2px",
            padding     : "1px 6px",
          }}>
            ⌚ {j.duration}
          </span>
        </div>

        {/* Stack tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "10px" }}>
          {j.stack.map(s => (
            <span key={s} style={{
              fontSize    : "0.68em",
              color       : "var(--accent3)",
              padding     : "1px 6px",
              border      : "1px solid color-mix(in srgb, var(--accent3) 30%, transparent)",
              borderRadius: "2px",
              background  : "color-mix(in srgb, var(--accent3) 8%, transparent)",
            }}>
              #{s}
            </span>
          ))}
        </div>

        {/* Bullets */}
        <ul style={{ margin: "0 0 12px 0", paddingLeft: "14px", listStyleType: "'↳ '", color: "var(--text-dim)", fontSize: "0.82em" }}>
          {j.bullets.map((b, i) => (
            <li key={i} style={{ marginBottom: "4px", lineHeight: 1.5 }}>{b}</li>
          ))}
        </ul>

        {/* Metrics */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {j.metrics.map(m => (
            <div key={m.label} style={{
              display     : "flex",
              flexDirection: "column",
              alignItems  : "center",
              padding     : "5px 10px",
              border      : `1px solid color-mix(in srgb, ${m.color} 35%, transparent)`,
              borderRadius: "4px",
              background  : `color-mix(in srgb, ${m.color} 8%, transparent)`,
              gap         : "2px",
            }}>
              <span style={{ fontWeight: 700, fontSize: "0.88em", color: m.color }}>{m.value}</span>
              <span style={{ fontSize: "0.65em", color: "var(--text-dim)", letterSpacing: "0.04em" }}>{m.label}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}