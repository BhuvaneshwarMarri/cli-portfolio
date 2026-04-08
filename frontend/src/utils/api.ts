/**
 * API utility functions for consistent error handling and request management
 */

const API_BASE_URL = import.meta.env.VITE_API_URL;

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Generic fetch wrapper with error handling
 */
export async function apiCall<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: `HTTP ${response.status}` }));
      return {
        success: false,
        error: error.detail || `Server error: ${response.status}`,
      };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (err: any) {
    console.error(`API call failed: ${endpoint}`, err);
    return {
      success: false,
      error: err.message || "Network error. Is the backend running?",
    };
  }
}

/**
 * GET request wrapper
 */
export async function apiGet<T>(endpoint: string): Promise<ApiResponse<T>> {
  return apiCall<T>(endpoint, { method: "GET" });
}

/**
 * POST request wrapper
 */
export async function apiPost<T>(
  endpoint: string,
  body: Record<string, any>
): Promise<ApiResponse<T>> {
  return apiCall<T>(endpoint, {
    method: "POST",
    body: JSON.stringify(body),
  });
}
