import React from "react";
import { Footer, MicroLogo, ReactIcon } from "@/components";
import { chivasLuxRegular } from "@/fonts";
import { ChildrenProps } from "@/types";
import { classNames } from "@/utils";
import Link from "next/link";

interface FormLayoutProps extends ChildrenProps {
  subtitle?: string;
  dark?: boolean;
  className?: string;
  backIcon?: boolean;
}

const FormLayout: React.FC<FormLayoutProps> = ({
  subtitle = "",
  children,
  dark = false,
  className = "",
  backIcon = false
}) => {
  return (
    <div className="relative flex min-h-screen flex-col py-2 md:py-4">
      <div className="mx-auto flex w-full flex-col items-center justify-center py-4">
        <MicroLogo dark={dark} />
        <div className="flex items-center justify-center">
          {backIcon && (
            <Link href="/itinerary" className="absolute left-0 translate-y-[8px] gap-2 text-black">
              <ReactIcon icon="HiArrowLeft" className="size-5" />
            </Link>
          )}

          <h1
            className={classNames(
              className,
              chivasLuxRegular.className,
              dark ? "text-[#000000]" : "text-white",
              "py-7 text-center text-xl font-medium uppercase md:px-10 md:text-2xl"
            )}
          >
            {subtitle}
          </h1>
        </div>
      </div>
      {children}
      <Footer className="mt-auto" />
    </div>
  );
};

export default FormLayout;
