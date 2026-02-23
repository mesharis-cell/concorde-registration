"use client";

import React, { useState, useEffect } from "react";
import { ChildrenProps } from "@/types";
import QrCase from "../reusable/qr-case";

const DesktopOnlyLayout: React.FC<ChildrenProps> = ({ children }) => {
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Check if device is mobile
    const userAgent = navigator.userAgent || navigator.vendor;
    const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    const isMobileDevice = mobileRegex.test(userAgent);

    setIsMobile(isMobileDevice);
  }, []);

  if (!isClient) {
    // SSR: render null to avoid hydration mismatch
    return null;
  }

  // Desktop view - show QR code
  if (!isMobile) {
    return <QrCase />;
  }

  // Mobile view - show content
  return <>{children}</>;
};

export default DesktopOnlyLayout;
