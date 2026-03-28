import { useState } from "react";

type FormState = "idle" | "sending" | "success" | "error";

interface FormData {
  from_name:  string;
  from_email: string;
  subject:    string;
  message:    string;
}

export default function useContactForm() {
  const [status, setStatus] = useState<FormState>("idle");

  const submit = async (data: FormData) => {
    setStatus("sending");
    try {
      const res = await fetch("http://localhost:8000/home/links", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(data),
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      setStatus("success");
    } catch (err) {
      console.error("Contact submit error:", err);
      setStatus("error");
    }
  };

  const reset = () => setStatus("idle");

  return { status, submit, reset };
}