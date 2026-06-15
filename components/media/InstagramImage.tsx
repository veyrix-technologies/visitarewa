"use client";

import React from "react";

interface InstagramImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallbackSrc?: string;
}

export default function InstagramImage({
  src,
  fallbackSrc = "/images/zuma.webp",
  className,
  ...props
}: InstagramImageProps) {
  return (
    <img
      src={src || fallbackSrc}
      className={className}
      referrerPolicy="no-referrer"
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        if (target.src !== fallbackSrc) {
          target.src = fallbackSrc;
        }
      }}
      {...props}
    />
  );
}
