import { useEffect, useState } from "react";

// Skill object — used inside SkillGroup
type Skill = { name: string; level: number; tag: string };

type SkillGroup = {
  title:  string;
  icon:   string;
  color:  string;
  skills: Skill[];        // ← array of objects
};

// Proficiency level — skills here are just name strings, NOT Skill objects
type ProficiencyLevel = {
  label:  string;
  range:  string;
  color:  string;
  skills: string[];       // ← array of plain strings
};

export default function useSkillsData() {
  const [SKILL_GROUPS,       setSkillGroups]       = useState<SkillGroup[]>([]);
  const [TECH_STACK,         setTechStack]         = useState<string[]>([]);
  const [PROFICIENCY_LEVELS, setProficiencyLevels] = useState<ProficiencyLevel[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/skills")
      .then(res => res.json())
      .then((data: SkillGroup[]) => setSkillGroups(data))
      .catch(err => console.error("Skills error:", err));

    fetch("http://localhost:8000/skills/tech-stack")
      .then(res => res.json())
      .then((data: string[]) => setTechStack(data))
      .catch(err => console.error("Tech stack error:", err));

    fetch("http://localhost:8000/skills/proficiency")
      .then(res => res.json())
      .then((data: ProficiencyLevel[]) => setProficiencyLevels(data))
      .catch(err => console.error("Proficiency error:", err));
  }, []);

  return { SKILL_GROUPS, TECH_STACK, PROFICIENCY_LEVELS };
}