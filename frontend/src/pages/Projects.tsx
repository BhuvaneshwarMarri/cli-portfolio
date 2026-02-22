import BvimLayout from "../components/BvimLayout";
import SectionBox from "../components/SectionBox";

// ─── Project data ─────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    name       : "cli-portfolio",
    owner      : "BhuvaneshwarMarri",
    description: "A dual-mode interactive portfolio — Terminal CLI and Bvim TUI — built with React & TypeScript. Vim-inspired keyboard nav, 5 themes, custom command parser.",
    language   : "TypeScript",
    langColor  : "var(--accent)",
    stars      : 12,
    forks      : 3,
    status     : "Active" as const,
    visibility : "Public",
    topics     : ["react", "typescript", "vite", "tui", "portfolio"],
    updatedAgo : "2 days ago",
    href       : "https://github.com/BhuvaneshwarMarri/cli-portfolio",
  },
  {
    name       : "sg-games-platform",
    owner      : "BhuvaneshwarMarri",
    description: "Real-time multiplayer gaming platform with WebSocket, user auth, and leaderboards. Responsive game UI components built with React.",
    language   : "JavaScript",
    langColor  : "var(--accent2)",
    stars      : 7,
    forks      : 1,
    status     : "In Progress" as const,
    visibility : "Public",
    topics     : ["react", "nodejs", "websocket", "multiplayer"],
    updatedAgo : "1 week ago",
    href       : "https://github.com/BhuvaneshwarMarri/sg-games-platform",
  },
  {
    name       : "agentic-ai-tools",
    owner      : "BhuvaneshwarMarri",
    description: "Autonomous AI developer tooling — natural language code generation, multi-agent orchestration pipelines powered by LangChain and OpenAI.",
    language   : "Python",
    langColor  : "var(--accent3)",
    stars      : 29,
    forks      : 5,
    status     : "Research" as const,
    visibility : "Public",
    topics     : ["python", "langchain", "openai", "agents", "ai"],
    updatedAgo : "3 days ago",
    href       : "https://github.com/BhuvaneshwarMarri/agentic-ai-tools",
  },
];

type Status = "Active" | "In Progress" | "Research";

