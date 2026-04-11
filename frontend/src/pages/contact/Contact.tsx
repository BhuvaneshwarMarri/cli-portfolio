import { useState, useRef, useCallback } from "react";
import BvimLayout from "../../components/layout/BvimLayout.tsx";
import SectionBox from "../../components/common/SectionBox.tsx";
import { type FormState } from "./types";
import { type ContactFormData } from "./types";
import useContactData from "./useContactForm";
import "./contact.css";

// Email regex — used only in handleSubmit (not relying on browser type="email")
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const [form, setForm] = useState<ContactFormData>({
    from_name: "",
    from_email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<FormState>("idle");
  const [errMsg, setErrMsg] = useState("");
  const [focused, setFocused] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Set<string>>(new Set());
  const formRef = useRef<HTMLFormElement>(null);

  // Textarea cursor tracking
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [msgCaretPos, setMsgCaretPos] = useState(0);
  const [msgScrollTop, setMsgScrollTop] = useState(0);

  const { contactInfo, availability, openTo, loading, submitForm } = useContactData();

  const updateMsgCaret = () => {
    if (textareaRef.current) {
      setMsgCaretPos(textareaRef.current.selectionStart ?? 0);
    }
  };

  const handleMsgScroll = () => {
    if (textareaRef.current) {
      setMsgScrollTop(textareaRef.current.scrollTop);
    }
  };

  // BUG FIX #3: use functional updater to avoid stale closure over fieldErrors
  const handleChange = useCallback(
    (field: keyof ContactFormData) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.target.value;
        setForm((f) => ({ ...f, [field]: value }));
        setFieldErrors((prev) => {
          if (!prev.has(field)) return prev;
          const next = new Set(prev);
          next.delete(field);
          return next;
        });
      },
    []
  );

  const handleSubmit = async () => {
    const errors = new Set<string>();
    if (!form.from_name.trim()) errors.add("from_name");
    if (!form.from_email.trim()) errors.add("from_email");
    if (!form.message.trim()) errors.add("message");

    if (errors.size > 0) {
      setFieldErrors(errors);
      setErrMsg("E: Required fields missing — name, email and message are required.");
      setStatus("error");
      return;
    }

    // BUG FIX #2: custom email validation only (field uses type="text" to avoid
    // browser-native validation firing before our handler)
    if (!EMAIL_RE.test(form.from_email.trim())) {
      setFieldErrors(new Set(["from_email"]));
      setErrMsg("E: Invalid email address format.");
      setStatus("error");
      return;
    }

    setFieldErrors(new Set());
    // BUG FIX #4: reset to "sending" unconditionally so re-submits after an
    // error always clear the previous error state
    setStatus("sending");
    setErrMsg("");

    try {
      await submitForm(form);
      setStatus("success");
      setForm({ from_name: "", from_email: "", subject: "", message: "" });
    } catch (err: unknown) {
      setStatus("error");
      const errorMessage = err instanceof Error ? err.message : "unknown error";
      setErrMsg(`E: Send failed — ${errorMessage}. Check your backend config.`);
    }
  };

  return (
    <BvimLayout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          color: "var(--text)",
          fontFamily: "var(--font-family, monospace)",
          overflow: "hidden",
        }}
      >
        {/* ── HEADER ───────────────────────────────────────────────────────── */}
        <SectionBox title="">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
            }}
          >
            <div>
              <pre
                style={{
                  color: "var(--accent)",
                  fontSize: "clamp(4px, 0.75vw, 10px)",
                  lineHeight: 1.15,
                  margin: "0 0 8px 0",
                  whiteSpace: "pre",
                  fontFamily: "var(--font-family, monospace)",
                }}
              >{`\
  ██████╗ ██████╗ ███╗   ██╗████████╗ █████╗  ██████╗████████╗
 ██╔════╝██╔═══██╗████╗  ██║╚══██╔══╝██╔══██╗██╔════╝╚══██╔══╝
 ██║     ██║   ██║██╔██╗ ██║   ██║   ███████║██║        ██║   
 ██║     ██║   ██║██║╚██╗██║   ██║   ██╔══██║██║        ██║   
 ╚██████╗╚██████╔╝██║ ╚████║   ██║   ██║  ██║╚██████╗   ██║   
  ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝   ╚═╝  `}</pre>
              <p
                style={{
                  margin: 0,
                  color: "var(--text-dim)",
                  fontSize: "0.82em",
                  letterSpacing: "0.05em",
                }}
              >
                Open to work &nbsp;·&nbsp; Responds within 24–48 hrs
              </p>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div
                style={{
                  fontSize: "0.72em",
                  padding: "4px 10px",
                  border: "1px solid var(--accent2)",
                  borderRadius: "3px",
                  color: "var(--accent2)",
                  background: "color-mix(in srgb, var(--accent2) 10%, transparent)",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                }}
              >
                ● AVAILABLE
              </div>
            </div>
          </div>
        </SectionBox>

        {/* ── BODY: Form + Info ────────────────────────────────────────────── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 370px",
            gap: "16px",
            flex: 1,
            minHeight: 0,
            paddingTop: "14px",
            alignItems: "stretch",
          }}
        >
          {/* ── MESSAGE FORM ─────────────────────────────────────────────── */}
          <SectionBox
            title="✉ send_message.sh"
            style={{ display: "flex", flexDirection: "column", minHeight: 0, margin: 0 }}
          >
            {/* BUG FIX #1: was `oValidate` (typo) — corrected to `noValidate`
                so browser native validation doesn't compete with our custom
                validator in handleSubmit */}
            <form
              noValidate
              ref={formRef}
              style={{ display: "flex", flexDirection: "column", gap: "0", flex: 1 }}
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              {/* ── Prompt-style input rows ── */}
              <PromptField
                prompt="$ name"
                // BUG FIX #2 (name field): keep type="text" — no browser interference
                type="text"
                placeholder="Your full name"
                value={form.from_name}
                onChange={handleChange("from_name")}
                isFocused={focused === "from_name"}
                onFocus={() => setFocused("from_name")}
                onBlur={() => setFocused(null)}
                required
                hasError={fieldErrors.has("from_name") && status === "error"}
              />

              {/* BUG FIX #2 (email field): type was "email" which caused the
                  browser to intercept form submission with its own validation
                  popup BEFORE our handleSubmit ran, breaking error states.
                  Changed to type="text"; our EMAIL_RE regex handles validation. */}
              <PromptField
                prompt="$ email"
                type="text"
                inputMode="email"
                placeholder="you@example.com"
                value={form.from_email}
                onChange={handleChange("from_email")}
                isFocused={focused === "from_email"}
                onFocus={() => setFocused("from_email")}
                onBlur={() => setFocused(null)}
                required
                hasError={fieldErrors.has("from_email") && status === "error"}
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

              {/* Message textarea — terminal styled */}
              <div
                style={{
                  borderBottom:
                    fieldErrors.has("message") && status === "error"
                      ? "1px solid var(--accent3)"
                      : `1px solid ${focused === "message" ? "var(--accent)" : "var(--border-dim)"}`,
                  paddingBottom: "4px",
                  marginBottom: "8px",
                  transition: "border-color 0.15s ease, box-shadow 0.15s ease",
                  boxShadow:
                    fieldErrors.has("message") && status === "error"
                      ? "0 0 0 1px var(--accent3)"
                      : "none",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  minHeight: 0,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                    flex: 1,
                    minHeight: 0,
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      color:
                        fieldErrors.has("message") && status === "error"
                          ? "var(--accent3)"
                          : focused === "message"
                          ? "var(--accent)"
                          : "var(--accent3)",
                      fontSize: "0.78em",
                      minWidth: "60px",
                      paddingTop: "4px",
                      flexShrink: 0,
                      transition: "color 0.15s ease",
                      fontWeight: 600,
                      userSelect: "none",
                    }}
                  >
                    {fieldErrors.has("message") && status === "error"
                      ? "✗ message"
                      : "$ message"}
                  </span>

                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      position: "relative",
                      minHeight: 0,
                    }}
                  >
                    {/* Mirror div — positions the block cursor */}
                    {focused === "message" && (
                      <div
                        aria-hidden="true"
                        style={{
                          position: "absolute",
                          left: 0,
                          top: 0,
                          pointerEvents: "none",
                          overflow: "hidden",
                          width: "100%",
                        }}
                      >
                        <div
                          style={{
                            paddingLeft: "8px",
                            paddingRight: "12px",
                            fontFamily: "var(--font-family, monospace)",
                            fontSize: "0.86em",
                            lineHeight: 1.7,
                            whiteSpace: "pre-wrap",
                            wordBreak: "break-word",
                            color: "transparent",
                            transform: `translateY(${-msgScrollTop}px)`,
                            display: "inline-block",
                          }}
                        >
                          {form.message.substring(0, msgCaretPos)}
                          <span
                            className="tui-bold-cursor"
                            style={{
                              display: "inline-block",
                              width: "8px",
                              height: "1.2em",
                              background:
                                fieldErrors.has("message") && status === "error"
                                  ? "var(--accent3)"
                                  : "var(--accent)",
                              borderRadius: "1px",
                              animation: "tui-cursor-blink 0.8s step-end infinite",
                              boxShadow: `0 0 6px ${
                                fieldErrors.has("message") && status === "error"
                                  ? "var(--accent3)"
                                  : "var(--accent)"
                              }`,
                              verticalAlign: "text-bottom",
                              marginLeft: "2px",
                              flexShrink: 0,
                            }}
                          />
                        </div>
                      </div>
                    )}

                    <textarea
                      ref={textareaRef}
                      placeholder="write your message here..."
                      value={form.message}
                      onChange={(e) => {
                        handleChange("message")(e);
                        updateMsgCaret();
                      }}
                      onKeyUp={updateMsgCaret}
                      onClick={updateMsgCaret}
                      onFocus={() => {
                        setFocused("message");
                        updateMsgCaret();
                      }}
                      onBlur={() => setFocused(null)}
                      onScroll={handleMsgScroll}
                      required
                      style={{
                        flex: 1,
                        minHeight: "100px",
                        resize: "none",
                        background: "transparent",
                        border: "none",
                        outline: "none",
                        color: "var(--text)",
                        fontFamily: "var(--font-family, monospace)",
                        fontSize: "0.86em",
                        lineHeight: 1.7,
                        caretColor: "transparent",
                        paddingLeft: "8px",
                        paddingRight: "12px",
                        paddingTop: "0",
                        paddingBottom: "0",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Terminal output section */}
              <div
                style={{
                  paddingTop: "12px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                <div
                  style={{
                    fontSize: "0.82em",
                    color: "var(--text-dim)",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontWeight: 600,
                  }}
                >
                  <span style={{ color: "var(--accent3)" }}>$</span>
                  <span>send_message</span>
                  {status === "sending" && (
                    <span
                      style={{
                        animation: "terminal-pulse 0.8s ease-in-out infinite",
                        color: "var(--accent2)",
                      }}
                    >
                      ⟳
                    </span>
                  )}
                </div>

                {status === "success" && (
                  <div
                    style={{
                      padding: "8px 12px",
                      background: "color-mix(in srgb, var(--accent2) 10%, transparent)",
                      border: "1px solid var(--accent2)",
                      borderRadius: "3px",
                      fontSize: "0.78em",
                      color: "var(--accent2)",
                      lineHeight: 1.6,
                      fontFamily: "var(--font-family, monospace)",
                    }}
                  >
                    <div>✓ success: message accepted</div>
                    <div
                      style={{
                        fontSize: "0.9em",
                        color: "var(--text-dim)",
                        marginTop: "4px",
                      }}
                    >
                      → processing... I'll respond within 24–48 hrs
                    </div>
                  </div>
                )}

                {status === "error" && (
                  <div
                    style={{
                      padding: "8px 12px",
                      background: "color-mix(in srgb, var(--accent3) 10%, transparent)",
                      border: "1px solid var(--accent3)",
                      borderRadius: "3px",
                      fontSize: "0.78em",
                      color: "var(--accent3)",
                      lineHeight: 1.6,
                      fontFamily: "var(--font-family, monospace)",
                    }}
                  >
                    <div>✗ error: {errMsg}</div>
                  </div>
                )}

                {status === "sending" && (
                  <div
                    style={{
                      padding: "8px 12px",
                      background: "color-mix(in srgb, var(--accent) 5%, transparent)",
                      border: "1px solid var(--border-dim)",
                      borderRadius: "3px",
                      fontSize: "0.78em",
                      color: "var(--text-dim)",
                      lineHeight: 1.6,
                      fontFamily: "var(--font-family, monospace)",
                      animation: "terminal-progress 0.6s linear infinite",
                    }}
                  >
                    ⟳ sending message via backend...
                  </div>
                )}
              </div>

              {/* Submit button */}
              <div
                style={{
                  paddingTop: "8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <button
                  type="submit"
                  disabled={status === "sending" || status === "success"}
                  style={{
                    padding: "6px 16px",
                    background:
                      status === "sending"
                        ? "transparent"
                        : "color-mix(in srgb, var(--accent) 12%, transparent)",
                    border: `1px solid ${
                      status === "sending"
                        ? "var(--border-dim)"
                        : status === "success"
                        ? "var(--accent2)"
                        : "var(--accent)"
                    }`,
                    borderRadius: "2px",
                    color:
                      status === "sending"
                        ? "var(--text-dim)"
                        : status === "success"
                        ? "var(--accent2)"
                        : "var(--accent)",
                    fontFamily: "var(--font-family)",
                    fontSize: "0.78em",
                    fontWeight: 700,
                    cursor:
                      status === "sending" || status === "success"
                        ? "not-allowed"
                        : "pointer",
                    letterSpacing: "0.04em",
                    transition: "all 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    opacity: status === "sending" || status === "success" ? 0.6 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (status !== "sending" && status !== "success") {
                      e.currentTarget.style.background =
                        "color-mix(in srgb, var(--accent) 22%, transparent)";
                      e.currentTarget.style.boxShadow =
                        "0 0 8px color-mix(in srgb, var(--accent) 30%, transparent)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      "color-mix(in srgb, var(--accent) 12%, transparent)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {status === "sending" ? (
                    <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <span style={{ animation: "terminal-spin 0.8s linear infinite" }}>⟳</span>{" "}
                      sending
                    </span>
                  ) : status === "success" ? (
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        color: "var(--accent2)",
                      }}
                    >
                      <span>✓</span> sent
                    </span>
                  ) : (
                    <span>: send_message</span>
                  )}
                </button>

                {status !== "sending" && status !== "success" && (
                  <span style={{ fontSize: "0.7em", color: "var(--text-dim)", fontWeight: 600 }}>
                    ↵
                  </span>
                )}
              </div>
            </form>
          </SectionBox>

          {/* ── RIGHT PANEL: Contact info + availability ──────────────────── */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              minHeight: 0,
            }}
          >
            {/* Contact Links */}
            <SectionBox title="Contact Info" style={{ margin: 0 }}>
              {loading ? (
                <p style={{ fontSize: "0.8em", color: "var(--text-dim)" }}>Loading...</p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {contactInfo && (
                    <>
                      <LinkRow
                        icon="@"
                        label="email"
                        href={`mailto:${contactInfo.email}`}
                        val={contactInfo.email}
                        active
                      />
                      <LinkRow
                        icon="◈"
                        label="github"
                        href={contactInfo.github.url}
                        val={contactInfo.github.handle}
                      />
                      <LinkRow
                        icon="⬡"
                        label="linkedin"
                        href={contactInfo.linkedin.url}
                        val={contactInfo.linkedin.handle}
                      />
                      <LinkRow
                        icon="✦"
                        label="twitter"
                        href={contactInfo.twitter.url}
                        val={contactInfo.twitter.handle}
                      />
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
                      <InfoRow
                        label="status"
                        value={availability.status}
                        valueColor="var(--accent2)"
                        active
                      />
                      <InfoRow label="type" value={availability.type} />
                      <InfoRow label="timezone" value={availability.timezone} />
                      <InfoRow label="response" value={availability.response_time} />
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

// ─── Sub-components ────────────────────────────────────────────────────────────

interface PromptFieldProps {
  prompt: string;
  type: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  placeholder: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  isFocused: boolean;
  onFocus: () => void;
  onBlur: () => void;
  required?: boolean;
  hasError?: boolean;
}

function PromptField({
  prompt,
  type,
  inputMode,
  placeholder,
  value,
  onChange,
  isFocused,
  onFocus,
  onBlur,
  required = false,
  hasError = false,
}: PromptFieldProps) {
  const [caretPos, setCaretPos] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const updateCaret = () => {
    if (inputRef.current) {
      setCaretPos(inputRef.current.selectionStart ?? 0);
    }
  };

  const handleScroll = () => {
    if (inputRef.current) {
      setScrollLeft(inputRef.current.scrollLeft);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        borderBottom: hasError
          ? "1px solid var(--accent3)"
          : `1px solid ${isFocused ? "var(--accent)" : "var(--border-dim)"}`,
        paddingBottom: "4px",
        marginBottom: "8px",
        transition: "border-color 0.15s ease, box-shadow 0.15s ease",
        boxShadow: hasError ? "0 0 0 1px var(--accent3)" : "none",
        position: "relative",
        gap: "10px",
      }}
    >
      <span
        style={{
          fontSize: "0.78em",
          fontWeight: 600,
          color: hasError ? "var(--accent3)" : isFocused ? "var(--accent)" : "var(--accent3)",
          minWidth: "60px",
          transition: "color 0.15s ease",
          userSelect: "none",
        }}
      >
        {hasError ? "✗" : "$"} {prompt.replace("$ ", "")}
        {required && (
          <span style={{ color: "var(--accent3)", marginLeft: "2px" }}>*</span>
        )}
      </span>

      <div
        style={{ flex: 1, display: "flex", position: "relative", overflow: "hidden" }}
      >
        {/* Mirror div for custom block cursor */}
        {isFocused && (
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              pointerEvents: "none",
              overflow: "hidden",
              maxWidth: "100%",
            }}
          >
            <div
              style={{
                paddingLeft: "8px",
                paddingRight: "8px",
                fontFamily: "var(--font-family, monospace)",
                fontSize: "0.86em",
                lineHeight: 1.5,
                color: "transparent",
                whiteSpace: "nowrap",
                display: "inline-flex",
                alignItems: "center",
                transform: `translateX(${-scrollLeft}px)`,
              }}
            >
              {value.substring(0, caretPos)}
              <span
                className="tui-bold-cursor"
                style={{
                  width: "8px",
                  height: "16px",
                  background: hasError ? "var(--accent3)" : "var(--accent)",
                  borderRadius: "1px",
                  animation: "tui-cursor-blink 0.8s step-end infinite",
                  boxShadow: `0 0 6px ${hasError ? "var(--accent3)" : "var(--accent)"}`,
                  display: "inline-block",
                  flexShrink: 0,
                  marginLeft: "2px",
                }}
              />
            </div>
          </div>
        )}

        <input
          ref={inputRef}
          type={type}
          inputMode={inputMode}
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            onChange(e);
            updateCaret();
          }}
          onKeyUp={updateCaret}
          onClick={updateCaret}
          onFocus={() => {
            onFocus();
            updateCaret();
          }}
          onBlur={onBlur}
          onScroll={handleScroll}
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            color: "var(--text)",
            fontFamily: "var(--font-family, monospace)",
            fontSize: "0.86em",
            caretColor: "transparent",
            paddingLeft: "8px",
            lineHeight: 1.5,
          }}
        />
      </div>
    </div>
  );
}

function InfoRow({
  label,
  value,
  active = false,
  valueColor,
}: {
  label: string;
  value: string;
  active?: boolean;
  valueColor?: string;
}) {
  return (
    <div className="info-row">
      <span className="info-label">$ {label}</span>
      <span
        className={`info-value ${active ? "info-active" : ""}`}
        style={valueColor ? { color: valueColor } : undefined}
      >
        {value}
      </span>
    </div>
  );
}

function LinkRow({
  icon,
  label,
  href,
  val,
  active = false,
}: {
  icon: string;
  label: string;
  href: string;
  val: string;
  active?: boolean;
}) {
  return (
    <div className="link-row">
      <span className={`link-icon ${active ? "link-icon-active" : "link-icon-normal"}`}>
        {icon}
      </span>
      <span className="link-label">$ {label}</span>
      <a
        href={href}
        target={href.startsWith("mailto") ? "_self" : "_blank"}
        rel="noopener noreferrer"
        className={`link-anchor ${active ? "link-active" : "link-normal"}`}
      >
        {val}
      </a>
    </div>
  );
}

function BulletRow({ text, active = false }: { text: string; active?: boolean }) {
  return (
    <div className="bullet-row">
      <span className={`bullet-icon ${active ? "bullet-active" : "bullet-normal"}`}>
        {active ? "✓" : "▸"}
      </span>
      <span className={`bullet-text ${active ? "bullet-text-active" : "bullet-text-normal"}`}>
        {text}
      </span>
    </div>
  );
}