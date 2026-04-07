import React from "react";

interface SectionBoxProps {
  title: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export default function SectionBox({ title, children, style }: SectionBoxProps) {
  return (
    <div style={{
      position: "relative",
      border: "1px solid var(--border-dim, #444)",
      borderRadius: "6px",
      padding: "22px 16px 16px", // Increased top padding for label breathing room
      background: "transparent",
      display: "flex",
      flexDirection: "column",
      /* We use margin-top to ensure the floating label (-10px) 
         doesn't get clipped by containers with overflow: hidden 
      */
      marginTop: "12px", 
      ...style,
    }}>
      {/* Floating title label */}
      {title && (
        <span style={{
          position: "absolute",
          top: "-10px",
          left: "12px",
          background: "var(--bg-content, var(--bg, #1e1e2e))",
          color: "var(--accent3, #f38ba8)",
          fontSize: "0.75em",
          fontWeight: 700,
          letterSpacing: "0.08em",
          padding: "0 8px",
          lineHeight: "1.2",
          fontFamily: "var(--font-family, monospace)",
          zIndex: 2,
          textTransform: "uppercase"
        }}>
          {title}
        </span>
      )}
      {children}
    </div>
  );
}