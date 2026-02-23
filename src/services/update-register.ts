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
  };
  message?: string;
}

export interface RegistrationError {
  success: false;
  error: string;
  message?: string;
}

export type RegistrationResponse = RegistrationSuccess | RegistrationError;

// Environment configuration using existing .env file
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";
const API_VERSION = "v1";
const PUBLIC_API_PREFIX = `/api/${API_VERSION}/public`;

export const API_BASE_URL_WITH_PREFIX = `${API_BASE_URL}${PUBLIC_API_PREFIX}`;
export const DEFAULT_EVENT_ID = process.env.NEXT_PUBLIC_EVENT_ID;

if (!DEFAULT_EVENT_ID) throw new Error("DEFAULT_EVENT_ID is not set");

export async function registerAttendee(
  eventId: string,
  payload: RegistrationPayload
): Promise<RegistrationResponse> {
  try {
    const response = await httpClient.post(`/api/v1/public/events/${eventId}/register`, payload);
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
