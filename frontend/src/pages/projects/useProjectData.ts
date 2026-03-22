import { useState, useEffect } from "react";

export interface Project {
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  url: string;
  visibility: string;
  updated_at: string;
}

export interface StatItem {
  label: string;
  value: string | number;
  color: string;
}

const API_BASE_URL = "http://localhost:8000/projects";

export default function useProjectData() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [stats, setStats] = useState<StatItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        console.log("[useProjectData] Fetching from:", API_BASE_URL);

        const [reposRes, statsRes] = await Promise.all([
          fetch(`${API_BASE_URL}`),
          fetch(`${API_BASE_URL}/stats`),
        ]);

        console.log("[useProjectData] repos status:", reposRes.status);
        console.log("[useProjectData] stats status:", statsRes.status);

        if (!reposRes.ok) {
          const text = await reposRes.text();
          throw new Error(`Repos fetch failed (${reposRes.status}): ${text}`);
        }
        if (!statsRes.ok) {
          const text = await statsRes.text();
          throw new Error(`Stats fetch failed (${statsRes.status}): ${text}`);
        }

        const reposData: Project[] = await reposRes.json();
        const statsData = await statsRes.json();

        console.log("[useProjectData] repos received:", reposData.length);
        console.log("[useProjectData] stats received:", statsData);

        const transformedStats: StatItem[] = [
          { label: "REPOSITORIES", value: statsData.repositories ?? 0, color: "var(--accent)" },
          { label: "OPEN SOURCE",  value: statsData.open_source  ?? 0, color: "var(--accent2)" },
          { label: "TOTAL STARS",  value: statsData.total_stars  ?? 0, color: "var(--accent3)" },
          { label: "TOTAL FORKS",  value: statsData.total_forks  ?? 0, color: "var(--accent)" },
        ];

        setProjects(reposData);
        setStats(transformedStats);
      } catch (err: any) {
        console.error("[useProjectData] Error:", err);
        setError(err.message ?? "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { projects, stats, loading, error };
}