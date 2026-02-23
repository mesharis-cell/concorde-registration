"use client";

import React from "react";
import Footer from "../common/footer";
import MicroLogo from "../common/logo";
import { bodyFontRegular } from "@/fonts";
import Container from "../reusable/container";
import { ChildrenProps } from "@/types";
import Button from "../common/button";
import { useRouter } from "next/navigation";

interface FooterContentLayoutProps extends ChildrenProps {
  subtitle: string;
}

const FooterContentLayout: React.FC<FooterContentLayoutProps> = ({ children, subtitle }) => {
  const router = useRouter();

  return (
    <Container grain>
      <div className="relative flex min-h-screen flex-col py-2 md:py-4">
        <div className="mx-auto w-full py-4">
          <MicroLogo />

          <Button onClick={() => router.back()} className="mt-6 px-1.5" size="sm">
            ← BACK
          </Button>
          <h1
            className={`pt-3 text-lg font-medium text-white uppercase md:px-10 md:text-2xl ${bodyFontRegular.className}`}
          >
            {subtitle}
          </h1>
        </div>
        {children}
        <Footer className="mt-auto" />
      </div>
    </Container>
  );
};

export default FooterContentLayout;
