"use client";

import React from "react";
import Button from "../common/button";
import { chivasLoudMedium } from "@/fonts";
import { useRouter } from "next/navigation";

interface CompleteUserProps {
    name?: string;
    channel?: string;
}

function CompleteUser({ name, channel }: CompleteUserProps) {
    const router = useRouter();

    return (
        <div
            className={`h-full grow mx-auto px-4 flex max-w-sm flex-col items-center justify-center space-y-4 pt-7 text-center text-xl max-sm:leading-6 sm:space-y-6 sm:text-2xl ${chivasLoudMedium.className}`}
        >
            <h1>{`Thank you${name ? ", " + name : ""}.`} <br /> Your registration has been confirmed.</h1>
            <h2 className="mt-4">
                {`You'll receive updates once your itinerary is ready.`}
            </h2>
            <Button
                size="xl"
                className="mt-4 uppercase"
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
