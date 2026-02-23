import React from "react";
import { Footer, MicroLogo } from "@/components";
import { bodyFontRegular } from "@/fonts";
import { ChildrenProps } from "@/types";
import Image from "next/image";

interface FormLayoutProps extends ChildrenProps {
  subtitle?: string;
  dark?: boolean;
  path?: string;
  className?: string;
}

const RegistrationLayout: React.FC<FormLayoutProps> = ({
  path,
  subtitle = "",
  children,
  className
}) => {
  return (
    <div className={`relative flex min-h-screen flex-col py-2 md:py-4 ${className}`}>
      <div className="mx-auto flex w-full flex-col items-center justify-center py-4">
        <MicroLogo />
        {path && (
          <Image
            src={path}
            alt="path"
            width={89}
            height={70}
            className="mt-6 py-3"
            quality={50}
            priority={true}
          />
        )}
        <h1
          className={`pt-6 text-center text-3xl font-medium text-white uppercase sm:py-7 md:px-10 md:text-4xl ${bodyFontRegular.className}`}
        >
          {subtitle}
        </h1>
      </div>
      {children}
      <Footer className="mt-auto" />
    </div>
  );
};

export default RegistrationLayout;
