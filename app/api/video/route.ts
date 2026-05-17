import { NextRequest } from "next/server";
import fs from "fs";
import path from "path";
import { isValidToken } from "@/lib/videoToken";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  const cookieToken = request.cookies.get("video_token")?.value;

  // 1. Authenticate using both the query token and the secure HttpOnly cookie (awaited validation)
  if (!token || !cookieToken || token !== cookieToken || !(await isValidToken(token))) {
    return new Response("Unauthorized stream request", { status: 403 });
  }

  const filePath = path.join(process.cwd(), "videos", "ch.webm");

  // 2. Verify file existence
  if (!fs.existsSync(filePath)) {
    return new Response("Video stream asset not found", { status: 404 });
  }

  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = request.headers.get("range");

  // 3. Handle Range Requests (HTTP 206) for native progressive streaming & instant playback
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = end - start + 1;
    const fileStream = fs.createReadStream(filePath, { start, end });

    const webStream = new ReadableStream({
      start(controller) {
        fileStream.on("data", (chunk: any) => {
          controller.enqueue(new Uint8Array(chunk));
        });
        fileStream.on("end", () => controller.close());
        fileStream.on("error", (err) => controller.error(err));
      },
      cancel() {
        fileStream.destroy();
      },
    });

    return new Response(webStream, {
      status: 206,
      headers: {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize.toString(),
        // Served as application/octet-stream so download managers do not intercept it as a video
        "Content-Type": "application/octet-stream",
        // Cache the stream privately in the browser for 24 hours.
        // This allows Chromium-based players (Brave, Chrome) to loop the stream instantly
        // from their local disk cache without making buggy network range queries on loops!
        "Cache-Control": "private, max-age=86400, immutable",
        "Content-Disposition": "inline",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } else {
    // Standard full stream
    const fileStream = fs.createReadStream(filePath);
    const webStream = new ReadableStream({
      start(controller) {
        fileStream.on("data", (chunk: any) => {
          controller.enqueue(new Uint8Array(chunk));
        });
        fileStream.on("end", () => controller.close());
        fileStream.on("error", (err) => controller.error(err));
      },
      cancel() {
        fileStream.destroy();
      },
    });

    return new Response(webStream, {
      headers: {
        "Content-Length": fileSize.toString(),
        // Served as application/octet-stream so download managers do not intercept it as a video
        "Content-Type": "application/octet-stream",
        // Cache the stream privately in the browser for 24 hours
        "Cache-Control": "private, max-age=86400, immutable",
        "Content-Disposition": "inline",
        "X-Content-Type-Options": "nosniff",
      },
    });
  }
}
