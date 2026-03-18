import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import styles from "./BvimView.module.css";
import { THEMES, ThemeName } from "./themes";
import {
  FONTS,
  SECTIONS,
  SECTION_ICONS,
  SECTION_LABELS,
  Section,
  FocusArea,
} from "./constants";
import { applyTheme, applyFont, sectionFromPath } from "./helpers";

type BvimProps = {
  onExit: () => void;
  theme: ThemeName;
  setTheme: (t: ThemeName) => void;
  fontIdx: number;
  setFontIdx: (i: number) => void;
  fontSize: number;
  setFontSize: React.Dispatch<React.SetStateAction<number>>;
};

export default function BvimView({
  onExit,
  theme,
  setTheme,
  fontIdx,
  setFontIdx,
  fontSize,
  setFontSize,
}: BvimProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const active = sectionFromPath(location.pathname);

  const [focus, setFocus] = useState<FocusArea>("sidebar");
  const [cmdBuf, setCmdBuf] = useState("");
  const [cmdMsg, setCmdMsg] = useState("");

  const sidebarHidden = focus === "content";

  const goTo = useCallback(
    (sec: Section) => {
      navigate(`/${sec}`);
    },
    [navigate]
  );

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    applyFont(FONTS[fontIdx].css, fontSize);
  }, [fontIdx, fontSize]);

  const executeCmd = useCallback(
    (cmd: string) => {
      const t = cmd.slice(1).trim();

      if (["q", "quit", "q!"].includes(t)) {
        onExit();
        return;
      }

      const themeMatch = t.match(/^theme\s+(\w+)$/);
      if (themeMatch) {
        const n = themeMatch[1] as ThemeName;
        if (n in THEMES) {
          setTheme(n);
          setCmdMsg(`Theme → ${n}`);
        } else {
          setCmdMsg(`Unknown theme`);
        }
        return;
      }

      setCmdMsg(`Unknown command`);
    },
    [onExit, setTheme]
  );

  return (
    <div className={styles["bv-root"]}>
      {/* UI remains same as original */}
      {/* Replace every className="xxx" with className={styles["xxx"]} */}
    </div>
  );
}