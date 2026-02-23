"use client";

import React, { useState, useEffect } from "react";
import { chivasLuxRegular, chivasLoudBold } from "@/fonts";
import { classNames } from "@/utils";
import ReactIcon from "./react-icon";

interface TimePicker24HProps {
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  onChange?: (value: string) => void;
}

const TimePicker24H: React.FC<TimePicker24HProps> = ({
  value = "",
  placeholder = "SELECT TIME",
  disabled = false,
  required = false,
  error = false,
  errorMessage = "",
  onChange
}) => {
  // Parse initial value or default to empty
  const parseTime = (timeString: string) => {
    if (!timeString || !timeString.includes(":")) {
      return { hours: "", minutes: "" };
    }
    const [hours, minutes] = timeString.split(":");
    return {
      hours: hours || "",
      minutes: minutes || ""
    };
  };

  const [time, setTime] = useState(parseTime(value));

  // Update local state when value prop changes
  useEffect(() => {
    setTime(parseTime(value));
  }, [value]);

  // Initialize the form field value on mount to ensure validation works
  useEffect(() => {
    // Only initialize once on mount if no value provided
    if (!value) {
      onChange?.("");
    }
  }, []); // Empty dependency array - only run once on mount

  // Generate hour options (00-23)
  const hourOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, "0");
    return { value: hour, label: hour };
  });

  // Generate minute options (00-59)
  const minuteOptions = Array.from({ length: 60 }, (_, i) => {
    const minute = i.toString().padStart(2, "0");
    return { value: minute, label: minute };
  });

  const handleHourChange = (hours: string) => {
    const newTime = { ...time, hours };
    setTime(newTime);

    // Always call onChange to ensure validation works
    if (newTime.hours && newTime.minutes) {
      onChange?.(`${newTime.hours}:${newTime.minutes}`); // Valid time
    } else {
      onChange?.(""); // Invalid or incomplete time
    }
  };

  const handleMinuteChange = (minutes: string) => {
    const newTime = { ...time, minutes };
    setTime(newTime);

    // Always call onChange to ensure validation works
    if (newTime.hours && newTime.minutes) {
      onChange?.(`${newTime.hours}:${newTime.minutes}`); // Valid time
    } else {
      onChange?.(""); // Invalid or incomplete time
    }
  };

  const baseSelectClasses = classNames(
    "w-full rounded-md px-3 py-1.5 md:py-2 md:text-lg",
    "rounded bg-[#D9D9D9] text-center text-[#878680] !shadow-[inset_0_5px_8px_rgba(0,0,0,0.25)]",
    "transition-all outline-none focus:!shadow-[inset_0_5px_8px_rgba(0,0,0,0.25)]",
    "cursor-pointer appearance-none",
    chivasLuxRegular.className,
    disabled ? "cursor-not-allowed opacity-70" : ""
  );

  return (
    <div className="relative w-full">
      <div className="flex w-full gap-2">
        {/* Hours Select */}
        <div className="flex-1">
          <select
            className={baseSelectClasses}
            value={time.hours}
            onChange={(e) => handleHourChange(e.target.value)}
            disabled={disabled}
            required={required}
          >
            <option value="" className="text-[#878680]">
              HH
            </option>
            {hourOptions.map((option) => (
              <option key={option.value} value={option.value} className="text-black">
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Separator */}
        <div className="flex items-center justify-center px-2">
          <span className={classNames("text-lg text-[#878680]", chivasLuxRegular.className)}>
            :
          </span>
        </div>

        {/* Minutes Select */}
        <div className="flex-1">
          <select
            className={baseSelectClasses}
            value={time.minutes}
            onChange={(e) => handleMinuteChange(e.target.value)}
            disabled={disabled}
            required={required}
          >
            <option value="" className="text-[#878680]">
              MM
            </option>
            {minuteOptions.map((option) => (
              <option key={option.value} value={option.value} className="text-black">
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Error Message Display */}
      {errorMessage && (
        <div
          className={`absolute -bottom-4 mt-1 flex w-full items-center justify-center gap-1 text-center text-[10px] text-red-400 uppercase sm:-bottom-5 ${chivasLoudBold.className}`}
        >
          <ReactIcon icon="RiErrorWarningLine" className="size-3 -translate-y-[0.5px]" />
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default TimePicker24H;
