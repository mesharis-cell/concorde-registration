"use client";

import React, { useEffect, useRef, useState } from "react";
import { displayFontBold, bodyFontRegular } from "@/fonts";
import { classNames } from "@/utils";

interface InputProps {
  id?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  errorMessage?: string;
  innerTextColor?: boolean;
  label?: string;
  size?: "sm" | "md" | "lg" | "default" | "full";
  onChange?: (value: string) => void;
}

const Input: React.FC<InputProps> = ({
  id = "",
  type = "text",
  placeholder = "",
  value: initialValue = "",
  disabled = false,
  required = false,
  className = "",
  errorMessage = "",
  label = "",
  size = "default",
  innerTextColor = false,
  onChange
}) => {
  const [value, setValue] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const sizeClasses = {
    sm: "p-2 text-sm",
    md: "p-2.5 text-base",
    lg: "px-4 py-3 text-base",
    full: "w-full px-4 py-3 text-base rounded-lg",
    default: "px-4 py-3 text-base rounded-lg"
  }[size];

  const inputClasses = classNames(sizeClasses, className);

  // Check if this is a date or time input
  const isDateTimeInput = type === "date" || type === "time";

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    onChange?.(newValue);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleShortcut = (event: KeyboardEvent) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      inputRef.current?.focus();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleShortcut);
    return () => {
      window.removeEventListener("keydown", handleShortcut);
    };
  }, []);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const renderLabel = () => {
    if (!label) return null;

    return (
      <div className="mb-1 ml-1 flex items-center space-x-2">
        <label
          htmlFor={id}
          className={`block text-xs leading-5 font-medium tracking-[0.08em] text-white/80 ${displayFontBold.className}`}
        >
          {label}
        </label>
      </div>
    );
  };

  return (
    <div className="relative flex w-full flex-col items-start">
      {renderLabel()}

      <input
        type={isDateTimeInput && !isFocused ? "text" : type}
        disabled={disabled}
        required={required}
        value={isDateTimeInput && !isFocused && !value ? "" : value}
        placeholder={placeholder}
        id={id || undefined}
        onChange={handleInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
        ref={inputRef}
        step={type === "time" ? "3600" : undefined} // Force 24-hour format for time inputs
        pattern={type === "time" ? "[0-9]{2}:[0-9]{2}" : undefined} // 24-hour pattern
        className={classNames(
          "rounded-lg border border-white/10 bg-[#e9edf2] text-left text-[#1a1a1a] !shadow-[inset_0_1px_2px_rgba(0,0,0,0.16)] transition-all outline-none focus:border-[#d4a574] focus:!shadow-[inset_0_1px_2px_rgba(0,0,0,0.16)]",
          innerTextColor
            ? "text-[#E70909] placeholder:text-[#E70909]"
            : "placeholder:text-[#677489]",
          disabled ? "cursor-not-allowed opacity-70" : "",
          bodyFontRegular.className,
          inputClasses
        )}
        aria-invalid={!!errorMessage}
        aria-describedby={errorMessage ? `${id}-error` : undefined}
      />

      {errorMessage && (
        <div
          id={`${id}-error`}
          className={`absolute -bottom-4 mt-1 flex w-full items-center justify-center gap-1 text-center text-[11px] text-red-100 sm:-bottom-5 ${displayFontBold.className}`}
        >
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default Input;
