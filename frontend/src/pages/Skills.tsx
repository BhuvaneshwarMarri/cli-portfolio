import BvimLayout from "../components/BvimLayout";
import SectionBox from "../components/SectionBox";

// ─── Data ─────────────────────────────────────────────────────────────────────

const SKILL_GROUPS = [
  {
    title : "Languages",
    icon  : "λ",
    color : "var(--accent)",
    skills: [
      { name: "Python",     level: 92, tag: "primary" },
      { name: "TypeScript", level: 88, tag: "primary" },
      { name: "JavaScript", level: 85, tag: "primary" },
      { name: "SQL",        level: 80, tag: ""        },
      { name: "Java",       level: 75, tag: ""        },
      { name: "C++",        level: 65, tag: ""        },
    ],
  },
  {
    title : "Frontend",
    icon  : "◈",
    color : "var(--accent2)",
    skills: [
      { name: "React",         level: 90, tag: "primary" },
      { name: "Tailwind CSS",  level: 85, tag: ""        },
      { name: "Vite",          level: 82, tag: ""        },
      { name: "Next.js",       level: 72, tag: ""        },
      { name: "Framer Motion", level: 70, tag: ""        },
    ],
  },
  {
    title : "Backend & Infra",
    icon  : "⌘",
    color : "var(--accent3)",
    skills: [
      { name: "Node.js",    level: 85, tag: "primary" },
      { name: "Express",    level: 82, tag: ""        },
      { name: "PostgreSQL", level: 78, tag: ""        },
      { name: "MongoDB",    level: 75, tag: ""        },
      { name: "Docker",     level: 70, tag: ""        },
      { name: "AWS",        level: 68, tag: ""        },
    ],
  },
  {
    title : "AI & Tools",
    icon  : "∑",
    color : "var(--accent)",
    skills: [
      { name: "OpenAI API",    level: 82, tag: "primary" },
      { name: "Agentic AI",    level: 80, tag: ""        },
      { name: "LangChain",     level: 75, tag: ""        },
      { name: "Linux / Bash",  level: 78, tag: ""        },
      { name: "Git",           level: 90, tag: "primary" },
      { name: "System Design", level: 70, tag: ""        },
    ],
  },
];

const TECH_STACK = [
  "React", "TypeScript", "Python", "Node.js", "PostgreSQL",
  "Docker", "AWS", "Redis", "REST", "GraphQL", "Git", "Linux",
  "Next.js", "LangChain", "OpenAI", "MongoDB", "Tailwind", "Vite",
  "Express", "K8s",
];

