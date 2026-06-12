import React from "react";

interface SafeRikafuTextProps {
  text: string;
}

export default function SafeRikafuText({ text }: SafeRikafuTextProps) {
  if (!text) return null;
  if (!text.includes("&")) {
    return <>{text}</>;
  }

  const parts = text.split("&");
  return (
    <>
      {parts.map((part, index) => (
        <React.Fragment key={index}>
          {part}
          {index < parts.length - 1 && (
            <span className="font-serif italic font-normal select-all">&</span>
          )}
        </React.Fragment>
      ))}
    </>
  );
}
