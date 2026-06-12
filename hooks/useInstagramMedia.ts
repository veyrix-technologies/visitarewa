import { useState, useEffect } from "react";

export function useInstagramMedia(isOpen: boolean, videoUrl: string) {
  const [resolvedImages, setResolvedImages] = useState<string[]>([]);
  const [resolvedVideo, setResolvedVideo] = useState<string | null>(null);
  const [playInline, setPlayInline] = useState(false);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [loadingImages, setLoadingImages] = useState<boolean>(false);
  const [apiFailed, setApiFailed] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen || !videoUrl) {
      setResolvedImages([]);
      setResolvedVideo(null);
      setPlayInline(false);
      setCurrentIdx(0);
      setApiFailed(false);
      return;
    }

    const isInstagram = videoUrl.includes("instagram.com");
    if (!isInstagram) return;

    let active = true;
    setLoadingImages(true);
    setApiFailed(false);

    const fetchInstagramMedia = async () => {
      try {
        const res = await fetch("/api/carousel", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: videoUrl }),
        });
        if (res.ok) {
          const data = await res.json();
          if (active) {
            if (data.video) {
              setResolvedVideo(data.video);
            }
            if (data.images && data.images.length > 0) {
              setResolvedImages(data.images);
            } else if (!data.video) {
              setApiFailed(true);
            }
          }
        } else {
          if (active) setApiFailed(true);
        }
      } catch (err) {
        console.error("Failed to fetch carousel media:", err);
        if (active) setApiFailed(true);
      } finally {
        if (active) setLoadingImages(false);
      }
    };

    fetchInstagramMedia();
    return () => {
      active = false;
    };
  }, [isOpen, videoUrl]);

  return {
    resolvedImages,
    resolvedVideo,
    playInline,
    setPlayInline,
    currentIdx,
    setCurrentIdx,
    loadingImages,
    apiFailed,
  };
}
