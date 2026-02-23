export interface FormField {
  type?:
    | "text"
    | "email"
    | "tel"
    | "date"
    | "time"
    | "datetime"
    | "number"
    | "switch"
    | "textarea"
    | "select"
    | "radio"
    | "checkbox"
    | "note"
    | "hidden";
  placeholder?: string;
  text?: string;
  required?: boolean;
  name?: string;
  value?: boolean | string;
  textColor?: boolean;
  options?: { value: string; label: string }[]; // For select/radio fields
  conditional?: string; // For conditional field display
  helperText?: string; // For instructional text
}
export interface FormStep {
  label?: string;
  subLabel?: string;
  fields: FormField[];
}

export interface FormData {
  step1: FormStep;
  step2: FormStep;
  step3: FormStep;
  step4: FormStep;
  step5: FormStep;
  step6: FormStep;
  step7: FormStep;
}

export const formData: FormData = {
  step1: {
    label: "BASIC INFORMATION",
    fields: [
      {
        type: "note",
        text: "PASSPORT NAME (REQUIRED)"
      },
      {
        type: "text",
        placeholder: "FIRST NAME",
        required: true,
        name: "firstName"
      },
      {
        type: "text",
        placeholder: "LAST NAME",
        required: true,
        name: "lastName"
      },
      {
        type: "note",
        text: "PREFERRED NAME (OPTIONAL)"
      },
      {
        type: "text",
        placeholder: "PREFERRED FIRST NAME",
        required: false,
        name: "preferredFirstName"
      },
      {
        type: "text",
        placeholder: "PREFERRED LAST NAME",
        required: false,
        name: "preferredLastName"
      },
      {
        type: "note",
        text: ""
      },
      {
        type: "email",
        placeholder: "EMAIL",
        required: true,
        name: "email"
      },
      {
        type: "tel",
        placeholder: "PHONE",
        required: false,
        name: "phone"
      },
      {
        type: "select",
        placeholder: "SELECT GROUP ASSIGNMENT",
        required: false,
        name: "groupId",
        helperText: "Choose your group assignment for activities (optional)",
        options: [] // Will be populated from event info API
      }
    ]
  },
  step2: {
    label: "INBOUND FLIGHT",
    subLabel: "Note: Enter final leg only",
    fields: [
      // DEPARTURE SECTION
      {
        type: "note",
        text: "DEPARTURE INFORMATION",
        name: "_departureSection"
      },
      {
        type: "text",
        placeholder: "DEPARTURE FROM",
        required: true,
        name: "inboundDepartureFrom"
      },
      {
        type: "text",
        placeholder: "INBOUND AIRLINE",
        required: true,
        name: "inboundAirline"
      },
      {
        type: "text",
        placeholder: "INBOUND FLIGHT NUMBER",
        required: true,
        name: "inboundFlightNumber"
      },
      {
        type: "date",
        placeholder: "DEPARTURE DATE",
        required: true,
        name: "inboundDepartureDate"
      },
      {
        type: "time",
        placeholder: "DEPARTURE TIME",
        required: true,
        name: "inboundDepartureTime"
      },
      {
        type: "text",
        placeholder: "DEPARTURE TERMINAL",
        required: false,
        name: "inboundDepartureTerminal"
      },
      // ARRIVAL SECTION
      {
        type: "note",
        text: "ARRIVAL INFORMATION",
        name: "_arrivalSection"
      },
      {
        type: "text",
        placeholder: "ARRIVAL TO AIRPORT",
        required: false,
        name: "inboundArrivalToAirport"
      },
      {
        type: "text",
        placeholder: "ARRIVAL TO TERMINAL",
        required: false,
        name: "inboundArrivalToTerminal"
      },
      {
        type: "date",
        placeholder: "ARRIVAL DATE",
        required: true,
        name: "inboundArrivalDate"
      },
      {
        type: "time",
        placeholder: "ARRIVAL TIME",
        required: true,
        name: "inboundArrivalTime"
      }
    ]
  },
  step3: {
    label: "ACCOMMODATION",
    fields: [
      {
        type: "switch",
        text: "ACCOMMODATION REQUIRED",
        required: true,
        name: "accommodationRequired",
        value: false
      },
      {
        type: "select",
        placeholder: "SELECT HOTEL",
        required: true,
        name: "hotel",
        conditional: "accommodationRequired",
        options: [] // Will be populated from event config
      },
      {
        type: "note",
        text: "CHECK-IN INFORMATION",
        name: "_outboundDepartureSection"
      },
      {
        type: "date",
        placeholder: "CHECK-IN DATE",
        required: true,
        name: "checkInDate",
        conditional: "accommodationRequired"
      },
      {
        type: "time",
        placeholder: "CHECK-IN TIME",
        required: true,
        name: "checkInTime",
        conditional: "accommodationRequired"
      },
      {
        type: "note",
        text: "CHECK-OUT INFORMATION",
        name: "_outboundDepartureSection"
      },
      {
        type: "date",
        placeholder: "CHECK-OUT DATE",
        required: true,
        name: "checkOutDate",
        conditional: "accommodationRequired"
      },
      {
        type: "time",
        placeholder: "CHECK-OUT TIME",
        required: true,
        name: "checkOutTime",
        conditional: "accommodationRequired"
      },
      // New occupancy selection pattern
      {
        type: "checkbox",
        text: "DOUBLE OCCUPANCY",
        required: false,
        name: "doubleOccupancyEnabled",
        conditional: "accommodationRequired",
        value: false
      },
      {
        type: "radio",
        placeholder: "DOUBLE OCCUPANCY TYPE",
        required: true,
        name: "doubleOccupancyType",
        conditional: "doubleOccupancyEnabled",
        options: [
          { value: "official", label: "Double occupancy sharing with another official guest" },
          { value: "plus-one", label: "Double occupancy sharing with a personal plus one" }
        ]
      },
      {
        type: "text",
        placeholder: "GUEST NAME",
        required: true,
        name: "doubleOccupancyGuestName",
        conditional: "doubleOccupancyEnabled"
      },
      {
        type: "text",
        placeholder: "GUEST RELATIONSHIP",
        required: false,
        name: "doubleOccupancyGuestRelation",
        conditional: "doubleOccupancyEnabled"
      },
      {
        type: "checkbox",
        text: "TWIN OCCUPANCY",
        required: false,
        name: "twinOccupancyEnabled",
        conditional: "accommodationRequired",
        value: false
      },
      {
        type: "radio",
        placeholder: "TWIN OCCUPANCY TYPE",
        required: true,
        name: "twinOccupancyType",
        conditional: "twinOccupancyEnabled",
        options: [
          { value: "official", label: "Twin occupancy sharing with another official guest" },
          { value: "plus-one", label: "Twin occupancy sharing with a personal plus one" }
        ]
      },
      {
        type: "note",
        text: "",
        name: "_outboundDepartureSection"
      },
      {
        type: "checkbox",
        text: "REQUEST EARLY CHECK-IN",
        required: false,
        name: "earlyCheckIn",
        conditional: "accommodationRequired",
        helperText: "Subject to availability"
      },
      {
        type: "checkbox",
        text: "REQUEST LATE CHECK-OUT",
        required: false,
        name: "lateCheckOut",
        helperText: "Subject to availability",
        conditional: "accommodationRequired"
      },
      {
        type: "checkbox",
        text: "VISA BOOKING ASSISTANCE REQUIRED",
        required: false,
        name: "visaBookingRequired",
        conditional: "accommodationRequired"
      },
      {
        type: "textarea",
        placeholder: "SPECIAL REQUESTS",
        required: false,
        name: "specialRequests",
        conditional: "accommodationRequired"
      }
    ]
  },
  step4: {
    label: "OUTBOUND FLIGHT",
    subLabel: "Note: Enter final leg only",
    fields: [
      // DEPARTURE SECTION
      {
        type: "note",
        text: "FLIGHT DETAILS",
        name: "_outboundDepartureSection"
      },
      {
        type: "text",
        placeholder: "OUTBOUND FLIGHT NUMBER",
        required: true,
        name: "outboundFlightNumber"
      },
      {
        type: "note",
        text: "DEPARTURE INFORMATION",
        name: "_outboundDepartureSection"
      },
      {
        type: "text",
        placeholder: "DEPARTURE FROM AIRPORT",
        required: true,
        name: "outboundDepartureFrom"
      },
      {
        type: "text",
        placeholder: "OUTBOUND AIRLINE",
        required: true,
        name: "outboundAirline"
      },
      {
        type: "date",
        placeholder: "DEPARTURE DATE",
        required: true,
        name: "outboundDepartureDate"
      },
      {
        type: "time",
        placeholder: "DEPARTURE TIME",
        required: true,
        name: "outboundDepartureTime"
      },
      {
        type: "text",
        placeholder: "DEPARTURE TERMINAL",
        required: false,
        name: "outboundDepartureTerminal"
      },
      // ARRIVAL SECTION
      {
        type: "note",
        text: "ARRIVAL INFORMATION",
        name: "_outboundArrivalSection"
      },
      {
        type: "text",
        placeholder: "ARRIVAL TO AIRPORT",
        required: true,
        name: "outboundArrivalToAirport"
      },
      {
        type: "text",
        placeholder: "ARRIVAL TO TERMINAL",
        required: false,
        name: "outboundArrivalToTerminal"
      },
      {
        type: "date",
        placeholder: "ARRIVAL DATE",
        required: true,
        name: "outboundArrivalDate"
      },
      {
        type: "time",
        placeholder: "ARRIVAL TIME",
        required: true,
        name: "outboundArrivalTime"
      }
    ]
  },
  step5: {
    label: "GUEST REQUIREMENTS",
    fields: [
      // MEDICAL REQUIREMENT - YES/NO pattern
      {
        type: "checkbox",
        text: "MEDICAL REQUIREMENT",
        required: false,
        name: "medicalRequirementEnabled",
        value: false
      },
      {
        type: "textarea",
        placeholder: "MEDICAL DETAILS",
        required: false,
        name: "medicalRequirementDetails",
        conditional: "medicalRequirementEnabled",
        helperText: "ASTHMA, EPIPEN CARRIER, ETC."
      },
      // DIETARY REQUIREMENT - YES/NO pattern
      {
        type: "checkbox",
        text: "DIETARY",
        required: false,
        name: "dietaryRequirementEnabled",
        value: false
      },
      {
        type: "textarea",
        placeholder: "DIETARY DETAILS",
        required: false,
        name: "dietaryRequirementDetails",
        conditional: "dietaryRequirementEnabled",
        helperText: "VEGAN, HALAL, NO FISH, ETC."
      },
      // ALLERGIES & INTOLERANCES - YES/NO pattern
      {
        type: "checkbox",
        text: "ALLERGIES & INTOLERANCES REQUIREMENTS",
        required: false,
        name: "allergiesIntolerancesEnabled",
        value: false
      },
      {
        type: "textarea",
        placeholder: "ALLERGIES & INTOLERANCES DETAILS",
        required: false,
        name: "allergiesIntolerancesDetails",
        conditional: "allergiesIntolerancesEnabled",
        helperText: "NO SHELLFISH, NO NUTS, NO DAIRY"
      },
      // ACCESSIBILITY NEEDS - YES/NO pattern
      {
        type: "checkbox",
        text: "ACCESSIBILITY NEEDS",
        required: false,
        name: "accessibilityRequirementEnabled",
        value: false
      },
      {
        type: "textarea",
        placeholder: "ACCESSIBILITY DETAILS",
        required: false,
        name: "accessibilityRequirementDetails",
        conditional: "accessibilityRequirementEnabled"
      },
      // ANY OTHER COMMENTS - open text box
      {
        type: "note",
        text: "ANY OTHER COMMENTS",
        name: "_outboundDepartureSection"
      },
      {
        type: "textarea",
        placeholder: "ANY OTHER COMMENTS",
        required: false,
        name: "otherComments"
      }
    ]
  },
  step6: {
    label: "GUEST MERCHANDISE REQUIREMENTS",
    fields: [
      {
        type: "radio",
        placeholder: "MERCHANDISE GENDER",
        required: true,
        name: "merchandiseGender",
        options: [
          { value: "Men", label: "Men" },
          { value: "Women", label: "Women" }
        ]
      },
      {
        type: "select",
        placeholder: "MERCHANDISE SIZE",
        required: true,
        name: "merchandiseSize",
        options: [
          { value: "S", label: "S" },
          { value: "M", label: "M" },
          { value: "L", label: "L" },
          { value: "XL", label: "XL" }
        ]
      }
    ]
  },
  step7: {
    label: "EMERGENCY CONTACT",
    fields: [
      {
        type: "text",
        placeholder: "EMERGENCY CONTACT NAME*",
        required: true,
        name: "emergencyContactName",
        textColor: true
      },
      {
        type: "text",
        placeholder: "EMERGENCY CONTACT PHONE*",
        required: true,
        name: "emergencyContactPhone",
        textColor: true
      },
      {
        type: "text",
        placeholder: "RELATIONSHIP*",
        required: true,
        name: "relationship",
        textColor: true
      },
      {
        type: "email",
        placeholder: "EMERGENCY CONTACT EMAIL",
        required: false,
        name: "emergencyContactEmail",
        textColor: true
      },
      {
        type: "checkbox",
        text: "I agree to the terms & conditions and privacy policy",
        required: true,
        name: "termsAccepted",
        value: false
      }
    ]
  }
};

