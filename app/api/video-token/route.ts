import { NextResponse } from "next/server";
import { generateToken } from "@/lib/videoToken";

export async function GET() {
  const token = await generateToken();
  
  const response = NextResponse.json({ token });
  
  // Set a secure, short-lived HttpOnly cookie valid for 15 seconds
  response.cookies.set("video_token", token, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 15, // 15 seconds
  });
  
  return response;
}
