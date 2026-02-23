import type { Metadata } from "next";
import Script from "next/script";
import { ChildrenProps } from "@/types";
import { DesktopOnlyLayout } from "@/components";
import "../styles/globals.css";
import {
  chivasLoud,
  chivasLoudBold,
  chivasLoudExtraBold,
  chivasLoudExtraBoldItalic,
  chivasLoudMedium,
  chivasLoudRegular,
  chivasLuxLight,
  chivasLuxRegular,
  chivasLuxSemiBold,
  chivasPrioriLight,
  chivasPrioriRegular,
  chivasPrioriItalic,
  chivasPrioriBlack
} from "@/fonts";

export const metadata: Metadata = {
  title: "Chivas Regal Abu Dhabi | Event Companion",
  description:
    "Mobile-first event companion app with personalized itineraries and activity details for event attendees.",
  keywords: [
    "event",
    "microsite",
    "itinerary",
    "attendees",
    "registration",
    "chivas regal",
    "abu dhabi"
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      { rel: "icon", url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { rel: "icon", url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" }
    ]
  },
  manifest: "/site.webmanifest",
  themeColor: "#b88d3d",
  viewport: "width=device-width, initial-scale=1"
};

export default function RootLayout({ children }: ChildrenProps) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={` ${chivasLoud.variable} ${chivasLoudBold.variable} ${chivasLoudExtraBold.variable} ${chivasLoudExtraBoldItalic.variable} ${chivasLoudMedium.variable} ${chivasLoudRegular.variable} ${chivasLuxLight.variable} ${chivasLuxRegular.variable} ${chivasLuxSemiBold.variable} ${chivasPrioriLight.variable} ${chivasPrioriRegular.variable} ${chivasPrioriItalic.variable} ${chivasPrioriBlack.variable} `}
    >
      <body className="antialiased">
        {/* Google Analytics - Fail-safe implementation for VIP event */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-EWC94BX4W7"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            try {
              window.dataLayer = window.dataLayer || [];
              function gtag(){
                try {
                  dataLayer.push(arguments);
                } catch(e) {
                  // Silent fail - won't crash app
                }
              }
              gtag('js', new Date());
              gtag('config', 'G-EWC94BX4W7', {
                anonymize_ip: true
              });
            } catch(error) {
              // Silent fail - analytics failure won't affect user experience
            }
          `}
        </Script>
        <DesktopOnlyLayout>{children}</DesktopOnlyLayout>
      </body>
    </html>
  );
}
