import React from "react";
import { classNames } from "@/utils";
import type { ReactNode } from "react";

interface ContainerProps {
  id?: string;
  size?: "md" | "full";
  full?: boolean;
  className?: string;
  children?: ReactNode;
  grain?: boolean;
  background?: string;
}

const styles = {
  md: "mx-auto w-full px-[1rem] max-w-[1024px] relative h-dvh overflow-hidden overflow-y-auto",
  full: "mx-auto w-full px-[2.5rem] max-w-full relative h-dvh overflow-hidden overflow-y-auto"
};

const Container: React.FC<ContainerProps> = ({
  id,
  size = "md",
  className = "",
  grain = false,
  children,
  background,
  full = false,
  ...props
}) => {
  return (
    <section
      className={classNames(styles[size], background ? background : "mobile-bg-gold")}
      {...props}
      id={id}
    >
      <div className="z-10 min-h-full px-4">
        <div
          className={classNames(
            className,
            grain ? "bg-luxury-grain" : "bg-luxury-gold add-grain-3",
            "relative min-h-full md:h-full"
          )}
        >
          <div className={`relative z-10 min-h-full md:h-full ${full ? "" : "xs:px-3.5 px-2.5"}`}>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Container;
