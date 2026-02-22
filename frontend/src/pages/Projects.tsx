import BvimLayout from "../components/BvimLayout";
import SectionBox from "../components/SectionBox";

// ─── Project data ──────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    name       : "cli-portfolio",
    owner      : "BhuvaneshwarMarri",
    description: "A dual-mode interactive portfolio — Terminal CLI and Bvim TUI — built with React & TypeScript. Vim-inspired keyboard nav, 5 themes, custom command parser.",
    language   : "TypeScript",
    langColor  : "#3178c6",
    stars      : 12,
    forks      : 3,
    status     : "Active" as const,
    visibility : "Public",
    topics     : ["react", "typescript", "vite", "tui", "portfolio"],
    updatedAgo : "2 days ago",
    href       : "https://github.com/BhuvaneshwarMarri/cli-portfolio",
    size       : "142 KB",
    issues     : 2,
  },
  {
    name       : "sg-games-platform",
    owner      : "BhuvaneshwarMarri",
    description: "Real-time multiplayer gaming platform with WebSocket, user auth, and leaderboards. Responsive game UI components built with React.",
    language   : "JavaScript",
    langColor  : "#f7df1e",
    stars      : 7,
    forks      : 1,
    status     : "In Progress" as const,
    visibility : "Public",
    topics     : ["react", "nodejs", "websocket", "multiplayer"],
    updatedAgo : "1 week ago",
    href       : "https://github.com/BhuvaneshwarMarri/sg-games-platform",
    size       : "89 KB",
    issues     : 4,
  },
  {
    name       : "agentic-ai-tools",
    owner      : "BhuvaneshwarMarri",
    description: "Autonomous AI developer tooling — natural language code generation, multi-agent orchestration pipelines powered by LangChain and OpenAI.",
    language   : "Python",
    langColor  : "#3572A5",
    stars      : 29,
    forks      : 5,
    status     : "Research" as const,
    visibility : "Public",
    topics     : ["python", "langchain", "openai", "agents", "ai"],
    updatedAgo : "3 days ago",
    href       : "https://github.com/BhuvaneshwarMarri/agentic-ai-tools",
    size       : "234 KB",
    issues     : 1,
  },
  {
    name       : "devops-automation",
    owner      : "BhuvaneshwarMarri",
    description: "Infrastructure-as-code toolkit with Terraform, Ansible playbooks, and GitHub Actions workflows for automated cloud deployments.",
    language   : "HCL",
    langColor  : "#844fba",
    stars      : 5,
    forks      : 0,
    status     : "Active" as const,
    visibility : "Public",
    topics     : ["terraform", "ansible", "devops", "cicd"],
    updatedAgo : "2 weeks ago",
    href       : "https://github.com/BhuvaneshwarMarri/devops-automation",
    size       : "56 KB",
    issues     : 0,
  },
];

type Status = "Active" | "In Progress" | "Research";

const STATUS_STYLE: Record<Status, { text: string; border: string; bg: string }> = {
  "Active"     : { text: "var(--accent2)", border: "var(--accent2)", bg: "color-mix(in srgb, var(--accent2) 12%, transparent)" },
  "In Progress": { text: "var(--accent)",  border: "var(--accent)",  bg: "color-mix(in srgb, var(--accent)  12%, transparent)" },
  "Research"   : { text: "var(--accent3)", border: "var(--accent3)", bg: "color-mix(in srgb, var(--accent3) 12%, transparent)" },
};

