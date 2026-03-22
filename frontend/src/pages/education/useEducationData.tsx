import { useEffect, useState } from "react";

type TimelineItem = {
  year:   string;
  title:  string;
  place:  string;
  detail: string;
  tags:   string[];
  status: "done" | "active" | "next";
};

export default function useEducationData() {
  const [TIMELINE, setTimeline] = useState<TimelineItem[]>([]);
  const [COURSES,  setCourses]  = useState<string[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/education")
      .then(res => res.json())
      .then(setTimeline)
      .catch(err => console.error("Education error:", err));

    fetch("http://localhost:8000/education/courses")
      .then(res => res.json())
      .then(setCourses)
      .catch(err => console.error("Courses error:", err));
  }, []);

  return { TIMELINE, COURSES };
}