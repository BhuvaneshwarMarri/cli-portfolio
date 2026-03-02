// helpers.ts

import { THEMES, ThemeName } from "./themes";
import { SECTIONS, Section } from "./constants";

export function applyTheme(t: ThemeName) {
  Object.entries(THEMES[t]).forEach(([k, v]) => {
    document.documentElement.style.setProperty(k, v);
  });
}

export function applyFont(css: string, size: number) {
  document.documentElement.style.setProperty("--font-family", css);
  document.documentElement.style.setProperty("--font-size", `${size}px`);
}

export function sectionFromPath(pathname: string): Section {
  const p = pathname.slice(1) as Section;
  return SECTIONS.includes(p) ? p : "home";
}