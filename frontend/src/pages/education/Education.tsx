import BvimLayout from "../../components/layout/BvimLayout.tsx";
import SectionBox from "../../components/common/SectionBox.tsx";
import './education.css'
import { TimelineItem } from "./components/TimelineItem";
import useEducationData from "./useEducationData"; 

export default function Education() {
  const {TIMELINE, COURSES} = useEducationData();
  return (
    <BvimLayout>
      <div className="edu-container">

        {/* ── HEADER ─────────────────────────────────────────────────────── */}
        <SectionBox title="">
          <div className="edu-header">
            <div className="edu-header-content">
              <pre className="edu-ascii">{`\
 ███████╗██████╗ ██╗   ██╗ ██████╗ █████╗ ████████╗██╗ ██████╗ ███╗   ██╗
 ██╔════╝██╔══██╗██║   ██║██╔════╝██╔══██╗╚══██╔══╝██║██╔═══██╗████╗  ██║
 █████╗  ██║  ██║██║   ██║██║     ███████║   ██║   ██║██║   ██║██╔██╗ ██║
 ██╔══╝  ██║  ██║██║   ██║██║     ██╔══██║   ██║   ██║██║   ██║██║╚██╗██║
 ███████╗██████╔╝╚██████╔╝╚██████╗██║  ██║   ██║   ██║╚██████╔╝██║ ╚████║
 ╚══════╝╚═════╝  ╚═════╝  ╚═════╝╚═╝  ╚═╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝`}
              </pre>
              <p className="edu-subtitle">
                B.Tech · Computer Science Engineering &nbsp;·&nbsp; 2020 – 2024 &nbsp;·&nbsp; GPA 8.9 / 10
              </p>
            </div>
          </div>
        </SectionBox>

        {/* ── BODY ───────────────────────────────────────────────────────── */}
        <div className="edu-grid">

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
