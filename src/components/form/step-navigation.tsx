import React from "react";
import Button from "@/components/common/button";
import { FormValues } from "@/types/registration";

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  formValues: FormValues;
  submitting: boolean;
  onNext: () => void;
  onBack: () => void;
}

export function StepNavigation({
  currentStep,
  totalSteps,
  formValues,
  submitting,
  onNext,
  onBack
}: StepNavigationProps) {
  const showBackButton = currentStep > 1;
  const isLastStep = currentStep === totalSteps;
  const isFirstStep = currentStep === 1;

  return (
    <div
      className={`flex space-x-4 pt-2 sm:pt-3 ${showBackButton ? "justify-between" : "justify-center"
        }`}
    >
      {showBackButton && (
        <Button size="lg" className="px-7" onClick={onBack}>
          BACK
        </Button>
      )}

      {isFirstStep ? (
        <Button onClick={onNext} size="xl" className="px-14 sm:px-24">
          NEXT
        </Button>
      ) : isLastStep ? (
        <Button
          size="lg"
          className="px-7"
          onClick={onNext}
          disabled={!formValues.termsAccepted || submitting}
        >
          {submitting ? (
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              <span>SUBMITTING...</span>
            </div>
          ) : (
            "SUBMIT"
          )}
        </Button>
      ) : (
        <Button size="lg" className="px-7" onClick={onNext}>
          NEXT
        </Button>
      )}
    </div>
  );
}
