import BvimLayout from "../components/BvimLayout";
import SectionBox from "../components/SectionBox";

const TIMELINE = [
  {
    year: "2020", title: "Enrolled — B.Tech CSE",
    place: "University Name",
    detail: "Began Bachelor of Technology in Computer Science Engineering. Focused on core CS fundamentals.",
    tags: ["C", "Python", "Math", "Logic"], status: "done",
  },
  {
    year: "2021", title: "Linux System Administration",
    place: "Linux Foundation · Certification",
    detail: "Certified Linux sysadmin — shell scripting, processes, and networking.",
    tags: ["Linux", "Bash", "Networking"], status: "done",
  },
  {
    year: "2022", title: "Docker & Kubernetes",
    place: "CNCF · Certification",
    detail: "Containerisation fundamentals — Docker images, Compose, and Kubernetes.",
    tags: ["Docker", "K8s", "DevOps"], status: "done",
  },
  {
    year: "2022", title: "Internship — Software Engineering",
    place: "Startup Inc.",
    detail: "Built responsive UIs with React & TypeScript, participated in code reviews.",
    tags: ["React", "TypeScript", "Git"], status: "done",
  },
  {
    year: "2023", title: "Advanced React & TypeScript",
    place: "Udemy · Certification",
    detail: "React architecture, custom hooks, performance patterns and TypeScript generics.",
    tags: ["React", "TypeScript", "Hooks"], status: "done",
  },
  {
    year: "2023", title: "Cloud Computing & AWS",
    place: "AWS · Certification",
    detail: "EC2, S3, Lambda, RDS and cloud architecture for production systems.",
    tags: ["AWS", "Cloud", "Lambda"], status: "done",
  },
  {
    year: "2024", title: "Graduating — B.Tech CSE",
    place: "University Name · Expected 2024",
    detail: "Final year. GPA 8.9/10. Capstone project on agentic AI developer tooling.",
    tags: ["System Design", "AI", "Capstone"], status: "active",
  },
  {
    year: "→", title: "What's Next",
    place: "Open to opportunities",
    detail: "Looking for full-time SWE / AI engineering roles.",
    tags: ["Full-time", "Remote / Hybrid"], status: "next",
  },
];

const COURSES = [
  "Data Structures & Algorithms",
  "Database Management Systems",
  "Operating Systems",
  "Computer Networks",
  "Software Engineering",
  "Machine Learning",
  "Distributed Systems",
  "System Design",
];

export default function Education() {
  return (
    <BvimLayout>
      <div style={{
        display: "flex",
        flexDirection: "column",
        height: "100%", // Ensure the parent has height
        color: "var(--text)",
        fontFamily: "var(--font-family, 'JetBrains Mono', monospace)",
        overflow: "hidden" // Prevent the whole page from scrolling
      }}>

        {/* ── HEADER ─────────────────────────────────────────────────────── */}
        <SectionBox title="">
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ flex: 1, overflow: "hidden" }}>
              <pre style={{
                color: "var(--accent)",
                fontSize: "clamp(7px, 1vw, 11px)",
                lineHeight: 1.2,
                margin: "0 0 8px 0",
                whiteSpace: "pre",
                fontFamily: "monospace",
              }}>{`\
 ███████╗██████╗ ██╗   ██╗ ██████╗ █████╗ ████████╗██╗ ██████╗ ███╗   ██╗
 ██╔════╝██╔══██╗██║   ██║██╔════╝██╔══██╗╚══██╔══╝██║██╔═══██╗████╗  ██║
 █████╗  ██║  ██║██║   ██║██║     ███████║   ██║   ██║██║   ██║██╔██╗ ██║
 ██╔══╝  ██║  ██║██║   ██║██║     ██╔══██║   ██║   ██║██║   ██║██║╚██╗██║
 ███████╗██████╔╝╚██████╔╝╚██████╗██║  ██║   ██║   ██║╚██████╔╝██║ ╚████║
 ╚══════╝╚═════╝  ╚═════╝  ╚═════╝╚═╝  ╚═╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝`}
              </pre>
              <p style={{ margin: 0, color: "var(--text-dim)", fontSize: "0.82em", letterSpacing: "0.05em" }}>
                B.Tech · Computer Science Engineering &nbsp;·&nbsp; 2020 – 2024 &nbsp;·&nbsp; GPA 8.9 / 10
              </p>
            </div>
          </div>
        </SectionBox>

        {/* ── BODY ───────────────────────────────────────────────────────── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 260px",
          gap: "0 16px",
          flex: 1,
          minHeight: 0,        /* CRITICAL: Allows flex children to shrink/scroll */
          paddingTop: "14px",
          alignItems: "stretch", /* CRITICAL: Forces SectionBoxes to fill height */
        }}>

          {/* Timeline */}
          <SectionBox
            title="Timeline"
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: 0,    /* Allows the internal div to scroll */
            }}
          >
            <div style={{
              overflowY: "auto",
              flex: 1,
              paddingRight: "4px",
              scrollbarWidth: "thin",
              scrollbarColor: "var(--selection) transparent",
            }}>
              {TIMELINE.map((item, idx) => (
                <TimelineItem key={idx} item={item} isLast={idx === TIMELINE.length - 1} />
              ))}
            </div>
          </SectionBox>

          {/* Core Courses */}
          <SectionBox
            title="Core Courses"
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: 0,
            }}
          >
            <div style={{ flex: 1, overflowY: "auto" }}>
              {COURSES.map((course, idx) => (
                <div key={course} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "7px 0",
                  borderBottom: idx < COURSES.length - 1 ? "1px dashed var(--border-dim)" : "none",
                }}>
                  <span style={{
                    color: "var(--text-dim)", fontSize: "0.7em",
                    minWidth: "18px", textAlign: "right",
                    flexShrink: 0, opacity: 0.45,
                  }}>
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span style={{
                    color: idx < 2 ? "var(--accent)" : "var(--text-dim)",
                    fontSize: "0.84em",
                    fontWeight: idx < 2 ? 700 : 400,
                  }}>
                    {idx < 2 && <span style={{ color: "var(--accent3)", marginRight: "4px" }}>✓</span>}
                    {course}
                  </span>
                </div>
              ))}
            </div>
          </SectionBox>
        </div>
      </div>
    </BvimLayout>
  );
}