const STATS = [
  { label: "Repositories", value: "10+",  color: "var(--accent)"  },
  { label: "Open Source",  value: "6",    color: "var(--accent2)" },
  { label: "Total Stars",  value: "53",   color: "var(--accent3)" },
  { label: "Total Forks",  value: "9",    color: "var(--text-dim)"},
];

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function Projects() {
  return (
    <BvimLayout>
      <div style={{
        display      : "flex",
        flexDirection: "column",
        height       : "100%",
        color        : "var(--text)",
        fontFamily   : "var(--font-family, 'JetBrains Mono', monospace)",
        overflow     : "hidden",
      }}>

        {/* ── HEADER ──────────────────────────────────────────────────────── */}
        <SectionBox title="◈ projects">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
            <div style={{ flex: 1, overflow: "hidden" }}>
              <pre style={{
                color     : "var(--accent)",
                fontSize  : "clamp(5px, 0.8vw, 10px)",
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

            {/* Quick stats row */}
            <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
              {STATS.map(s => (
                <div key={s.label} style={{
                  display       : "flex",
                  flexDirection : "column",
                  alignItems    : "center",
                  padding       : "5px 10px",
                  border        : `1px solid var(--border-dim)`,
                  borderRadius  : "4px",
                  background    : "color-mix(in srgb, var(--selection) 30%, transparent)",
                  gap           : "2px",
                  minWidth      : "52px",
                }}>
                  <span style={{ fontWeight: 700, fontSize: "0.9em", color: s.color }}>{s.value}</span>
                  <span style={{ fontSize: "0.6em", color: "var(--text-dim)", whiteSpace: "nowrap" }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </SectionBox>

        {/* ── BODY: list + sidebar ────────────────────────────────────────── */}
        <div style={{
          display            : "grid",
          gridTemplateColumns: "1fr 220px",
          gap                : "16px",
          flex               : 1,
          minHeight          : 0,
          paddingTop         : "14px",
          alignItems         : "stretch",
        }}>

          {/* ── Repo List ─────────────────────────────────────────────────── */}
          <SectionBox
            title="Repositories"
            style={{ display: "flex", flexDirection: "column", minHeight: 0, margin: 0 }}
          >
            <div style={{ flex: 1, overflowY: "auto", minHeight: 0, scrollbarWidth: "thin", scrollbarColor: "var(--selection) transparent" }}>
              {PROJECTS.map((p, idx) => (
                <RepoRow key={p.name} project={p} isLast={idx === PROJECTS.length - 1} />
              ))}
            </div>
          </SectionBox>

          {/* ── GitHub Profile Panel ──────────────────────────────────────── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", minHeight: 0 }}>
            <ProfileCard />
          </div>

        </div>
      </div>
    </BvimLayout>
  );
}

// ─── Repo Row (GitHub list-style) ─────────────────────────────────────────────

function RepoRow({ project: p, isLast }: { project: typeof PROJECTS[number]; isLast: boolean }) {
  const sc = STATUS_STYLE[p.status];

  return (
    <div style={{
      padding      : "14px 4px",
      borderBottom : isLast ? "none" : "1px solid var(--border-dim)",
      display      : "flex",
      flexDirection: "column",
      gap          : "8px",
    }}>

      {/* ── Row 1: Icon + owner/name + badges ── */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {/* Repo book icon */}
        <svg width="14" height="14" viewBox="0 0 16 16" fill="var(--accent3)" style={{ flexShrink: 0, opacity: 0.8 }}>
          <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 010-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z" />
        </svg>

        {/* owner / name */}
        <span style={{ color: "var(--text-dim)", fontSize: "0.8em", flexShrink: 0 }}>
          {p.owner}
          <span style={{ opacity: 0.5 }}> / </span>
        </span>
        <a
          href={p.href}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.92em", textDecoration: "none" }}
          onMouseEnter={e => (e.currentTarget.style.textDecoration = "underline")}
          onMouseLeave={e => (e.currentTarget.style.textDecoration = "none")}
        >
          {p.name}
        </a>

        {/* Public pill */}
        <span style={{
          fontSize    : "0.65em",
          padding     : "1px 7px",
          border      : "1px solid var(--border-dim)",
          borderRadius: "99px",
          color       : "var(--text-dim)",
          letterSpacing: "0.03em",
          flexShrink  : 0,
        }}>
          {p.visibility}
        </span>

        {/* Status badge */}
        <span style={{
          fontSize    : "0.65em",
          padding     : "1px 7px",
          border      : `1px solid ${sc.border}`,
          borderRadius: "99px",
          color       : sc.text,
          background  : sc.bg,
          fontWeight  : 600,
          letterSpacing: "0.03em",
          flexShrink  : 0,
          marginLeft  : "auto",
        }}>
          ● {p.status}
        </span>
      </div>

      {/* ── Row 2: Description ── */}
      <p style={{
        color     : "var(--text-dim)",
        fontSize  : "0.82em",
        lineHeight: 1.6,
        margin    : 0,
        paddingLeft: "22px",
      }}>
        {p.description}
      </p>

      {/* ── Row 3: Topic tags ── */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", paddingLeft: "22px" }}>
        {p.topics.map(t => (
          <span key={t} style={{
            fontSize    : "0.67em",
            padding     : "2px 9px",
            borderRadius: "99px",
            color       : "var(--accent)",
            background  : "color-mix(in srgb, var(--accent) 12%, transparent)",
            border      : "1px solid color-mix(in srgb, var(--accent) 25%, transparent)",
          }}>
            {t}
          </span>
        ))}
      </div>

      {/* ── Row 4: Meta: lang · stars · forks · size · issues · updated ── */}
      <div style={{
        display    : "flex",
        alignItems : "center",
        gap        : "16px",
        fontSize   : "0.76em",
        color      : "var(--text-dim)",
        paddingLeft: "22px",
        flexWrap   : "wrap",
      }}>
        {/* Language */}
        <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: p.langColor, display: "inline-block", flexShrink: 0 }} />
          {p.language}
        </span>

        {/* Stars */}
        <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
          </svg>
          {p.stars}
        </span>

        {/* Forks */}
        <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
            <path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/>
          </svg>
          {p.forks}
        </span>

        {/* Issues */}
        {p.issues > 0 && (
          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              <path fillRule="evenodd" d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z" />
            </svg>
            {p.issues} issues
          </span>
        )}

        {/* Size */}
        <span style={{ opacity: 0.6 }}>{p.size}</span>

        {/* Updated */}
        <span style={{ marginLeft: "auto", opacity: 0.6, flexShrink: 0 }}>
          Updated {p.updatedAgo}
        </span>

        {/* View link */}
        <a
          href={p.href}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display        : "flex",
            alignItems     : "center",
            gap            : "3px",
            color          : "var(--accent)",
            textDecoration : "none",
            padding        : "2px 8px",
            borderRadius   : "4px",
            border         : "1px solid color-mix(in srgb, var(--accent) 30%, transparent)",
            background     : "color-mix(in srgb, var(--accent) 7%, transparent)",
            transition     : "background 0.12s",
            flexShrink     : 0,
            fontSize       : "0.9em",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "color-mix(in srgb, var(--accent) 16%, transparent)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "color-mix(in srgb, var(--accent) 7%, transparent)"; }}
        >
          View →
        </a>
      </div>

    </div>
  );
}

// ─── GitHub Profile Panel ──────────────────────────────────────────────────────

function ProfileCard() {
  const contributions = [2, 5, 3, 7, 4, 6, 1, 8, 5, 3, 6, 2, 7, 4, 8, 5, 3, 6, 2, 7, 4, 5, 8, 3];

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
        {[
          { label: "Repos",  value: "10+", color: "var(--accent)"  },
          { label: "Stars",  value: "53",  color: "var(--accent3)" },
          { label: "Forks",  value: "9",   color: "var(--text-dim)"},
          { label: "OSS",    value: "6",   color: "var(--accent2)" },
        ].map(s => (
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

      {/* View profile */}
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