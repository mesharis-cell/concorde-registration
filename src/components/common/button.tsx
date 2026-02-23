"use client";

import React from "react";
import { classNames } from "@/utils";
import { displayFontExtraBold } from "@/fonts";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "lg" | "xl";
  transparent?: boolean;
  full?: boolean;
  ariaLabel?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  size = "sm",
  transparent = false,
  full = false,
  disabled = false,
  ariaLabel = "",
  onClick,
  ...props
}) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <button
      className={classNames(
        "inner-shadow-button relative overflow-hidden rounded-md tracking-[1px]",
        size === "sm" ? "px-2 py-1 text-[10px] text-black sm:px-3 sm:py-2 sm:text-xs" : "",
        size === "lg" ? "px-4 py-2 text-sm sm:text-base" : "",
        size === "xl" ? "px-6 py-2 text-base focus:ring-4 sm:py-3" : "",
        disabled ? "opacity-75 focus:ring-0" : "",
        transparent ? "inner-shadow-text" : "gradient-button text-[#111111]",
        full ? "w-full" : "",
        displayFontExtraBold.className,
        className
      )}
      aria-label={ariaLabel}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
