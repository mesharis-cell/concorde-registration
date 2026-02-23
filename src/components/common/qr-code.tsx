"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
  useCallback
} from "react";
import QRCodeGenerator from "qrcode";

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
    const generationIdRef = useRef(0);

    const generateQrCode = useCallback(async () => {
      const generationId = ++generationIdRef.current;

      if (!value) {
        setImage("");
        setError("");
        return;
      }

      try {
        const newImage = await QRCodeGenerator.toDataURL(value, {
          errorCorrectionLevel: errorCorrection,
          width: size,
          margin: Math.max(1, padding),
          color: {
            dark: color,
            light: background
          }
        });

        if (generationId !== generationIdRef.current) {
          return;
        }

        setImage(newImage);
        setError("");
      } catch (err) {
        if (generationId !== generationIdRef.current) {
          return;
        }

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
      void generateQrCode();
    }, [generateQrCode]);

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
