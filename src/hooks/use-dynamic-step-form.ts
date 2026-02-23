import { useState, useCallback, useEffect } from "react";
import {
  registerAttendee,
  DEFAULT_EVENT_ID,
  type RegistrationPayload
} from "@/services/update-register";
import {
  getEventInfo,
  type RegistrationFormConfig,
  type FormFieldConfig,
  type FormStepConfig
} from "@/services/get-event";
import { STORAGE_KEYS } from "@/types/registration";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";

interface FormValues {
  [key: string]: string | boolean;
}

interface FieldErrors {
  [key: string]: boolean;
}

interface UseDynamicStepFormReturn {
  currentStep: number;
  totalSteps: number;
  currentStepData: FormStepConfig | undefined;
  formValues: FormValues;
  fieldErrors: FieldErrors;
  isSubmitted: boolean;
  termsAccepted: boolean;
  submitting: boolean;
  apiError: string;
  loading: boolean; // Loading form configuration
  configError: string; // Error loading configuration
  handleInputChange: (name: string, value: string | boolean) => void;
  handleSwitchChange: (name: string) => void;
  handleNext: () => void;
  handleBack: () => void;
  setTermsAccepted: (accepted: boolean) => void;
  resetForm: () => void;
}

export function useDynamicStepForm(): UseDynamicStepFormReturn {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [configError, setConfigError] = useState<string>("");
  const [formConfig, setFormConfig] = useState<RegistrationFormConfig | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [formValues, setFormValues] = useState<FormValues>({});
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string>("");

  // Fetch form configuration on mount
  useEffect(() => {
    async function fetchFormConfig() {
      if (!DEFAULT_EVENT_ID) {
        setConfigError("Event ID is not configured");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        console.log("📡 [FETCH CONFIG] Fetching form configuration for event:", DEFAULT_EVENT_ID);
        const result = await getEventInfo(DEFAULT_EVENT_ID);

        if (result.success && result.data.registrationFormConfig) {
          console.log(
            "✅ [FETCH CONFIG] Form configuration loaded successfully:",
            result.data.registrationFormConfig
          );
          console.log(
            "📋 [FETCH CONFIG] Form steps:",
            Object.keys(result.data.registrationFormConfig)
          );

          // Log all fields in all steps
          Object.entries(result.data.registrationFormConfig).forEach(([stepKey, stepData]) => {
            console.log(
              `📋 [FETCH CONFIG] ${stepKey} fields:`,
              (stepData as FormStepConfig).fields.map((f) => `${f.name} (${f.type})`)
            );
          });

          setFormConfig(result.data.registrationFormConfig);
          setConfigError("");
        } else {
          console.error("❌ [FETCH CONFIG] Failed to load form configuration");
          setConfigError("Failed to load form configuration");
        }
      } catch (error) {
        console.error("❌ [FETCH CONFIG] Error fetching form config:", error);
        setConfigError("Failed to load form configuration");
      } finally {
        setLoading(false);
      }
    }

    fetchFormConfig();
  }, []);

  // Parse URL parameters for auto-fill functionality
  const parseUrlParams = useCallback(() => {
    const urlParams: FormValues = {};

    console.log("🔍 [URL PARAMS] Starting to parse URL parameters...");
    console.log("🔍 [URL PARAMS] searchParams object:", searchParams);
    console.log("🔍 [URL PARAMS] searchParams size:", searchParams.size);
    console.log(
      "🔍 [URL PARAMS] Current URL:",
      typeof window !== "undefined" ? window.location.href : "SSR"
    );
    console.log(
      "🔍 [URL PARAMS] Search string:",
      typeof window !== "undefined" ? window.location.search : "SSR"
    );

    // Parse all URL search parameters
    searchParams.forEach((value, key) => {
      console.log(`🔍 [URL PARAMS] Found param: ${key} = ${value}`);

      // Convert string values to appropriate types
      if (value === "true") {
        urlParams[key] = true;
        console.log(`✅ [URL PARAMS] Converted ${key} to boolean: true`);
      } else if (value === "false") {
        urlParams[key] = false;
        console.log(`✅ [URL PARAMS] Converted ${key} to boolean: false`);
      } else {
        urlParams[key] = decodeURIComponent(value);
        console.log(`✅ [URL PARAMS] Set ${key} to string: ${decodeURIComponent(value)}`);
      }
    });

    console.log("🔍 [URL PARAMS] Final parsed URL params:", urlParams);
    console.log("🔍 [URL PARAMS] Total params found:", Object.keys(urlParams).length);
    return urlParams;
  }, [searchParams]);

  // Load saved form data and URL parameters on mount
  useEffect(() => {
    console.log("🚀 [FORM INIT] Initializing form values...");

    if (typeof window !== "undefined") {
      let initialValues: FormValues = {};

      // First, load saved data from localStorage
      const savedData = localStorage.getItem(STORAGE_KEYS.REGISTRATION_DRAFT);
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData);
          initialValues = parsed.formValues || {};
          setCurrentStep(parsed.currentStep || 1);
          setTermsAccepted(parsed.termsAccepted || false);
          console.log("💾 [FORM INIT] Loaded saved data from localStorage:", initialValues);
        } catch (error) {
          console.warn("⚠️ [FORM INIT] Failed to load saved form data:", error);
          localStorage.removeItem(STORAGE_KEYS.REGISTRATION_DRAFT);
        }
      } else {
        console.log("💾 [FORM INIT] No saved data found in localStorage");
      }

      // Then, override with URL parameters (URL params take priority)
      const urlParams = parseUrlParams();
      if (Object.keys(urlParams).length > 0) {
        console.log("🔗 [FORM INIT] Auto-filling form from URL parameters:", urlParams);
        initialValues = { ...initialValues, ...urlParams };
        console.log("🔗 [FORM INIT] Merged form values:", initialValues);

        // Store URL params in sessionStorage to persist through redirects
        sessionStorage.setItem("registration_url_params", JSON.stringify(urlParams));
        console.log("💾 [FORM INIT] Stored URL params in sessionStorage");
      } else {
        console.log("🔗 [FORM INIT] No URL parameters found in current URL");

        // Check if we have URL params from a previous redirect
        const storedUrlParams = sessionStorage.getItem("registration_url_params");
        if (storedUrlParams) {
          try {
            const parsedUrlParams = JSON.parse(storedUrlParams);
            console.log("🔗 [FORM INIT] Restoring URL parameters from session:", parsedUrlParams);
            initialValues = { ...initialValues, ...parsedUrlParams };
          } catch (error) {
            console.warn("⚠️ [FORM INIT] Failed to parse stored URL params:", error);
            sessionStorage.removeItem("registration_url_params");
          }
        } else {
          console.log("💾 [FORM INIT] No stored URL params found in sessionStorage");
        }
      }

      console.log("✅ [FORM INIT] Final initial values being set:", initialValues);
      setFormValues(initialValues);
    }
  }, [parseUrlParams]);

  // Save form data whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined" && Object.keys(formValues).length > 0) {
      const dataToSave = {
        formValues,
        currentStep,
        termsAccepted,
        savedAt: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEYS.REGISTRATION_DRAFT, JSON.stringify(dataToSave));
    }
  }, [formValues, currentStep, termsAccepted]);

  // Clear conditional field values when parent condition changes
  useEffect(() => {
    if (!formConfig) return;

    const allFields = getAllFieldsFromConfig(formConfig);
    const fieldsToClean: string[] = [];

    // Find all conditional fields whose conditions are now false
    allFields.forEach((field) => {
      if (field.conditional) {
        const shouldShow = evaluateConditional(field.conditional, formValues);
        if (!shouldShow && formValues[field.name] !== undefined) {
          fieldsToClean.push(field.name);
        }
      }
    });

    if (fieldsToClean.length > 0) {
      setFormValues((prev) => {
        const cleaned = { ...prev };
        fieldsToClean.forEach((fieldName) => {
          delete cleaned[fieldName];
        });
        return cleaned;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formConfig]);

  const totalSteps = formConfig ? Object.keys(formConfig).length : 0;
  const currentStepData = formConfig ? formConfig[`step${currentStep}`] : undefined;

  const handleInputChange = useCallback(
    (name: string, value: string | boolean) => {
      console.log(`📝 [INPUT CHANGE] Field: ${name}, Value:`, value);

      setFormValues((prev) => {
        const newValues = {
          ...prev,
          [name]: value
        };
        console.log(`📝 [INPUT CHANGE] Updated form values:`, newValues);
        return newValues;
      });

      if (fieldErrors[name] === true) {
        setFieldErrors((prev) => ({
          ...prev,
          [name]: false
        }));
      }
    },
    [fieldErrors]
  );

  const handleSwitchChange = useCallback(
    (name: string) => {
      setFormValues((prev) => ({
        ...prev,
        [name]: !prev[name]
      }));

      if (fieldErrors[name] === true) {
        setFieldErrors((prev) => ({
          ...prev,
          [name]: false
        }));
      }
    },
    [fieldErrors]
  );

  // Helper function for conditional evaluation
  const evaluateConditional = useCallback(
    (conditional: string | undefined, formValues: Record<string, string | boolean>): boolean => {
      if (!conditional) return true;

      try {
        if (conditional.includes("===")) {
          const [fieldName, expectedValue] = conditional.split("===").map((s) => s.trim());
          const cleanExpectedValue = expectedValue.replace(/['"]/g, "");
          return String(formValues[fieldName]) === cleanExpectedValue;
        } else if (conditional.includes("!==")) {
          const [fieldName, expectedValue] = conditional.split("!==").map((s) => s.trim());
          const cleanExpectedValue = expectedValue.replace(/['"]/g, "");
          return String(formValues[fieldName]) !== cleanExpectedValue;
        } else if (conditional.includes("=== true")) {
          const fieldName = conditional.replace("=== true", "").trim();
          return formValues[fieldName] === true;
        } else if (conditional.includes("=== false")) {
          const fieldName = conditional.replace("=== false", "").trim();
          return formValues[fieldName] === false;
        } else {
          return Boolean(formValues[conditional]);
        }
      } catch (error) {
        console.error("Error evaluating conditional:", conditional, error);
        return true;
      }
    },
    []
  );

  const scrollToFirstError = useCallback(() => {
    const errorElement = document.querySelector('[class*="text-red-400"], [class*="text-red-500"]');

    if (errorElement) {
      errorElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest"
      });
    }
  }, []);

  const buildPayload = useCallback((): RegistrationPayload => {
    if (!formConfig) {
      throw new Error("Form configuration not loaded");
    }

    // Extract email from form values
    const email = String(formValues.email || "").trim();
    if (!email) {
      throw new Error("Email is required");
    }

    // Build formResponses array with metadata
    const formResponses: Array<{
      fieldName: string;
      fieldLabel: string;
      fieldType: string;
      value: string | boolean | number | null | undefined;
      step: string;
      order: number;
    }> = [];

    // Loop through all steps and fields to build responses
    Object.entries(formConfig).forEach(([stepKey, stepData]) => {
      stepData.fields.forEach((field) => {
        // Get value from formValues
        const value = formValues[field.name];

        // Skip if no value (except for boolean fields)
        if (value === undefined || value === null || value === "") {
          if (field.type !== "switch" && field.type !== "checkbox") {
            return;
          }
        }

        // Add to formResponses with metadata
        formResponses.push({
          fieldName: field.name,
          fieldLabel: field.label,
          fieldType: field.type,
          value: value,
          step: stepKey,
          order: field.order || 0
        });
      });
    });

    // Communication preferences - default to opt-in
    const communication = {
      emailOptIn: formValues.emailOptIn !== undefined ? Boolean(formValues.emailOptIn) : true,
      whatsappOptIn:
        formValues.whatsappOptIn !== undefined ? Boolean(formValues.whatsappOptIn) : false
    };

    const payload: RegistrationPayload = {
      email,
      formResponses,
      communication,
      groupId: String(formValues.groupId || "").trim() || undefined
    };

    return payload;
  }, [formValues, formConfig]);

  const handleSubmit = useCallback(async () => {
    try {
      setSubmitting(true);
      setApiError("");

      const payload = buildPayload();
      const result = await registerAttendee(DEFAULT_EVENT_ID!, payload);

      if (result.success) {
        console.log("✅ Registration successful, preparing redirection...");

        // Extract first/last name from formResponses for confirmation page
        const firstName =
          payload.formResponses.find((r) => r.fieldName === "firstName")?.value || "";
        const lastName = payload.formResponses.find((r) => r.fieldName === "lastName")?.value || "";
        const phone =
          payload.formResponses.find(
            (r) => r.fieldName === "phone" || r.fieldName === "phoneNumber"
          )?.value || "";

        const profile = {
          email: payload.email,
          fullName: `${firstName} ${lastName}`.trim(),
          phone: phone
        };
        Cookies.set("register_profile", JSON.stringify(profile));

        // Clear saved draft data on successful submission
        localStorage.removeItem(STORAGE_KEYS.REGISTRATION_DRAFT);

        console.log("🎯 Redirecting to confirmation page...");

        // Keep loading state during redirect
        setTimeout(() => {
          console.log("🚀 Executing redirect now...");
          window.location.href = "/confirmation";
        }, 100);

        return;
      } else {
        const friendly =
          result.error === "User already registered"
            ? "This email is already registered for the event."
            : result.error === "Registration is closed for this event"
              ? "Registration is currently closed for this event."
              : result.error === "Event not found"
                ? "The event could not be found."
                : result.message || result.error || "Registration failed";
        setApiError(friendly);
        setSubmitting(false);
      }
    } catch {
      setApiError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }, [buildPayload]);

  const validateCurrentStep = useCallback(() => {
    if (!currentStepData) return false;

    const newErrors: FieldErrors = {};
    let isValid = true;

    currentStepData.fields.forEach((field) => {
      if (field.name?.startsWith("_")) return;

      // Check conditional logic
      if (field.conditional) {
        const shouldShow = evaluateConditional(field.conditional, formValues);
        if (!shouldShow) return;
      }

      const value = formValues[field.name || ""];

      // Skip validation for non-required empty fields (unless they have special rules like minAge)
      const hasValue = value !== undefined && value !== "" && value !== null;
      const hasSpecialRules =
        field.validation?.minAge ||
        field.validation?.maxAge ||
        field.validation?.minDate ||
        field.validation?.maxDate;

      if (!field.required && !field.validation?.required && !hasValue && !hasSpecialRules) {
        return;
      }

      // If field is not required but has a value, validate it
      // If field has age rules, validate age even if field is optional

      let fieldValid = true;

      // Type-based validation
      switch (field.type) {
        case "switch":
          fieldValid = typeof value === "boolean";
          break;
        case "checkbox":
          fieldValid = Boolean(value);
          break;
        case "time":
          const timeString = typeof value === "string" ? value.trim() : "";
          fieldValid = timeString !== "" && timeString.includes(":") && timeString.length === 5;
          break;
        case "email":
          const emailValue = typeof value === "string" ? value.trim() : "";
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          fieldValid = emailValue !== "" && emailRegex.test(emailValue);
          break;
        case "url":
          const urlValue = typeof value === "string" ? value.trim() : "";
          try {
            new URL(urlValue);
            fieldValid = true;
          } catch {
            fieldValid = false;
          }
          break;
        case "tel":
          const phoneValue = typeof value === "string" ? value.trim() : "";
          // Basic phone validation
          fieldValid = phoneValue !== "" && phoneValue.replace(/\D/g, "").length >= 10;
          break;
        case "number":
          fieldValid = !isNaN(Number(value));
          break;
        default:
          fieldValid = typeof value === "string" && value.trim() !== "";
      }

      // Additional validation rules from config
      if (fieldValid && field.validation) {
        const stringValue = String(value);

        if (field.validation.minLength && stringValue.length < field.validation.minLength) {
          fieldValid = false;
        }

        if (field.validation.maxLength && stringValue.length > field.validation.maxLength) {
          fieldValid = false;
        }

        if (field.validation.min && Number(value) < field.validation.min) {
          fieldValid = false;
        }

        if (field.validation.max && Number(value) > field.validation.max) {
          fieldValid = false;
        }

        if (field.validation.pattern) {
          try {
            const regex = new RegExp(field.validation.pattern);
            if (!regex.test(stringValue)) {
              fieldValid = false;
            }
          } catch (error) {
            console.error("Invalid regex pattern:", field.validation.pattern);
          }
        }

        // Age validation for date fields
        if (field.type === "date" && stringValue) {
          try {
            const birthDate = new Date(stringValue);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();

            // Adjust age if birthday hasn't occurred this year
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
              age--;
            }

            // Check minimum age (e.g., 21 for age gating)
            if (field.validation.minAge && age < field.validation.minAge) {
              fieldValid = false;
            }

            // Check maximum age
            if (field.validation.maxAge && age > field.validation.maxAge) {
              fieldValid = false;
            }
          } catch (error) {
            console.error("Invalid date for age validation:", stringValue);
          }
        }
      }

      if (!fieldValid) {
        newErrors[field.name || ""] = true;
        isValid = false;
      }
    });

    setFieldErrors((prev) => ({
      ...prev,
      ...newErrors
    }));

    if (!isValid) {
      setTimeout(() => {
        scrollToFirstError();
      }, 100);
    }

    return isValid;
  }, [currentStepData, formValues, evaluateConditional, scrollToFirstError]);

  const handleNext = useCallback(() => {
    if (!formConfig) return;

    if (currentStep === totalSteps) {
      if (submitting) return;
      void handleSubmit();
      return;
    }

    if (validateCurrentStep()) {
      setCurrentStep((prev) => prev + 1);
      setFieldErrors({});
    }
  }, [formConfig, currentStep, totalSteps, submitting, handleSubmit, validateCurrentStep]);

  const handleBack = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      setFieldErrors({});
    }
  }, [currentStep]);

  const resetForm = useCallback(() => {
    setIsSubmitted(false);
    setCurrentStep(1);
    setFormValues({});
    setTermsAccepted(false);
    setFieldErrors({});
    setApiError("");

    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEYS.REGISTRATION_DRAFT);
    }
  }, []);

  return {
    currentStep,
    totalSteps,
    currentStepData,
    formValues,
    fieldErrors,
    isSubmitted,
    termsAccepted,
    submitting,
    apiError,
    loading,
    configError,
    handleInputChange,
    handleSwitchChange,
    handleNext,
    handleBack,
    setTermsAccepted,
    resetForm
  };
}

