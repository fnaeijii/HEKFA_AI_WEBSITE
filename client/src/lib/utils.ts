import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Helper to safely select localized fields from API responses.
 * Example: selectLocalized(project, 'title', lang) will return `titleFa`
 * when lang === 'fa' and that field exists, otherwise falls back to `title`.
 */
export function selectLocalized<
  T extends Record<string, any>,
  K extends string
>(
  obj: T | null | undefined,
  baseKey: K,
  lang: string
): any {
  if (!obj) return undefined;
  if (lang === "fa") {
    const faKey = `${baseKey}Fa`;
    if (faKey in obj && obj[faKey] != null && obj[faKey] !== "") {
      return obj[faKey];
    }
  }
  return obj[baseKey as keyof T];
}

/**
 * Persian (Jalali) month names
 */
const persianMonths = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

/**
 * Convert a number to Persian digits
 */
function toPersianDigits(num: number | string): string {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return String(num).replace(/[0-9]/g, (d) => persianDigits[parseInt(d)]);
}

/**
 * Convert Gregorian date to Jalali (Persian) date
 * Based on the algorithm by Kazimierz M. Borkowski
 */
function gregorianToJalali(
  gy: number,
  gm: number,
  gd: number
): [number, number, number] {
  const g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  let jy: number;

  if (gy > 1600) {
    jy = 979;
    gy -= 1600;
  } else {
    jy = 0;
    gy -= 621;
  }

  const gy2 = gm > 2 ? gy + 1 : gy;
  let days =
    365 * gy +
    Math.floor((gy2 + 3) / 4) -
    Math.floor((gy2 + 99) / 100) +
    Math.floor((gy2 + 399) / 400) -
    80 +
    gd +
    g_d_m[gm - 1];

  jy += 33 * Math.floor(days / 12053);
  days %= 12053;

  jy += 4 * Math.floor(days / 1461);
  days %= 1461;

  if (days > 365) {
    jy += Math.floor((days - 1) / 365);
    days = (days - 1) % 365;
  }

  const jm =
    days < 186 ? 1 + Math.floor(days / 31) : 7 + Math.floor((days - 186) / 30);
  const jd = 1 + (days < 186 ? days % 31 : (days - 186) % 30);

  return [jy, jm, jd];
}

/**
 * Format a date for display, with support for Persian (Jalali) calendar
 * @param dateInput - Date string or Date object
 * @param lang - Language code ('fa' for Persian, otherwise Gregorian)
 * @param options - Formatting options
 * @returns Formatted date string
 */
export function formatLocalizedDate(
  dateInput: string | Date,
  lang: string,
  options: {
    showYear?: boolean;
    shortMonth?: boolean;
  } = {}
): string {
  const { showYear = true, shortMonth = false } = options;
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;

  if (isNaN(date.getTime())) {
    return "";
  }

  if (lang === "fa") {
    const [jy, jm, jd] = gregorianToJalali(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    );

    const monthName = shortMonth
      ? persianMonths[jm - 1].slice(0, 3)
      : persianMonths[jm - 1];
    const dayStr = toPersianDigits(jd);
    const yearStr = toPersianDigits(jy);

    return showYear ? `${dayStr} ${monthName} ${yearStr}` : `${dayStr} ${monthName}`;
  }

  // English/default formatting
  const monthOptions: Intl.DateTimeFormatOptions = {
    month: shortMonth ? "short" : "long",
    day: "numeric",
  };

  if (showYear) {
    monthOptions.year = "numeric";
  }

  return date.toLocaleDateString("en-US", monthOptions);
}
