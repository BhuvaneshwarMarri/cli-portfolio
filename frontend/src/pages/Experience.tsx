import BvimLayout from "../components/BvimLayout";
import SectionBox from "../components/SectionBox";

const JOBS = [
  {
    title   : "Full Stack Developer",
    company : "Tech Company",
    period  : "Jan 2023 – Present",
    duration: "1 yr 2 mo",
    status  : "ACTIVE" as const,
    type    : "Full-time",
    location: "Remote",
    stack   : ["React", "Node.js", "PostgreSQL", "AWS", "Docker"],
    bullets : [
      "Built & maintained full-stack web applications serving 10k+ daily users.",
      "Reduced page load time by 40% through code splitting, caching & lazy loading.",
      "Mentored 3 junior developers; led weekly code reviews and pair sessions.",
      "Architected CI/CD pipelines, cutting deployment time by 60%.",
    ],
    metrics: [
      { label: "Performance", value: "+40%", color: "var(--accent)"  },
      { label: "Deploy Speed", value: "+60%", color: "var(--accent2)" },
      { label: "Coverage",    value: "92%",  color: "var(--accent3)" },
    ],
  },
  {
    title   : "Software Engineering Intern",
    company : "Startup Inc.",
    period  : "Jun 2022 – Dec 2022",
    duration: "7 mo",
    status  : "PAST" as const,
    type    : "Internship",
    location: "Hybrid",
    stack   : ["React", "TypeScript", "Redux", "Git", "REST APIs"],
    bullets : [
      "Engineered responsive UIs and internal dashboard tools used daily by 200+ employees.",
      "Migrated legacy codebase from JavaScript to TypeScript, reducing runtime errors by 35%.",
      "Collaborated in Agile sprints — delivered 8 features across 4 release cycles.",
    ],
    metrics: [
      { label: "Bug Reduction", value: "−35%", color: "var(--accent2)" },
      { label: "Features",     value: "8",    color: "var(--accent)"  },
      { label: "Sprints",      value: "4",    color: "var(--accent3)" },
    ],
  },
];

const SKILL_MATRIX = [
  { label: "React / TS",    level: 9, color: "var(--accent)"  },
  { label: "Node / Express",level: 8, color: "var(--accent2)" },
  { label: "Databases",     level: 8, color: "var(--accent2)" },
  { label: "Docker / K8s",  level: 6, color: "var(--accent3)" },
  { label: "System Design", level: 7, color: "var(--accent)"  },
  { label: "UI / UX",       level: 6, color: "var(--text-dim)"},
];

export default function Experience() {
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
        <SectionBox title="~/work_history">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
            <div style={{ flex: 1, overflow: "hidden" }}>
              <pre style={{
                color     : "var(--accent)",
                fontSize  : "clamp(4px, 0.7vw, 9px)",
                lineHeight: 1.1,
                margin    : "0 0 8px 0",
                whiteSpace: "pre",
                fontFamily: "monospace",
              }}>
{`\
 ███████╗██╗  ██╗██████╗ ███████╗██████╗ ██╗███████╗███╗   ██╗ ██████╗███████╗
 ██╔════╝╚██╗██╔╝██╔══██╗██╔════╝██╔══██╗██║██╔════╝████╗  ██║██╔════╝██╔════╝
 █████╗   ╚███╔╝ ██████╔╝█████╗  ██████╔╝██║█████╗  ██╔██╗ ██║██║     █████╗  
 ██╔══╝   ██╔██╗ ██╔═══╝ ██╔══╝  ██╔══██╗██║██╔══╝  ██║╚██╗██║██║     ██╔══╝  
 ███████╗██╔╝ ██╗██║     ███████╗██║  ██║██║███████╗██║ ╚████║╚██████╗███████╗
 ╚══════╝╚═╝  ╚═╝╚═╝     ╚══════╝╚═╝  ╚═╝╚═╝╚══════╝╚═╝  ╚═══╝ ╚═════╝╚══════╝`}
              </pre>
              <p style={{ margin: 0, color: "var(--text-dim)", fontSize: "0.8em", opacity: 0.8 }}>
                Experience Engine v2.0 &nbsp;·&nbsp;
                <span style={{ color: "var(--accent2)" }}>{JOBS.length} roles detected</span>
              </p>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{ fontSize: "1.4em", fontWeight: 700, color: "var(--accent2)", lineHeight: 1 }}>2.4 YRS</div>
              <div style={{ fontSize: "0.68em", color: "var(--text-dim)", marginTop: "3px", letterSpacing: "0.08em" }}>TOTAL EXP</div>
            </div>
          </div>
        </SectionBox>

        {/* ── BODY ────────────────────────────────────────────────────────── */}
        <div style={{
          display            : "grid",
          gridTemplateColumns: "1fr 240px",
          gap                : "16px",
          flex               : 1,
          minHeight          : 0,
          paddingTop         : "14px",
          alignItems         : "stretch",
        }}>

          {/* ── LEFT: Job Timeline ──────────────────────────────────────── */}
          <SectionBox
            title="Professional History"
            style={{ display: "flex", flexDirection: "column", minHeight: 0, margin: 0 }}
          >
            <div style={{ flex: 1, overflowY: "auto", paddingRight: "4px", minHeight: 0, scrollbarWidth: "thin", scrollbarColor: "var(--selection) transparent" }}>
              {JOBS.map((job, idx) => (
                <JobCard key={job.title} job={job} isLast={idx === JOBS.length - 1} />
              ))}
            </div>
          </SectionBox>

          {/* ── RIGHT: Skill Matrix + Summary ───────────────────────────── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px", minHeight: 0 }}>

            {/* Summary stats */}
            <SectionBox title="Summary" style={{ margin: 0 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <StatRow label="Total Exp"  value="2.4 yrs"  color="var(--accent2)" active />
                <StatRow label="Companies"  value="2"        color="var(--accent)"  />
                <StatRow label="Stack"      value="Full"     color="var(--accent3)" />
                <StatRow label="Domain"     value="Web · AI" color="var(--accent)"  />
              </div>
            </SectionBox>

            {/* Skill matrix */}
            <SectionBox
              title="Skill Matrix"
              style={{ margin: 0, flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}
            >
              <div style={{ flex: 1, overflowY: "auto", minHeight: 0 }}>
                {SKILL_MATRIX.map(s => (
                  <SkillBar key={s.label} label={s.label} level={s.level} color={s.color} />
                ))}
              </div>
            </SectionBox>

          </div>
        </div>
      </div>
    </BvimLayout>
  );
}

/* ── Job Card ───────────────────────────────────────────────────────────── */

function JobCard({ job: j, isLast }: { job: typeof JOBS[number]; isLast: boolean }) {
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

/* ── Helpers ────────────────────────────────────────────────────────────── */

function SkillBar({ label, level, color }: { label: string; level: number; color: string }) {
  return (
    <div style={{ marginBottom: "12px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75em", marginBottom: "4px" }}>
        <span style={{ color: "var(--text)" }}>{label}</span>
        <span style={{ color: "var(--text-dim)" }}>{level}/10</span>
      </div>
      <div style={{ display: "flex", gap: "3px" }}>
        {[...Array(10)].map((_, i) => (
          <div key={i} style={{
            height      : "6px",
            flex        : 1,
            background  : i < level ? color : "var(--border-dim)",
            borderRadius: "1px",
            opacity     : i < level ? 1 : 0.3,
          }} />
        ))}
      </div>
    </div>
  );
}

function StatRow({ label, value, color, active = false }: { label: string; value: string; color: string; active?: boolean }) {
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