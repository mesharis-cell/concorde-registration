"use client";

import React from "react";
import { chivasLuxRegular } from "@/fonts";
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
          "w-full resize-none rounded-md bg-[#D9D9D9] px-3 py-1.5 text-center text-[#878680] !shadow-[inset_0_5px_8px_rgba(0,0,0,0.25)] placeholder:text-[#878680] focus:!shadow-[inset_0_5px_8px_rgba(0,0,0,0.25)] md:py-2 md:text-lg [&::placeholder]:text-center",
          chivasLuxRegular.className,
          className
        )}
        aria-invalid={!!errorMessage}
      />

      {errorMessage && (
        <div className="absolute -bottom-4 mt-1 flex w-full items-center justify-center gap-1 text-center text-[10px] text-red-400 uppercase sm:-bottom-5">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default Textarea;
