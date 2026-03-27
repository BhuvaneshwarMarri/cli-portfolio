import type { Project } from "../fetchGithubProjects";

// ── Helpers ──────────────────────────────────────────────────────────────────
const LANG_COLORS: Record<string, string> = {
  TypeScript:         "#3178c6",
  JavaScript:         "#f1e05a",
  Python:             "#3572A5",
  Rust:               "#dea584",
  Go:                 "#00ADD8",
  Java:               "#b07219",
  "C++":              "#f34b7d",
  Ruby:               "#701516",
  Swift:              "#F05138",
  Kotlin:             "#A97BFF",
  CSS:                "#563d7c",
  HTML:               "#e34c26",
  PowerShell:         "#012456",
  "Jupyter Notebook": "#DA5B0B",
};

// ── RepoRow ──────────────────────────────────────────────────────────────────
export function RepoRow({
  project: p,
  isLast,
}: {
  project: Project;
  isLast: boolean;
}) {
  const langColor = LANG_COLORS[p.language] ?? "#888780";
  const isPublic  = p.visibility?.toLowerCase() === "public";
  const hasLang   = p.language && p.language !== "Unknown";

  return (
    <div
      style={{
        padding:       "14px 4px",
        borderBottom:  isLast ? "none" : "1px solid var(--border-dim)",
        display:       "flex",
        flexDirection: "column",
        gap:           "8px",
      }}
    >
      {/* ── Row 1: icon · name · visibility · updated ── */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>

        <svg
          width="14" height="14" viewBox="0 0 16 16"
          fill="var(--accent3)"
          style={{ flexShrink: 0, opacity: 0.8 }}
        >
          <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 010-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z" />
        </svg>

        <a
          href={p.href}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color:          "var(--accent)",
            fontWeight:     700,
            fontSize:       "0.92em",
            textDecoration: "none",
          }}
          onMouseEnter={e => (e.currentTarget.style.textDecoration = "underline")}
          onMouseLeave={e => (e.currentTarget.style.textDecoration = "none")}
        >
          {p.name}
        </a>

        <span style={{
          fontSize:      "0.65em",
          padding:       "1px 7px",
          border:        "1px solid var(--border-dim)",
          borderRadius:  "99px",
          color:         "var(--text-dim)",
          letterSpacing: "0.03em",
          flexShrink:    0,
        }}>
          {isPublic ? "public" : "private"}
        </span>

        <span style={{
          marginLeft: "auto",
          fontSize:   "0.72em",
          opacity:    0.55,
          flexShrink: 0,
        }}>
        </span>
      </div>

      {/* ── Row 2: description (omitted when empty) ── */}
      {p.description && (
        <p style={{
          color:       "var(--text-dim)",
          fontSize:    "0.82em",
          lineHeight:  1.6,
          margin:      0,
          paddingLeft: "22px",
        }}>
          {p.description}
        </p>
      )}

      {/* ── Row 3: language · stars · forks · view button ── */}
      <div style={{
        display:     "flex",
        alignItems:  "center",
        gap:         "16px",
        fontSize:    "0.76em",
        color:       "var(--text-dim)",
        paddingLeft: "22px",
        flexWrap:    "wrap",
      }}>

        {hasLang && (
          <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span style={{
              width:        "10px",
              height:       "10px",
              borderRadius: "50%",
              background:   langColor,
              display:      "inline-block",
              flexShrink:   0,
            }} />
            {p.language}
          </span>
        )}

        <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
          </svg>
          {p.stars}
        </span>

        <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
            <path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
        </span>

        <a
          href={p.href}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            marginLeft:     "auto",
            display:        "flex",
            alignItems:     "center",
            gap:            "3px",
            color:          "var(--accent)",
            textDecoration: "none",
            padding:        "2px 8px",
            borderRadius:   "4px",
            border:         "1px solid color-mix(in srgb, var(--accent) 30%, transparent)",
            background:     "color-mix(in srgb, var(--accent) 7%, transparent)",
            flexShrink:     0,
            fontSize:       "0.9em",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background =
              "color-mix(in srgb, var(--accent) 16%, transparent)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background =
              "color-mix(in srgb, var(--accent) 7%, transparent)";
          }}
        >
          View →
        </a>
      </div>
    </div>
  );
}