const PROFICIENCY_LEVELS = [
  { label: "Expert",       range: "90–100%", color: "var(--accent2)",  skills: ["React", "Git", "Python"] },
  { label: "Proficient",   range: "75–89%",  color: "var(--accent)",   skills: ["TypeScript", "Node.js", "PostgreSQL", "OpenAI API"] },
  { label: "Competent",    range: "60–74%",  color: "var(--accent3)",  skills: ["Docker", "LangChain", "Java", "Next.js"] },
  { label: "Familiar",     range: "< 60%",   color: "var(--text-dim)", skills: ["C++", "K8s", "Terraform"] },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Skills() {
  return (
    <BvimLayout>
      <div style={{
        display      : "flex",
        flexDirection: "column",
        height       : "100%",
        color        : "var(--text)",
        fontFamily   : "var(--font-family, 'JetBrains Mono', monospace)",
        overflow     : "hidden",
        gap          : "0",
      }}>

        {/* ── HEADER ──────────────────────────────────────────────────────── */}
        <SectionBox title="">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
            <div style={{ flex: 1, overflow: "hidden" }}>
              <pre style={{
                color: "var(--accent)", fontSize: "clamp(4px, 0.75vw, 10px)",
                lineHeight: 1.15, margin: "0 0 8px 0", whiteSpace: "pre", fontFamily: "monospace",
              }}>{`\
 ███████╗██╗  ██╗██╗██╗     ██╗     ███████╗
 ██╔════╝██║ ██╔╝██║██║     ██║     ██╔════╝
 ███████╗█████╔╝ ██║██║     ██║     ███████╗
 ╚════██║██╔═██╗ ██║██║     ██║     ╚════██║
 ███████║██║  ██╗██║███████╗███████╗███████║
 ╚══════╝╚═╝  ╚═╝╚═╝╚══════╝╚══════╝╚══════╝`}
              </pre>
              <p style={{ margin: 0, color: "var(--text-dim)", fontSize: "0.82em", letterSpacing: "0.05em" }}>
                {SKILL_GROUPS.reduce((a, g) => a + g.skills.length, 0)} skills across {SKILL_GROUPS.length} domains
                &nbsp;·&nbsp; <span style={{ color: "var(--accent2)" }}>3 expert-level</span>
              </p>
            </div>

            {/* Proficiency legend */}
            <div style={{ display: "flex", flexDirection: "column", gap: "4px", flexShrink: 0 }}>
              {PROFICIENCY_LEVELS.map(p => (
                <div key={p.label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: p.color, flexShrink: 0, display: "inline-block" }} />
                  <span style={{ fontSize: "0.7em", color: "var(--text-dim)", minWidth: "70px" }}>{p.label}</span>
                  <span style={{ fontSize: "0.68em", color: p.color, opacity: 0.8 }}>{p.range}</span>
                </div>
              ))}
            </div>
          </div>
        </SectionBox>

        {/* ── BODY ────────────────────────────────────────────────────────── */}
        <div style={{
          display            : "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows   : "auto 1fr",
          gap                : "14px",
          flex               : 1,
          minHeight          : 0,
          paddingTop         : "14px",
        }}>

          {/* ── Skill Groups (4 boxes) ── */}
          {SKILL_GROUPS.map((group) => (
            <SectionBox
              key={group.title}
              title={`${group.icon} ${group.title}`}
              style={{ margin: 0, display: "flex", flexDirection: "column" }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {group.skills.map(skill => (
                  <SkillRow
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    color={group.color}
                    primary={skill.tag === "primary"}
                  />
                ))}
              </div>
            </SectionBox>
          ))}

        </div>

        {/* ── BOTTOM: Tech Stack tag cloud + Proficiency Matrix ── */}
        <div style={{
          display            : "grid",
          gridTemplateColumns: "1fr 280px",
          gap                : "14px",
          paddingTop         : "14px",
        }}>

          {/* Tech stack tags */}
          <SectionBox title="∷ Tech Stack" style={{ margin: 0 }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", alignItems: "center" }}>
              {TECH_STACK.map((tech, i) => {
                const sizes = [0.95, 0.85, 0.78];
                const sz = sizes[i % 3];
                const colors = ["var(--accent)", "var(--accent2)", "var(--accent3)", "var(--text-dim)"];
                const col = colors[i % 4];
                return (
                  <span key={tech} style={{
                    fontSize    : `${sz}em`,
                    padding     : "3px 10px",
                    border      : `1px solid color-mix(in srgb, ${col} 30%, transparent)`,
                    borderRadius: "3px",
                    color       : col,
                    background  : `color-mix(in srgb, ${col} 7%, transparent)`,
                    letterSpacing: "0.02em",
                    fontWeight  : sz > 0.9 ? 700 : 400,
                    transition  : "background 0.15s",
                    cursor      : "default",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = `color-mix(in srgb, ${col} 18%, transparent)`; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = `color-mix(in srgb, ${col} 7%, transparent)`; }}
                  >
                    {tech}
                  </span>
                );
              })}
            </div>
          </SectionBox>

          {/* Proficiency matrix */}
          <SectionBox title="⊞ Proficiency Matrix" style={{ margin: 0 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {PROFICIENCY_LEVELS.map(p => (
                <div key={p.label}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <span style={{ fontSize: "0.74em", color: p.color, fontWeight: 700 }}>{p.label}</span>
                    <span style={{ fontSize: "0.68em", color: "var(--text-dim)", opacity: 0.7 }}>{p.range}</span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                    {p.skills.map(s => (
                      <span key={s} style={{
                        fontSize    : "0.68em",
                        padding     : "1px 6px",
                        border      : `1px solid color-mix(in srgb, ${p.color} 35%, transparent)`,
                        borderRadius: "2px",
                        color       : p.color,
                        background  : `color-mix(in srgb, ${p.color} 10%, transparent)`,
                      }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </SectionBox>

        </div>
      </div>
    </BvimLayout>
  );
}

// ─── Skill Row ────────────────────────────────────────────────────────────────

function SkillRow({ name, level, color, primary }: {
  name: string; level: number; color: string; primary: boolean;
}) {
  const blocks  = 20;
  const filled  = Math.round((level / 100) * blocks);
  const empty   = blocks - filled;

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