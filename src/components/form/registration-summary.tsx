import React from "react";
import { chivasLoudBold, chivasLuxRegular } from "@/fonts";
import { classNames } from "@/utils";
import Button from "@/components/common/button";
import { formData, FormField } from "@/utils/form-data";

interface RegistrationSummaryProps {
  formValues: Record<string, string | boolean>;
  onReset: () => void;
}

export function RegistrationSummary({ formValues, onReset }: RegistrationSummaryProps) {
  const stepLabels = {
    step1: "BASIC INFO",
    step2: "TRAVEL INFO",
    step3: "ACCOMMODATION",
    step4: "PERSONAL REQUIREMENTS",
    step5: "MERCHANDISE & EMERGENCY",
    step6: "COMMUNICATION PREFERENCE"
  };

  return (
    <div className="mb-20 w-full rounded-lg bg-white p-6 shadow-lg">
      <h2
        className={classNames(
          "mb-6 text-center text-2xl font-bold text-[#A08447]",
          chivasLoudBold.className
        )}
      >
        REGISTRATION COMPLETED
      </h2>

      <div className="space-y-6">
        {Object.entries(formData).map(([stepKey, stepData]) => (
          <div key={stepKey} className="border-b border-gray-200 pb-4">
            <h3
              className={classNames(
                "mb-3 text-lg font-semibold text-[#A08447] uppercase",
                chivasLoudBold.className
              )}
            >
              {stepLabels[stepKey as keyof typeof stepLabels]}
            </h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {stepData.fields.map((field: FormField, index: number) => {
                const value = formValues[field.name || ""];
                if (field.type === "switch") {
                  return (
                    <div key={index} className="flex items-center justify-between">
                      <span className={classNames("text-gray-700", chivasLuxRegular.className)}>
                        {field.text}:
                      </span>
                      <span
                        className={classNames(
                          "font-semibold",
                          chivasLoudBold.className,
                          value ? "text-green-600" : "text-red-600"
                        )}
                      >
                        {value ? "ON" : "OFF"}
                      </span>
                    </div>
                  );
                }

                return (
                  <div key={index}>
                    <span
                      className={classNames("mb-1 block text-gray-700", chivasLuxRegular.className)}
                    >
                      {field.placeholder}:
                    </span>
                    <span
                      className={classNames(
                        "font-semibold text-gray-900",
                        chivasLoudBold.className
                      )}
                    >
                      {String(value || "Not provided")}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Button onClick={onReset} className="bg-[#A08447] text-white hover:bg-[#8B6F3A]">
          START NEW REGISTRATION
        </Button>
      </div>
    </div>
  );
}
