"use client";

import React from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { bodyFontRegular, displayFontBold } from "@/fonts";
import { classNames } from "@/utils";
import ReactIcon from "./react-icon";

interface PhoneInputComponentProps {
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  onChange?: (value: string) => void;
  defaultCountry?: string;
}

const PhoneInputComponent: React.FC<PhoneInputComponentProps> = ({
  value,
  placeholder = "Enter phone number",
  disabled = false,
  required = false,
  error = false,
  errorMessage = "",
  onChange,
  defaultCountry = "AE", // Default to UAE
}) => {
  // Handle keydown to prevent space
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
    }
  };

  return (
    <div className="relative w-full" onKeyDown={handleKeyDown}>
      <div className="phone-input-wrapper">
        <PhoneInput
          international
          countryCallingCodeEditable={true}
          defaultCountry={defaultCountry as import('react-phone-number-input').Country}
          value={value}
          onChange={(val) => onChange?.(val || "")}
          disabled={disabled}
          placeholder={placeholder}
          className={classNames(
            "phone-input-custom",
            bodyFontRegular.className,
            error ? "phone-input-error" : ""
          )}
        />
      </div>

      {/* Error Message Display */}
      {errorMessage && (
        <div
          className={`absolute -bottom-4 mt-1 flex w-full items-center justify-center gap-1 text-center text-[10px] text-red-400 uppercase sm:-bottom-5 ${displayFontBold.className}`}
        >
          <ReactIcon icon="RiErrorWarningLine" className="size-3 -translate-y-[0.5px]" />
          {errorMessage}
        </div>
      )}

      <style jsx global>{`
        .phone-input-wrapper {
          width: 100%;
        }

        .phone-input-custom {
          width: 100%;
        }

        .phone-input-custom .PhoneInputInput {
          width: 100%;
          border: none;
          outline: none;
          background: #d9d9d9;
          color: #64748b;
          padding: 0.375rem 0.75rem;
          border-radius: 0.375rem;
          font-size: 1rem;
          box-shadow: inset 0 5px 8px rgba(0, 0, 0, 0.25);
          transition: all 0.2s;
        }

        .phone-input-custom .PhoneInputInput:focus {
          box-shadow: inset 0 5px 8px rgba(0, 0, 0, 0.25);
        }

        .phone-input-custom .PhoneInputInput::placeholder {
          color: #64748b;
          opacity: 0.7;
        }

        .phone-input-custom .PhoneInputCountry {
          margin-right: 0.5rem;
        }

        .phone-input-custom .PhoneInputCountryIcon {
          width: 1.5rem;
          height: 1.125rem;
          border-radius: 0.125rem;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }

        .phone-input-custom .PhoneInputCountrySelect {
          margin-right: 0.5rem;
          border: none;
          outline: none;
          background: transparent;
          cursor: pointer;
          font-size: 0.875rem;
          color: #64748b;
        }

        .phone-input-custom .PhoneInputCountrySelect:focus {
          outline: 2px solid #b88d3d;
          outline-offset: 2px;
          border-radius: 0.25rem;
        }

        .phone-input-custom .PhoneInputCountrySelectArrow {
          display: none;
        }

        .phone-input-error .PhoneInputInput {
          border-color: #f87171;
        }

        /* Dropdown styling */
        .PhoneInputCountrySelectDropdown {
          max-height: 300px;
          overflow-y: auto;
          border: 1px solid #e5e7eb;
          border-radius: 0.375rem;
          background: white;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .PhoneInputCountryOption {
          padding: 0.5rem 1rem;
          cursor: pointer;
          transition: background-color 0.15s;
        }

        .PhoneInputCountryOption:hover {
          background-color: #f3f4f6;
        }

        .PhoneInputCountryOption--focus {
          background-color: #e5e7eb;
        }

        @media (min-width: 768px) {
          .phone-input-custom .PhoneInputInput {
            padding: 0.5rem 0.75rem;
            font-size: 1.125rem;
          }
        }
      `}</style>
    </div>
  );
};

export default PhoneInputComponent;

