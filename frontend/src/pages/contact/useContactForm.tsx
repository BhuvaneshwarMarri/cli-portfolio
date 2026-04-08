import { useEffect, useState } from "react";
import { apiGet, apiPost } from "../../utils/api";

/**
 * Contact information interfaces
 */
interface SocialLink {
  url: string;
  handle: string;
}

interface ContactInfo {
  email: string;
  github: SocialLink;
  linkedin: SocialLink;
  twitter: SocialLink;
}

interface Availability {
  status: string;
  type: string;
  timezone: string;
  response_time: string;
  preferred_contact: string;
}

interface OpenToItem {
  text: string;
  active: boolean;
}

interface FormData {
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
}

interface ContactDataHook {
  contactInfo: ContactInfo | null;
  availability: Availability | null;
  openTo: OpenToItem[];
  loading: boolean;
  error: string | null;
  submitForm: (formData: FormData) => Promise<{ success: boolean; message: string }>;
}

/**
 * Custom hook for contact page data fetching and form submission
 * Fetches contact info, availability, and opportunities from backend
 */
export default function useContactData(): ContactDataHook {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [availability, setAvailability] = useState<Availability | null>(null);
  const [openTo, setOpenTo] = useState<OpenToItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [infoRes, availRes, openRes] = await Promise.all([
          apiGet<ContactInfo>("/contact/info"),
          apiGet<Availability>("/contact/availability"),
          apiGet<OpenToItem[]>("/contact/open-to"),
        ]);

        if (!infoRes.success || !availRes.success || !openRes.success) {
          throw new Error(infoRes.error || availRes.error || openRes.error || "Unknown error");
        }

        setContactInfo(infoRes.data || null);
        setAvailability(availRes.data || null);
        setOpenTo(openRes.data || []);
        setError(null);
      } catch (err: any) {
        console.error("Contact data fetch error:", err);
        setError(err.message || "Failed to load contact data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /**
   * Submit contact form to backend
   * Stores message in MongoDB and optionally sends email via service
   */
  const submitForm = async (
    formData: FormData
  ): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await apiPost<{ status: string; message: string }>(
        "/contact",
        formData
      );

      if (!response.success) {
        throw new Error(response.error || "Failed to submit form");
      }

      return {
        success: true,
        message: response.data?.message || "Message submitted successfully",
      };
    } catch (err: any) {
      throw new Error(err.message || "Failed to submit form");
    }
  };

  return {
    contactInfo,
    availability,
    openTo,
    loading,
    error,
    submitForm,
  };
}