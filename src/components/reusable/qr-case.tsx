import React from "react";
import Image from "next/image";
import Container from "./container";
import Footer from "../common/footer";
import QRCode from "../common/qr-code";
import MicroLogo from "../common/logo";
import { chivasLuxRegular } from "@/fonts";

function QrCase() {
  return (
    <Container size="full" background="desktop-bg-gold">
      <div className="mx-auto flex h-dvh max-w-[450px] flex-col py-2 text-center md:pt-16 md:pb-4 lg:max-w-[660px]">
        <div className="mx-auto flex w-full flex-col items-center justify-center gap-8 py-4">
          <MicroLogo dark />
          <h1
            className={`pt-7 pb-2 text-center text-4xl text-black uppercase md:px-10 ${chivasLuxRegular.className}`}
          >
            FOR A SEAMLESS JOURNEY AND A BETTER EXPERIENCE
          </h1>
        </div>

        <div className="flex flex-col items-center justify-center">
          <h2
            className={`pb-4 text-center text-xl text-black uppercase md:px-10 ${chivasLuxRegular.className}`}
          >
            Scan to continue <br /> on your phone
          </h2>
          <div className="relative flex w-full items-center justify-center">
            <Image
              src={"/assets/scan.svg"}
              width={296}
              height={287}
              alt="microsite logo"
              className="flex items-center justify-center"
              priority={true}
            />
            <div className="absolute inset-0 flex items-center justify-center p-9">
              <QRCode
                value={
                  typeof window !== "undefined"
                    ? window.location.href
                    : process.env.NEXT_PUBLIC_BASE_URL || "https://register.chiv0037.online"
                }
                size={270}
                color="#000000"
                padding={10}
                background="rgba(255, 255, 255, 0.0)"
                errorCorrection="M"
                className="translate-2.5"
              />
            </div>
          </div>
        </div>

        <Footer className="mt-auto" />
      </div>
    </Container>
  );
}

export default QrCase;
