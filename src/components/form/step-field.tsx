import React from "react";
import { displayFontBold, bodyFontRegular } from "@/fonts";
import { classNames } from "@/utils";
import Input from "@/components/common/input";
import Textarea from "@/components/common/textarea";
import Switch from "@/components/common/switch";
import TimePicker24H from "@/components/common/time-picker-24h";
import DateTimePicker from "@/components/common/enhanced-datetime-picker";
import { FormField } from "@/utils/form-data";
import { DynamicHotelField } from "./dynamic-hotel-field";
import { DynamicGroupsField } from "./dynamic-groups-field";

interface StepFieldProps {
  field: FormField;
  index: number;
  value: string | boolean;
  error: boolean;
  onInputChange: (name: string, value: string | boolean) => void;
  onSwitchChange: (name: string) => void;
  formValues: Record<string, string | boolean>; // For conditional logic
}

export function StepField({
  field,
  index,
  value,
  error,
  onInputChange,
  onSwitchChange,
  formValues
}: StepFieldProps) {
  // Check conditional logic
  if (field.conditional) {
    const shouldShow = evaluateConditional(field.conditional, formValues);
    if (!shouldShow) return null;
  }

  // Handle hidden fields - they exist in the form but are not rendered
  if (field.type === "hidden") {
    console.log(`🔒 [HIDDEN FIELD] Rendering hidden field: ${field.name}`, {
      name: field.name,
      value: value,
      required: field.required
    });

    return (
      <input
        key={index}
        type="hidden"
        name={field.name || ""}
        value={String(value || "")}
        onChange={(e) => {
          console.log(`🔒 [HIDDEN FIELD] Hidden field changed: ${field.name} = ${e.target.value}`);
          onInputChange(field.name || "", e.target.value);
        }}
      />
    );
  }

  if (field.type === "switch") {
    return (
      <div key={index} className="mb-4 flex w-full items-center justify-between">
        <span
          className={classNames(
            "text-sm tracking-wide text-white uppercase",
            displayFontBold.className
          )}
        >
          {field.text}
        </span>
        <Switch toggle={Boolean(value)} onClick={() => onSwitchChange(field.name || "")} />
        {field.helperText && <p className="mt-1 text-xs text-gray-300">{field.helperText}</p>}
      </div>
    );
  }

  if (field.type === "select") {
    // Special handling for hotel field - dynamic options from event config
    if (field.name === "hotel") {
      const eventId = process.env.NEXT_PUBLIC_EVENT_ID;
      if (!eventId) {
        return (
          <div
            key={index}
            className="rounded-md border border-red-400/40 bg-red-500/10 px-3 py-2 text-xs text-red-100 uppercase"
          >
            Event configuration is missing for this registration link.
          </div>
        );
      }

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

    // Special handling for groups field - dynamic options from event groups
    if (field.name === "groupId") {
      const eventId = process.env.NEXT_PUBLIC_EVENT_ID;
      if (!eventId) {
        return (
          <div
            key={index}
            className="rounded-md border border-red-400/40 bg-red-500/10 px-3 py-2 text-xs text-red-100 uppercase"
          >
            Event configuration is missing for this registration link.
          </div>
        );
      }

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

    // Regular select for other fields
    return (
      <div key={index} className="relative mb-4 flex w-full flex-col items-start">
        <select
          className={classNames(
            "w-full rounded-md px-3 py-1.5 md:py-2 md:text-lg",
            "rounded bg-[#e2e8f0] text-center text-[#64748b] !shadow-[inset_0_5px_8px_rgba(0,0,0,0.25)]",
            "transition-all outline-none focus:!shadow-[inset_0_5px_8px_rgba(0,0,0,0.25)]",
            "cursor-pointer appearance-none",
            bodyFontRegular.className
          )}
          value={String(value || "")}
          required={field.required}
          onChange={(e) => onInputChange(field.name || "", e.target.value)}
        >
          <option value="" className="text-[#64748b]">
            {field.placeholder}
          </option>
          {field.options?.map((option) => (
            <option key={option.value} value={option.value} className="text-black">
              {option.label}
            </option>
          ))}
        </select>
        {field.helperText && <p className="mt-1 text-xs text-gray-300">{field.helperText}</p>}
        {error && field.required && (
          <div className="absolute -bottom-4 mt-1 flex w-full items-center justify-center gap-1 text-center text-[10px] text-red-400 uppercase sm:-bottom-5">
            <span>⚠️ {field.placeholder} is required</span>
          </div>
        )}
      </div>
    );
  }

  if (field.type === "radio") {
    return (
      <div key={index} className="mb-4">
        <label
          className={classNames(
            "mb-3 block text-sm font-bold text-white",
            displayFontBold.className
          )}
        >
          {field.placeholder}
        </label>
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
                  className="before:content[''] peer before:bg-[#d4a574] relative h-4 w-4 cursor-pointer appearance-none rounded-full bg-[#e2e8f0] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:opacity-0 before:transition-opacity checked:bg-[#d4a574] checked:before:bg-[#d4a574] hover:before:opacity-10"
                />
                <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                  <div className="h-2 w-2 rounded-full bg-white"></div>
                </div>
              </label>
            </div>
            <span className={classNames("text-left text-sm text-white", displayFontBold.className)}>
              {option.label}
            </span>
          </label>
        ))}
        {field.helperText && <p className="mt-1 text-xs text-gray-300">{field.helperText}</p>}
        {error && field.required && (
          <p className="mt-1 text-xs text-red-500">{field.placeholder} is required</p>
        )}
      </div>
    );
  }

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
                className="before:content[''] peer before:bg-[#d4a574] relative h-4 w-4 cursor-pointer appearance-none rounded-md bg-[#e2e8f0] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:opacity-0 before:transition-opacity checked:bg-[#d4a574] checked:before:bg-[#d4a574] hover:before:opacity-10"
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
          <span className={classNames("text-left text-sm text-white", displayFontBold.className)}>
            {field.text}
          </span>
        </label>
        {field.helperText && (
          <p className="mt-1 ml-8 text-xs text-gray-300">({field.helperText})</p>
        )}
      </div>
    );
  }

  if (field.type === "note") {
    return (
      <div key={index} className="mt-6 mb-4 pt-1.5">
        <h3
          className={classNames(
            "text-sm font-bold tracking-wider text-white/70 uppercase",
            displayFontBold.className
          )}
        >
          {field.text}
        </h3>
      </div>
    );
  }

  if (field.type === "textarea") {
    return (
      <div key={index}>
        <Textarea
          placeholder={field.placeholder || ""}
          value={String(value || "")}
          required={field.required}
          errorMessage={error && field.required ? `${field.placeholder} is required` : ""}
          onChange={(value) => onInputChange(field.name || "", value)}
        />
        {field.helperText && <p className="mt-1 text-xs text-gray-300">{field.helperText}</p>}
      </div>
    );
  }

  if (field.type === "time") {
    return (
      <div key={index}>
        <TimePicker24H
          placeholder={field.placeholder || ""}
          value={String(value || "")}
          required={field.required}
          error={error}
          errorMessage={error && field.required ? `${field.placeholder} is required` : ""}
          onChange={(value) => onInputChange(field.name || "", value)}
        />
        {field.helperText && <p className="mt-1 text-xs text-gray-300">{field.helperText}</p>}
      </div>
    );
  }

  if (field.type === "datetime") {
    return (
      <div key={index}>
        <DateTimePicker
          placeholder={field.placeholder || ""}
          value={String(value || "")}
          required={field.required}
          error={error}
          errorMessage={error && field.required ? `${field.placeholder} is required` : ""}
          onChange={(value) => onInputChange(field.name || "", value)}
        />
        {field.helperText && <p className="mt-1 text-xs text-gray-300">{field.helperText}</p>}
      </div>
    );
  }

  return (
    <div key={index}>
      <Input
        type={field.type || "text"}
        placeholder={field.placeholder || ""}
        value={String(value || "")}
        required={field.required}
        innerTextColor={field.textColor}
        errorMessage={error && field.required ? `${field.placeholder} is required` : ""}
        onChange={(value) => onInputChange(field.name || "", value)}
        size="full"
      />
      {field.helperText && <p className="mt-1 text-xs text-gray-300">{field.helperText}</p>}
    </div>
  );
}

// Helper function to evaluate conditional logic
function evaluateConditional(
  conditional: string,
  formValues: Record<string, string | boolean>
): boolean {
  try {
    // Simple conditional evaluation
    // Support formats like "accommodationRequired" or "occupancy === 'double'"
    if (conditional.includes("===")) {
      const [fieldName, expectedValue] = conditional.split("===").map((s) => s.trim());
      const cleanExpectedValue = expectedValue.replace(/['"]/g, "");
      return String(formValues[fieldName]) === cleanExpectedValue;
    } else {
      // Simple boolean check
      return Boolean(formValues[conditional]);
    }
  } catch (error) {
    console.error("Error evaluating conditional:", conditional, error);
    return true; // Default to showing the field
  }
}
