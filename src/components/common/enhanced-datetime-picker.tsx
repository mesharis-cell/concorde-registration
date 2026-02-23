"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "@radix-ui/react-icons";
import { DayPicker } from "react-day-picker";
import * as Popover from "@radix-ui/react-popover";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { bodyFontRegular, displayFontBold } from "@/fonts";
import { classNames } from "@/utils";
import ReactIcon from "./react-icon";

interface DateTimePickerProps {
  value?: string | Date;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  onChange?: (value: string) => void;
  dateFormat?: 'MM/dd/yyyy' | 'dd/MM/yyyy' | 'yyyy-MM-dd' | 'dd-MM-yyyy';
  minDate?: string | Date;
  maxDate?: string | Date;
}

const EnhancedDateTimePicker: React.FC<DateTimePickerProps> = ({
  value,
  placeholder = "SELECT DATE & TIME",
  disabled = false,
  required = false,
  error = false,
  errorMessage = "",
  onChange,
  dateFormat = 'MM/dd/yyyy',
  minDate,
  maxDate
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Convert string to Date object for the picker
  const dateValue = value ? new Date(value) : undefined;
  const minDateObj = minDate ? new Date(minDate) : undefined;
  const maxDateObj = maxDate ? new Date(maxDate) : undefined;

  // Helper to get date format pattern for date-fns
  const getFormatPattern = (fmt: string) => {
    switch (fmt) {
      case 'MM/dd/yyyy': return 'MM/dd/yyyy HH:mm';
      case 'dd/MM/yyyy': return 'dd/MM/yyyy HH:mm';
      case 'yyyy-MM-dd': return 'yyyy-MM-dd HH:mm';
      case 'dd-MM-yyyy': return 'dd-MM-yyyy HH:mm';
      default: return 'MM/dd/yyyy HH:mm';
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      const currentDate = dateValue || new Date();
      const newDate = new Date(date);
      // Preserve existing time if available
      newDate.setHours(currentDate.getHours());
      newDate.setMinutes(currentDate.getMinutes());
      onChange?.(newDate.toISOString());
    }
  };

  const handleTimeChange = (type: "hour" | "minute", timeValue: number) => {
    const currentDate = dateValue || new Date();
    const newDate = new Date(currentDate);

    if (type === "hour") {
      newDate.setHours(timeValue);
    } else if (type === "minute") {
      newDate.setMinutes(timeValue);
    }

    onChange?.(newDate.toISOString());
  };

  return (
    <div className="relative w-full">
      <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
        <Popover.Trigger asChild>
          <button
            disabled={disabled}
            className={classNames(
              "w-full rounded-md px-3 py-1.5 md:py-2 md:text-lg",
              "rounded bg-[#e2e8f0] text-center !text-[#64748b] !shadow-[inset_0_5px_8px_rgba(0,0,0,0.25)]",
              "transition-all outline-none focus:!shadow-[inset_0_5px_8px_rgba(0,0,0,0.25)]",
              "flex cursor-pointer appearance-none items-center justify-between",
              bodyFontRegular.className,
              disabled ? "cursor-not-allowed opacity-70" : ""
            )}
          >
            {dateValue ? (
              <span className="w-full self-center text-center !text-[#64748b]">
                {format(dateValue, getFormatPattern(dateFormat))}
              </span>
            ) : (
              <span>{placeholder}</span>
            )}
            <CalendarIcon className="h-4 w-4 opacity-50" />
          </button>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content
            className="z-50 w-auto rounded-lg border border-gray-200 bg-white p-0 shadow-xl"
            align="start"
            sideOffset={4}
          >
            <div className="flex flex-col md:flex-row">
              {/* Calendar Section */}
              <DayPicker
                mode="single"
                selected={dateValue}
                onSelect={handleDateSelect}
                disabled={[
                  ...(minDateObj ? [{ before: minDateObj }] : []),
                  ...(maxDateObj ? [{ after: maxDateObj }] : []),
                ]}
                className="p-3"
                classNames={{
                  months: "flex flex-col",
                  month: "",
                  caption: "flex justify-center pt-1 relative items-center",
                  caption_label: "text-sm font-medium text-gray-900",
                  nav: "space-x-1 flex items-center",
                  nav_button:
                    "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 hover:bg-gray-100 rounded-md",
                  nav_button_previous: "absolute left-1",
                  nav_button_next: "absolute right-1",
                  table: "w-full border-collapse space-y-1",
                  head_row: "flex",
                  head_cell: "text-gray-500 rounded-md w-8 font-normal text-xs text-center",
                  row: "flex w-full mt-2",
                  cell: "text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
                  day: "h-8 w-8 p-0 font-normal hover:bg-gray-100 rounded-md transition-colors",
                  day_selected:
                    "bg-[#d4a574] text-white hover:bg-[#b88d3d] focus:bg-[#d4a574] focus:text-white",
                  day_today: "bg-gray-100 text-gray-900 font-semibold",
                  day_outside: "text-gray-400 opacity-50",
                  day_disabled: "text-gray-400 opacity-50"
                }}
              />

              {/* Time Selection Section */}
              <div className="flex divide-x border-l border-gray-200">
                {/* Hours (24-hour format) */}
                <ScrollArea.Root className="w-20">
                  <ScrollArea.Viewport className="h-[280px] p-2">
                    <div className="flex flex-col space-y-1">
                      <div className="mb-1 border-b pb-1 text-center text-xs font-semibold text-gray-500">
                        HOUR
                      </div>
                      {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                        <button
                          key={hour}
                          className={classNames(
                            "h-8 w-full rounded-md text-center text-sm transition-colors",
                            dateValue && dateValue.getHours() === hour
                              ? "bg-[#d4a574] text-white"
                              : "text-gray-700 hover:bg-gray-100"
                          )}
                          onClick={() => handleTimeChange("hour", hour)}
                        >
                          {hour.toString().padStart(2, "0")}
                        </button>
                      ))}
                    </div>
                  </ScrollArea.Viewport>
                  <ScrollArea.Scrollbar orientation="vertical">
                    <ScrollArea.Thumb />
                  </ScrollArea.Scrollbar>
                </ScrollArea.Root>

                {/* Minutes (every 5 minutes) */}
                <ScrollArea.Root className="w-20">
                  <ScrollArea.Viewport className="h-[280px] p-2">
                    <div className="flex flex-col space-y-1">
                      <div className="mb-1 border-b pb-1 text-center text-xs font-semibold text-gray-500">
                        MIN
                      </div>
                      {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
                        <button
                          key={minute}
                          className={classNames(
                            "h-8 w-full rounded-md text-center text-sm transition-colors",
                            dateValue && dateValue.getMinutes() === minute
                              ? "bg-[#d4a574] text-white"
                              : "text-gray-700 hover:bg-gray-100"
                          )}
                          onClick={() => handleTimeChange("minute", minute)}
                        >
                          {minute.toString().padStart(2, "0")}
                        </button>
                      ))}
                    </div>
                  </ScrollArea.Viewport>
                  <ScrollArea.Scrollbar orientation="vertical">
                    <ScrollArea.Thumb />
                  </ScrollArea.Scrollbar>
                </ScrollArea.Root>
              </div>
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>

      {/* Error Message Display */}
      {errorMessage && (
        <div
          className={`absolute -bottom-4 mt-1 flex w-full items-center justify-center gap-1 text-center text-[10px] text-black uppercase sm:-bottom-5 ${displayFontBold.className}`}
        >
          <ReactIcon icon="RiErrorWarningLine" className="size-3 -translate-y-[0.5px]" />
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default EnhancedDateTimePicker;