const STATUS_STYLE: Record<Status, { bg: string; text: string; border: string }> = {
  "Active"     : { bg: "color-mix(in srgb, var(--accent2) 14%, transparent)", text: "var(--accent2)", border: "var(--accent2)" },
  "In Progress": { bg: "color-mix(in srgb, var(--accent)  14%, transparent)", text: "var(--accent)",  border: "var(--accent)"  },
  "Research"   : { bg: "color-mix(in srgb, var(--accent3) 14%, transparent)", text: "var(--accent3)", border: "var(--accent3)" },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Projects() {
  return (
    <BvimLayout>
      <div style={{
        display      : "flex",
        flexDirection: "column",
        gap          : "0px",
        height       : "100%",
        color        : "var(--text)",
        fontFamily   : "var(--font-family, 'JetBrains Mono', monospace)",
      }}>

        {/* ── HEADER ─────────────────────────────────────────────────────── */}
        <SectionBox title="◈ projects">
          <div style={{ flex: 1, overflow: "hidden" }}>
            <pre style={{
              color     : "var(--accent)",
              fontSize  : "clamp(7px, 1vw, 11px)",
              lineHeight: 1.2,
              margin    : "0 0 8px 0",
              whiteSpace: "pre",
              fontFamily: "monospace",
              overflow  : "hidden",
            }}>{`\
 ██████╗ ██████╗  ██████╗      ██╗███████╗ ██████╗████████╗███████╗
 ██╔══██╗██╔══██╗██╔═══██╗     ██║██╔════╝██╔════╝╚══██╔══╝██╔════╝
 ██████╔╝██████╔╝██║   ██║     ██║█████╗  ██║        ██║   ███████╗
 ██╔═══╝ ██╔══██╗██║   ██║██   ██║██╔══╝  ██║        ██║   ╚════██║
 ██║     ██║  ██║╚██████╔╝╚█████╔╝███████╗╚██████╗   ██║   ███████║
 ╚═╝     ╚═╝  ╚═╝ ╚═════╝  ╚════╝ ╚══════╝ ╚═════╝   ╚═╝   ╚══════╝`}
            </pre>
            <p style={{ margin: 0, color: "var(--text-dim)", fontSize: "0.82em", letterSpacing: "0.05em" }}>
              {PROJECTS.length} repositories &nbsp;·&nbsp; Open Source &nbsp;·&nbsp; github.com/BhuvaneshwarMarri
            </p>
          </div>
        </SectionBox>

        {/* ── REPO GRID ──────────────────────────────────────────────────── */}
        <div style={{
          paddingTop         : "14px",
          display            : "grid",
          gridTemplateColumns: "1fr 1fr",
          gap                : "0 16px",
          flex               : 1,
          minHeight          : 0,
          alignItems         : "start",
        }}>
          {PROJECTS.map(p => <RepoCard key={p.name} project={p} />)}
          <ProfileCard />
        </div>

      </div>
    </BvimLayout>
  );
}

// ─── Repo Card (GitHub-style) ─────────────────────────────────────────────────

function RepoCard({ project: p }: { project: typeof PROJECTS[number] }) {
  const sc = STATUS_STYLE[p.status];

  return (
    <SectionBox title="" style={{ display: "flex", flexDirection: "column" }}>

      {/* ── Row 1: owner/name + Public pill ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "5px", minWidth: 0, overflow: "hidden" }}>
          {/* Book / repo icon */}
          <svg width="14" height="14" viewBox="0 0 16 16" fill="var(--accent3)" style={{ flexShrink: 0 }}>
            <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 010-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z" />
          </svg>
          <span style={{ color: "var(--text-dim)", fontSize: "0.77em", flexShrink: 0 }}>
            {p.owner}
          </span>
          <span style={{ color: "var(--text-dim)", fontSize: "0.77em", flexShrink: 0 }}>/</span>
          <a
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color        : "var(--accent)",
              fontWeight   : 700,
              fontSize     : "0.88em",
              textDecoration: "none",
              whiteSpace   : "nowrap",
              overflow     : "hidden",
              textOverflow : "ellipsis",
            }}
            onMouseEnter={e => (e.currentTarget.style.textDecoration = "underline")}
            onMouseLeave={e => (e.currentTarget.style.textDecoration = "none")}
          >
            {p.name}
          </a>
        </div>

        {/* Public/Private pill */}
        <span style={{
          fontSize    : "0.67em",
          padding     : "1px 7px",
          border      : "1px solid var(--border-dim)",
          borderRadius: "99px",
          color       : "var(--text-dim)",
          flexShrink  : 0,
          marginLeft  : "8px",
          letterSpacing: "0.03em",
        }}>
          {p.visibility}
        </span>
      </div>

      {/* ── Row 2: Description ── */}
      <p style={{
        color     : "var(--text-dim)",
        fontSize  : "0.81em",
        lineHeight: 1.6,
        margin    : "0 0 10px 0",
        display   : "-webkit-box",
        WebkitLineClamp  : 2,
        WebkitBoxOrient  : "vertical" as const,
        overflow  : "hidden",
      }}>
        {p.description}
      </p>

      {/* ── Row 3: Topic tags ── */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "12px" }}>
        {p.topics.map(t => (
          <span key={t} style={{
            fontSize    : "0.67em",
            padding     : "2px 9px",
            borderRadius: "99px",
            border      : "1px solid color-mix(in srgb, var(--accent) 40%, transparent)",
            color       : "var(--accent)",
            background  : "color-mix(in srgb, var(--accent) 8%, transparent)",
            letterSpacing: "0.02em",
          }}>
            {t}
          </span>
        ))}
      </div>

      {/* ── Row 4: Lang · Stars · Forks · Updated ── */}
      <div style={{
        display    : "flex",
        alignItems : "center",
        gap        : "14px",
        paddingTop : "8px",
        borderTop  : "1px solid var(--border-dim)",
        fontSize   : "0.76em",
        color      : "var(--text-dim)",
        flexWrap   : "wrap",
      }}>
        {/* Language */}
        <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <span style={{
            width       : "10px",
            height      : "10px",
            borderRadius: "50%",
            background  : p.langColor,
            display     : "inline-block",
            flexShrink  : 0,
          }} />
          {p.language}
        </span>

        {/* Stars */}
        <span style={{ display: "flex", alignItems: "center", gap: "3px" }}>
          <svg width="13" height="13" viewBox="0 0 16 16" fill="var(--accent3)">
            <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"/>
          </svg>
          {p.stars}
        </span>

        {/* Forks */}
        <span style={{ display: "flex", alignItems: "center", gap: "3px" }}>
          <svg width="13" height="13" viewBox="0 0 16 16" fill="var(--text-dim)" style={{ opacity: 0.7 }}>
            <path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/>
          </svg>
          {p.forks}
        </span>

        {/* Updated */}
        <span style={{ marginLeft: "auto", opacity: 0.6, fontSize: "0.92em" }}>
          Updated {p.updatedAgo}
        </span>
      </div>

      {/* ── Row 5: Status badge + View repo ── */}
      <div style={{
        display        : "flex",
        alignItems     : "center",
        justifyContent : "space-between",
        marginTop      : "10px",
      }}>
        <span style={{
          fontSize    : "0.69em",
          padding     : "2px 10px",
          borderRadius: "99px",
          border      : `1px solid ${sc.border}`,
          color       : sc.text,
          background  : sc.bg,
          fontWeight  : 600,
          letterSpacing: "0.03em",
        }}>
          ● {p.status}
        </span>

        <a
          href={p.href}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display        : "flex",
            alignItems     : "center",
            gap            : "4px",
            fontSize       : "0.75em",
            color          : "var(--accent)",
            textDecoration : "none",
            padding        : "2px 8px",
            borderRadius   : "4px",
            border         : "1px solid color-mix(in srgb, var(--accent) 35%, transparent)",
            background     : "color-mix(in srgb, var(--accent) 7%, transparent)",
            transition     : "background 0.12s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "color-mix(in srgb, var(--accent) 16%, transparent)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "color-mix(in srgb, var(--accent) 7%, transparent)"; }}
        >
          View repo →
        </a>
      </div>

    </SectionBox>
  );
}