// Helper function to get all fields from config
function getAllFieldsFromConfig(config: RegistrationFormConfig): FormFieldConfig[] {
  const fields: FormFieldConfig[] = [];
  Object.values(config).forEach((step) => {
    if (step && step.fields) {
      fields.push(...step.fields);
    }
  });
  return fields;
}

// Re-export conditional evaluator for use in components
export function evaluateConditional(
  conditional: string | undefined,
  formValues: Record<string, string | boolean>
): boolean {
  if (!conditional) return true;

  try {
    if (conditional.includes("===")) {
      const [fieldName, expectedValue] = conditional.split("===").map((s) => s.trim());
      const cleanExpectedValue = expectedValue.replace(/['"]/g, "");
      return String(formValues[fieldName]) === cleanExpectedValue;
    } else if (conditional.includes("!==")) {
      const [fieldName, expectedValue] = conditional.split("!==").map((s) => s.trim());
      const cleanExpectedValue = expectedValue.replace(/['"]/g, "");
      return String(formValues[fieldName]) !== cleanExpectedValue;
    } else if (conditional.includes("=== true")) {
      const fieldName = conditional.replace("=== true", "").trim();
      return formValues[fieldName] === true;
    } else if (conditional.includes("=== false")) {
      const fieldName = conditional.replace("=== false", "").trim();
      return formValues[fieldName] === false;
    } else {
      return Boolean(formValues[conditional]);
    }
  } catch (error) {
    console.error("Error evaluating conditional:", conditional, error);
    return true;
  }
}
