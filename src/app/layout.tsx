import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { ChildrenProps } from "@/types";
import { DesktopOnlyLayout } from "@/components";
import "../styles/globals.css";
import {
  displayFont,
  displayFontBold,
  displayFontExtraBold,
  displayFontExtraBoldItalic,
  displayFontMedium,
  displayFontRegular,
  bodyFontLight,
  bodyFontRegular,
  bodyFontSemiBold,
  accentFontLight,
  accentFontRegular,
  accentFontItalic,
  accentFontBlack
} from "@/fonts";

export const metadata: Metadata = {
  title: "Savvio Concorde | Event Registration",
  description:
    "Savvio Concorde event registration microsite with instant check-in QR and Google Wallet pass access.",
  keywords: [
    "savvio concorde",
    "event registration",
    "event check-in",
    "google wallet pass",
    "registration",
    "attendees"
  ],
  icons: {
    icon: [
      { url: "/logo-S-white.png", sizes: "558x558", type: "image/png" },
      { url: "/logo-S-white@2x.png", sizes: "1116x1116", type: "image/png" },
      { url: "/logo-S-white@3x.png", sizes: "1674x1674", type: "image/png" }
    ],
    shortcut: [{ url: "/logo-S-white.png", type: "image/png" }],
    apple: [{ url: "/logo-S-white@2x.png", sizes: "1116x1116", type: "image/png" }],
    other: [
      { rel: "icon", url: "/logo-S-white.png", sizes: "558x558", type: "image/png" },
      { rel: "icon", url: "/logo-S-white@2x.png", sizes: "1116x1116", type: "image/png" }
    ]
  },
  manifest: "/site.webmanifest"
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#111111"
};

export default function RootLayout({ children }: ChildrenProps) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={` ${displayFont.variable} ${displayFontBold.variable} ${displayFontExtraBold.variable} ${displayFontExtraBoldItalic.variable} ${displayFontMedium.variable} ${displayFontRegular.variable} ${bodyFontLight.variable} ${bodyFontRegular.variable} ${bodyFontSemiBold.variable} ${accentFontLight.variable} ${accentFontRegular.variable} ${accentFontItalic.variable} ${accentFontBlack.variable} `}
    >
      <body className="antialiased">
        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){window.dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', { anonymize_ip: true });
              `}
            </Script>
          </>
        ) : null}
        <DesktopOnlyLayout>{children}</DesktopOnlyLayout>
      </body>
    </html>
  );
}