// ─── GitHub Profile Summary Card ─────────────────────────────────────────────

function ProfileCard() {
  const stats = [
    { label: "Repos",  value: "10+", color: "var(--accent)"  },
    { label: "OSS",    value: "6",   color: "var(--accent2)" },
    { label: "Stars",  value: "48",  color: "var(--accent3)" },
    { label: "Forks",  value: "9",   color: "var(--text-dim)" },
  ];

  // Simulated contribution intensity values (0–8)
  const contributions = [2, 5, 3, 7, 4, 6, 1, 8, 5, 3, 6, 2, 7, 4, 8, 5, 3, 6, 2, 7];

  return (
    <SectionBox title="GitHub Profile">

      {/* Profile row */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
        <div style={{
          width          : "38px",
          height         : "38px",
          borderRadius   : "50%",
          background     : "color-mix(in srgb, var(--accent) 18%, var(--bg-sidebar))",
          border         : "1px solid var(--border-dim)",
          display        : "flex",
          alignItems     : "center",
          justifyContent : "center",
          fontSize       : "1em",
          color          : "var(--accent)",
          fontWeight     : 700,
          flexShrink     : 0,
          letterSpacing  : "0.02em",
        }}>
          B
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: "0.88em", color: "var(--text)" }}>
            Bhuvaneshwar Marri
          </div>
          <a
            href="https://github.com/BhuvaneshwarMarri"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: "0.74em", color: "var(--accent)", textDecoration: "none", display: "block", marginTop: "1px" }}
            onMouseEnter={e => (e.currentTarget.style.textDecoration = "underline")}
            onMouseLeave={e => (e.currentTarget.style.textDecoration = "none")}
          >
            @BhuvaneshwarMarri
          </a>
        </div>

        {/* GitHub icon on the right */}
        <svg viewBox="0 0 16 16" width="18" height="18" fill="var(--text-dim)" style={{ marginLeft: "auto", opacity: 0.45, flexShrink: 0 }}>
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
        </svg>
      </div>

      {/* Stats 2×2 grid */}
      <div style={{
        display            : "grid",
        gridTemplateColumns: "1fr 1fr",
        gap                : "5px",
        marginBottom       : "12px",
      }}>
        {stats.map(s => (
          <div key={s.label} style={{
            padding     : "5px 8px",
            border      : "1px solid var(--border-dim)",
            borderRadius: "4px",
            background  : "color-mix(in srgb, var(--selection) 30%, transparent)",
          }}>
            <div style={{ fontSize: "0.67em", color: "var(--text-dim)", marginBottom: "2px", opacity: 0.8 }}>
              {s.label}
            </div>
            <div style={{ fontWeight: 700, fontSize: "0.92em", color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Mini contribution bar chart */}
      <div style={{ marginBottom: "10px" }}>
        <div style={{ fontSize: "0.68em", color: "var(--text-dim)", opacity: 0.6, marginBottom: "5px" }}>
          Contribution activity
        </div>
        <div style={{ display: "flex", gap: "2px", alignItems: "flex-end", height: "28px" }}>
          {contributions.map((v, i) => (
            <div key={i} style={{
              flex      : 1,
              height    : `${(v / 8) * 100}%`,
              minHeight : "3px",
              borderRadius: "1px 1px 0 0",
              background: v > 5
                ? "var(--accent2)"
                : v > 2
                ? "color-mix(in srgb, var(--accent2) 55%, transparent)"
                : "color-mix(in srgb, var(--accent2) 22%, transparent)",
            }} />
          ))}
        </div>
      </div>

      {/* View profile button */}
      <a
        href="https://github.com/BhuvaneshwarMarri"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display        : "flex",
          alignItems     : "center",
          justifyContent : "center",
          gap            : "6px",
          padding        : "6px",
          borderRadius   : "4px",
          border         : "1px solid var(--border-dim)",
          color          : "var(--accent)",
          fontSize       : "0.75em",
          textDecoration : "none",
          background     : "color-mix(in srgb, var(--accent) 6%, transparent)",
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