// ─── Timeline Item ────────────────────────────────────────────────────────────

function TimelineItem({ item, isLast }: { item: typeof TIMELINE[number]; isLast: boolean }) {
  const isActive = item.status === "active";
  const isNext   = item.status === "next";
  const isDone   = item.status === "done";

  const nodeChar  = isActive ? "◉" : isNext ? "◌" : "●";
  const nodeColor = isActive ? "var(--accent2)" : isNext ? "var(--accent3)" : "var(--accent)";
  const lineColor = isLast ? "transparent" : isDone ? "var(--border-dim)" : "var(--accent3)";

  return (
    <div style={{ display: "flex", gap: "0px", alignItems: "stretch" }}>

      {/* Year + node + connector */}
      <div style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", width: "48px", flexShrink: 0,
      }}>
        <span style={{
          color: isActive ? "var(--accent2)" : isNext ? "var(--accent3)" : "var(--text-dim)",
          fontSize: "0.7em", fontWeight: isActive || isNext ? 700 : 400,
          marginBottom: "3px", letterSpacing: "0.04em",
        }}>
          {item.year}
        </span>
        <span style={{
          color: nodeColor, fontSize: isActive ? "1.1em" : "0.85em",
          lineHeight: 1, flexShrink: 0,
          filter: isActive ? "drop-shadow(0 0 4px var(--accent2))" : "none",
        }}>
          {nodeChar}
        </span>
        {!isLast && (
          <div style={{
            flex: 1, width: "1px", minHeight: "16px", margin: "3px 0",
            background: isNext
              ? `repeating-linear-gradient(to bottom, ${lineColor} 0, ${lineColor} 4px, transparent 4px, transparent 8px)`
              : lineColor,
          }} />
        )}
      </div>

      {/* Content card */}
      <div style={{
        flex: 1, marginLeft: "10px",
        marginBottom: isLast ? "0" : "6px",
        padding: "8px 10px 10px",
        borderRadius: "4px",
        border: `1px solid ${isActive ? "var(--accent2)" : isNext ? "var(--accent3)" : "var(--border-dim)"}`,
        background: isActive
          ? "color-mix(in srgb, var(--accent2) 6%, transparent)"
          : isNext
          ? "color-mix(in srgb, var(--accent3) 5%, transparent)"
          : "transparent",
      }}>
        {/* Title + badge */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "3px" }}>
          <span style={{
            color: isActive ? "var(--accent2)" : isNext ? "var(--accent3)" : "var(--accent)",
            fontSize: "0.88em", fontWeight: 700,
          }}>
            {isActive ? "✓ " : isNext ? "→ " : ""}{item.title}
          </span>
          {(isActive || isNext) && (
            <span style={{
              fontSize: "0.66em", padding: "1px 5px",
              border: `1px solid ${isActive ? "var(--accent2)" : "var(--accent3)"}`,
              borderRadius: "2px",
              color: isActive ? "var(--accent2)" : "var(--accent3)",
              background: isActive
                ? "color-mix(in srgb, var(--accent2) 12%, transparent)"
                : "color-mix(in srgb, var(--accent3) 10%, transparent)",
              flexShrink: 0,
            }}>
              {isActive ? "CURRENT" : "NEXT"}
            </span>
          )}
        </div>

        <div style={{ color: "var(--text-dim)", fontSize: "0.74em", marginBottom: "4px" }}>{item.place}</div>
        <div style={{ color: "var(--text-dim)", fontSize: "0.8em", lineHeight: 1.5, marginBottom: "6px" }}>{item.detail}</div>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
          {item.tags.map(tag => (
            <span key={tag} style={{
              fontSize: "0.68em", padding: "1px 5px",
              border: "1px solid var(--border-dim)", borderRadius: "2px",
              color: "var(--text-dim)",
              background: "color-mix(in srgb, var(--selection) 40%, transparent)",
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

    </div>
  );
}