export const EMAILJS_SERVICE_ID  = "YOUR_SERVICE_ID";   // e.g. "service_abc123"
export const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";  // e.g. "template_xyz456"
export const EMAILJS_PUBLIC_KEY  = "YOUR_PUBLIC_KEY";   // e.g. "aBcDeFgH..."

// BUG FIX #6: Removed `export type FormData = ...` — it shadowed the global
// browser FormData interface (used by fetch/XHR), causing subtle type confusion.
// All callers should import ContactFormData directly from './types'.
export type { FormState, ContactFormData } from "./types";