export interface EditProfileFormData {
  flightInformation: FormStep;
  basicInfo: FormStep;
  dietaryMedical: FormStep;
  merchandise: FormStep;
  emergencyContact: FormStep;
  communicationPreference: FormStep;
}

export const editProfileFormData: EditProfileFormData = {
  basicInfo: {
    label: "",
    fields: [
      {
        type: "text",
        placeholder: "FIRST NAME",
        required: true,
        name: "firstName",
        value: "JOHN"
      },
      {
        type: "text",
        placeholder: "LAST NAME",
        required: true,
        name: "lastName",
        value: "DOE"
      },
      {
        type: "email",
        placeholder: "EMAIL",
        required: true,
        name: "email",
        value: "jcdoe@email.com"
      },
      {
        type: "tel",
        placeholder: "PHONE NUMBER",
        required: true,
        name: "phoneNumber",
        value: "+971 52 111 2255"
      }
    ]
  },
  dietaryMedical: {
    label: "DIETARY & MEDICAL INFO",
    fields: [
      {
        type: "text",
        placeholder: "DIETARY",
        required: true,
        name: "dietary",
        value: "VEGETARIAN"
      },
      {
        type: "text",
        placeholder: "MEDICAL",
        required: true,
        name: "medical",
        value: "DIABETIC"
      }
    ]
  },
  merchandise: {
    label: "MERCHANDISE",
    fields: [
      {
        type: "text",
        placeholder: "SHIRT SIZE",
        required: true,
        name: "shirtSize",
        value: "EXTRA SMALL"
      },
      {
        type: "text",
        placeholder: "JACKET SIZE",
        required: true,
        name: "jacketSize",
        value: "MEDIUM"
      }
    ]
  },
  emergencyContact: {
    label: "EMERGENCY CONTACT*",
    fields: [
      {
        type: "text",
        placeholder: "EMERGENCY CONTACT NAME*",
        required: true,
        name: "emergencyContactName",
        value: "JANE DOE",
        textColor: true
      },
      {
        type: "tel",
        placeholder: "EMERGENCY CONTACT NUMBER*",
        required: true,
        name: "emergencyContactNumber",
        value: "+971 55 444 5566",
        textColor: true
      },
      {
        type: "text",
        placeholder: "RELATIONSHIP*",
        required: true,
        name: "relationship",
        value: "SISTER",
        textColor: true
      }
    ]
  },
  flightInformation: {
    label: "FLIGHT INFORMATION",
    fields: []
  },
  communicationPreference: {
    label: "COMMUNICATION PREFERENCE",
    fields: [
      // {
      //   type: "switch",
      //   text: "WHATSAPP",
      //   required: true,
      //   value: true,
      //   name: "whatsappPreference"
      // },
      {
        type: "switch",
        text: "EMAIL",
        required: true,
        value: false,
        name: "emailPreference"
      }
    ]
  }
};
