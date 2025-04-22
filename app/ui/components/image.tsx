"use client";

import { useState } from "react";
import NextImage, { ImageProps as NextImageProps } from "next/image";

interface ImageProps extends NextImageProps {
  fallbackSrc?: string; // Optional fallback image source
}

export default function Image({ src, fallbackSrc, alt, ...props }: ImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);

  const handleError = () => {
    if (fallbackSrc) {
      setCurrentSrc(fallbackSrc); // Set fallback image if the primary image fails
    }
  };

  return (
    <NextImage
      {...props}
      src={currentSrc}
      alt={alt}
      onError={handleError} // Handle image load errors
    />
  );
}