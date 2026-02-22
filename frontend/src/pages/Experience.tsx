import BvimLayout from "../components/BvimLayout";
import SectionBox from "../components/SectionBox";

export default function Experience() {
  return (
    <BvimLayout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh", // ✅ changed (was height: 100%)
          color: "var(--text)",
          fontFamily: "var(--font-family, 'JetBrains Mono', monospace)",
        }}
      >
        {/* ── HEADER ─────────────────────────────────────────────────────── */}
        <SectionBox title="~/work_history" style={{ marginBottom: "0px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <pre
                style={{
                  color: "var(--accent)",
                  fontSize: "clamp(4px, 0.7vw, 9px)",
                  lineHeight: 1.1,
                  margin: "0 0 8px 0",
                  whiteSpace: "pre",
                }}
              >
{` ███████╗██╗  ██╗██████╗ ███████╗██████╗ ██╗███████╗███╗   ██╗ ██████╗███████╗
 ██╔════╝╚██╗██╔╝██╔══██╗██╔════╝██╔══██╗██║██╔════╝████╗  ██║██╔════╝██╔════╝
 █████╗   ╚███╔╝ ██████╔╝█████╗  ██████╔╝██║█████╗  ██╔██╗ ██║██║     █████╗  
 ██╔══╝   ██╔██╗ ██╔═══╝ ██╔══╝  ██╔══██╗██║██╔══╝  ██║╚██╗██║██║     ██╔══╝  
 ███████╗██╔╝ ██╗██║     ███████╗██║  ██║██║███████╗██║ ╚████║╚██████╗███████╗
 ╚══════╝╚═╝  ╚═╝╚═╝     ╚══════╝╚═╝  ╚═╝╚═╝╚══════╝╚═╝  ╚═══╝ ╚═════╝╚══════╝`}
              </pre>
              <p
                style={{
                  margin: 0,
                  color: "var(--text-dim)",
                  fontSize: "0.8em",
                  opacity: 0.8,
                }}
              >
                Experience Engine v2.0.4 &nbsp;·&nbsp;{" "}
                <span style={{ color: "var(--accent2)" }}>
                  2 roles detected
                </span>
              </p>
            </div>

            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  fontSize: "1.2em",
                  fontWeight: 700,
                  color: "var(--accent2)",
                }}
              >
                2.4 YRS
              </div>
              <div
                style={{
                  fontSize: "0.7em",
                  color: "var(--text-dim)",
                }}
              >
                TOTAL EXPERIENCE
              </div>
            </div>
          </div>
        </SectionBox>

        {/* ── MAIN DASHBOARD ─────────────────────────────────────────────── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "minmax(0, 1fr) minmax(260px, 320px)", // ✅ stabilized
            gap: "16px",
            flex: 1,
            minHeight: 0, // ✅ important
            paddingTop: "14px",
            alignItems: "stretch",
          }}
        >
          {/* LEFT COLUMN */}
          <SectionBox
            title="Professional History"
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: 0, // ✅ important
            }}
          >
            <div
              style={{
                overflowY: "auto",
                flex: 1,
                paddingRight: "8px",
                minHeight: 0, // ✅ critical fix
              }}
            >
              <JobEntry
                title="Full Stack Developer"
                company="Tech Company"
                period="2023 – Present"
                status="ACTIVE"
                stack={["React", "Node.js", "PostgreSQL", "AWS"]}
                bullets={[
                  "Built & maintained full-stack web applications for scale.",
                  "Reduced load time by 40% via performance optimization & caching.",
                  "Mentored 3 junior developers and led weekly code reviews.",
                ]}
                active
              />

              <div
                style={{
                  height: "20px",
                  marginLeft: "14px",
                  borderLeft: "2px dashed var(--border-dim)",
                }}
              />

              <JobEntry
                title="Software Engineering Intern"
                company="Startup Inc."
                period="2022 – 2023"
                status="PAST"
                stack={["React", "TypeScript", "Redux", "Git"]}
                bullets={[
                  "Engineered responsive UIs and internal dashboard tools.",
                  "Migrated legacy codebase from JS to TypeScript.",
                  "Collaborated in an Agile environment with bi-weekly sprints.",
                ]}
              />
            </div>
          </SectionBox>

          {/* RIGHT COLUMN */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              minHeight: 0, // ✅ important
            }}
          >
            <SectionBox title="Impact Metrics" style={{ marginTop: 0 }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <MetricRow
                  label="Deploy Speed"
                  value="+60%"
                  color="var(--accent2)"
                />
                <MetricRow
                  label="Performance"
                  value="+40%"
                  color="var(--accent)"
                />
                <MetricRow
                  label="Code Coverage"
                  value="92%"
                  color="var(--accent)"
                />
              </div>
            </SectionBox>

            <SectionBox
              title="Skill Matrix"
              style={{
                flex: 1,
                minHeight: 0, // ✅ important
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  overflowY: "auto",
                  flex: 1,
                  minHeight: 0, // ✅ critical
                }}
              >
                <SkillBar
                  label="React/TS"
                  level={9}
                  color="var(--accent)"
                />
                <SkillBar
                  label="Node/Express"
                  level={8}
                  color="var(--accent2)"
                />
                <SkillBar
                  label="Databases"
                  level={8}
                  color="var(--accent2)"
                />
                <SkillBar
                  label="Docker/K8s"
                  level={6}
                  color="var(--accent3)"
                />
                <SkillBar
                  label="System Design"
                  level={7}
                  color="var(--accent)"
                />
                <SkillBar
                  label="UI/UX"
                  level={6}
                  color="var(--text-dim)"
                />
              </div>
            </SectionBox>
          </div>
        </div>
      </div>
    </BvimLayout>
  );
}

