import BvimLayout from "../components/BvimLayout";
import SectionBox from "../components/SectionBox";

export default function Skills() {
  return (
    <BvimLayout>
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        height: "100%",
        color: "var(--text)",
        fontFamily: "var(--font-family, 'JetBrains Mono', monospace)",
      }}>

        {/* ── HEADER ─────────────────────────────────────────────────────── */}
        <SectionBox title="">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
            <div>
              <pre style={{
                color: "var(--accent)",
                fontSize: "clamp(4px, 0.75vw, 10px)",
                lineHeight: 1.15,
                margin: "0 0 8px 0",
                whiteSpace: "pre",
                fontFamily: "monospace",
              }}>{`\
 ███████╗██╗  ██╗██╗██╗     ██╗     ███████╗
 ██╔════╝██║ ██╔╝██║██║     ██║     ██╔════╝
 ███████╗█████╔╝ ██║██║     ██║     ███████╗
 ╚════██║██╔═██╗ ██║██║     ██║     ╚════██║
 ███████║██║  ██╗██║███████╗███████╗███████║
 ╚══════╝╚═╝  ╚═╝╚═╝╚══════╝╚══════╝╚══════╝`}
              </pre>
              <p style={{ margin: 0, color: "var(--text-dim)", fontSize: "0.82em", letterSpacing: "0.05em" }}>
                Languages &nbsp;·&nbsp; Frameworks &nbsp;·&nbsp; Tools &nbsp;·&nbsp; AI Systems
              </p>
            </div>
          </div>
        </SectionBox>

        {/* ── GRID ───────────────────────────────────────────────────────── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
          flex: 1,
        }}>

          {/* Languages */}
          <SectionBox title="Languages" style={{ margin: 0 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
              <SkillRow name="Python"     level={92} color="var(--accent2)"  active />
              <SkillRow name="TypeScript" level={88} color="var(--accent)"  />
              <SkillRow name="JavaScript" level={85} color="var(--accent)"  />
              <SkillRow name="Java"       level={75} color="var(--accent3)" />
              <SkillRow name="C++"        level={65} color="var(--accent3)" />
              <SkillRow name="SQL"        level={80} color="var(--accent2)" />
            </div>
          </SectionBox>

          {/* Frontend */}
          <SectionBox title="Frontend" style={{ margin: 0 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
              <SkillRow name="React"          level={90} color="var(--accent)"  active />
              <SkillRow name="Tailwind CSS"   level={85} color="var(--accent)"  />
              <SkillRow name="Vite"           level={82} color="var(--accent2)" />
              <SkillRow name="Framer Motion"  level={70} color="var(--accent3)" />
              <SkillRow name="Next.js"        level={72} color="var(--accent)"  />
            </div>
          </SectionBox>

          {/* Backend & Tools */}
          <SectionBox title="Backend & Tools" style={{ margin: 0 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
              <SkillRow name="Node.js"     level={85} color="var(--accent2)" active />
              <SkillRow name="Express"     level={82} color="var(--accent2)" />
              <SkillRow name="PostgreSQL"  level={78} color="var(--accent)"  />
              <SkillRow name="MongoDB"     level={75} color="var(--accent2)" />
              <SkillRow name="Docker"      level={70} color="var(--accent3)" />
              <SkillRow name="Git"         level={90} color="var(--accent)"  />
            </div>
          </SectionBox>

          {/* AI & Systems */}
          <SectionBox title="AI & Systems" style={{ margin: 0 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
              <SkillRow name="Agentic AI"    level={80} color="var(--accent3)" active />
              <SkillRow name="LangChain"     level={75} color="var(--accent3)" />
              <SkillRow name="OpenAI API"    level={82} color="var(--accent)"  />
              <SkillRow name="Linux / Bash"  level={78} color="var(--accent2)" />
              <SkillRow name="System Design" level={70} color="var(--accent3)" />
            </div>
          </SectionBox>

        </div>
      </div>
    </BvimLayout>
  );
}

/* ── Skill row with inline progress bar ────────────────────────────────── */

function SkillRow({ name, level, color, active = false }: {
  name: string; level: number; color: string; active?: boolean;
}) {
  const filled = Math.round(level / 10);  // 0–10 blocks
  const empty  = 10 - filled;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      {/* Active marker */}
      <span style={{ color: active ? "var(--accent3)" : "transparent", fontSize: "0.75em", flexShrink: 0 }}>
        ✓
      </span>

      {/* Name */}
      <span style={{
        color: active ? "var(--accent)" : "var(--text)",
        fontSize: "0.86em",
        fontWeight: active ? 700 : 400,
        minWidth: "110px",
        flexShrink: 0,
      }}>
        {name}
      </span>

      {/* Progress bar */}
      <span style={{ color, fontSize: "0.78em", letterSpacing: "1px", fontFamily: "monospace" }}>
        {"█".repeat(filled)}
        <span style={{ opacity: 0.2 }}>{"░".repeat(empty)}</span>
      </span>

      {/* Percentage */}
      <span style={{ color: "var(--text-dim)", fontSize: "0.75em", marginLeft: "auto", flexShrink: 0 }}>
        {level}%
      </span>
    </div>
  );
}