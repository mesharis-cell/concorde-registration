"use client";

import React, { useState, useEffect } from "react";
import { classNames } from "@/utils";
import { chivasLuxRegular } from "@/fonts";
import { getEventInfo } from "@/services/get-event";

interface DynamicHotelFieldProps {
    value: string;
    onChange: (value: string) => void;
    error: boolean;
    placeholder: string;
    eventId: string;
    required?: boolean;
}

export function DynamicHotelField({
    value,
    onChange,
    error,
    placeholder,
    eventId,
    required = false
}: DynamicHotelFieldProps) {
    const [hotelOptions, setHotelOptions] = useState<{ value: string; label: string }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHotelOptions = async () => {
            try {
                const response = await getEventInfo(eventId);
                if (response.success && response.data.hotelConfig?.hotels) {
                    const options = response.data.hotelConfig.hotels.map(hotel => ({
                        value: hotel.name,
                        label: hotel.name
                    }));
                    setHotelOptions(options);

                    // Auto-select default hotel if available and no current value
                    const defaultHotel = response.data.hotelConfig.hotels.find(h => h.isDefault);
                    if (defaultHotel && !value) {
                        onChange(defaultHotel.name);
                    }
                } else {
                    setHotelOptions([
                        { value: 'Marina Bay Sands', label: 'Marina Bay Sands' },
                        { value: 'The Fullerton Hotel', label: 'The Fullerton Hotel' }
                    ]);
                }

            } catch (error) {
                console.error('Failed to fetch hotel options:', error);
                // Fallback options
                setHotelOptions([
                    { value: 'Marina Bay Sands', label: 'Marina Bay Sands' },
                    { value: 'The Fullerton Hotel', label: 'The Fullerton Hotel' }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchHotelOptions();
    }, [eventId, value, onChange]);

    if (loading) {
        return (
            <div className="relative flex w-full flex-col items-start mb-4">
                <div className="w-full px-3 py-1.5 md:py-2 rounded-md bg-gray-200 animate-pulse">
                    <span className="text-gray-400">Loading hotels...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="relative flex w-full flex-col items-start mb-4">
            <select
                className={classNames(
                    "w-full px-3 py-1.5 md:py-2 md:text-lg rounded-md",
                    "rounded bg-[#D9D9D9] text-center text-[#878680] !shadow-[inset_0_5px_8px_rgba(0,0,0,0.25)]",
                    "transition-all outline-none focus:!shadow-[inset_0_5px_8px_rgba(0,0,0,0.25)]",
                    "appearance-none cursor-pointer",
                    chivasLuxRegular.className
                )}
                value={value || ""}
                required={required}
                onChange={(e) => onChange(e.target.value)}
            >
                <option value="" className="text-[#878680]">{placeholder}</option>
                {hotelOptions.map((option) => (
                    <option key={option.value} value={option.value} className="text-black">
                        {option.label}
                    </option>
                ))}
            </select>

            {error && required && (
                <div className="absolute -bottom-4 mt-1 flex w-full items-center justify-center gap-1 text-center text-[10px] text-red-400 uppercase sm:-bottom-5">
                    <span>⚠️ {placeholder} is required</span>
                </div>
            )}
        </div>
    );
}
