import BvimLayout from "../../components/layout/BvimLayout.tsx";
import SectionBox from "../../components/common/SectionBox.tsx";
import { SkillRow } from "./components/SkillRow";
import './skills.css'
import useSkillsData from "./useSkillsData";

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Skills() {
  const {SKILL_GROUPS, TECH_STACK, PROFICIENCY_LEVELS} = useSkillsData();
  return (
    <BvimLayout>
      <div className="sk-container">

        {/* ── HEADER ──────────────────────────────────────────────────────── */}
        <SectionBox title="">
          <div className="sk-header-row">
            <div className="sk-header-left">
              <pre className="sk-title">{`\
 ███████╗██╗  ██╗██╗██╗     ██╗     ███████╗
 ██╔════╝██║ ██╔╝██║██║     ██║     ██╔════╝
 ███████╗█████╔╝ ██║██║     ██║     ███████╗
 ╚════██║██╔═██╗ ██║██║     ██║     ╚════██║
 ███████║██║  ██╗██║███████╗███████╗███████║
 ╚══════╝╚═╝  ╚═╝╚═╝╚══════╝╚══════╝╚══════╝`}
              </pre>
              <p className="sk-subtitle">
                {SKILL_GROUPS.reduce((a, g) => a + g.skills.length, 0)} skills across {SKILL_GROUPS.length} domains
                &nbsp;·&nbsp; <span style={{ color: "var(--accent2)" }}>3 expert-level</span>
              </p>
            </div>

            {/* Proficiency legend */}
            <div className="sk-legend">
              {PROFICIENCY_LEVELS.map(p => (
                <div key={p.label} className="sk-legend-row">
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: p.color, flexShrink: 0, display: "inline-block" }} />
                  <span className="sk-legend-label">{p.label}</span>
                  <span style={{ fontSize: "0.68em", color: p.color, opacity: 0.8 }}>{p.range}</span>
                </div>
              ))}
            </div>
          </div>
        </SectionBox>

        {/* ── BODY ────────────────────────────────────────────────────────── */}
        <div className="sk-grid">

          {/* ── Skill Groups (4 boxes) ── */}
          {SKILL_GROUPS.map((group) => (
            <SectionBox
              key={group.title}
              title={`${group.title}`}
              style={{ margin: 0, display: "flex", flexDirection: "column" }}
            >
              <div className="sk-skill-list">
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
        <div className="sk-bottom-grid">

          {/* Tech stack tags */}
          <SectionBox title="Tech Stack" style={{ margin: 0 }}>
            <div className="sk-tech-stack">
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
          <SectionBox title="Proficiency Matrix" style={{ margin: 0 }}>
            <div className="sk-matrix">
              {PROFICIENCY_LEVELS.map(p => (
                <div key={p.label}>
                  <div className="sk-matrix-header">
                    <span style={{ fontSize: "0.74em", color: p.color, fontWeight: 700 }}>{p.label}</span>
                    <span className="sk-matrix-range">{p.range}</span>
                  </div>
                  <div className="sk-matrix-tags">
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
