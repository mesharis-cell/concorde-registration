"use client";

import React, { useState, useEffect } from "react";
import { classNames } from "@/utils";
import { chivasLuxRegular } from "@/fonts";
import { getEventInfo } from "@/services/get-event";

interface DynamicGroupsFieldProps {
  value: string;
  onChange: (value: string) => void;
  error: boolean;
  placeholder: string;
  eventId: string;
  required?: boolean;
}

export function DynamicGroupsField({
  value,
  onChange,
  error,
  placeholder,
  eventId,
  required = false
}: DynamicGroupsFieldProps) {
  const [groupOptions, setGroupOptions] = useState<{ value: string; label: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroupOptions = async () => {
      try {
        const response = await getEventInfo(eventId);
        if (response.success && response.data.groups) {
          const options = response.data.groups.map((group) => ({
            value: group.id,
            label: `${group.name} - ${group.description}`
          }));
          setGroupOptions(options);
        } else {
          setGroupOptions([]);
        }
      } catch (error) {
        console.error("Failed to fetch group options:", error);
        setGroupOptions([]);
      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      fetchGroupOptions();
    }
  }, [eventId]);

  if (loading) {
    return (
      <div className="relative mb-4 flex w-full flex-col items-start">
        <div className="w-full animate-pulse rounded-md bg-gray-200 px-3 py-1.5 md:py-2">
          <span className="text-gray-400">Loading groups...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mb-4 flex w-full flex-col items-start">
      <select
        className={classNames(
          "w-full rounded-md px-3 py-1.5 md:py-2 md:text-lg",
          "rounded bg-[#D9D9D9] text-center text-[#878680] !shadow-[inset_0_5px_8px_rgba(0,0,0,0.25)]",
          "transition-all outline-none focus:!shadow-[inset_0_5px_8px_rgba(0,0,0,0.25)]",
          "cursor-pointer appearance-none",
          chivasLuxRegular.className
        )}
        value={value || ""}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        disabled={loading}
      >
        <option value="" className="text-[#878680]">
          {placeholder}
        </option>
        {groupOptions.map((option) => (
          <option key={option.value} value={option.value} className="text-black">
            {option.label}
          </option>
        ))}
      </select>

      {error && required && (
        <div className="absolute -bottom-4 mt-1 flex w-full items-center justify-center gap-1 text-center text-[10px] text-red-400 uppercase sm:-bottom-5">
          <span>⚠</span>
          <span>{placeholder} is required</span>
        </div>
      )}
    </div>
  );
}
