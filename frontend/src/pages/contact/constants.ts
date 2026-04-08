export const EMAILJS_SERVICE_ID  = "YOUR_SERVICE_ID";   // e.g. "service_abc123"
export const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";  // e.g. "template_xyz456"
export const EMAILJS_PUBLIC_KEY  = "YOUR_PUBLIC_KEY";   // e.g. "aBcDeFgH..."

// Re-export types from types.ts for backward compatibility
export type { FormState, ContactFormData } from './types';
export type FormData = import('./types').ContactFormData;

