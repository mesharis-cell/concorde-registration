"use client";

import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RegistrationLayout from "../layout/registration-layout";
import Container from "../reusable/container";
import UserCard from "../common/user-card";
import CompleteUser from "./complete-user";

interface ConfirmationSummary {
  email: string;
  fullName: string;
  phone: string;
}

function RegisterComplete() {
  const [summary, setSummary] = useState<ConfirmationSummary | null>(null);
  const router = useRouter();

  useEffect(() => {
    try {
      const registerProfile = Cookies.get("register_profile");
      if (registerProfile) {
        setSummary(JSON.parse(registerProfile));
        // Don't remove cookie in development to allow refreshing
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
        <CompleteUser name={summary?.fullName} channel={"Email"} />
      </RegistrationLayout>
    </Container>
  );
}

export default RegisterComplete;
