import BvimLayout from "../../components/BvimLayout";
import SectionBox from "../../components/SectionBox";
import { PROJECTS, STATS } from "./constants";
import { ProfileCard, RepoRow } from "./components/helper";
import "./projects.css";

export default function Projects() {
  return (
    <BvimLayout>
      <div className="pr-container">

        {/* ── HEADER ──────────────────────────────────────────────────────── */}
        <SectionBox title="◈ projects">
          <div className="pr-header-row">
            <div className="pr-header-left">
              <pre className="pr-title">{`\
 ██████╗ ██████╗  ██████╗      ██╗███████╗ ██████╗████████╗███████╗
 ██╔══██╗██╔══██╗██╔═══██╗     ██║██╔════╝██╔════╝╚══██╔══╝██╔════╝
 ██████╔╝██████╔╝██║   ██║     ██║█████╗  ██║        ██║   ███████╗
 ██╔═══╝ ██╔══██╗██║   ██║██   ██║██╔══╝  ██║        ██║   ╚════██║
 ██║     ██║  ██║╚██████╔╝╚█████╔╝███████╗╚██████╗   ██║   ███████║
 ╚═╝     ╚═╝  ╚═╝ ╚═════╝  ╚════╝ ╚══════╝ ╚═════╝   ╚═╝   ╚══════╝`}
              </pre>
              <p className="pr-subtitle">
                {PROJECTS.length} repositories &nbsp;·&nbsp; Open Source &nbsp;·&nbsp; github.com/BhuvaneshwarMarri
              </p>
            </div>

            <div className="pr-stats">
              {STATS.map(s => (
                <div key={s.label} className="pr-stat-card">
                  <span style={{ fontWeight: 700, fontSize: "0.9em", color: s.color }}>{s.value}</span>
                  <span className="pr-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </SectionBox>

        {/* ── BODY ────────────────────────────────────────────────────────── */}
        <div className="pr-grid">
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

          <div className="pr-sidebar">
            <ProfileCard />
          </div>
        </div>

      </div>
    </BvimLayout>
  );
}