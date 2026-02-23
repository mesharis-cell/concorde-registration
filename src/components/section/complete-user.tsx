"use client";

import React, { useCallback, useRef, useState } from "react";
import Button from "../common/button";
import { displayFontMedium } from "@/fonts";
import { useRouter } from "next/navigation";
import QRCode, { type QRCodeRef } from "../common/qr-code";

interface CompleteUserProps {
  name?: string;
  channel?: string;
  email?: string;
  wallet?: {
    googleWalletUrl: string;
    passReferenceId: string;
    expiresAt: string;
  } | null;
  checkIn?: {
    qrPayloadUrl: string;
    token: string;
    expiresAt: string;
  } | null;
}

function CompleteUser({ name, email, wallet, checkIn }: CompleteUserProps) {
  const router = useRouter();
  const qrCodeRef = useRef<QRCodeRef>(null);
  const [shareError, setShareError] = useState<string>("");
  const [sharing, setSharing] = useState(false);

  const downloadQrImage = useCallback((): boolean => {
    const qrImage = qrCodeRef.current?.getImage();
    if (!qrImage) {
      return false;
    }

    const link = document.createElement("a");
    link.href = qrImage;
    link.download = "savvio-concorde-check-in-qr.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  }, []);

  const handleShare = useCallback(async () => {
    setShareError("");

    if (!checkIn?.qrPayloadUrl) {
      setShareError("No QR payload is available to share.");
      return;
    }

    setSharing(true);

    try {
      const qrImage = qrCodeRef.current?.getImage();
      const title = "Savvio Concorde Check-In Pass";
      const text = "Save this pass or screenshot the QR for event entry.";

      if (navigator.share) {
        if (qrImage) {
          try {
            const imageResponse = await fetch(qrImage);
            const imageBlob = await imageResponse.blob();
            const imageFile = new File([imageBlob], "savvio-concorde-check-in-qr.png", {
              type: "image/png"
            });

            const canShareFiles =
              typeof navigator.canShare === "function" &&
              navigator.canShare({ files: [imageFile] });

            if (canShareFiles) {
              await navigator.share({
                title,
                text,
                url: checkIn.qrPayloadUrl,
                files: [imageFile]
              });
              return;
            }
          } catch {
            // Fall back to URL/text share below.
          }
        }

        await navigator.share({
          title,
          text,
          url: checkIn.qrPayloadUrl
        });
        return;
      }

      const downloaded = downloadQrImage();
      if (!downloaded) {
        setShareError("Unable to share or download the QR code.");
      }
    } catch (error: unknown) {
      if (error instanceof Error && error.name === "AbortError") {
        return;
      }
      const downloaded = downloadQrImage();
      if (!downloaded) {
        setShareError("Unable to share or download the QR code.");
      }
    } finally {
      setSharing(false);
    }
  }, [checkIn?.qrPayloadUrl, downloadQrImage]);

  const hasWallet = Boolean(wallet?.googleWalletUrl);
  const hasQrPayload = Boolean(checkIn?.qrPayloadUrl);

  return (
    <div
      className={`mx-auto flex h-full w-full max-w-2xl grow flex-col items-center justify-center space-y-5 px-2 pt-6 pb-10 text-center text-lg sm:space-y-6 sm:px-4 sm:text-xl ${displayFontMedium.className}`}
    >
      <h1 className="text-2xl leading-tight sm:text-3xl">
        {`Thank you${name ? `, ${name}` : ""}.`}
        <br />
        Your registration has been confirmed.
      </h1>

      {email ? <p className="text-sm text-white/80">{email}</p> : null}

      <p className="max-w-xl text-sm text-white/90 sm:text-base">
        Save your pass or screenshot your QR code. Show it at the entrance on event day.
      </p>

      {!hasQrPayload ? (
        <div className="rounded-md border border-amber-300/30 bg-amber-200/10 px-4 py-3 text-sm text-amber-100">
          We could not prepare your check-in QR yet. Please return to registration and try again.
        </div>
      ) : (
        <div className="w-full max-w-[280px] rounded-xl border border-white/15 bg-black/20 p-3 sm:max-w-[320px] sm:p-6">
          <QRCode
            ref={qrCodeRef}
            value={checkIn?.qrPayloadUrl ?? ""}
            size={260}
            color="#000000"
            background="#ffffff"
            errorCorrection="M"
            className="mx-auto aspect-square h-auto w-full max-w-[240px] rounded-md bg-white p-2 sm:max-w-[260px]"
          />
        </div>
      )}

      <div className="grid w-full max-w-lg grid-cols-1 gap-3 sm:grid-cols-2">
        <Button
          size="xl"
          className="uppercase"
          onClick={() => {
            if (!hasWallet || !wallet?.googleWalletUrl) return;
            window.open(wallet.googleWalletUrl, "_blank", "noopener,noreferrer");
          }}
          disabled={!hasWallet}
        >
          Add to Google Wallet
        </Button>

        <Button
          size="xl"
          className="uppercase"
          onClick={() => {
            const downloaded = downloadQrImage();
            if (!downloaded) {
              setShareError("Unable to download QR code.");
            } else {
              setShareError("");
            }
          }}
          disabled={!hasQrPayload}
        >
          Download QR
        </Button>

        <Button
          size="xl"
          className="uppercase sm:col-span-2"
          onClick={() => {
            void handleShare();
          }}
          disabled={!hasQrPayload || sharing}
        >
          {sharing ? "Sharing..." : "Share"}
        </Button>
      </div>

      {!hasWallet ? (
        <p className="text-sm text-amber-200">
          Wallet pass URL is unavailable right now. Please contact support before the event.
        </p>
      ) : null}

      {shareError ? <p className="text-sm text-red-300">{shareError}</p> : null}

      <Button
        size="xl"
        className="mt-2 uppercase"
        onClick={() => {
          router.push("/");
        }}
      >
        Return to home
      </Button>
    </div>
  );
}

export default CompleteUser;
