"use client";

import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RegistrationLayout from "../layout/registration-layout";
import Container from "../reusable/container";
import CompleteUser from "./complete-user";

interface ConfirmationSummary {
  email: string;
  fullName: string;
  phone: string;
  attendeeId?: string;
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

function RegisterComplete() {
  const [summary, setSummary] = useState<ConfirmationSummary | null>(null);
  const router = useRouter();

  useEffect(() => {
    try {
      const registerConfirmation = Cookies.get("register_confirmation");
      if (registerConfirmation) {
        setSummary(JSON.parse(registerConfirmation));
        // Don't remove cookie in development to allow refreshing
        if (process.env.NODE_ENV === 'production') {
          Cookies.remove("register_confirmation");
          Cookies.remove("register_profile");
        }
        return;
      }

      const registerProfile = Cookies.get("register_profile");
      if (registerProfile) {
        setSummary(JSON.parse(registerProfile));
        if (process.env.NODE_ENV === 'production') {
          Cookies.remove("register_profile");
        }
        return;
      }

      // Only redirect if not in development mode
      if (process.env.NODE_ENV === 'production') {
        router.replace("/registration");
      } else {
        console.warn("⚠️ Development mode: No cookie found, but not redirecting");
      }
    } catch { }
  }, [router]);

  return (
    <Container>
      <RegistrationLayout subtitle="REGISTRATION COMPLETE!">
        <CompleteUser
          name={summary?.fullName}
          channel={"Email"}
          email={summary?.email}
          wallet={summary?.wallet || null}
          checkIn={summary?.checkIn || null}
        />
      </RegistrationLayout>
    </Container>
  );
}

export default RegisterComplete;
