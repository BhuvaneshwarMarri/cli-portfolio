import { useState, useRef } from "react";
import BvimLayout from "../../components/layout/BvimLayout.tsx";
import SectionBox from "../../components/common/SectionBox.tsx";
import { type FormState, type FormData } from './constants'
import {sendViaEmailJS} from './helpers.ts'
import useContactData from './useContactForm'
import "./contact.css"


export default function Contact() {
  const [form, setForm] = useState<FormData>({
    from_name : "",
    from_email: "",
    subject   : "",
    message   : "",
  });
  const [status, setStatus] = useState<FormState>("idle");
  const [errMsg, setErrMsg] = useState("");
  const [focused, setFocused] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const { contactInfo, availability, openTo, loading, submitForm } = useContactData();

  const handleChange = (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(f => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.from_name.trim() || !form.from_email.trim() || !form.message.trim()) {
      setErrMsg("E: Required fields missing — name, email and message are required.");
      setStatus("error");
      return;
    }
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(form.from_email)) {
      setErrMsg("E: Invalid email address format.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    setErrMsg("");

    try {
      // Send to backend first (stores in MongoDB)
      await submitForm(form);
      
      // Then send via EmailJS for email notification
      await sendViaEmailJS(form);
      
      setStatus("success");
      setForm({ from_name: "", from_email: "", subject: "", message: "" });
    } catch (err: any) {
      setStatus("error");
      setErrMsg(`E: Send failed — ${err.message || "unknown error"}. Check your config.`);
    }
  };

  return (
    <BvimLayout>
      <div style={{
        display      : "flex",
        flexDirection: "column",
        height       : "100%",
        color        : "var(--text)",
        fontFamily   : "var(--font-family, monospace)",
        overflow     : "hidden",
      }}>

        {/* ── HEADER ──────────────────────────────────────────────────────── */}
        <SectionBox title="">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
            <div>
              <pre style={{
                color: "var(--accent)", fontSize: "clamp(4px, 0.75vw, 10px)",
                lineHeight: 1.15, margin: "0 0 8px 0", whiteSpace: "pre", fontFamily: "var(--font-family, monospace)",
              }}>{`\
  ██████╗ ██████╗ ███╗   ██╗████████╗ █████╗  ██████╗████████╗
 ██╔════╝██╔═══██╗████╗  ██║╚══██╔══╝██╔══██╗██╔════╝╚══██╔══╝
 ██║     ██║   ██║██╔██╗ ██║   ██║   ███████║██║        ██║   
 ██║     ██║   ██║██║╚██╗██║   ██║   ██╔══██║██║        ██║   
 ╚██████╗╚██████╔╝██║ ╚████║   ██║   ██║  ██║╚██████╗   ██║   
  ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝   ╚═╝  `}
              </pre>
              <p style={{ margin: 0, color: "var(--text-dim)", fontSize: "0.82em", letterSpacing: "0.05em" }}>
                Open to work &nbsp;·&nbsp; Responds within 24–48 hrs
              </p>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{
                fontSize: "0.72em", padding: "4px 10px",
                border: "1px solid var(--accent2)", borderRadius: "3px",
                color: "var(--accent2)",
                background: "color-mix(in srgb, var(--accent2) 10%, transparent)",
                fontWeight: 700, letterSpacing: "0.06em",
              }}>
                ● AVAILABLE
              </div>
            </div>
          </div>
        </SectionBox>

        {/* ── BODY: Form + Info ───────────────────────────────────────────── */}
        <div style={{
          display            : "grid",
          gridTemplateColumns: "1fr 260px",
          gap                : "16px",
          flex               : 1,
          minHeight          : 0,
          paddingTop         : "14px",
          alignItems         : "stretch",
        }}>

          {/* ── MESSAGE FORM ──────────────────────────────────────────────── */}
          <SectionBox
            title="✉ send_message.sh"
            style={{ display: "flex", flexDirection: "column", minHeight: 0, margin: 0 }}
          >
            {/* Setup hint banner */}
            {/* <div style={{
              marginBottom: "12px",
              padding     : "8px 10px",
              borderRadius: "4px",
              background  : "color-mix(in srgb, var(--accent3) 8%, transparent)",
              border      : "1px solid color-mix(in srgb, var(--accent3) 30%, transparent)",
              fontSize    : "0.73em",
              color       : "var(--accent3)",
              lineHeight  : 1.5,
            }}> */}
              {/* ⚠ &nbsp;Replace <code style={{ color: "var(--accent)", fontFamily: "inherit" }}>EMAILJS_*</code> constants at the top of this file with your{" "}
              <a href="https://www.emailjs.com/" target="_blank" rel="noopener noreferrer"
                style={{ color: "var(--accent)", textDecoration: "underline" }}>EmailJS</a> credentials to enable sending.
            </div> */}

            <form
              ref={formRef}
              style={{ display: "flex", flexDirection: "column", gap: "0", flex: 1 }}
              onSubmit={e => { e.preventDefault(); handleSubmit(); }}
            >

              {/* ── Prompt-style input rows ── */}
              <PromptField
                prompt="$ name"
                type="text"
                placeholder="Your full name"
                value={form.from_name}
                onChange={handleChange("from_name")}
                isFocused={focused === "from_name"}
                onFocus={() => setFocused("from_name")}
                onBlur={() => setFocused(null)}
                required
              />

              <PromptField
                prompt="$ email"
                type="email"
                placeholder="you@example.com"
                value={form.from_email}
                onChange={handleChange("from_email")}
                isFocused={focused === "from_email"}
                onFocus={() => setFocused("from_email")}
                onBlur={() => setFocused(null)}
                required
              />

              <PromptField
                prompt="$ subject"
                type="text"
                placeholder="What's this about?"
                value={form.subject}
                onChange={handleChange("subject")}
                isFocused={focused === "subject"}
                onFocus={() => setFocused("subject")}
                onBlur={() => setFocused(null)}
              />

              {/* Message textarea */}
              <div style={{
                borderBottom: `1px solid ${focused === "message" ? "var(--accent)" : "var(--border-dim)"}`,
                padding     : "10px 0",
                transition  : "border-color 0.15s",
                flex        : 1,
                display     : "flex",
                flexDirection: "column",
                minHeight   : 0,
              }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", flex: 1, minHeight: 0 }}>
                  <span style={{
                    color    : focused === "message" ? "var(--accent)" : "var(--accent3)",
                    fontSize : "0.78em",
                    minWidth : "60px",
                    paddingTop: "2px",
                    flexShrink: 0,
                    transition: "color 0.15s",
                    fontWeight: 600,
                  }}>
                    $ message
                  </span>
                  <textarea
                    placeholder="Write your message here..."
                    value={form.message}
                    onChange={handleChange("message")}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    required
                    style={{
                      flex      : 1,
                      minHeight : "100px",
                      resize    : "none",
                      background: "transparent",
                      border    : "none",
                      outline   : "none",
                      color     : "var(--text)",
                      fontFamily: "var(--font-family)",
                      fontSize  : "0.88em",
                      lineHeight: 1.7,
                      caretColor: "var(--accent)",
                      padding   : "0",
                    }}
                  />
                </div>
              </div>

              {/* Status / Error message */}
              {(status === "error" || status === "success") && (
                <div style={{
                  margin    : "10px 0",
                  padding   : "8px 12px",
                  borderRadius: "4px",
                  fontSize  : "0.8em",
                  lineHeight: 1.5,
                  border    : `1px solid ${status === "success" ? "var(--accent2)" : "var(--accent3)"}`,
                  color     : status === "success" ? "var(--accent2)" : "var(--accent3)",
                  background: status === "success"
                    ? "color-mix(in srgb, var(--accent2) 8%, transparent)"
                    : "color-mix(in srgb, var(--accent3) 8%, transparent)",
                }}>
                  {status === "success"
                    ? "✓ Message sent successfully! I'll get back to you within 24–48 hrs."
                    : errMsg || "An error occurred. Please try again."}
                </div>
              )}

              {/* Submit button */}
              <div style={{ paddingTop: "12px", display: "flex", alignItems: "center", gap: "12px" }}>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  style={{
                    padding     : "8px 20px",
                    background  : status === "sending"
                      ? "color-mix(in srgb, var(--accent) 15%, transparent)"
                      : "color-mix(in srgb, var(--accent) 18%, transparent)",
                    border      : `1px solid ${status === "sending" ? "var(--border-dim)" : "var(--accent)"}`,
                    borderRadius: "4px",
                    color       : status === "sending" ? "var(--text-dim)" : "var(--accent)",
                    fontFamily  : "var(--font-family)",
                    fontSize    : "0.84em",
                    fontWeight  : 700,
                    cursor      : status === "sending" ? "not-allowed" : "pointer",
                    letterSpacing: "0.05em",
                    transition  : "all 0.15s",
                    display     : "flex",
                    alignItems  : "center",
                    gap         : "6px",
                  }}
                  onMouseEnter={e => {
                    if (status !== "sending") {
                      (e.currentTarget as HTMLElement).style.background = "color-mix(in srgb, var(--accent) 28%, transparent)";
                    }
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = "color-mix(in srgb, var(--accent) 18%, transparent)";
                  }}
                >
                  {status === "sending" ? (
                    <><Spinner /> Sending...</>
                  ) : (
                    <>:send_message ↵</>
                  )}
                </button>

                <span style={{ fontSize: "0.74em", color: "var(--text-dim)", opacity: 0.6 }}>
                  powered by EmailJS
                </span>
              </div>

            </form>
          </SectionBox>

          {/* ── RIGHT PANEL: Contact info + availability ───────────────────── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px", minHeight: 0 }}>

            {/* Contact Links */}
            <SectionBox title="Contact Info" style={{ margin: 0 }}>
              {loading ? (
                <p style={{ fontSize: "0.8em", color: "var(--text-dim)" }}>Loading...</p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {contactInfo && (
                    <>
                      <LinkRow icon="@" label="email"    href={`mailto:${contactInfo.email}`}              val={contactInfo.email}    active />
                      <LinkRow icon="◈" label="github"   href={contactInfo.github.url}                     val={contactInfo.github.handle} />
                      <LinkRow icon="⬡" label="linkedin" href={contactInfo.linkedin.url}                   val={contactInfo.linkedin.handle} />
                      <LinkRow icon="✦" label="twitter"  href={contactInfo.twitter.url}                    val={contactInfo.twitter.handle} />
                    </>
                  )}
                </div>
              )}
            </SectionBox>

            {/* Availability */}
            <SectionBox title="Availability" style={{ margin: 0 }}>
              {loading ? (
                <p style={{ fontSize: "0.8em", color: "var(--text-dim)" }}>Loading...</p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {availability && (
                    <>
                      <InfoRow label="status"    value={availability.status}           valueColor="var(--accent2)" active />
                      <InfoRow label="type"      value={availability.type} />
                      <InfoRow label="timezone"  value={availability.timezone} />
                      <InfoRow label="response"  value={availability.response_time} />
                      <InfoRow label="preferred" value={availability.preferred_contact} />
                    </>
                  )}
                </div>
              )}
            </SectionBox>

            {/* Open To */}
            <SectionBox title="Open To" style={{ margin: 0 }}>
              {loading ? (
                <p style={{ fontSize: "0.8em", color: "var(--text-dim)" }}>Loading...</p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {openTo && openTo.length > 0 ? (
                    openTo.map((item, idx) => (
                      <BulletRow key={idx} text={item.text} active={item.active} />
                    ))
                  ) : (
                    <p style={{ fontSize: "0.8em", color: "var(--text-dim)" }}>No data</p>
                  )}
                </div>
              )}
            </SectionBox>

          </div>
        </div>
      </div>
    </BvimLayout>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function PromptField({ prompt, type, placeholder, value, onChange, isFocused, onFocus, onBlur, required = false }: {
  prompt: string; type: string; placeholder: string; value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  isFocused: boolean; onFocus: () => void; onBlur: () => void; required?: boolean;
}) {
  return (
  <div className="prompt-container">

    <span className={`prompt-label ${isFocused ? "focus" : "blur"}`}>
      {prompt}
      {required && <span className="required-star">*</span>}
    </span>

    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      className="prompt-input"
    />

    {isFocused && <span className="caret" />}

  </div>
);
}

function Spinner() {
  const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
  const [frame, setFrame] = useState(0);
  // rotate frames
  // (use interval in a real setup; for simplicity just show static)
  return <span>{frames[frame]}</span>;
}

function InfoRow({ label, value, active = false, valueColor }: {
  label: string; value: string; active?: boolean; valueColor?: string;
}) {
  return(
<div className="info-row">

<span className="info-label">
$ {label}
</span>

<span className={`info-value ${active?"info-active":""}`}>
{value}
</span>

</div>
);
  
}

function LinkRow({ icon, label, href, val, active = false }: {
  icon: string; label: string; href: string; val: string; active?: boolean;
}) {
        return(

      <div className="link-row">

      <span className={`link-icon ${active?"link-icon-active":"link-icon-normal"}`}>
      {icon}
      </span>

      <span className="link-label">
      $ {label}
      </span>

      <a
      href={href}
      target={href.startsWith("mailto")?"_self":"_blank"}
      rel="noopener noreferrer"
      className={`link-anchor ${active?"link-active":"link-normal"}`}
      >
      {val}
      </a>

      </div>

      );
}

function BulletRow({ text, active = false }: { text: string; active?: boolean }) {
    return(

    <div className="bullet-row">

      <span className={`bullet-icon ${active?"bullet-active":"bullet-normal"}`}>
          {active?"✓":"▸"}
      </span>

      <span className={`bullet-text ${active?"bullet-text-active":"bullet-text-normal"}`}>
        {text}
      </span>

    </div>
  );
}