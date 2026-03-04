import { AxiosError } from "axios";
import httpClient from "@/lib/httpClient";

// Form field response with metadata
export interface FormFieldResponse {
  fieldName: string;
  fieldLabel: string;
  fieldType: string;
  value: string | boolean | number | null | undefined;
  step: string;
  order: number;
}

export interface RegistrationCommunication {
  emailOptIn?: boolean;
  whatsappOptIn?: boolean;
}

export interface RegistrationPayload {
  email: string;
  formResponses: FormFieldResponse[];
  communication?: RegistrationCommunication;
  groupId?: string;
}

export interface RegistrationSuccess {
  success: true;
  data: {
    id: string;
    email: string;
    assigned: boolean;
    eventId: string;
    wallet?: {
      googleWalletUrl: string;
      passReferenceId: string;
      expiresAt: string;
    };
    checkIn?: {
      qrPayloadUrl: string;
      token: string;
      expiresAt: string;
    };
  };
  message?: string;
}

export interface RegistrationError {
  success: false;
  error: string;
  message?: string;
}

export type RegistrationResponse = RegistrationSuccess | RegistrationError;

export interface PassPreviewSuccess {
  success: true;
  data: {
    event: {
      id: string;
      name: string;
      shortName: string;
    };
    attendee: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
    };
    wallet: {
      googleWalletUrl: string;
      passReferenceId: string;
      expiresAt: string;
    } | null;
    checkIn: {
      qrPayloadUrl: string;
      token: string;
      expiresAt: string;
      passReferenceId: string;
    };
  };
}

export interface PassPreviewError {
  success: false;
  error: string;
  message?: string;
  details?: string;
}

export type PassPreviewResponse = PassPreviewSuccess | PassPreviewError;

// Environment configuration using existing .env file
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";
const PUBLIC_API_PREFIX = "/v1/public";
const EVENT_ID_QUERY_KEYS = ["eventId", "event_id", "event", "id"] as const;

export const API_BASE_URL_WITH_PREFIX = `${API_BASE_URL}${PUBLIC_API_PREFIX}`;
export const DEFAULT_EVENT_ID = process.env.NEXT_PUBLIC_EVENT_ID?.trim() || "";

type SearchParamsLike = {
  get: (name: string) => string | null;
};

function getEventIdFromSearchParams(searchParams?: SearchParamsLike | null): string | null {
  if (!searchParams) return null;

  for (const key of EVENT_ID_QUERY_KEYS) {
    const value = searchParams.get(key)?.trim();
    if (value) return value;
  }

  return null;
}

export function resolveEventIdFromClientSearchParams(
  searchParams?: SearchParamsLike | null
): string | null {
  if (DEFAULT_EVENT_ID) return DEFAULT_EVENT_ID;

  const fromHookParams = getEventIdFromSearchParams(searchParams);
  if (fromHookParams) return fromHookParams;

  if (typeof window === "undefined") return null;

  const fromUrl = getEventIdFromSearchParams(new URLSearchParams(window.location.search));
  if (fromUrl) return fromUrl;

  const storedParams = sessionStorage.getItem("registration_url_params");
  if (!storedParams) return null;

  try {
    const parsed = JSON.parse(storedParams) as Record<string, unknown>;
    for (const key of EVENT_ID_QUERY_KEYS) {
      const value = parsed[key];
      if (typeof value === "string" && value.trim()) {
        return value.trim();
      }
    }
  } catch {
    // Ignore malformed session payload and continue with null.
  }

  return null;
}

export async function registerAttendee(
  eventId: string,
  payload: RegistrationPayload
): Promise<RegistrationResponse> {
  try {
    const response = await httpClient.post(`/v1/public/events/${eventId}/register`, payload);
    return response.data as RegistrationResponse;
  } catch (error: unknown) {
    // Extract error message from axios error response
    const axiosError = error as AxiosError<{ error?: string; message?: string }>;
    const errorMessage =
      axiosError.response?.data?.error ||
      axiosError.response?.data?.message ||
      axiosError.message ||
      "Failed to register attendee";

    return {
      success: false,
      error: errorMessage,
      message: axiosError.response?.data?.message
    };
  }
}

export async function getPassPreview(token: string): Promise<PassPreviewResponse> {
  try {
    const response = await httpClient.get(
      `/v1/public/check-in/pass?token=${encodeURIComponent(token)}`
    );
    return response.data as PassPreviewResponse;
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{
      error?: string;
      message?: string;
      details?: string;
    }>;

    return {
      success: false,
      error:
        axiosError.response?.data?.error ||
        axiosError.response?.data?.message ||
        axiosError.message ||
        "Failed to load pass",
      message: axiosError.response?.data?.message,
      details: axiosError.response?.data?.details
    };
  }
}

export function toIsoOrUndefined(date?: string, time?: string): string | undefined {
  if (!date || !time) return undefined;
  // Try to construct ISO string in UTC; permit already ISO-like strings
  try {
    const candidate = `${date}T${time}${time.includes("Z") || date.includes("Z") ? "" : ":00Z"}`;
    const parsed = new Date(candidate);
    if (isNaN(parsed.getTime())) return undefined;
    return parsed.toISOString();
  } catch {
    return undefined;
  }
}

export function parseCheckInOut(input?: string): { checkIn?: string; checkOut?: string } {
  if (!input) return {};
  // Accept formats like "2024-09-15 - 2024-09-18" or "2024-09-15 to 2024-09-18"
  const parts = input.split(/\s?-\s?|\s?to\s?/i).map((p) => p.trim());
  if (parts.length >= 2) {
    const checkInDate = new Date(`${parts[0]}T00:00:00Z`);
    const checkOutDate = new Date(`${parts[1]}T00:00:00Z`);
    return {
      checkIn: isNaN(checkInDate.getTime()) ? undefined : checkInDate.toISOString(),
      checkOut: isNaN(checkOutDate.getTime()) ? undefined : checkOutDate.toISOString()
    };
  }
  return {};
}
