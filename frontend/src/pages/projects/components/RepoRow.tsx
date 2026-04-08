import { useMemo } from "react";
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
  const sizeInKB  = Math.round(p.size / 1024);

  const { createdAgo, updatedAgo, pushedAgo } = useMemo(() => {
    const timeAgo = (dateStr: string): string => {
      // eslint-disable-next-line -- Intentionally using Date.now() within useMemo for time calculations
      const diff = Date.now() - new Date(dateStr).getTime();
      const days = Math.floor(diff / 86_400_000);
      if (days === 0) return "today";
      if (days === 1) return "yesterday";
      if (days < 7) return `${days} days ago`;
      if (days < 14) return "1 week ago";
      if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
      if (days < 60) return "1 month ago";
      return `${Math.floor(days / 30)} months ago`;
    };

    return {
      createdAgo: timeAgo(p.created_at),
      updatedAgo: timeAgo(p.updated_at),
      pushedAgo: timeAgo(p.pushed_at),
    };
  }, [p.created_at, p.updated_at, p.pushed_at]);

  return (
    <div
      style={{
        padding:       "16px",
        borderBottom:  isLast ? "none" : "1px solid var(--border-dim)",
        display:       "flex",
        flexDirection: "column",
        gap:           "12px",
        background:    "color-mix(in srgb, var(--selection) 5%, transparent)",
        transition:    "background 0.2s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "color-mix(in srgb, var(--selection) 15%, transparent)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "color-mix(in srgb, var(--selection) 5%, transparent)")}
    >
      {/* ── Row 1: icon · name · visibility · status ── */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>

        <svg
          width="16" height="16" viewBox="0 0 16 16"
          fill="var(--accent3)"
          style={{ flexShrink: 0, opacity: 0.8 }}
        >
          <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 010-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z" />
        </svg>

        <img
          src={p.owner_avatar}
          alt={p.owner}
          style={{
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            flexShrink: 0,
            opacity: 0.7,
          }}
        />

        <a
          href={p.href}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color:          "var(--accent)",
            fontWeight:     700,
            fontSize:       "1em",
            textDecoration: "none",
            flex:           1,
          }}
          onMouseEnter={e => (e.currentTarget.style.textDecoration = "underline")}
          onMouseLeave={e => (e.currentTarget.style.textDecoration = "none")}
        >
          {p.name}
        </a>

        {p.archived && (
          <span style={{
            fontSize:      "0.65em",
            padding:       "2px 8px",
            border:        "1px solid var(--accent3)",
            borderRadius:  "4px",
            color:         "var(--accent3)",
            fontWeight:    600,
            flexShrink:    0,
          }}>
            ARCHIVED
          </span>
        )}

        <span style={{
          fontSize:      "0.65em",
          padding:       "2px 8px",
          border:        "1px solid var(--border-dim)",
          borderRadius:  "99px",
          color:         "var(--text-dim)",
          letterSpacing: "0.03em",
          flexShrink:    0,
        }}>
          {isPublic ? "public" : "private"}
        </span>

        {p.status && (
          <span style={{
            fontSize:      "0.7em",
            padding:       "2px 8px",
            borderRadius:  "4px",
            fontWeight:    600,
            color:         p.status === "Active" ? "var(--accent2)" :
                          p.status === "In Progress" ? "var(--accent)" : "var(--accent3)",
            background:    p.status === "Active" ? "color-mix(in srgb, var(--accent2) 12%, transparent)" :
                          p.status === "In Progress" ? "color-mix(in srgb, var(--accent) 12%, transparent)" :
                          "color-mix(in srgb, var(--accent3) 12%, transparent)",
            border:        `1px solid ${p.status === "Active" ? "var(--accent2)" :
                          p.status === "In Progress" ? "var(--accent)" : "var(--accent3)"}`,
            flexShrink:    0,
          }}>
            {p.status}
          </span>
        )}
      </div>

      {/* ── Row 2: description ── */}
      {p.description && (
        <p style={{
          color:       "var(--text-dim)",
          fontSize:    "0.88em",
          lineHeight:  1.6,
          margin:      0,
          paddingLeft: "4px",
        }}>
          {p.description}
        </p>
      )}

      {/* ── Row 3: Topics/Tags ── */}
      {p.topics && p.topics.length > 0 && (
        <div style={{
          display:     "flex",
          gap:         "8px",
          flexWrap:    "wrap",
          paddingLeft: "4px",
        }}>
          {p.topics.slice(0, 5).map(topic => (
            <span key={topic} style={{
              fontSize:     "0.7em",
              padding:      "3px 8px",
              border:       "1px solid var(--border-dim)",
              borderRadius: "12px",
              color:        "var(--text-dim)",
              background:   "color-mix(in srgb, var(--selection) 20%, transparent)",
              whiteSpace:   "nowrap",
            }}>
              #{topic}
            </span>
          ))}
          {p.topics.length > 5 && (
            <span style={{
              fontSize:     "0.7em",
              color:        "var(--text-dim)",
              opacity:      0.6,
              alignSelf:    "center",
            }}>
              +{p.topics.length - 5} more
            </span>
          )}
        </div>
      )}

      {/* ── Row 4: Stats grid ── */}
      <div style={{
        display:       "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
        gap:           "12px",
        paddingLeft:   "4px",
        paddingTop:    "4px",
        borderTop:     "1px solid color-mix(in srgb, var(--border-dim) 50%, transparent)",
      }}>

        {/* Language */}
        {hasLang && (
          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.8em" }}>
            <span style={{
              width:        "10px",
              height:       "10px",
              borderRadius: "50%",
              background:   langColor,
              display:      "inline-block",
              flexShrink:   0,
            }} />
            <span style={{ color: "var(--text)" }}>
              {p.language}
            </span>
          </div>
        )}

        {/* Stars */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.8em", color: "var(--text-dim)" }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.72 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
          </svg>
          <span>{p.stars}</span>
        </div>

        {/* Forks */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.8em", color: "var(--text-dim)" }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
            <path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
          <span>{p.forks}</span>
        </div>

        {/* Watchers */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.8em", color: "var(--text-dim)" }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 2c1.981 0 3.671.992 4.933 2.078 1.23 1.065 2.461 2.424 2.97 3.423.363.674.465 1.422 0 2.198-.508.999-1.74 2.358-2.97 3.423C11.671 13.008 9.981 14 8 14c-1.981 0-3.671-.992-4.933-2.078C1.837 10.857.606 9.499.097 8.5c-.363-.674-.465-1.422 0-2.198.508-.999 1.74-2.358 2.97-3.423C4.329 2.992 6.019 2 8 2zm0 1.5c-1.665 0-3.059.627-4.134 1.526-.953.827-1.925 1.908-2.353 2.835-.196.364-.196.944 0 1.308.428.927 1.4 2.008 2.353 2.835C4.941 12.373 6.335 13 8 13c1.665 0 3.059-.627 4.134-1.526.953-.827 1.925-1.908 2.353-2.835.196-.364.196-.944 0-1.308-.428-.927-1.4-2.008-2.353-2.835C11.059 4.127 9.665 3.5 8 3.5zm0 2.5A1.5 1.5 0 108 9 1.5 1.5 0 008 6zm0 1a.5.5 0 110 1 .5.5 0 010-1z" />
          </svg>
          <span>{p.watchers}</span>
        </div>

        {/* Issues */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.8em", color: "var(--text-dim)" }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            <path fillRule="evenodd" d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z" />
          </svg>
          <span>{p.open_issues}</span>
        </div>

        {/* Size */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.8em", color: "var(--text-dim)" }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
            <path d="M3.5 1.75a.25.25 0 01.25-.25h8.5a.25.25 0 01.25.25v12.5a.25.25 0 01-.25.25h-8.5a.25.25 0 01-.25-.25V1.75z" />
          </svg>
          <span>{sizeInKB}KB</span>
        </div>

        {/* License */}
        {p.license && (
          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.8em", color: "var(--text-dim)" }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <path d="M2 3.5h12a.5.5 0 01.5.5v9a.5.5 0 01-.5.5H2a.5.5 0 01-.5-.5V4a.5.5 0 01.5-.5z" />
            </svg>
            <span>{p.license}</span>
          </div>
        )}

        {/* Fork indicator */}
        {p.is_fork && (
          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.8em", color: "var(--text-dim)" }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            <span>Forked</span>
          </div>
        )}
      </div>

      {/* ── Row 5: Timestamps and link ── */}
      <div style={{
        display:       "flex",
        alignItems:    "center",
        gap:           "12px",
        fontSize:      "0.75em",
        color:         "var(--text-dim)",
        paddingLeft:   "4px",
        paddingTop:    "4px",
        borderTop:     "1px solid color-mix(in srgb, var(--border-dim) 50%, transparent)",
        flexWrap:      "wrap",
      }}>

        <span title={`Created: ${new Date(p.created_at).toLocaleString()}`}>
          📅 {createdAgo}
        </span>

        <span title={`Last updated: ${new Date(p.updated_at).toLocaleString()}`}>
          🔄 {updatedAgo}
        </span>

        <span title={`Last push: ${new Date(p.pushed_at).toLocaleString()}`}>
          ⬆ {pushedAgo}
        </span>

        {p.has_wiki && (
          <span style={{
            fontSize:  "0.8em",
            opacity:   0.7,
          }}>
            📖 Wiki
          </span>
        )}

        {p.has_pages && (
          <span style={{
            fontSize:  "0.8em",
            opacity:   0.7,
          }}>
            📄 Pages
          </span>
        )}

        {p.homepage && (
          <a
            href={p.homepage}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color:          "var(--accent)",
              textDecoration: "underline",
              marginLeft:     "auto",
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.7")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >
            🌐 Homepage
          </a>
        )}

        <a
          href={p.href}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display:        "flex",
            alignItems:     "center",
            gap:            "4px",
            color:          "var(--accent)",
            textDecoration: "none",
            padding:        "3px 10px",
            border:         "1px solid var(--accent)",
            borderRadius:   "4px",
            background:     "color-mix(in srgb, var(--accent) 8%, transparent)",
            fontSize:       "0.85em",
            marginLeft:     p.homepage ? 0 : "auto",
            flexShrink:     0,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "color-mix(in srgb, var(--accent) 18%, transparent)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "color-mix(in srgb, var(--accent) 8%, transparent)";
          }}
        >
          View →
        </a>
      </div>
    </div>
  );
}