import BvimLayout from "../../components/BvimLayout";
import SectionBox from "../../components/SectionBox";
import {TIMELINE, COURSES } from './constants'
import './education.css'
import { TimelineItem } from "./components/TimelineItem";

export default function Education() {
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

// ─── Timeline Item ────────────────────────────────────────────────────────────

// function TimelineItem({ item, isLast }: { item: typeof TIMELINE[number]; isLast: boolean }) {
//   const isActive = item.status === "active";
//   const isNext   = item.status === "next";
//   const isDone   = item.status === "done";

//   const nodeChar  = isActive ? "◉" : isNext ? "◌" : "●";
//   const nodeColor = isActive ? "var(--accent2)" : isNext ? "var(--accent3)" : "var(--accent)";
//   const lineColor = isLast ? "transparent" : isDone ? "var(--border-dim)" : "var(--accent3)";

//   return (
//     <div style={{ display: "flex", gap: "0px", alignItems: "stretch" }}>

//       {/* Year + node + connector */}
//       <div style={{
//         display: "flex", flexDirection: "column",
//         alignItems: "center", width: "48px", flexShrink: 0,
//       }}>
//         <span style={{
//           color: isActive ? "var(--accent2)" : isNext ? "var(--accent3)" : "var(--text-dim)",
//           fontSize: "0.7em", fontWeight: isActive || isNext ? 700 : 400,
//           marginBottom: "3px", letterSpacing: "0.04em",
//         }}>
//           {item.year}
//         </span>
//         <span style={{
//           color: nodeColor, fontSize: isActive ? "1.1em" : "0.85em",
//           lineHeight: 1, flexShrink: 0,
//           filter: isActive ? "drop-shadow(0 0 4px var(--accent2))" : "none",
//         }}>
//           {nodeChar}
//         </span>
//         {!isLast && (
//           <div style={{
//             flex: 1, width: "1px", minHeight: "16px", margin: "3px 0",
//             background: isNext
//               ? `repeating-linear-gradient(to bottom, ${lineColor} 0, ${lineColor} 4px, transparent 4px, transparent 8px)`
//               : lineColor,
//           }} />
//         )}
//       </div>

//       {/* Content card */}
//       <div style={{
//         flex: 1, marginLeft: "10px",
//         marginBottom: isLast ? "0" : "6px",
//         padding: "8px 10px 10px",
//         borderRadius: "4px",
//         border: `1px solid ${isActive ? "var(--accent2)" : isNext ? "var(--accent3)" : "var(--border-dim)"}`,
//         background: isActive
//           ? "color-mix(in srgb, var(--accent2) 6%, transparent)"
//           : isNext
//           ? "color-mix(in srgb, var(--accent3) 5%, transparent)"
//           : "transparent",
//       }}>
//         {/* Title + badge */}
//         <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "3px" }}>
//           <span style={{
//             color: isActive ? "var(--accent2)" : isNext ? "var(--accent3)" : "var(--accent)",
//             fontSize: "0.88em", fontWeight: 700,
//           }}>
//             {isActive ? "✓ " : isNext ? "→ " : ""}{item.title}
//           </span>
//           {(isActive || isNext) && (
//             <span style={{
//               fontSize: "0.66em", padding: "1px 5px",
//               border: `1px solid ${isActive ? "var(--accent2)" : "var(--accent3)"}`,
//               borderRadius: "2px",
//               color: isActive ? "var(--accent2)" : "var(--accent3)",
//               background: isActive
//                 ? "color-mix(in srgb, var(--accent2) 12%, transparent)"
//                 : "color-mix(in srgb, var(--accent3) 10%, transparent)",
//               flexShrink: 0,
//             }}>
//               {isActive ? "CURRENT" : "NEXT"}
//             </span>
//           )}
//         </div>

//         <div style={{ color: "var(--text-dim)", fontSize: "0.74em", marginBottom: "4px" }}>{item.place}</div>
//         <div style={{ color: "var(--text-dim)", fontSize: "0.8em", lineHeight: 1.5, marginBottom: "6px" }}>{item.detail}</div>

//         {/* Tags */}
//         <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
//           {item.tags.map(tag => (
//             <span key={tag} style={{
//               fontSize: "0.68em", padding: "1px 5px",
//               border: "1px solid var(--border-dim)", borderRadius: "2px",
//               color: "var(--text-dim)",
//               background: "color-mix(in srgb, var(--selection) 40%, transparent)",
//             }}>
//               {tag}
//             </span>
//           ))}
//         </div>
//       </div>

//     </div>
//   );
// }