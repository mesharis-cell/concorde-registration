import Link from "next/link";
import React from "react";

const MicroLogo: React.FC<{ dark?: boolean }> = ({ dark = false }) => {
  return (
    <Link href="/">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo-S-white.png"
        srcSet="/logo-S-white.png 1x, /logo-S-white@2x.png 2x, /logo-S-white@3x.png 3x"
        alt="Savvio Concorde logo"
        className={`mx-auto h-11 w-11 object-contain ${dark ? "invert brightness-0" : ""}`}
      />
    </Link>
  );
};

export default MicroLogo;
