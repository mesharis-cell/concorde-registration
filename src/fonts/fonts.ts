import { DM_Sans } from "next/font/google";

export const displayFont = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-display"
});

export const displayFontBold = DM_Sans({
  subsets: ["latin"],
  weight: "700",
  display: "swap",
  variable: "--font-display-bold"
});

export const displayFontExtraBold = DM_Sans({
  subsets: ["latin"],
  weight: "700",
  display: "swap",
  variable: "--font-display-extra-bold"
});

export const displayFontExtraBoldItalic = DM_Sans({
  subsets: ["latin"],
  weight: "700",
  style: "italic",
  display: "swap",
  variable: "--font-display-extra-bold-italic"
});

export const displayFontMedium = DM_Sans({
  subsets: ["latin"],
  weight: "500",
  display: "swap",
  variable: "--font-display-medium"
});

export const displayFontRegular = DM_Sans({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-display-regular"
});

export const bodyFontLight = DM_Sans({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-body-light"
});

export const bodyFontRegular = DM_Sans({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-body-regular"
});

export const bodyFontSemiBold = DM_Sans({
  subsets: ["latin"],
  weight: "500",
  display: "swap",
  variable: "--font-body-semibold"
});

export const accentFontLight = DM_Sans({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-accent-light"
});

export const accentFontRegular = DM_Sans({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-accent-regular"
});

export const accentFontItalic = DM_Sans({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  display: "swap",
  variable: "--font-accent-italic"
});

export const accentFontBlack = DM_Sans({
  subsets: ["latin"],
  weight: "700",
  display: "swap",
  variable: "--font-accent-black"
});
