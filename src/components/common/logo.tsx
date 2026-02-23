import Image from "next/image";
import Link from "next/link";
import React from "react";

const MicroLogo: React.FC<{ dark?: boolean }> = ({ dark = false }) => {
  return (
    <Link href="/">
      <Image
        src={dark ? "/black-logo.svg" : "/white-logo.svg"}
        width={254}
        height={37}
        alt="microsite logo"
        className="mx-auto"
        priority={true}
      />
    </Link>
  );
};

export default MicroLogo;
