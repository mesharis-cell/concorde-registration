// Registration API Types
export interface RegistrationProfile {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  guestType?: string;
}

export interface RegistrationCommunication {
  emailOptIn: boolean;
  whatsappOptIn: boolean;
}

export interface RegistrationFlight {
  airline?: string;
  number?: string;
  arrival?: string; // ISO string
  departure?: string; // ISO string
  arrivalAirport?: string;
  departureAirport?: string;
}

export interface RegistrationAccommodation {
  required: boolean;
  hotel?: string;
  checkIn?: string; // ISO string
  checkOut?: string; // ISO string
  specialRequests?: string;
}

export interface RegistrationRequirements {
  dietary?: string;
  medical?: string;
  accessibility?: string;
}

export interface RegistrationMerchandiseSize {
  shirt?: string;
  jacket?: string;
  hat?: string;
}

export interface RegistrationEmergencyContact {
  name?: string;
  relationship?: string;
  phone?: string;
  email?: string;
}

export interface RegistrationPayload {
  profile: RegistrationProfile;
  communication: RegistrationCommunication;
  flight: RegistrationFlight;
  accommodation: RegistrationAccommodation;
  requirements: RegistrationRequirements;
  merchandiseSize: RegistrationMerchandiseSize;
  emergencyContact: RegistrationEmergencyContact;
}

// API Response Types
export interface RegistrationSuccess {
  success: true;
  data: {
    id: string;
    profile: RegistrationProfile;
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

// Form Types
export interface FormValues {
  [key: string]: string | boolean;
}

export interface FieldErrors {
  [key: string]: boolean;
}

// Confirmation Summary Type
export interface ConfirmationSummary {
  name: string;
  email: string;
  communication: RegistrationCommunication;
  flight: RegistrationFlight;
  accommodation: RegistrationAccommodation;
  requirements: RegistrationRequirements;
  merchandiseSize: RegistrationMerchandiseSize;
  emergencyContact: RegistrationEmergencyContact;
}

// Storage Keys
export const STORAGE_KEYS = {
  REGISTRATION_CONFIRMATION: "ec_registration_confirmation",
  REGISTRATION_DRAFT: "ec_registration_draft"
} as const;
