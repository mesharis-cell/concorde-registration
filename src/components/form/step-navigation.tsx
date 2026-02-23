import React from "react";
import Button from "@/components/common/button";

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  submitting: boolean;
  onNext: () => void;
  onBack: () => void;
}

export function StepNavigation({
  currentStep,
  totalSteps,
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
          Back
        </Button>
      )}

      {isFirstStep ? (
        <Button onClick={onNext} size="xl" className="px-14 sm:px-24">
          Next
        </Button>
      ) : isLastStep ? (
        <Button
          size="lg"
          className="px-7"
          onClick={onNext}
          disabled={submitting}
        >
          {submitting ? (
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              <span>Submitting...</span>
            </div>
          ) : (
            "Submit"
          )}
        </Button>
      ) : (
        <Button size="lg" className="px-7" onClick={onNext}>
          Next
        </Button>
      )}
    </div>
  );
}
