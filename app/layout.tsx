import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sculpt - Page Not Found",
  description: "Oops! We couldn't find the page you were looking for.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={manrope.variable}>
      <head>
        {/* Preload critical clouds background image */}
        <link
          rel="preload"
          href="/Clouds_PNG_Transparent_Clip_Art_Image.png"
          as="image"
        />
        {/* Preload lightweight character poster image */}
        <link
          rel="preload"
          href="/charactr.png"
          as="image"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
