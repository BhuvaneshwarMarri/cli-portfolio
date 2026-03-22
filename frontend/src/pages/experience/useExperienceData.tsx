import { useEffect, useState } from "react";

type Metric = { label: string; value: string; color: string };

type Job = {
  title:    string;
  company:  string;
  period:   string;
  duration: string;
  status:   "ACTIVE" | "PAST";
  type:     string;
  location: string;
  stack:    string[];
  bullets:  string[];
  metrics:  Metric[];
};

type SkillMatrix = {
  label: string;
  level: string;
  color: string;
}



export default function useExperienceData() {
  const [JOBS, setJobs] = useState<Job[]>([]);
  const [SKILL_MATRIX, setSkillMatrix] = useState<SkillMatrix[]>([]);


  useEffect(() => {
    fetch("http://localhost:8000/experience")
      .then(res => res.json())
      .then(setJobs)
      .catch(err => console.error("Experience error:", err));
    fetch("http://localhost:8000/experience/skills")
      .then(res => res.json())
      .then(setSkillMatrix)
      .catch(err => console.error("Experience error:", err));
  }, []);

  return { SKILL_MATRIX, JOBS };
}