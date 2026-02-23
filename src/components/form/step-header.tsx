import React from "react";
import { displayFontBold, bodyFontRegular } from "@/fonts";
import { classNames } from "@/utils";

interface StepHeaderProps {
  label?: string;
  currentStep: number;
  totalSteps: number;
  subLabel?: string;
}

function normalizeHeaderText(value?: string): string {
  if (!value) return "";
  const trimmed = value.trim();
  if (!trimmed) return "";

  const letters = trimmed.replace(/[^A-Za-z]/g, "");
  const isAllCaps = letters.length > 3 && letters === letters.toUpperCase();

  if (!isAllCaps) return trimmed;

  return trimmed.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}

export function StepHeader({ label, currentStep, totalSteps, subLabel }: StepHeaderProps) {
  const normalizedLabel = normalizeHeaderText(label);
  const normalizedSubLabel = normalizeHeaderText(subLabel);

  return (
    <div className="flex items-start justify-between gap-4 text-white/80">
      <div className="flex flex-col">
        <span className={classNames(displayFontBold.className, "text-xl leading-tight text-white")}>
          {normalizedLabel}
        </span>
        {normalizedSubLabel && (
          <span className={classNames(bodyFontRegular.className, "mt-1 text-sm text-white/65")}>
            {normalizedSubLabel}
          </span>
        )}
      </div>
      <span className={classNames(displayFontBold.className, "pt-1 text-lg text-[#d4a574]")}>
        {currentStep}/{totalSteps}
      </span>
    </div>
  );
}
