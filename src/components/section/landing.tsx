"use client";

import React, { useEffect } from "react";
import Button from "../common/button";
import { useRouter, useSearchParams } from "next/navigation";

function Landing() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Store URL params in sessionStorage on mount to persist through navigation
  useEffect(() => {
    console.log("🏠 [LANDING PAGE] Landing page mounted");
    console.log("🏠 [LANDING PAGE] Current URL:", window.location.href);
    console.log("🏠 [LANDING PAGE] Search params:", window.location.search);

    const urlParams: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      urlParams[key] = value;
      console.log(`🏠 [LANDING PAGE] Found URL param: ${key} = ${value}`);
    });

    if (Object.keys(urlParams).length > 0) {
      console.log("🏠 [LANDING PAGE] Storing URL params in sessionStorage:", urlParams);
      sessionStorage.setItem("registration_url_params", JSON.stringify(urlParams));
    } else {
      console.log("🏠 [LANDING PAGE] No URL params found on landing page");
    }
  }, [searchParams]);

  const handleRegisterClick = () => {
    console.log("🏠 [LANDING PAGE] Register button clicked");

    // Get params from sessionStorage (stored on mount)
    const storedParams = sessionStorage.getItem("registration_url_params");

    if (storedParams) {
      try {
        const params = JSON.parse(storedParams);
        const queryString = new URLSearchParams(params).toString();
        const targetUrl = `/registration?${queryString}`;

        console.log("🏠 [LANDING PAGE] Navigating with params:", params);
        console.log("🏠 [LANDING PAGE] Target URL:", targetUrl);

        router.push(targetUrl);
      } catch (error) {
        console.error("🏠 [LANDING PAGE] Error parsing stored params:", error);
        router.push("/registration");
      }
    } else {
      console.log("🏠 [LANDING PAGE] No stored params, navigating without query string");
      router.push("/registration");
    }
  };

  return (
    <div className="mb-10 flex h-full flex-col space-y-4 px-4.5 md:px-14">
      <Button
        size="xl"
        onClick={handleRegisterClick}
        className="!font-display-medium uppercase"
      >
        REGISTER NOW
      </Button>
    </div>
  );
}

export default Landing;
