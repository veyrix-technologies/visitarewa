export interface ParsedVideo {
  type: "youtube" | "instagram" | "tiktok" | "direct" | "unknown";
  embedUrl: string;
  isPortrait: boolean;
}

export const parseVideo = (url: string): ParsedVideo => {
  if (!url) return { type: "unknown", embedUrl: "", isPortrait: false };

  if (/\.(mp4|webm|ogg)($|\?)/i.test(url)) {
    const isPortrait = url.includes("abdulwanders") || url.includes("portrait") || url.includes("reel");
    return { type: "direct", embedUrl: url, isPortrait };
  }

  const ytReg = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const ytMatch = url.match(ytReg);
  if (ytMatch && ytMatch[2].length === 11) {
    return {
      type: "youtube",
      embedUrl: `https://www.youtube.com/embed/${ytMatch[2]}?autoplay=1&rel=0`,
      isPortrait: false,
    };
  }

  const igReg = /instagram\.com\/(p|reel)\/([^/?#&]+)/i;
  const igMatch = url.match(igReg);
  if (igMatch) {
    return {
      type: "instagram",
      embedUrl: `https://www.instagram.com/${igMatch[1]}/${igMatch[2]}/embed/`,
      isPortrait: true,
    };
  }

  const ttReg = /tiktok\.com\/(@[^/]+)\/video\/(\d+)/i;
  const ttMatch = url.match(ttReg);
  if (ttMatch) {
    return {
      type: "tiktok",
      embedUrl: `https://www.tiktok.com/embed/v2/${ttMatch[2]}`,
      isPortrait: true,
    };
  }

  return { type: "unknown", embedUrl: url, isPortrait: false };
};
