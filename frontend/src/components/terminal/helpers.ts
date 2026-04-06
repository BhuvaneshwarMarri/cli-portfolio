import type { ThemeName } from "../../portfolioTypes.ts";
import { THEMES } from "./constants";

// ─── DOM helpers ──────────────────────────────────────────────────────────────

export function applyTheme(t: ThemeName) {
  Object.entries(THEMES[t]).forEach(([k, v]) =>
    document.documentElement.style.setProperty(k, v)
  );
}
export function applyFont(css: string, size: number) {
  document.documentElement.style.setProperty("--font-family", css);
  document.documentElement.style.setProperty("--font-size", `${size}px`);
}
