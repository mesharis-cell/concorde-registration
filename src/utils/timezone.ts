export interface TimezoneInfo {
  value: string;
  label: string;
  offset: string;
}

export const TIMEZONE_OPTIONS: TimezoneInfo[] = [
  { value: "America/New_York", label: "Eastern Time (EST/EDT)", offset: "UTC-5/-4" },
  { value: "America/Chicago", label: "Central Time (CST/CDT)", offset: "UTC-6/-5" },
  { value: "America/Denver", label: "Mountain Time (MST/MDT)", offset: "UTC-7/-6" },
  { value: "America/Los_Angeles", label: "Pacific Time (PST/PDT)", offset: "UTC-8/-7" },
  { value: "Europe/London", label: "Greenwich Mean Time (GMT)", offset: "UTC+0/+1" },
  { value: "Europe/Paris", label: "Central European Time (CET)", offset: "UTC+1/+2" },
  { value: "Europe/Berlin", label: "Central European Time (CET)", offset: "UTC+1/+2" },
  { value: "Asia/Tokyo", label: "Japan Standard Time (JST)", offset: "UTC+9" },
  { value: "Asia/Singapore", label: "Singapore Standard Time (SGT)", offset: "UTC+8" },
  { value: "Asia/Dubai", label: "Gulf Standard Time (GST)", offset: "UTC+4" },
  { value: "Australia/Sydney", label: "Australian Eastern Time (AEST/AEDT)", offset: "UTC+10/+11" },
  { value: "America/Sao_Paulo", label: "Brazil Standard Time (BRT)", offset: "UTC-3" }
];

export function getBrowserTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return "UTC";
  }
}

export function getTimezoneLabel(timezone?: string | null): string {
  if (!timezone) return "Local Time";
  const tz = TIMEZONE_OPTIONS.find((t) => t.value === timezone);
  return tz?.label || timezone;
}

export function formatInTimeZone(
  dateInput: string | Date,
  timeZone?: string | null,
  options?: Intl.DateTimeFormatOptions
): string {
  try {
    const date = new Date(dateInput);
    return date.toLocaleString("en-US", {
      timeZone: timeZone || getBrowserTimezone(),
      ...options
    });
  } catch {
    return "Invalid Date";
  }
}

export function formatDateInTimeZone(dateInput: string | Date, timeZone?: string | null): string {
  return formatInTimeZone(dateInput, timeZone, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

export function formatTimeInTimeZone(dateInput: string | Date, timeZone?: string | null): string {
  return formatInTimeZone(dateInput, timeZone, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });
}

export function toZonedISO(dateInput: string | Date, timeZone?: string | null): string {
  try {
    const date = new Date(dateInput);
    // This is a display helper; keeping simple without external libs.
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: timeZone || getBrowserTimezone(),
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    })
      .format(date)
      .replace(/\u202f/g, " ");

    // en-CA produces "YYYY-MM-DD, HH:MM" in most environments
    return parts.replace(", ", "T");
  } catch {
    return new Date(dateInput).toISOString();
  }
}
