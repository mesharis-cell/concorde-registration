type FontToken = {
  className: string;
  variable: string;
};

const fallbackFont: FontToken = {
  className: "font-sans",
  variable: ""
};

export const displayFont = fallbackFont;
export const displayFontBold = fallbackFont;
export const displayFontExtraBold = fallbackFont;
export const displayFontExtraBoldItalic = fallbackFont;
export const displayFontMedium = fallbackFont;
export const displayFontRegular = fallbackFont;

export const bodyFontLight = fallbackFont;
export const bodyFontRegular = fallbackFont;
export const bodyFontSemiBold = fallbackFont;

export const accentFontLight = fallbackFont;
export const accentFontRegular = fallbackFont;
export const accentFontItalic = fallbackFont;
export const accentFontBlack = fallbackFont;
