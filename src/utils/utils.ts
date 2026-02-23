import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

export function classNames(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTextAlignment(position?: "center" | "left" | "right"): string {
  switch (position) {
    case "center":
      return "text-center";
    case "left":
      return "text-left";
    case "right":
      return "text-right";
    default:
      return "text-center";
  }
}
