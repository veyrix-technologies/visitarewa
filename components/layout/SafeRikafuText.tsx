import React from "react";

interface SafeRikafuTextProps {
  text: string;
}

export default function SafeRikafuText({ text }: SafeRikafuTextProps) {
  if (!text) return null;

  // If the text does not contain any of the unsupported characters, return it directly
  if (!text.includes("&") && !text.includes(",")) {
    return <>{text}</>;
  }

  // Split using regex capture group to keep the delimiters in the resulting tokens array
  const parts = text.split(/([&,])/);

  return (
    <>
      {parts.map((part, index) => {
        if (part === "&") {
          return (
            <span key={index} className="font-serif italic font-normal select-all">
              &
            </span>
          );
        }
        if (part === ",") {
          return (
            <span key={index} className="font-sans font-normal">
              ,
            </span>
          );
        }
        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </>
  );
}
