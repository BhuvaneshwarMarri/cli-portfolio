/**
 * Contact module types
 */

export interface SocialLink {
  url: string;
  handle: string;
}

export interface ContactInfo {
  email: string;
  github: SocialLink;
  linkedin: SocialLink;
  twitter: SocialLink;
}

export interface Availability {
  status: string;
  type: string;
  timezone: string;
  response_time: string;
  preferred_contact: string;
}

export interface OpenToItem {
  text: string;
  active: boolean;
}

export interface ContactFormData {
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
}

export interface ContactSubmissionResponse {
  status: string;
  id: string;
  message: string;
}

export type FormState = "idle" | "sending" | "success" | "error";
