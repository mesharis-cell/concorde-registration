import React from "react";
import { chivasLoudBold, chivasLuxRegular } from "@/fonts";
import { classNames } from "@/utils";
import Input from "@/components/common/input";
import Textarea from "@/components/common/textarea";
import Switch from "@/components/common/switch";
import TimePicker24H from "@/components/common/time-picker-24h";
import DateTimePicker from "@/components/common/enhanced-datetime-picker";
import PhoneInput from "@/components/common/phone-input";
import { DynamicHotelField } from "./dynamic-hotel-field";
import { DynamicGroupsField } from "./dynamic-groups-field";
import type { FormFieldConfig } from "@/services/get-event";
import { evaluateConditional } from "@/hooks/use-dynamic-step-form";
import ReactIcon from "../common/react-icon";

interface DynamicStepFieldProps {
  field: FormFieldConfig;
  index: number;
  value: string | boolean;
  error: boolean;
  onInputChange: (name: string, value: string | boolean) => void;
  onSwitchChange: (name: string) => void;
  formValues: Record<string, string | boolean>;
}

export function DynamicStepField({
  field,
  index,
  value,
  error,
  onInputChange,
  onSwitchChange,
  formValues
}: DynamicStepFieldProps) {
  // Check conditional logic
  if (field.conditional) {
    const shouldShow = evaluateConditional(field.conditional, formValues);
    if (!shouldShow) return null;
  }

  // Switch/Toggle field
  if (field.type === "switch") {
    return (
      <div key={index} className="mb-4 flex w-full items-center gap-2">
        <div className="flex flex-col items-start">
          <span
            className={classNames(
              "text-[13px] tracking-wide text-white uppercase",
              chivasLoudBold.className
            )}
            dangerouslySetInnerHTML={{ __html: field.label }}
          />
          {field.helperText && (
            <p
              className="mt-1 max-w-[75%] text-xs text-gray-300"
              dangerouslySetInnerHTML={{ __html: field.helperText }}
            />
          )}
        </div>
        <Switch
          toggle={Boolean(value)}
          toggleTextTrue="YES"
          toggleTextFalse="NO"
          onClick={() => onSwitchChange(field.name || "")}
        />
      </div>
    );
  }

  // Special handling for dynamic hotel field
  if (field.type === "dynamic-hotel-select" || field.name === "hotel") {
    const eventId = process.env.NEXT_PUBLIC_EVENT_ID;
    if (!eventId) throw new Error("Event ID not found");

    return (
      <DynamicHotelField
        key={index}
        value={String(value || "")}
        onChange={(newValue) => onInputChange(field.name || "", newValue)}
        error={error}
        placeholder={field.placeholder || ""}
        eventId={eventId}
        required={field.required}
      />
    );
  }

  // Special handling for dynamic groups field
  if (field.type === "dynamic-groups-select" || field.name === "groupId") {
    const eventId = process.env.NEXT_PUBLIC_EVENT_ID;
    if (!eventId) throw new Error("Event ID not found");

    return (
      <DynamicGroupsField
        key={index}
        value={String(value || "")}
        onChange={(newValue) => onInputChange(field.name || "", newValue)}
        error={error}
        placeholder={field.placeholder || ""}
        eventId={eventId}
        required={field.required}
      />
    );
  }

  // Select dropdown
  if (field.type === "select") {
    return (
      <div key={index} className="relative mb-4 flex w-full flex-col items-start">
        <select
          className={classNames(
            "w-full rounded-md px-3 py-1.5 md:py-2 md:text-lg",
            "rounded bg-[#D9D9D9] text-center text-[#878680] !shadow-[inset_0_5px_8px_rgba(0,0,0,0.25)]",
            "transition-all outline-none focus:!shadow-[inset_0_5px_8px_rgba(0,0,0,0.25)]",
            "cursor-pointer appearance-none",
            chivasLuxRegular.className,
            error ? "border-2 border-red-400" : ""
          )}
          value={String(value || "")}
          required={field.required}
          onChange={(e) => onInputChange(field.name || "", e.target.value)}
        >
          {field.placeholder && (
            <option value="" className="text-[#878680]">
              {field.placeholder}
            </option>
          )}
          {field.options?.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
              className="text-black"
            >
              {option.label}
            </option>
          ))}
        </select>
        {error && field.required ? (
          <div className="absolute -bottom-4 mt-1 flex w-full items-center justify-center gap-1 rounded-b-md bg-red-600/10 text-center text-[10px] text-red-100 uppercase sm:-bottom-5">
            <span dangerouslySetInnerHTML={{ __html: `${field.label} is required` }} />
          </div>
        ) : field.helperText ? (
          <p
            className="mt-1 text-xs text-gray-300"
            dangerouslySetInnerHTML={{ __html: field.helperText }}
          />
        ) : null}
      </div>
    );
  }

  // Radio buttons
  if (field.type === "radio") {
    return (
      <div key={index} className="mb-4">
        <label
          className={classNames(
            "mb-3 block text-sm font-bold text-white uppercase",
            chivasLoudBold.className
          )}
          dangerouslySetInnerHTML={{ __html: field.label }}
        />
        {field.options?.map((option) => (
          <label key={option.value} className="mb-3 flex cursor-pointer items-start space-x-4">
            <div className="inline-flex items-center">
              <label className="relative mt-[3px] flex cursor-pointer items-center rounded-full">
                <input
                  type="radio"
                  name={field.name}
                  value={option.value}
                  checked={String(value) === option.value}
                  onChange={(e) => onInputChange(field.name || "", e.target.value)}
                  disabled={option.disabled}
                  className="before:content[''] peer before:bg-blue-gray-500 relative h-4 w-4 cursor-pointer appearance-none rounded-full bg-[#D9D9D9] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:opacity-0 before:transition-opacity checked:bg-[#E2C17E] checked:before:bg-[#E2C17E] hover:before:opacity-10"
                />
                <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                  <div className="h-2 w-2 rounded-full bg-white"></div>
                </div>
              </label>
            </div>
            <span
              className={classNames("text-left text-sm text-white", chivasLoudBold.className)}
              dangerouslySetInnerHTML={{ __html: option.label }}
            />
          </label>
        ))}
        {error && field.required ? (
          <p
            className="mt-1 rounded-b-md bg-red-600/10 text-xs font-bold text-red-600 uppercase"
            dangerouslySetInnerHTML={{ __html: `${field.label} is required` }}
          />
        ) : field.helperText ? (
          <p
            className="mt-1 rounded-b-md bg-red-600/10 text-xs font-bold text-red-600 uppercase"
            dangerouslySetInnerHTML={{ __html: field.helperText }}
          />
        ) : null}
      </div>
    );
  }

  // Checkbox field
  if (field.type === "checkbox") {
    return (
      <div key={index} className="mb-4">
        <label className="flex cursor-pointer items-start space-x-4">
          <div className="inline-flex items-center">
            <label className="relative mt-[3px] flex cursor-pointer items-center rounded-full">
              <input
                type="checkbox"
                checked={Boolean(value)}
                onChange={(e) => onInputChange(field.name || "", e.target.checked)}
                className="before:content[''] peer before:bg-blue-gray-500 relative h-4 w-4 cursor-pointer appearance-none rounded-md bg-[#D9D9D9] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:opacity-0 before:transition-opacity checked:bg-[#E2C17E] checked:before:bg-[#E2C17E] hover:before:opacity-10"
              />
              <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            </label>
          </div>
          <span
            className={classNames("text-left text-sm text-white", chivasLoudBold.className)}
            dangerouslySetInnerHTML={{ __html: field.label }}
          />
        </label>
        {error && field.required ? (
          <p
            className="mt-1 ml-8 rounded-b-md bg-red-600/10 text-xs font-bold text-red-600 uppercase"
            dangerouslySetInnerHTML={{ __html: `${field.label} is required` }}
          />
        ) : field.helperText ? (
          <p
            className="mt-1 ml-8 text-xs text-gray-300"
            dangerouslySetInnerHTML={{ __html: field.helperText }}
          />
        ) : null}
      </div>
    );
  }

  // Textarea field
  if (field.type === "textarea") {
    const getTextareaErrorMessage = (): string => {
      if (!error) return "";

      if (field.validation?.message) {
        return field.validation.message;
      }

      if (field.required) {
        return `${field.label} is required`;
      }

      const stringValue = String(value || "");

      if (field.validation?.maxLength && stringValue.length > field.validation.maxLength) {
        return `${field.label} must be ${field.validation.maxLength} characters or less`;
      }

      if (field.validation?.minLength && stringValue.length < field.validation.minLength) {
        return `${field.label} must be at least ${field.validation.minLength} characters`;
      }

      return `${field.label} is invalid`;
    };

    return (
      <div key={index}>
        <Textarea
          placeholder={field.placeholder || ""}
          value={String(value || "")}
          required={field.required}
          errorMessage={getTextareaErrorMessage()}
          onChange={(value) => onInputChange(field.name || "", value)}
          rows={field.rows}
        />
        {!error && field.helperText && (
          <p
            className="mt-1 text-xs text-gray-300"
            dangerouslySetInnerHTML={{ __html: field.helperText }}
          />
        )}
      </div>
    );
  }

  // Time picker
  if (field.type === "time") {
    const getTimeErrorMessage = (): string => {
      if (!error) return "";

      if (field.validation?.message) {
        return field.validation.message;
      }

      if (field.required) {
        return `${field.label} is required`;
      }

      return `${field.label} is invalid`;
    };

    return (
      <div key={index}>
        <TimePicker24H
          placeholder={field.placeholder || ""}
          value={String(value || "")}
          required={field.required}
          error={error}
          errorMessage={getTimeErrorMessage()}
          onChange={(value) => onInputChange(field.name || "", value)}
        />
        {!error && field.helperText && (
          <p
            className="mt-1 text-xs text-gray-300"
            dangerouslySetInnerHTML={{ __html: field.helperText }}
          />
        )}
      </div>
    );
  }

  // Date field (HTML5 native date input)
  if (field.type === "date") {
    const dateInputValue = value ? new Date(String(value)).toISOString().split("T")[0] : "";

    // Get error message based on validation type
    const getDateErrorMessage = (): string => {
      if (!error) return "";
      if (!field.required && !value) return "";

      // Check age validation first
      if (field.validation?.minAge && value) {
        const birthDate = new Date(String(value));
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        if (age < field.validation.minAge) {
          return (
            field.validation.message || `You must be at least ${field.validation.minAge} years old`
          );
        }
      }

      if (field.validation?.maxAge && value) {
        const birthDate = new Date(String(value));
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        if (age > field.validation.maxAge) {
          return (
            field.validation.message ||
            `You must be no more than ${field.validation.maxAge} years old`
          );
        }
      }

      return field.validation?.message || `${field.label} is required`;
    };

    const errorMsg = getDateErrorMessage();

    return (
      <div key={index} className="relative">
        <input
          type="date"
          value={dateInputValue}
          onChange={(e) => {
            if (e.target.value) {
              const date = new Date(e.target.value);
              date.setHours(12, 0, 0, 0);
              onInputChange(field.name || "", date.toISOString());
            } else {
              onInputChange(field.name || "", "");
            }
          }}
          min={
            field.validation?.minDate
              ? new Date(field.validation.minDate).toISOString().split("T")[0]
              : undefined
          }
          max={
            field.validation?.maxDate
              ? new Date(field.validation.maxDate).toISOString().split("T")[0]
              : undefined
          }
          required={field.required}
          placeholder={field.placeholder || ""}
          className={classNames(
            "w-full rounded-md px-3 py-1.5 md:py-2 md:text-lg",
            "rounded bg-[#D9D9D9] text-center !text-[#878680] !shadow-[inset_0_5px_8px_rgba(0,0,0,0.25)]",
            "transition-all outline-none focus:!shadow-[inset_0_5px_8px_rgba(0,0,0,0.25)]",
            chivasLuxRegular.className,
            error ? "border-red-500" : ""
          )}
        />
        {errorMsg ? (
          <div className="absolute -bottom-4 mt-1 flex w-full items-center justify-center gap-1 rounded-b-md bg-red-600/10 text-center text-[10px] font-bold text-red-100 uppercase sm:-bottom-5">
            <span dangerouslySetInnerHTML={{ __html: errorMsg }} />
          </div>
        ) : field.helperText ? (
          <p
            className="mt-1 text-xs text-gray-300"
            dangerouslySetInnerHTML={{ __html: field.helperText }}
          />
        ) : null}
      </div>
    );
  }

  // DateTime picker (date + time)
  if (field.type === "datetime") {
    const getDateTimeErrorMessage = (): string => {
      if (!error) return "";

      if (field.validation?.message) {
        return field.validation.message;
      }

      if (field.required) {
        return `${field.label} is required`;
      }

      return `${field.label} is invalid`;
    };

    return (
      <div key={index}>
        <DateTimePicker
          placeholder={field.placeholder || ""}
          value={String(value || "")}
          required={field.required}
          error={error}
          errorMessage={getDateTimeErrorMessage()}
          onChange={(value) => onInputChange(field.name || "", value)}
          dateFormat={field.dateFormat}
          minDate={field.validation?.minDate}
          maxDate={field.validation?.maxDate}
        />
        {!error && field.helperText && (
          <p
            className="mt-1 text-xs text-gray-300"
            dangerouslySetInnerHTML={{ __html: field.helperText }}
          />
        )}
      </div>
    );
  }

  // Phone input (international)
  if (field.type === "tel") {
    const getPhoneErrorMessage = (): string => {
      if (!error) return "";

      if (field.validation?.message) {
        return field.validation.message;
      }

      if (field.required) {
        return `${field.label} is required`;
      }

      return "Please enter a valid phone number";
    };

    return (
      <div key={index}>
        <PhoneInput
          placeholder={field.placeholder || ""}
          value={String(value || "")}
          required={field.required}
          error={error}
          errorMessage={getPhoneErrorMessage()}
          onChange={(value) => onInputChange(field.name || "", value)}
          defaultCountry={field.defaultCountry || "AE"}
        />
        {!error && field.helperText && (
          <p
            className="mt-1 text-xs text-gray-300"
            dangerouslySetInnerHTML={{ __html: field.helperText }}
          />
        )}
      </div>
    );
  }

  // Default: Text input and variations (text, email, url, password, number)
  const getErrorMessage = (): string => {
    if (!error) return "";

    // Use custom validation message if provided
    if (field.validation?.message) {
      return field.validation.message;
    }

    // Required field error
    if (field.required) {
      return `${field.label} is required`;
    }

    // Validation errors for non-required fields
    const stringValue = String(value || "");

    if (field.validation?.maxLength && stringValue.length > field.validation.maxLength) {
      return `${field.label} must be ${field.validation.maxLength} characters or less`;
    }

    if (field.validation?.minLength && stringValue.length < field.validation.minLength) {
      return `${field.label} must be at least ${field.validation.minLength} characters`;
    }

    if (field.type === "email") {
      return "Please enter a valid email address";
    }

    if (field.type === "url") {
      return "Please enter a valid URL";
    }

    if (field.type === "tel") {
      return "Please enter a valid phone number";
    }

    if (field.validation?.pattern) {
      return `${field.label} format is invalid`;
    }

    // Generic fallback
    return `${field.label} is invalid`;
  };

  return (
    <div key={index}>
      <Input
        type={field.type || "text"}
        placeholder={field.placeholder || ""}
        value={String(value || "")}
        required={field.required}
        errorMessage={getErrorMessage()}
        onChange={(value) => onInputChange(field.name || "", value)}
        size="full"
      />
      {!error && field.helperText && (
        <p
          className="mt-1 text-xs text-gray-300"
          dangerouslySetInnerHTML={{ __html: field.helperText }}
        />
      )}
    </div>
  );
}
