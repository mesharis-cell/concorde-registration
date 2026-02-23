"use client";

import React from "react";
import { bodyFontRegular } from "@/fonts";
import { classNames } from "@/utils";

interface TextareaProps {
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  errorMessage?: string;
  onChange?: (value: string) => void;
  rows?: number;
}

const Textarea: React.FC<TextareaProps> = ({
  placeholder = "",
  value = "",
  disabled = false,
  required = false,
  className = "",
  errorMessage = "",
  onChange,
  rows = 4
}) => {
  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(event.target.value);
  };

  return (
    <div className="relative flex w-full flex-col items-start">
      <textarea
        disabled={disabled}
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={handleInput}
        rows={rows}
        className={classNames(
          "w-full resize-none rounded-lg border border-white/10 bg-[#e9edf2] px-4 py-3 text-left text-base text-[#1a1a1a] !shadow-[inset_0_1px_2px_rgba(0,0,0,0.16)] placeholder:text-[#677489] focus:border-[#d4a574] focus:!shadow-[inset_0_1px_2px_rgba(0,0,0,0.16)] [&::placeholder]:text-left",
          bodyFontRegular.className,
          className
        )}
        aria-invalid={!!errorMessage}
      />

      {errorMessage && (
        <div className="absolute -bottom-4 mt-1 flex w-full items-center justify-center gap-1 text-center text-[11px] text-red-300 sm:-bottom-5">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default Textarea;
