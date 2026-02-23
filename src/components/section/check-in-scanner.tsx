"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { BrowserMultiFormatReader, type IScannerControls } from "@zxing/browser";
import { displayFontMedium, bodyFontRegular } from "@/fonts";
import Button from "../common/button";

type ScanResultState = {
  level: "success" | "warning" | "error";
  title: string;
  message: string;
  checkedInAt?: string;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

function getErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return "Unable to start camera scanner.";
}

function pickPreferredCamera(devices: MediaDeviceInfo[]): MediaDeviceInfo | undefined {
  if (devices.length === 0) return undefined;

  const rearCameraRegex =
    /(back|rear|environment|traseira|trasera|arriere|arrière|rueck|后置|後置|背面)/i;

  return devices.find((device) => rearCameraRegex.test(device.label)) ?? devices[0];
}

function extractCheckInToken(scannedText: string): string | null {
  const trimmed = scannedText.trim();
  if (!trimmed) return null;

  try {
    const parsedUrl = new URL(trimmed);
    const token = parsedUrl.searchParams.get("token");
    if (token && token.trim().length > 0) {
      return token.trim();
    }
  } catch {
    // Keep parsing below for non-URL values.
  }

  const tokenMatch = trimmed.match(/(?:\?|&)token=([^&]+)/i);
  if (tokenMatch?.[1]) {
    return decodeURIComponent(tokenMatch[1]).trim();
  }

  const jwtLike = trimmed.split(".");
  if (jwtLike.length === 3 && jwtLike.every((part) => part.length > 0)) {
    return trimmed;
  }

  return null;
}

