import { useEffect, useState, useCallback } from "react";
import { apiGet, apiPost } from "../../utils/api";
// BUG FIX #8: Import shared types from the single source of truth (types.ts).
// Duplicate interface declarations were removed — they drifted from types.ts and
// could produce silent type mismatches at runtime.
import type {
  ContactInfo,
  Availability,
  OpenToItem,
  ContactFormData,
} from "./types";

interface ContactDataHook {
  contactInfo: ContactInfo | null;
  availability: Availability | null;
  openTo: OpenToItem[];
  loading: boolean;
  error: string | null;
  submitForm: (formData: ContactFormData) => Promise<{ success: boolean; message: string }>;
}

/**
 * Custom hook for contact page data fetching and form submission.
 * Fetches contact info, availability, and opportunities from the backend API.
 */
export default function useContactData(): ContactDataHook {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [availability, setAvailability] = useState<Availability | null>(null);
  const [openTo, setOpenTo] = useState<OpenToItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        setLoading(true);

        const [infoRes, availRes, openRes] = await Promise.all([
          apiGet<ContactInfo>("/contact/info"),
          apiGet<Availability>("/contact/availability"),
          apiGet<OpenToItem[]>("/contact/open-to"),
        ]);

        if (!infoRes.success || !availRes.success || !openRes.success) {
          throw new Error(
            infoRes.error ?? availRes.error ?? openRes.error ?? "Unknown error"
          );
        }

        if (cancelled) return;

        setContactInfo(infoRes.data ?? null);
        setAvailability(availRes.data ?? null);
        setOpenTo(openRes.data ?? []);
        setError(null);
      } catch (err: unknown) {
        if (cancelled) return;
        const message = err instanceof Error ? err.message : "Failed to load contact data";
        console.error("Contact data fetch error:", err);
        setError(message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchData();
    // Cleanup: ignore stale async results if the component unmounts
    return () => { cancelled = true; };
  }, []);

  /**
   * Submit contact form to backend.
   * Stores message in MongoDB and sends email via backend service.
   */
  const submitForm = useCallback(
    async (formData: ContactFormData): Promise<{ success: boolean; message: string }> => {
      const response = await apiPost<{ status: string; message: string }>(
        "/contact",
        formData
      );

      if (!response.success) {
        throw new Error(response.error ?? "Failed to submit form");
      }

      return {
        success: true,
        message: response.data?.message ?? "Message submitted successfully",
      };
    },
    []
  );

  return {
    contactInfo,
    availability,
    openTo,
    loading,
    error,
    submitForm,
  };
}