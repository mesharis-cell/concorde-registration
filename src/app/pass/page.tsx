"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Container from "@/components/reusable/container";
import RegistrationLayout from "@/components/layout/registration-layout";
import CompleteUser from "@/components/section/complete-user";
import Button from "@/components/common/button";
import { getPassPreview, type PassPreviewSuccess } from "@/services/update-register";

type PassPageState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; payload: PassPreviewSuccess["data"] };

export default function PassPage() {
  const searchParams = useSearchParams();
  const token = useMemo(() => searchParams.get("token")?.trim() || "", [searchParams]);
  const [state, setState] = useState<PassPageState>({ status: "loading" });

  useEffect(() => {
    let isCancelled = false;

    async function loadPass() {
      if (!token) {
        setState({
          status: "error",
          message:
            "This pass link is invalid. Please request a new registration confirmation email."
        });
        return;
      }

      setState({ status: "loading" });
      const result = await getPassPreview(token);

      if (isCancelled) {
        return;
      }

      if (!result.success) {
        setState({
          status: "error",
          message:
            result.error ||
            "This pass link has expired or is invalid. Please request a new registration confirmation email."
        });
        return;
      }

      setState({ status: "ready", payload: result.data });
    }

    void loadPass();

    return () => {
      isCancelled = true;
    };
  }, [token]);

  return (
    <Container>
      <RegistrationLayout subtitle="YOUR ENTRY PASS">
        {state.status === "loading" ? (
          <div className="mx-auto mt-4 w-full max-w-xl rounded-xl border border-white/15 bg-black/20 p-6 text-center text-white/80">
            Loading your pass...
          </div>
        ) : null}

        {state.status === "error" ? (
          <div className="mx-auto mt-4 w-full max-w-xl space-y-4 rounded-xl border border-red-400/30 bg-red-500/10 p-6 text-center">
            <p className="text-sm text-red-100">{state.message}</p>
            <div className="flex items-center justify-center">
              <Button size="lg" className="uppercase" onClick={() => window.location.assign("/")}>
                Return to home
              </Button>
            </div>
          </div>
        ) : null}

        {state.status === "ready" ? (
          <>
            <p className="mx-auto max-w-xl px-2 text-center text-sm text-white/70">
              {state.payload.event.name}
            </p>
            <CompleteUser
              name={`${state.payload.attendee.firstName} ${state.payload.attendee.lastName}`.trim()}
              email={state.payload.attendee.email}
              wallet={state.payload.wallet}
              checkIn={state.payload.checkIn}
            />
          </>
        ) : null}
      </RegistrationLayout>
    </Container>
  );
}