/* ── Sub-components ─────────────────────────────────────────────────────── */

function JobEntry({
  title,
  company,
  period,
  status,
  stack,
  bullets,
  active = false,
}: any) {
  return (
    <div style={{ position: "relative" }}>
      <div style={{ display: "flex", gap: "12px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: active
                ? "var(--accent2)"
                : "var(--border-dim)",
              marginTop: "6px",
              boxShadow: active
                ? "0 0 8px var(--accent2)"
                : "none",
            }}
          />
        </div>

        <div style={{ flex: 1, paddingBottom: "10px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "4px",
            }}
          >
            <div>
              <div
                style={{
                  color: active
                    ? "var(--accent)"
                    : "var(--text)",
                  fontWeight: 700,
                  fontSize: "0.95em",
                }}
              >
                {title}
              </div>
              <div
                style={{
                  color: "var(--text-dim)",
                  fontSize: "0.8em",
                }}
              >
                {company} · {period}
              </div>
            </div>
            <span
              style={{
                fontSize: "0.65em",
                padding: "2px 6px",
                borderRadius: "3px",
                border: `1px solid ${
                  active
                    ? "var(--accent2)"
                    : "var(--border-dim)"
                }`,
                color: active
                  ? "var(--accent2)"
                  : "var(--text-dim)",
              }}
            >
              [{status}]
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "6px",
              margin: "8px 0",
            }}
          >
            {stack.map((s: string) => (
              <span
                key={s}
                style={{
                  fontSize: "0.7em",
                  color: "var(--accent3)",
                  opacity: 0.9,
                }}
              >
                #{s}
              </span>
            ))}
          </div>

          <ul
            style={{
              margin: 0,
              paddingLeft: "14px",
              listStyleType: "'↳ '",
              color: "var(--text-dim)",
              fontSize: "0.84em",
            }}
          >
            {bullets.map((b: string, i: number) => (
              <li
                key={i}
                style={{
                  marginBottom: "4px",
                  lineHeight: 1.4,
                }}
              >
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function MetricRow({ label, value, color }: any) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span
        style={{
          fontSize: "0.8em",
          color: "var(--text-dim)",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontWeight: 700,
          color,
          fontSize: "0.9em",
        }}
      >
        {value}
      </span>
    </div>
  );
}

function SkillBar({ label, level, color }: any) {
  const dots = 10;
  return (
    <div style={{ marginBottom: "12px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "0.75em",
          marginBottom: "4px",
        }}
      >
        <span style={{ color: "var(--text)" }}>
          {label}
        </span>
        <span style={{ color: "var(--text-dim)" }}>
          {level}/10
        </span>
      </div>
      <div style={{ display: "flex", gap: "3px" }}>
        {[...Array(dots)].map((_, i) => (
          <div
            key={i}
            style={{
              height: "6px",
              flex: 1,
              background:
                i < level
                  ? color
                  : "var(--border-dim)",
              borderRadius: "1px",
              opacity: i < level ? 1 : 0.3,
            }}
          />
        ))}
      </div>
    </div>
  );
}