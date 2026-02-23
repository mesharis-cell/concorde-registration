import React from "react";
import Container from "./container";
import Footer from "../common/footer";
import QRCode from "../common/qr-code";
import MicroLogo from "../common/logo";
import { bodyFontRegular } from "@/fonts";

function QrCase() {
  return (
    <Container size="full" background="bg-shell-desktop">
      <div className="mx-auto flex h-dvh max-w-[450px] flex-col py-2 text-center md:pt-16 md:pb-4 lg:max-w-[660px]">
        <div className="mx-auto flex w-full flex-col items-center justify-center gap-8 py-4">
          <MicroLogo />
          <h1
            className={`pt-7 pb-2 text-center text-4xl text-white uppercase md:px-10 ${bodyFontRegular.className}`}
          >
            CHECK IN FASTER WITH YOUR SAVVIO PASS
          </h1>
        </div>

        <div className="flex flex-col items-center justify-center">
          <h2
            className={`pb-4 text-center text-xl text-white/90 uppercase md:px-10 ${bodyFontRegular.className}`}
          >
            Scan to continue <br /> on your phone
          </h2>
          <div className="flex items-center justify-center rounded-2xl border border-white/25 bg-white/10 p-5 sm:p-6">
            <QRCode
              value={
                typeof window !== "undefined"
                  ? window.location.href
                  : process.env.NEXT_PUBLIC_BASE_URL || "https://demo.savvio.digital"
              }
              size={250}
              color="#000000"
              padding={10}
              background="#ffffff"
              errorCorrection="M"
              className="rounded-lg bg-white p-2"
            />
          </div>
        </div>

        <Footer className="mt-auto" />
      </div>
    </Container>
  );
}

export default QrCase;
