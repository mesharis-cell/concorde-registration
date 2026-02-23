import httpClient from "@/lib/httpClient";
import { AxiosError } from "axios";

export interface EventLocation {
  city: string;
  country: string;
  venue: string;
  timezone: string;
}

export interface EventDateRange {
  start: string;
  end: string;
}

export interface EventConfig {
  registrationOpen: boolean;
}

export interface HotelInfo {
  name: string;
  isDefault: boolean;
  roomTypes: string[];
  checkInTime: string;
  checkOutTime: string;
}

export interface HotelConfig {
  hotels: HotelInfo[];
}

export interface GroupInfo {
  id: string;
  name: string;
  description: string;
}

// Dynamic Form Configuration Types
export interface ValidationRules {
  required?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  email?: boolean;
  url?: boolean;
  phone?: boolean;
  minDate?: string;
  maxDate?: string;
  minAge?: number;
  maxAge?: number;
  custom?: string;
  message?: string;
}

export interface FieldOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface FormFieldConfig {
  name: string;
  type: string;
  label: string;
  placeholder?: string;
  helperText?: string;
  required?: boolean;
  validation?: ValidationRules;
  conditional?: string;
  options?: FieldOption[];
  defaultValue?: string | boolean | number;
  order?: number;
  rows?: number;
  multiple?: boolean;
  accept?: string;
  // Phone field specific
  defaultCountry?: string;
  // Date field specific
  dateFormat?: 'MM/dd/yyyy' | 'dd/MM/yyyy' | 'yyyy-MM-dd' | 'dd-MM-yyyy';
  metadata?: Record<string, string | boolean | number>;
}

export interface FormStepConfig {
  label: string;
  subLabel?: string;
  order?: number;
  fields: FormFieldConfig[];
}

export type RegistrationFormConfig = Record<string, FormStepConfig>;

export interface EventInfo {
  id: string;
  name: string;
  shortName: string;
  location: EventLocation;
  dateRange: EventDateRange;
  config: EventConfig;
  // Singapore Phase 2 additions
  hotelConfig?: HotelConfig | null;
  termsConditions?: string | null;
  privacyPolicy?: string | null;
  // Groups for binding assignment
  groups: GroupInfo[];
  // Dynamic registration form configuration
  registrationFormConfig?: RegistrationFormConfig;
}

export interface EventInfoSuccess {
  success: true;
  data: EventInfo;
}

export interface EventInfoError {
  success: false;
  error: string;
}

export type EventInfoResponse = EventInfoSuccess | EventInfoError;

export async function getEventInfo(eventId: string): Promise<EventInfoResponse> {
  try {
    const response = await httpClient.get(`/api/v1/public/events/${eventId}/info`);
    return response.data as EventInfoResponse;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    const responseData = axiosError.response?.data as { error?: string } | undefined;

    return {
      success: false,
      error: responseData?.error || axiosError.message || "Failed to fetch event info"
    };
  }
}
