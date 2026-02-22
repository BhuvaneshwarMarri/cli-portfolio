import BvimLayout from "../components/BvimLayout";
export default function Contact() {
  const links = [
    { icon: "@", label: "Email",    val: "bhuvan@example.com",      href: "mailto:bhuvan@example.com",                    color: "var(--accent2)" },
    { icon: "◈", label: "GitHub",   val: "github.com/BhuvaneshwarMarri", href: "https://github.com/BhuvaneshwarMarri",   color: "var(--accent)"  },
    { icon: "⬡", label: "LinkedIn", val: "linkedin.com/in/bhuvan",  href: "https://linkedin.com/in/bhuvan",               color: "var(--accent)"  },
    { icon: "✦", label: "Twitter",  val: "@bhuvan",                 href: "https://twitter.com/bhuvan",                   color: "var(--accent3)" },
  ];

  return (
    <BvimLayout>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px", color: "var(--text)" }}>
        <h1 style={{ color: "var(--accent)", margin: 0, fontSize: "1.1em", letterSpacing: "0.08em" }}>@ CONTACT</h1>

        <div style={{ border: "1px solid var(--border-dim)", borderRadius: "4px", padding: "16px", background: "color-mix(in srgb, var(--bg-sidebar) 40%, transparent)", display: "flex", flexDirection: "column", gap: "12px" }}>
          {links.map(l => (
            <div key={l.label} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ color: l.color, fontSize: "1.1em", minWidth: "20px" }}>{l.icon}</span>
              <span style={{ color: "var(--text-dim)", fontSize: "0.82em", minWidth: "60px" }}>{l.label}</span>
              <a href={l.href} target={l.href.startsWith("mailto") ? "_self" : "_blank"} rel="noopener noreferrer"
                style={{ color: l.color, textDecoration: "none", borderBottom: "1px dashed var(--border-dim)", paddingBottom: "1px", fontSize: "0.88em" }}>
                {l.val}
              </a>
            </div>
          ))}
        </div>

        <div style={{ border: "1px solid var(--border-dim)", borderRadius: "4px", padding: "16px", background: "color-mix(in srgb, var(--bg-sidebar) 40%, transparent)" }}>
          <p style={{ color: "var(--accent)", fontWeight: 700, margin: "0 0 8px", fontSize: "0.85em" }}>▸ OPEN TO</p>
          {["Freelance opportunities", "Collaboration on interesting projects", "Open-source contributions", "Full-time roles"].map(o => (
            <p key={o} style={{ margin: "3px 0", fontSize: "0.88em", color: "var(--text-dim)" }}>
              <span style={{ color: "var(--accent2)" }}>✓ </span>{o}
            </p>
          ))}
        </div>

        <p style={{ color: "var(--text-dim)", fontSize: "0.8em", margin: 0, borderTop: "1px dashed var(--border-dim)", paddingTop: "12px" }}>
          Typically responds within 24–48 hours.
        </p>
      </div>
    </BvimLayout>
  );
}