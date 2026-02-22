// Shared types used by App, TerminalView, and BvimView.
// Import from here — never redeclare in individual files.

export type ThemeName  = "catppuccin" | "dracula" | "nord" | "gruvbox" | "tokyo";

export type HistoryLine = {
  text   : string;
  colour?: "accent" | "accent2" | "accent3" | "dim" | "normal";
};