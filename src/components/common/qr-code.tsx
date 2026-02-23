"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
  useCallback
} from "react";
import QRious from "qrious";

export interface QRCodeProps {
  errorCorrection?: "L" | "M" | "Q" | "H";
  background?: string;
  color?: string;
  size?: number;
  value?: string;
  padding?: number;
  className?: string;
}

export interface QRCodeRef {
  getImage: () => string;
  getError: () => string;
}

const QRCode = forwardRef<QRCodeRef, QRCodeProps>(
  (
    {
      errorCorrection = "L",
      background = "#fff",
      color = "#000",
      size = 200,
      value = "",
      padding = 0,
      className = "qrcode"
    },
    ref
  ) => {
    const [image, setImage] = useState<string>("");
    const [error, setError] = useState<string>("");
    const qrCodeRef = useRef<QRious | null>(null);

    const generateQrCode = useCallback(() => {
      if (!qrCodeRef.current || !value) return;

      try {
        qrCodeRef.current.set({
          background,
          foreground: color,
          level: errorCorrection,
          padding,
          size,
          value
        });

        const newImage = qrCodeRef.current.toDataURL("image/png");
        setImage(newImage);
        setError("");
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to generate QR code";
        setError(errorMessage);
        console.error("QR Code generation error:", err);
      }
    }, [value, errorCorrection, background, color, size, padding]);

    const getImage = (): string => {
      return image;
    };

    const getError = (): string => {
      return error;
    };

    // Expose methods via ref
    useImperativeHandle(ref, () => ({
      getImage,
      getError
    }));

    useEffect(() => {
      try {
        qrCodeRef.current = new QRious();
        if (value) {
          generateQrCode();
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to initialize QR code library";
        setError(errorMessage);
        console.error("QR Code initialization error:", err);
      }
    }, [value, generateQrCode]);

    // Regenerate QR code when dependencies change
    useEffect(() => {
      if (value && qrCodeRef.current) {
        generateQrCode();
      }
    }, [value, errorCorrection, background, color, size, padding, generateQrCode]);

    if (error) {
      return <div className="error text-sm text-red-500">{error}</div>;
    }

    if (image) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt={`QR Code for ${value}`} className={className} />
      );
    }

    return <div className="placeholder text-sm text-gray-400">No QR code generated</div>;
  }
);

QRCode.displayName = "QRCode";

export default QRCode;

