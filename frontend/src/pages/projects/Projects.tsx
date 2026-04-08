import { useEffect, useState } from "react";
import BvimLayout from "../../components/layout/BvimLayout.tsx";
import SectionBox from "../../components/common/SectionBox.tsx";
// Fix 1: Ensure STATS type is correctly inferred or exported
import { fetchGithubProjects, STATS, type Project } from "./fetchGithubProjects";
import { ProfileCard, RepoRow } from "./components/helper";
import "./projects.css";

// Fix 2: If STATS is an array, typeof STATS refers to the array structure.
// It's safer to use the return type of the fetch function if STATS isn't a named type.
type StatsType = typeof STATS;

interface ProfileStats {
  avatar_url: string;
  name: string;
  login: string;
  bio: string;
  location: string;
  repositories: number;
  open_source: number;
  total_stars: number;
  total_forks: number;
  followers: number;
  following: number;
  html_url: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  // Fix 3: Initialize with an empty array of the correct type
  const [stats, setStats]       = useState<StatsType>([]);
  const [profileStats, setProfileStats] = useState<ProfileStats | null>(null);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    let isMounted = true; // Fix 4: Prevent state updates on unmounted component

    fetchGithubProjects()
      .then(({ projects, stats }) => {
        if (isMounted) {
          setProjects(projects);
          setStats(stats);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch projects:", err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    // Fetch complete profile stats (all repos)
    fetch("http://localhost:8000/projects/profile")
      .then(res => res.json())
      .then(data => {
        if (isMounted) {
          setProfileStats(data);
        }
      })
      .catch(err => console.error("Failed to fetch profile stats:", err));

    return () => { isMounted = false; };
  }, []);

  return (
    <BvimLayout>
      <div className="pr-container">
        <SectionBox title="">
          <div className="pr-header-row">
            <div className="pr-header-left">
              {/* Fix 5: Ensure white-space: pre is handled or use a code tag for the ASCII art */}
              <pre className="pr-title">{`\
 ██████╗ ██████╗  ██████╗      ██╗███████╗ ██████╗████████╗███████╗
 ██╔══██╗██╔══██╗██╔═══██╗     ██║██╔════╝██╔════╝╚══██╔══╝██╔════╝
 ██████╔╝██████╔╝██║   ██║     ██║█████╗  ██║        ██║   ███████╗
 ██╔═══╝ ██╔══██╗██║   ██║██   ██║██╔══╝  ██║        ██║   ╚════██║
 ██║     ██║  ██║╚██████╔╝╚█████╔╝███████╗╚██████╗   ██║   ███████║
 ╚═╝     ╚═╝  ╚═╝ ╚═════╝  ╚════╝ ╚══════╝ ╚═════╝   ╚═╝   ╚══════╝`}
              </pre>
              <p className="pr-subtitle">
                {profileStats?.repositories || projects.length} total repositories &nbsp;·&nbsp; {profileStats?.open_source || 0} open source &nbsp;·&nbsp; github.com/{profileStats?.login || "BhuvaneshwarMarri"}
              </p>
            </div>

            <div className="pr-stats">
              {/* Show complete profile stats if available, otherwise show filtered stats */}
              {profileStats ? (
                <>
                  <div className="pr-stat-card">
                    <span style={{ fontWeight: 700, fontSize: "0.9em", color: "var(--accent)" }}>{profileStats.total_stars}</span>
                    <span className="pr-stat-label">Total Stars</span>
                  </div>
                  <div className="pr-stat-card">
                    <span style={{ fontWeight: 700, fontSize: "0.9em", color: "var(--accent2)" }}>{profileStats.open_source}</span>
                    <span className="pr-stat-label">Open Source</span>
                  </div>
                  <div className="pr-stat-card">
                    <span style={{ fontWeight: 700, fontSize: "0.9em", color: "var(--accent3)" }}>{profileStats.repositories}</span>
                    <span className="pr-stat-label">Repositories</span>
                  </div>
                </>
              ) : (
                stats.map((s, index) => (
                  /* Fix 6: Ensure s.label exists and fallback to index if duplicates occur */
                  <div key={s.label || index} className="pr-stat-card">
                    <span style={{ fontWeight: 700, fontSize: "0.9em", color: s.color }}>{s.value}</span>
                    <span className="pr-stat-label">{s.label}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </SectionBox>

        <div className="pr-grid">
          <SectionBox
            title="Repositories"
            style={{ display: "flex", flexDirection: "column", minHeight: 0, margin: 0 }}
          >
            <div style={{ 
              flex: 1, 
              overflowY: "auto", 
              minHeight: 0, 
              scrollbarWidth: "thin", 
              // Fix 7: Ensure CSS variables are defined in your CSS file
              scrollbarColor: "var(--selection) transparent" 
            }}>
              {loading
                ? <p style={{ padding: "1rem", color: "var(--text-dim)" }}>Loading repos…</p>
                : projects.map((p, idx) => (
                    <RepoRow key={p.name} project={p} isLast={idx === projects.length - 1} />
                  ))
              }
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