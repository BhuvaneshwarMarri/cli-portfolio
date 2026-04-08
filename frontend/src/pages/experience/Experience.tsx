import BvimLayout from "../../components/layout/BvimLayout.tsx";
import SectionBox from "../../components/common/SectionBox.tsx";
import { StatRow, SkillBar, JobCard } from "./components/helpers";
import './experience.css';
import useExperienceData from "./useExperienceData";

export default function Experience() {
  // 1. Destructure with default empty arrays to prevent .length or .map errors
  const { SKILL_MATRIX = [], JOBS = [] } = useExperienceData() || {};

  return (
    <BvimLayout>
      <div className="experience-container">

        {/* ── HEADER ──────────────────────────────────────────────────────── */}
        <SectionBox title="">
          <div className="exp-header">
            <div className="exp-header-content">
              <pre className="exp-ascii">
{`
 ███████╗██╗  ██╗██████╗ ███████╗██████╗ ██╗███████╗███╗   ██╗ ██████╗███████╗
 ██╔════╝╚██╗██╔╝██╔══██╗██╔════╝██╔══██╗██║██╔════╝████╗  ██║██╔════╝██╔════╝
 █████╗   ╚███╔╝ ██████╔╝█████╗  ██████╔╝██║█████╗  ██╔██╗ ██║██║     █████╗  
 ██╔══╝   ██╔██╗ ██╔═══╝ ██╔══╝  ██╔══██╗██║██╔══╝  ██║╚██╗██║██║     ██╔══╝  
 ███████╗██╔╝ ██╗██║     ███████╗██║  ██║██║███████╗██║ ╚████║╚██████╗███████╗
 ╚══════╝╚═╝  ╚═╝╚═╝     ╚══════╝╚═╝  ╚═╝╚═╝╚══════╝╚═╝  ╚═══╝ ╚═════╝╚══════╝
`}
              </pre>
              <p className="exp-subtitle">
                Experience Engine v2.0 &nbsp;·&nbsp;
                <span style={{ color: "var(--accent2)" }}>
                  {JOBS.length} roles detected
                </span>
              </p>
            </div>
            <div className="exp-total-container">
              <div className="exp-total-years">1.2 YRS</div>
              <div className="exp-total-label">TOTAL EXP</div>
            </div>
          </div>
        </SectionBox>

        {/* ── BODY ────────────────────────────────────────────────────────── */}
        <div className="exp-grid">

          {/* ── LEFT: Job Timeline ──────────────────────────────────────── */}
          <SectionBox
            title="Professional History"
            style={{ display: "flex", flexDirection: "column", minHeight: 0, margin: 0 }}
          >
            <div className="exp-scroll">
              {JOBS.length > 0 ? (
                JOBS.map((job, idx) => (
                  <JobCard key={job.title || idx} job={job} isLast={idx === JOBS.length - 1} />
                ))
              ) : (
                <p>Loading records...</p>
              )}
            </div>
          </SectionBox>

          {/* ── RIGHT: Skill Matrix + Summary ───────────────────────────── */}
          <div className="exp-right-panel">

            {/* Summary stats */}
            <SectionBox title="Summary" style={{ margin: 0 }}>
              <div className="exp-summary-list">
                <StatRow label="Total Exp"  value="2.4 yrs"  color="var(--accent2)" active />
                <StatRow label="Companies"  value="2"        color="var(--accent)"  />
                <StatRow label="Stack"      value="Full"      color="var(--accent3)" />
                <StatRow label="Domain"     value="Web · AI" color="var(--accent)"  />
              </div>
            </SectionBox>

            {/* Skill matrix */}
            <SectionBox
              title="Skill Matrix"
              style={{ margin: 0, flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}
            >
              <div className="exp-skill-scroll">
                {SKILL_MATRIX.map((s, idx) => (
                  <SkillBar key={s.label || idx} label={s.label} level={s.level} color={s.color} />
                ))}
              </div>
            </SectionBox>

          </div>
        </div>
      </div>
    </BvimLayout>
  );
}