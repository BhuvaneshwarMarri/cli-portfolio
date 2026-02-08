import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AppRouter from "../router/AppRouter";
import "../styles/bvim.css";

type Section = "home" | "education" | "skills" | "projects" | "experience" | "contact";

export default function BvimView({ onExit }: { onExit: () => void }) {
  const navigate = useNavigate();
  const location = useLocation();
  const sections: Section[] = ["home", "education", "skills", "projects", "experience", "contact"];
  
  // Determine active section from URL
  const getCurrentSection = (): Section => {
    const path = location.pathname.slice(1) as Section;
    return sections.includes(path) ? path : "home";
  };

  const [active, setActive] = useState<Section>(getCurrentSection());
  const [cmdBuffer, setCmdBuffer] = useState("");

  // Update active section when URL changes
  useEffect(() => {
    const currentSection = getCurrentSection();
    setActive(currentSection);
  }, [location.pathname]);

  // Navigate when active section changes
  useEffect(() => {
    if (location.pathname !== `/${active}`) {
      navigate(`/${active}`);
    }
  }, [active, navigate]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onExit();
        return;
      }

      if (e.key === ":") {
        setCmdBuffer(":");
        return;
      }

      if (cmdBuffer.startsWith(":")) {
        if (e.key === "Enter") {
          if (
            cmdBuffer === ":q" ||
            cmdBuffer === ":quit" ||
            cmdBuffer === ":q!"
          ) {
            onExit();
          }
          setCmdBuffer("");
          return;
        }

        if (e.key === "Backspace") {
          setCmdBuffer((c) => c.slice(0, -1));
          return;
        }

        if (e.key.length === 1) {
          setCmdBuffer((c) => c + e.key);
          return;
        }
      }

      const i = sections.indexOf(active);
      if (e.key === "l" || e.key === "ArrowRight") {
        setActive(sections[(i + 1) % sections.length]);
      }
      if (e.key === "h" || e.key === "ArrowLeft") {
        setActive(sections[(i - 1 + sections.length) % sections.length]);
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [active, cmdBuffer, onExit, sections]);

  return (
    <div className="bvim">
      <div className="nav">
        {sections.map((section) => (
          <button
            key={section}
            className={section === active ? "active" : ""}
            onClick={() => setActive(section)}
          >
            {section}
          </button>
        ))}
      </div>

      <div className="content">
        <AppRouter />
      </div>

      {cmdBuffer && <div className="vim-command">{cmdBuffer}</div>}
    </div>
  );
}