"use client";

import React, { useCallback, useRef, useState } from "react";
import Button from "../common/button";
import { displayFontMedium } from "@/fonts";
import { useRouter } from "next/navigation";
import QRCode, { type QRCodeRef } from "../common/qr-code";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { FiDownload, FiShare2 } from "react-icons/fi";

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
  const availabilityMessage =
    hasQrPayload && !hasWallet
      ? "Google Wallet pass is unavailable right now. You can still use the QR code for check-in."
      : !hasQrPayload && hasWallet
        ? "Check-in QR is unavailable right now. You can still use your Google Wallet pass for entry."
        : !hasQrPayload && !hasWallet
          ? "Google Wallet pass and check-in QR are currently unavailable. Please return to registration and try again."
          : null;

  return (
    <div
      className={`mx-auto flex h-full w-full max-w-2xl grow flex-col items-center justify-center space-y-5 px-2 pt-6 pb-10 text-center text-lg sm:space-y-6 sm:px-4 sm:text-xl ${displayFontMedium.className}`}
    >

      <p className="max-w-xl text-sm text-white/90 sm:text-base">
        Save your pass or screenshot your QR code. Show it at the entrance on event day.
      </p>

      {!hasQrPayload ? (
        <div className="rounded-md border border-amber-300/30 bg-amber-200/10 px-4 py-3 text-sm text-amber-100">
          We could not prepare your check-in QR yet. Please return to registration and try again.
        </div>
      ) : (
        <div className="w-full max-w-[248px] rounded-xl border border-white/15 bg-black/20 p-3 sm:max-w-[288px] sm:p-5">
          <QRCode
            ref={qrCodeRef}
            value={checkIn?.qrPayloadUrl ?? ""}
            size={240}
            color="#000000"
            background="#ffffff"
            className="mx-auto block aspect-square h-auto w-full max-w-[208px] rounded-md bg-white sm:max-w-[220px]"
          />
        </div>
      )}

      <div className="w-full max-w-lg space-y-3 text-left">
        <div className="rounded-xl border border-white/15 bg-black/20 p-4">
          <p className="mb-3 text-xs tracking-[0.12em] text-white/70 uppercase">Wallet Passes</p>
          <div className="grid grid-cols-1 gap-3">
            <button
              type="button"
              aria-label="Add to Google Wallet"
              onClick={() => {
                if (!hasWallet || !wallet?.googleWalletUrl) return;
                window.open(wallet.googleWalletUrl, "_blank", "noopener,noreferrer");
              }}
              disabled={!hasWallet}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-md border border-neutral-300 bg-white px-4 text-sm font-semibold text-black transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FcGoogle className="text-lg" />
              <span>Add to Google Wallet</span>
            </button>

            <button
              type="button"
              aria-label="Add to Apple Wallet"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-md border border-white/20 bg-white px-4 text-sm font-semibold text-black transition hover:bg-neutral-100"
            >
              <FaApple className="text-base" />
              <span>Add to Apple Wallet</span>
            </button>
          </div>
        </div>

        <div className="flex flex-row items-center justify-center gap-4 px-2">
          <hr className="flex-1 border-white/15" />
          <p className="text-xs tracking-[0.12em] text-white/70 uppercase">OR</p>
          <hr className="flex-1 border-white/15" />
        </div>

        <div className="rounded-xl border border-white/15 bg-black/20 p-3 sm:p-4">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <Button
              size="lg"
              className="flex h-10 items-center justify-center gap-2 px-4 text-[13px] tracking-[0.08em] uppercase sm:h-11 sm:text-sm"
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
              <FiDownload className="text-sm" />
              <span>Download QR</span>
            </Button>

            <Button
              size="lg"
              className="flex h-10 items-center justify-center gap-2 px-4 text-[13px] tracking-[0.08em] uppercase sm:h-11 sm:text-sm"
              onClick={() => {
                void handleShare();
              }}
              disabled={!hasQrPayload || sharing}
            >
              <FiShare2 className="text-sm" />
              <span>{sharing ? "Sharing..." : "Share"}</span>
            </Button>
          </div>
        </div>
      </div>

      {availabilityMessage ? <p className="text-sm text-amber-200">{availabilityMessage}</p> : null}

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