export default function CheckInScanner() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const controlsRef = useRef<IScannerControls | null>(null);
  const processingRef = useRef(false);

  const [cameraReady, setCameraReady] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [scanResult, setScanResult] = useState<ScanResultState | null>(null);
  const [processing, setProcessing] = useState(false);
  const [lastScannedValue, setLastScannedValue] = useState("");
  const [manualInput, setManualInput] = useState("");
  const [activeCameraLabel, setActiveCameraLabel] = useState("");

  const stopScanner = useCallback(() => {
    controlsRef.current?.stop();
    controlsRef.current = null;
    setCameraReady(false);
    setActiveCameraLabel("");
  }, []);

  const consumeCheckInToken = useCallback(async (token: string) => {
    setProcessing(true);
    setScanResult(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/public/check-in/consume`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ token })
      });

      const payload = (await response.json()) as {
        success?: boolean;
        error?: string;
        details?: string;
        data?: {
          alreadyCheckedIn?: boolean;
          checkedInAt?: string;
        };
      };

      if (!response.ok || !payload.success) {
        setScanResult({
          level: "error",
          title: "Check-in failed",
          message: payload.error || payload.details || "Invalid or expired QR code."
        });
        return;
      }

      if (payload.data?.alreadyCheckedIn) {
        setScanResult({
          level: "warning",
          title: "Already checked in",
          message: "This attendee has already been checked in.",
          checkedInAt: payload.data.checkedInAt
        });
        return;
      }

      setScanResult({
        level: "success",
        title: "Check-in successful",
        message: "Attendee marked as checked in.",
        checkedInAt: payload.data?.checkedInAt
      });
    } catch (error: unknown) {
      setScanResult({
        level: "error",
        title: "Scanner error",
        message: getErrorMessage(error)
      });
    } finally {
      setProcessing(false);
    }
  }, []);

  const startScanner = useCallback(async () => {
    if (!videoRef.current) return;

    stopScanner();
    setScanResult(null);
    setCameraError("");
    setLastScannedValue("");

    try {
      const scanner = new BrowserMultiFormatReader();
      const devices = await BrowserMultiFormatReader.listVideoInputDevices();
      const preferredCamera = pickPreferredCamera(devices);
      const selectedDeviceId = preferredCamera?.deviceId;

      const controls = await scanner.decodeFromVideoDevice(
        selectedDeviceId,
        videoRef.current,
        (result, error) => {
          if (result && !processingRef.current) {
            processingRef.current = true;

            const scannedText = result.getText();
            setLastScannedValue(scannedText);
            stopScanner();

            const token = extractCheckInToken(scannedText);
            if (!token) {
              setScanResult({
                level: "error",
                title: "Invalid QR payload",
                message: "Scanned QR does not contain a check-in token."
              });
              processingRef.current = false;
              return;
            }

            void consumeCheckInToken(token).finally(() => {
              processingRef.current = false;
            });
          }

          if (
            error &&
            !(error instanceof Error && error.name === "NotFoundException")
          ) {
            const message = getErrorMessage(error);
            setCameraError(message);
          }
        }
      );

      controlsRef.current = controls;
      setCameraReady(true);
      setActiveCameraLabel(preferredCamera?.label || "Default camera");
    } catch (error: unknown) {
      setCameraError(getErrorMessage(error));
      setCameraReady(false);
    }
  }, [consumeCheckInToken, stopScanner]);

  useEffect(() => {
    void startScanner();
    return () => {
      stopScanner();
    };
  }, [startScanner, stopScanner]);

  const resultStyles: Record<NonNullable<ScanResultState["level"]>, string> = {
    success: "border-green-400/40 bg-green-500/10 text-green-100",
    warning: "border-amber-300/40 bg-amber-500/10 text-amber-100",
    error: "border-red-300/40 bg-red-500/10 text-red-100"
  };

  const handleManualSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const rawInput = manualInput.trim();
      if (!rawInput) {
        setScanResult({
          level: "error",
          title: "Missing input",
          message: "Paste a QR URL or token to continue."
        });
        return;
      }

      const token = extractCheckInToken(rawInput) ?? rawInput;
      setLastScannedValue(rawInput);
      stopScanner();
      void consumeCheckInToken(token);
    },
    [consumeCheckInToken, manualInput, stopScanner]
  );

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center px-4 py-8 text-white">
      <header className="mb-6 text-center">
        <h1 className={`text-3xl uppercase sm:text-4xl ${displayFontMedium.className}`}>
          Savvio Concorde
        </h1>
        <p className={`mt-2 text-sm uppercase text-white/80 sm:text-base ${bodyFontRegular.className}`}>
          Check-In Scanner
        </p>
      </header>

      <section className="w-full rounded-xl border border-white/20 bg-black/30 p-4 sm:p-6">
        <div className="relative overflow-hidden rounded-lg border border-white/20 bg-black">
          <video
            ref={videoRef}
            className="h-[320px] w-full object-cover sm:h-[420px]"
            muted
            playsInline
            autoPlay
          />
          {!cameraReady ? (
            <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-sm uppercase text-white/80">
              Starting camera...
            </div>
          ) : null}
        </div>

        {activeCameraLabel ? (
          <p className="mt-2 text-xs text-white/70">Camera: {activeCameraLabel}</p>
        ) : null}

        <div className="mt-4 flex flex-wrap gap-3">
          <Button
            size="xl"
            className="uppercase"
            onClick={() => {
              processingRef.current = false;
              void startScanner();
            }}
            disabled={processing}
          >
            {processing ? "Processing..." : "Scan Next"}
          </Button>
        </div>

        <form className="mt-4 space-y-2" onSubmit={handleManualSubmit}>
          <label htmlFor="manual-token" className="block text-xs uppercase tracking-[0.08em] text-white/75">
            Manual check-in (paste QR URL or token)
          </label>
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              id="manual-token"
              type="text"
              value={manualInput}
              onChange={(event) => {
                setManualInput(event.target.value);
              }}
              placeholder="https://.../check-in/consume?token=..."
              className="h-11 w-full rounded-md border border-white/20 bg-black/40 px-3 text-sm text-white placeholder:text-white/45 focus:border-white/40 focus:outline-none"
            />
            <Button
              size="lg"
              className="h-11 min-w-[132px] uppercase"
              type="submit"
              disabled={processing}
            >
              Submit Token
            </Button>
          </div>
        </form>

        {cameraError ? (
          <div className="mt-4 rounded-md border border-red-300/40 bg-red-500/10 px-4 py-3 text-sm text-red-100">
            <p className="font-semibold uppercase">Camera access issue</p>
            <p className="mt-1">{cameraError}</p>
            <p className="mt-2 text-xs text-red-100/80">
              Allow camera permissions in your browser settings, then tap &quot;Scan Next&quot;.
            </p>
          </div>
        ) : null}

        {scanResult ? (
          <div className={`mt-4 rounded-md border px-4 py-3 text-sm ${resultStyles[scanResult.level]}`}>
            <p className="font-semibold uppercase">{scanResult.title}</p>
            <p className="mt-1">{scanResult.message}</p>
            {scanResult.checkedInAt ? (
              <p className="mt-1 text-xs">Timestamp: {new Date(scanResult.checkedInAt).toLocaleString()}</p>
            ) : null}
          </div>
        ) : null}

        {lastScannedValue ? (
          <p className="mt-3 break-all text-xs text-white/70">Scanned value: {lastScannedValue}</p>
        ) : null}
      </section>
    </main>
  );
}
