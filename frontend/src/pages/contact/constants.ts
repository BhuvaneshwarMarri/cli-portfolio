export const EMAILJS_SERVICE_ID  = "YOUR_SERVICE_ID";   // e.g. "service_abc123"
export const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";  // e.g. "template_xyz456"
export const EMAILJS_PUBLIC_KEY  = "YOUR_PUBLIC_KEY";   // e.g. "aBcDeFgH..."

export type FormState = "idle" | "sending" | "success" | "error";

export interface FormData {
  from_name : string;
  from_email: string;
  subject   : string;
  message   : string;
}
