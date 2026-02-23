"use client";

import { useState } from "react";
import Image from "next/image";

interface ThumbnailImageProps {
  src: string;
  alt: string;
}

function ThumbnailImage({ src, alt }: ThumbnailImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return null;
  }

  return (
    <div className="relative h-[195px] w-full overflow-hidden">
      <Image
        src={src}
        alt={alt}
        width={800}
        height={400}
        className="h-auto w-full object-cover"
        layout="responsive"
        priority
        onError={() => setHasError(true)}
      />
    </div>
  );
}

export default ThumbnailImage;
