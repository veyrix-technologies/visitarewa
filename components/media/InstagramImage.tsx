"use client";

import React, { useState, useEffect } from "react";

interface InstagramImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallbackSrc?: string;
  isLocal?: boolean;
}

export default function InstagramImage({
  src,
  fallbackSrc = "/images/zuma.webp",
  isLocal = false,
  className,
  ...props
}: InstagramImageProps) {
  const [resolvedSrc, setResolvedSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isInstagram = !isLocal && src && src.includes("instagram.com");

  useEffect(() => {
    if (!isInstagram) {
      setResolvedSrc(src);
      return;
    }

    let active = true;
    setLoading(true);

    const fetchImage = async () => {
      try {
        const isProfile = !src.includes("/p/") && !src.includes("/reel/") && !src.includes("/tv/");
        
        let endpoint = "/api/thumbnail";
        let body: any = { url: src };

        if (isProfile) {
          const username = src.replace(/\/$/, "").split("/").pop()?.split("?")[0];
          if (username) {
            endpoint = "/api/profile-pic";
            body = { username };
          }
        }

        const res = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        if (res.ok) {
          const data = await res.json();
          if (active && data.url) {
            setResolvedSrc(data.url);
            return;
          }
        }
      } catch (err) {
        console.error("Error resolving Instagram image:", err);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchImage();

    return () => {
      active = false;
    };
  }, [src, isInstagram]);

  if (loading) {
    return (
      <div className="flex items-center justify-center bg-zinc-900/60 w-full h-full absolute inset-0">
        <svg className="animate-spin h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      </div>
    );
  }

  return (
    <img
      src={resolvedSrc || fallbackSrc}
      className={className}
      referrerPolicy="no-referrer"
      {...props}
    />
  );
}
