import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

/**
 * Helper function to extract a JSON array block matching brackets [ and ] starting from a given index.
 * Handles nested arrays and ignores brackets inside double-quoted string literals.
 */
function extractJsonArray(text: string, startIndex: number): string {
  let depth = 0;
  let inString = false;
  let escape = false;

  for (let i = startIndex; i < text.length; i++) {
    const char = text[i];
    if (escape) {
      escape = false;
      continue;
    }
    if (char === '\\') {
      escape = true;
      continue;
    }
    if (char === '"') {
      inString = !inString;
      continue;
    }
    if (!inString) {
      if (char === '[') {
        depth++;
      } else if (char === ']') {
        depth--;
        if (depth === 0) {
          return text.substring(startIndex, i + 1);
        }
      }
    }
  }
  // Fallback if brackets are unbalanced
  return text.substring(startIndex, startIndex + 100000);
}

/**
 * Handles POST requests to scrape and extract all high-resolution images
 * from a single multi-image Instagram carousel post.
 */
export async function POST(request: Request) {
  try {
    // Parse JSON body safely
    const body = await request.json().catch(() => ({}));
    const targetUrl: string = body.url || body.link || "";

    // Validate request parameter
    if (!targetUrl || typeof targetUrl !== "string") {
      return NextResponse.json(
        { error: "A valid Instagram post URL is required in the request body (url or link)." },
        { status: 400 }
      );
    }

    // Sanitize the URL to keep only the main post reference
    const mediaMatch = targetUrl.match(/(https?:\/\/(?:www\.)?instagram\.com\/(?:p|reel|tv)\/[A-Za-z0-9-_]+)/);
    if (!mediaMatch) {
      return NextResponse.json(
        { error: "Invalid Instagram media URL format. Must be a post, reel, or tv URL." },
        { status: 400 }
      );
    }
    const cleanUrl = `${mediaMatch[1]}/`;

    let html = "";
    let fetchSource = "None";

    // Retrieve ScrapingBee API key from environment variables
    const apiKey = process.env.SCRAPINGBEE_API_KEY || process.env.PROXY_API_KEY;

    if (apiKey) {
      try {
        // Build ScrapingBee proxy endpoint URL utilizing rotating residential proxies
        const proxyUrl = `https://app.scrapingbee.com/api/v1/?api_key=${apiKey}&url=${encodeURIComponent(
          cleanUrl
        )}&premium_proxy=true&render_js=false`;

        // Execute the fetch request via ScrapingBee with a timeout
        const response = await fetch(proxyUrl, {
          method: "GET",
          cache: "no-store",
          signal: AbortSignal.timeout(8000),
        });

        if (response.ok) {
          html = await response.text();
          fetchSource = "ScrapingBee";
        } else {
          console.warn(`ScrapingBee API responded with status ${response.status}. Trying direct fallback.`);
        }
      } catch (err) {
        console.warn("ScrapingBee call failed, trying direct Googlebot fallback:", err);
      }
    }

    // Direct fetch fallback using Googlebot user agent (same method as /api/thumbnail)
    if (!html) {
      try {
        const response = await fetch(cleanUrl, {
          method: "GET",
          headers: {
            "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
            "Accept-Language": "en-US,en;q=0.9",
          },
          cache: "no-store",
          signal: AbortSignal.timeout(6000),
        });

        if (response.ok) {
          html = await response.text();
          fetchSource = "DirectGooglebot";
        } else {
          console.warn(`Direct Googlebot fetch failed with status: ${response.status}`);
        }
      } catch (err) {
        console.error("Direct Googlebot fetch exception:", err);
      }
    }

    if (!html) {
      return NextResponse.json(
        { error: "Failed to retrieve Instagram content via scraping proxy or direct fallback." },
        { status: 502 }
      );
    }

    // Find shortcode from URL
    const shortcodeMatch = targetUrl.match(/\/p\/([A-Za-z0-9-_]+)/) || targetUrl.match(/\/reel\/([A-Za-z0-9-_]+)/);
    const shortcode = shortcodeMatch ? shortcodeMatch[1] : "";

    const matches: string[] = [];

    if (shortcode) {
      // Find the JSON block for the current post code or shortcode key
      const searchStr1 = `"code":"${shortcode}"`;
      const searchStr2 = `"shortcode":"${shortcode}"`;
      let searchIndex = html.indexOf(searchStr1);
      if (searchIndex === -1) {
        searchIndex = html.indexOf(searchStr2);
      }

      if (searchIndex !== -1) {
        // Look for carousel_media following the shortcode definition (scoped to post)
        const carouselStartStr1 = '"carousel_media":[';
        const carouselStartStr2 = '"edge_sidecar_to_children":{"edges":[';

        let carouselIndex = html.indexOf(carouselStartStr1, searchIndex);
        let carouselStartStr = carouselStartStr1;

        let carouselIndex2 = html.indexOf(carouselStartStr2, searchIndex);
        if (carouselIndex === -1 || (carouselIndex2 !== -1 && carouselIndex2 < carouselIndex)) {
          carouselIndex = carouselIndex2;
          carouselStartStr = carouselStartStr2;
        }

        if (carouselIndex !== -1 && (carouselIndex - searchIndex) < 80000) {
          // Extract the carousel media block precisely by finding the matching closing bracket in the full HTML
          const startBracketIndex = carouselIndex + carouselStartStr.length - 1;
          const carouselSubstring = extractJsonArray(html, startBracketIndex);

          try {
            fs.writeFileSync(path.join(process.cwd(), "public", "debug_carousel_substring.txt"), carouselSubstring);
          } catch (e) { }

          // Match all display_uri or display_url values inside this carousel block sequentially
          const regex = /(?:"display_uri"|"display_url")\s*:\s*"([^"]+)"/g;
          let match;

          while ((match = regex.exec(carouselSubstring)) !== null) {
            matches.push(match[1]);
          }
        } else {
          // Fallback: If no carousel is found, check if it's a single image/video post
          // and extract the display_url / display_uri in the immediate post properties block
          const immediateSubstring = html.substring(searchIndex, searchIndex + 3000);
          const uriRegex = /"display_uri"\s*:\s*"([^"]+)"/;
          const urlRegex = /"display_url"\s*:\s*"([^"]+)"/;

          const uriMatch = immediateSubstring.match(uriRegex);
          const urlMatch = immediateSubstring.match(urlRegex);

          if (uriMatch) {
            matches.push(uriMatch[1]);
          } else if (urlMatch) {
            matches.push(urlMatch[1]);
          }
        }
      }
    }

    // Fallback: If no carousel display_url found, check for the og:image meta tag (for single images)
    if (matches.length === 0) {
      const ogImageRegex1 = /<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i;
      const ogImageRegex2 = /<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["']/i;

      let imageUrl = null;
      const match1 = html.match(ogImageRegex1);
      if (match1) {
        imageUrl = match1[1];
      } else {
        const match2 = html.match(ogImageRegex2);
        if (match2) {
          imageUrl = match2[1];
        }
      }

      if (imageUrl) {
        matches.push(imageUrl);
      }
    }

    if (matches.length === 0) {
      return NextResponse.json(
        { error: "No high-resolution images found. The post may be private, single-image without meta tags, or invalid." },
        { status: 404 }
      );
    }

    // Find video url
    let scrapedVideoUrl: string | null = null;

    if (shortcode) {
      const searchStr1 = `"code":"${shortcode}"`;
      const searchStr2 = `"shortcode":"${shortcode}"`;
      let searchIndex = html.indexOf(searchStr1);
      if (searchIndex === -1) {
        searchIndex = html.indexOf(searchStr2);
      }

      if (searchIndex !== -1) {
        // Look for video_url in the immediate neighborhood of the shortcode
        const immediateSubstring = html.substring(searchIndex, searchIndex + 12000);
        const videoUrlRegex = /"video_url"\s*:\s*"([^"]+)"/;
        const videoMatch = immediateSubstring.match(videoUrlRegex);
        if (videoMatch) {
          scrapedVideoUrl = videoMatch[1];
        }
      }
    }

    // Fallback to og:video meta tags
    if (!scrapedVideoUrl) {
      const ogVideoRegex1 = /<meta[^>]*property=["']og:video["'][^>]*content=["']([^"']+)["']/i;
      const ogVideoRegex2 = /<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:video["']/i;
      const matchV1 = html.match(ogVideoRegex1);
      if (matchV1) {
        scrapedVideoUrl = matchV1[1];
      } else {
        const matchV2 = html.match(ogVideoRegex2);
        if (matchV2) {
          scrapedVideoUrl = matchV2[1];
        }
      }
    }

    let decodedVideoUrl: string | null = null;
    if (scrapedVideoUrl) {
      decodedVideoUrl = scrapedVideoUrl
        .replace(/&amp;/g, "&")
        .replace(/\\u0026/g, "&")
        .replace(/\\\//g, "/")
        .replace(/\\"/g, '"');
    }

    // Clean, decode Unicode sequences, HTML entities, and unescape paths for each matched image URL
    const decodedUrls = matches.map((rawUrl) =>
      rawUrl
        .replace(/&amp;/g, "&")
        .replace(/\\u0026/g, "&")
        .replace(/\\\//g, "/")
        .replace(/\\"/g, '"')
    );

    // Filter unique URLs to eliminate duplicates
    const uniqueImages = Array.from(new Set(decodedUrls));

    console.log("Scraped Instagram Carousel Image URLs:", uniqueImages);
    console.log("Scraped Instagram Video URL:", decodedVideoUrl);

    // Return the response containing array of high-resolution images and video URL
    return NextResponse.json({
      images: uniqueImages,
      video: decodedVideoUrl
    });
  } catch (error: any) {
    console.error("Instagram Carousel Extraction Error:", error);
    return NextResponse.json(
      { error: error.message || "An unexpected internal server error occurred." },
      { status: 500 }
    );
  }
}
