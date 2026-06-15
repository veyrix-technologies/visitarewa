import { useState } from "react";

export function useInstagramMedia(isOpen: boolean, videoUrl: string) {
  const [playInline, setPlayInline] = useState(false);

  return {
    resolvedImages: [],
    resolvedVideo: null,
    playInline,
    setPlayInline,
    currentIdx: 0,
    setCurrentIdx: () => {},
    loadingImages: false,
  };
}
