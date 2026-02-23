import React from "react";
import { chivasLoudBold, chivasLuxRegular } from "@/fonts";
import { classNames } from "@/utils";

interface StepHeaderProps {
  label?: string;
  currentStep: number;
  totalSteps: number;
  subLabel?: string;
}

export function StepHeader({ label, currentStep, totalSteps, subLabel }: StepHeaderProps) {
  return (
    <div className="flex items-center justify-between text-white/70 uppercase">
      <div className="flex flex-col">
        <span className={classNames(chivasLoudBold.className, "text-lg")}>{label}</span>
        {subLabel && (
          <span className={classNames(chivasLuxRegular.className, "text-xs font-light tracking-wider uppercase italic text-white/75")}>{subLabel}</span>
        )}
      </div>
      <span className={classNames(chivasLoudBold.className)}>
        {currentStep}/{totalSteps}
      </span>
    </div>
  );
}
