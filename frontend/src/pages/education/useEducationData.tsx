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
  const apiUrl = import.meta.env.VITE_API_URL

  useEffect(() => {
    fetch("${apiUrl}/education")
      .then(res => res.json())
      .then(setTimeline)
      .catch(err => console.error("Education error:", err));

    fetch("${apiUrl}/education/courses")
      .then(res => res.json())
      .then(setCourses)
      .catch(err => console.error("Courses error:", err));
  }, [apiUrl]);

  return { TIMELINE, COURSES };
}