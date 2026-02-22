import BvimLayout from "../components/BvimLayout";
import SectionBox from "../components/SectionBox";

export default function Contact() {
  return (
    <BvimLayout>
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        height: "100%",
        color: "var(--text)",
        fontFamily: "var(--font-family, 'JetBrains Mono', monospace)",
      }}>

        {/* ── HEADER ─────────────────────────────────────────────────────── */}
        <SectionBox title="">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
            <div>
              <pre style={{
                color: "var(--accent)",
                fontSize: "clamp(4px, 0.75vw, 10px)",
                lineHeight: 1.15,
                margin: "0 0 8px 0",
                whiteSpace: "pre",
                fontFamily: "monospace",
              }}>{`\
  ██████╗ ██████╗ ███╗   ██╗████████╗ █████╗  ██████╗████████╗
 ██╔════╝██╔═══██╗████╗  ██║╚══██╔══╝██╔══██╗██╔════╝╚══██╔══╝
 ██║     ██║   ██║██╔██╗ ██║   ██║   ███████║██║        ██║   
 ██║     ██║   ██║██║╚██╗██║   ██║   ██╔══██║██║        ██║   
 ╚██████╗╚██████╔╝██║ ╚████║   ██║   ██║  ██║╚██████╗   ██║   
  ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝   ╚═╝   `}
              </pre>
              <p style={{ margin: 0, color: "var(--text-dim)", fontSize: "0.82em", letterSpacing: "0.05em" }}>
                Open to work &nbsp;·&nbsp; Responds within 24–48 hrs
              </p>
            </div>
          </div>
        </SectionBox>

        {/* ── GRID ───────────────────────────────────────────────────────── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
          flex: 1,
        }}>

          {/* Contact Info */}
          <SectionBox title="Contact Info" style={{ margin: 0 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <LinkRow
                icon="@"
                label="email"
                href="mailto:bhuvan@example.com"
                val="bhuvan@example.com"
                active
              />
              <LinkRow
                icon="◈"
                label="github"
                href="https://github.com/BhuvaneshwarMarri"
                val="github.com/BhuvaneshwarMarri"
              />
              <LinkRow
                icon="⬡"
                label="linkedin"
                href="https://linkedin.com/in/bhuvan"
                val="linkedin.com/in/bhuvan"
              />
              <LinkRow
                icon="✦"
                label="twitter"
                href="https://twitter.com/bhuvan"
                val="@bhuvan"
              />
            </div>
          </SectionBox>

          {/* Availability */}
          <SectionBox title="Availability" style={{ margin: 0 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <InfoRow label="status"    value="● Open to work"          valueColor="var(--accent2)" active />
              <InfoRow label="type"      value="Full-time / Freelance"   />
              <InfoRow label="timezone"  value="IST (UTC +5:30)"         />
              <InfoRow label="response"  value="Within 24–48 hours"      />
              <InfoRow label="preferred" value="Email or LinkedIn"        />
            </div>
          </SectionBox>

          {/* Open To */}
          <SectionBox title="Open To" style={{ margin: 0 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
              <BulletRow text="Full-time engineering roles"                active />
              <BulletRow text="Freelance & contract work"                  />
              <BulletRow text="Open-source collaborations"                 />
              <BulletRow text="Pair programming & mentoring"               />
              <BulletRow text="Tech talks & community events"              />
            </div>
          </SectionBox>

          {/* Message */}
          <SectionBox title="Leave a Message" style={{ margin: 0 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <p style={{ margin: 0, color: "var(--text-dim)", fontSize: "0.84em", lineHeight: 1.65 }}>
                The best way to reach me is via{" "}
                <span style={{ color: "var(--accent)", fontWeight: 700 }}>email</span> or{" "}
                <span style={{ color: "var(--accent)", fontWeight: 700 }}>LinkedIn</span>.
                I'm always happy to discuss new ideas, collaborate on projects, or just have a chat.
              </p>
              <div style={{ borderTop: "1px dashed var(--border-dim)", paddingTop: "10px" }}>
                <StatRow label="Response time"  value="24–48 hrs"   color="var(--accent2)" active />
                <div style={{ marginTop: "6px" }}>
                  <StatRow label="Time zone"    value="IST"         color="var(--accent)"  />
                </div>
                <div style={{ marginTop: "6px" }}>
                  <StatRow label="Availability" value="Open"        color="var(--accent2)" />
                </div>
              </div>
            </div>
          </SectionBox>

        </div>
      </div>
    </BvimLayout>
  );
}

/* ── Sub-components ─────────────────────────────────────────────────────── */

function InfoRow({ label, value, active = false, valueColor }: {
  label: string; value: string; active?: boolean; valueColor?: string;
}) {
  return (
    <div style={{ display: "flex", gap: "8px", alignItems: "baseline" }}>
      <span style={{ color: "var(--accent3)", fontSize: "0.76em", minWidth: "64px", flexShrink: 0 }}>
        $ {label}
      </span>
      <span style={{
        color: valueColor ?? (active ? "var(--accent)" : "var(--text)"),
        fontSize: "0.88em", fontWeight: active ? 700 : 400, lineHeight: 1.5,
      }}>
        {active && <span style={{ color: "var(--accent3)" }}>✓ </span>}
        {value}
      </span>
    </div>
  );
}

function LinkRow({ icon, label, href, val, active = false }: {
  icon: string; label: string; href: string; val: string; active?: boolean;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <span style={{ color: active ? "var(--accent)" : "var(--accent3)", minWidth: "14px", fontSize: "0.95em", flexShrink: 0 }}>
        {icon}
      </span>
      <span style={{ color: "var(--text-dim)", fontSize: "0.76em", minWidth: "56px", flexShrink: 0 }}>
        $ {label}
      </span>
      <a
        href={href}
        target={href.startsWith("mailto") ? "_self" : "_blank"}
        rel="noopener noreferrer"
        style={{
          color: active ? "var(--accent)" : "var(--text)",
          fontWeight: active ? 700 : 400,
          textDecoration: "none",
          fontSize: "0.86em",
          borderBottom: `1px dashed ${active ? "var(--accent)" : "var(--border-dim)"}`,
          paddingBottom: "1px",
        }}
      >
        {val}
        {active && <span style={{ color: "var(--accent)", marginLeft: "6px" }}>✓</span>}
      </a>
    </div>
  );
}

function BulletRow({ text, active = false }: { text: string; active?: boolean }) {
  return (
    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      <span style={{ color: active ? "var(--accent2)" : "var(--accent3)", fontSize: "0.8em", flexShrink: 0 }}>
        {active ? "✓" : "▸"}
      </span>
      <span style={{
        color: active ? "var(--accent)" : "var(--text-dim)",
        fontSize: "0.87em", fontWeight: active ? 700 : 400,
      }}>
        {text}
      </span>
    </div>
  );
}

function StatRow({ label, value, color, active = false }: {
  label: string; value: string; color: string; active?: boolean;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <span style={{ color: "var(--text-dim)", fontSize: "0.84em", flex: 1 }}>
        {active && <span style={{ color: "var(--accent2)" }}>✓ </span>}
        {label}
      </span>
      <span style={{
        color, fontWeight: 700, fontSize: "0.82em",
        padding: "1px 8px",
        border: `1px solid ${color}`,
        borderRadius: "2px",
        background: `color-mix(in srgb, ${color} 10%, transparent)`,
        flexShrink: 0,
      }}>
        {value}
      </span>
    </div>
  );
}