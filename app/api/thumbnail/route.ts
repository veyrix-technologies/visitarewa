import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "URL is required and must be a string." },
        { status: 400 }
      );
    }

    // Validate and clean Instagram post/reel/tv or profile URLs
    const isProfile = !/\/(?:p|reel|tv|stories|direct|explore)\//i.test(url);
    let cleanUrl = "";

    if (isProfile) {
      const profileMatch = url.match(/(https?:\/\/(?:www\.)?instagram\.com\/[A-Za-z0-9._]+)/);
      if (!profileMatch) {
        return NextResponse.json(
          { error: "Invalid Instagram profile URL format." },
          { status: 400 }
        );
      }
      cleanUrl = `${profileMatch[1]}/`;
    } else {
      const mediaMatch = url.match(/(https?:\/\/(?:www\.)?instagram\.com\/(?:p|reel|tv)\/[A-Za-z0-9-_]+)/);
      if (!mediaMatch) {
        return NextResponse.json(
          { error: "Invalid Instagram media URL format. Must be a post, reel, or tv URL." },
          { status: 400 }
        );
      }
      cleanUrl = `${mediaMatch[1]}/`;
    }

    // Fetch the Instagram page from the server using Googlebot user agent
    const response = await fetch(cleanUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
        "Accept-Language": "en-US,en;q=0.9",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch Instagram page. Status: ${response.status}` },
        { status: 404 }
      );
    }

    const html = await response.text();

    // Regex to capture the og:image content attribute regardless of property ordering
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

    if (!imageUrl) {
      return NextResponse.json(
        { error: "Unable to extract thumbnail. The post may be private or deleted." },
        { status: 404 }
      );
    }

    // Decode HTML entities (e.g. &amp; -> &)
    const decodedUrl = imageUrl.replace(/&amp;/g, "&");

    return NextResponse.json({ url: decodedUrl });
  } catch (error: any) {
    console.error("Error extracting Instagram thumbnail:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
