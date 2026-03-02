// themes.ts

export type ThemeName = "tokyo" | "nothing" | "cyberpunk" | "forest" | "catppuccin" | "dracula" | "nord" | "gruvbox";


const THEMES: Record<ThemeName, Record<string, string>> = {
  catppuccin: {
    "--bg": "#1e1e2e", "--bg-sidebar": "#181825", "--bg-content": "#1e1e2e",
    "--border": "#89b4fa", "--border-dim": "#313244",
    "--text": "#cdd6f4", "--text-dim": "#6c7086",
    "--accent": "#89b4fa", "--accent2": "#a6e3a1", "--accent3": "#f38ba8",
    "--selection": "#45475a", "--cursor": "#89b4fa",
  },
  dracula: {
    "--bg": "#282a36", "--bg-sidebar": "#21222c", "--bg-content": "#282a36",
    "--border": "#6272a4", "--border-dim": "#44475a",
    "--text": "#f8f8f2", "--text-dim": "#6272a4",
    "--accent": "#bd93f9", "--accent2": "#50fa7b", "--accent3": "#ff79c6",
    "--selection": "#44475a", "--cursor": "#bd93f9",
  },
  nord: {
    "--bg": "#2e3440", "--bg-sidebar": "#242933", "--bg-content": "#2e3440",
    "--border": "#5e81ac", "--border-dim": "#3b4252",
    "--text": "#eceff4", "--text-dim": "#4c566a",
    "--accent": "#88c0d0", "--accent2": "#a3be8c", "--accent3": "#bf616a",
    "--selection": "#3b4252", "--cursor": "#88c0d0",
  },
  gruvbox: {
    "--bg": "#282828", "--bg-sidebar": "#1d2021", "--bg-content": "#282828",
    "--border": "#d79921", "--border-dim": "#3c3836",
    "--text": "#ebdbb2", "--text-dim": "#665c54",
    "--accent": "#fabd2f", "--accent2": "#b8bb26", "--accent3": "#fb4934",
    "--selection": "#3c3836", "--cursor": "#fabd2f",
  },
  tokyo: {
    "--bg": "#1a1b26", "--bg-sidebar": "#16161e", "--bg-content": "#1a1b26",
    "--border": "#7aa2f7", "--border-dim": "#2a2b3d",
    "--text": "#c0caf5", "--text-dim": "#565f89",
    "--accent": "#7aa2f7", "--accent2": "#9ece6a", "--accent3": "#f7768e",
    "--selection": "#2a2b3d", "--cursor": "#7aa2f7",
  },
   nothing: {
    "--bg": "#0a0a0a", "--bg-sidebar": "#000000", "--bg-content": "#0a0a0a",
    "--border": "#ffffff", "--border-dim": "#222222",
    "--text": "#ff0000", "--text-dim": "#aaaaaa",
    "--accent": "#ffffff", "--accent2": "#ff0000", "--accent3": "#ffe566",
    "--selection": "#1a1a1a", "--cursor": "#ffffff",
  },
  cyberpunk: {
  "--bg": "#0f0f1a", "--bg-sidebar": "#141426", "--bg-content": "#0f0f1a",
  "--border": "#00f5ff", "--border-dim": "#1f1f33",
  "--text": "#e0e0ff", "--text-dim": "#5c5c99",
  "--accent": "#00f5ff", "--accent2": "#39ff14", "--accent3": "#ff007c",
  "--selection": "#1f1f33", "--cursor": "#00f5ff",
  },
  forest: {
  "--bg": "#0f1a14", "--bg-sidebar": "#13221b", "--bg-content": "#0f1a14",
  "--border": "#4caf50", "--border-dim": "#1f2e25",
  "--text": "#d8f3dc", "--text-dim": "#52796f",
  "--accent": "#4caf50", "--accent2": "#a7c957", "--accent3": "#ff6b6b",
  "--selection": "#1f2e25", "--cursor": "#4caf50",
  },
  
};