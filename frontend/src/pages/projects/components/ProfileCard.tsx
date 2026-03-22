import { useEffect, useState } from "react";
import SectionBox from "../../../components/SectionBox";

interface ProfileStats {
  repositories: number;
  open_source: number;
  total_stars: number;
  total_forks: number;
}

export function ProfileCard() {
  const contributions = [2, 5, 3, 7, 4, 6, 1, 8, 5, 3, 6, 2, 7, 4, 8, 5, 3, 6, 2, 7, 4, 5, 8, 3];

  const [stats, setStats] = useState<ProfileStats | null>(null);

  useEffect(() => {
    let isMounted = true;
    fetch("http://localhost:8000/projects/stats")
      .then(res => res.json())
      .then(data => {
        if (isMounted) setStats(data);
      })
      .catch(err => console.error("[ProfileCard] stats fetch failed:", err));
    
    return () => { isMounted = false; };
  }, []);

  const statItems = [
    { label: "Repos",  value: stats ? String(stats.repositories) : "…", color: "var(--accent)"  },
    { label: "Stars",  value: stats ? String(stats.total_stars)  : "…", color: "var(--accent3)" },
    { label: "Forks",  value: stats ? String(stats.total_forks)  : "…", color: "var(--text-dim)" },
    { label: "OSS",    value: stats ? String(stats.open_source)  : "…", color: "var(--accent2)" },
  ];

  return (
    <SectionBox title="GitHub Profile" style={{ margin: 0, flex: 1, display: "flex", flexDirection: "column" }}>

      {/* Avatar + name */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
        <div style={{
          width          : "40px",
          height         : "40px",
          borderRadius   : "50%",
          background     : "color-mix(in srgb, var(--accent) 20%, var(--bg-sidebar))",
          border         : "1px solid var(--border-dim)",
          display        : "flex",
          alignItems     : "center",
          justifyContent : "center",
          fontSize       : "1.1em",
          fontWeight     : 700,
          color          : "var(--accent)",
          flexShrink     : 0,
        }}>
          B
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: "0.88em" }}>Bhuvaneshwar Marri</div>
          
          {/* FIXED: Added missing 'a' tag name */}
          <a 
            href="https://github.com/BhuvaneshwarMarri"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: "0.74em", color: "var(--accent)", textDecoration: "none" }}
            onMouseEnter={e => (e.currentTarget.style.textDecoration = "underline")}
            onMouseLeave={e => (e.currentTarget.style.textDecoration = "none")}
          >
            @BhuvaneshwarMarri
          </a>
        </div>
        <svg viewBox="0 0 16 16" width="18" height="18" fill="var(--text-dim)" style={{ marginLeft: "auto", opacity: 0.4, flexShrink: 0 }}>
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
        </svg>
      </div>

      {/* Stats grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", marginBottom: "14px" }}>
        {statItems.map(s => (
          <div key={s.label} style={{
            padding     : "6px 8px",
            border      : "1px solid var(--border-dim)",
            borderRadius: "4px",
            background  : "color-mix(in srgb, var(--selection) 25%, transparent)",
          }}>
            <div style={{ fontSize: "0.65em", color: "var(--text-dim)", marginBottom: "2px" }}>{s.label}</div>
            <div style={{ fontWeight: 700, fontSize: "0.9em", color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Contribution chart */}
      <div style={{ marginBottom: "14px" }}>
        <div style={{ fontSize: "0.68em", color: "var(--text-dim)", opacity: 0.6, marginBottom: "5px" }}>
          Contribution activity
        </div>
        <div style={{ display: "flex", gap: "2px", alignItems: "flex-end", height: "30px" }}>
          {contributions.map((v, i) => (
            <div key={i} style={{
              flex        : 1,
              height      : `${(v / 8) * 100}%`,
              minHeight   : "3px",
              borderRadius: "1px 1px 0 0",
              background  : v > 5
                ? "var(--accent2)"
                : v > 2
                ? "color-mix(in srgb, var(--accent2) 55%, transparent)"
                : "color-mix(in srgb, var(--accent2) 22%, transparent)",
            }} />
          ))}
        </div>
      </div>

      {/* Languages breakdown */}
      <div style={{ marginBottom: "14px" }}>
        <div style={{ fontSize: "0.68em", color: "var(--text-dim)", opacity: 0.6, marginBottom: "6px" }}>
          Top languages
        </div>
        {[
          { lang: "TypeScript", pct: 45, color: "#3178c6" },
          { lang: "Python",     pct: 30, color: "#3572A5" },
          { lang: "JavaScript", pct: 20, color: "#f7df1e" },
          { lang: "Other",      pct: 5,  color: "#6c7086" },
        ].map(l => (
          <div key={l.lang} style={{ marginBottom: "5px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72em", marginBottom: "2px" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: l.color, display: "inline-block" }} />
                <span style={{ color: "var(--text-dim)" }}>{l.lang}</span>
              </span>
              <span style={{ color: "var(--text-dim)", opacity: 0.7 }}>{l.pct}%</span>
            </div>
            <div style={{ height: "4px", borderRadius: "2px", background: "var(--border-dim)", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${l.pct}%`, background: l.color, borderRadius: "2px" }} />
            </div>
          </div>
        ))}
      </div>

      {/* View profile link */}
      {/* FIXED: Added missing 'a' tag name */}
      <a 
        href="https://github.com/BhuvaneshwarMarri"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display        : "flex",
          alignItems     : "center",
          justifyContent : "center",
          gap            : "6px",
          padding        : "7px",
          borderRadius   : "4px",
          border         : "1px solid var(--border-dim)",
          color          : "var(--accent)",
          fontSize       : "0.75em",
          textDecoration : "none",
          background     : "color-mix(in srgb, var(--accent) 6%, transparent)",
          marginTop      : "auto",
        }}
        onMouseEnter={e => { e.currentTarget.style.background = "color-mix(in srgb, var(--accent) 14%, transparent)"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "color-mix(in srgb, var(--accent) 6%, transparent)"; }}
      >
        <svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
        </svg>
        View GitHub Profile →
      </a>

    </SectionBox>
  );
}