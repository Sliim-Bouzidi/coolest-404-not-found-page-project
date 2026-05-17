"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [loginHovered, setLoginHovered] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        const video = document.querySelector("video");
        if (video) {
          // Force-reload the video to clear the frozen Chromium buffer on tab wake-up
          video.load();
          video.play().catch(() => {});
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <main className="flex justify-center items-center h-screen overflow-hidden bg-gradient-to-b from-[#5C9FCB] to-[#E4ECF9] relative">
      {/* Navbar */}
      <nav className="absolute top-0 left-0 right-0 flex justify-between items-center py-6 px-10 z-10">
        {/* Logo */}
        <div className="flex overflow-hidden">
          <div
            className="flex items-center gap-2.5"
            style={{
              transform: mounted ? "translateX(0)" : "translateX(-115%)",
              transitionProperty: "transform",
              transitionDuration: "2.2s",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              transitionDelay: "0s",
            }}
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path
                d="M20 0 C20 0, 23 15, 40 20 C40 20, 23 23, 20 40 C20 40, 17 23, 0 20 C0 20, 17 17, 20 0Z"
                fill="white"
              />
            </svg>
            <span className="font-extrabold text-[28px] text-white">
              Sculpt
            </span>
          </div>
        </div>

        {/* Login Button */}
        <div className="flex overflow-hidden">
          <button
            className="font-bold text-xl text-[#6E6E6E] bg-gradient-to-b from-white to-[#F6F8FA] border border-white rounded-2xl py-3 px-6 cursor-pointer flex items-center justify-center"
            style={{
              boxShadow: loginHovered
                ? "0px 3px 6px 0px rgba(0, 0, 0, 0.2)"
                : "0px 1px 1px 0px rgba(0, 0, 0, 0.25)",
              transform: !mounted
                ? "translateX(115%) translateY(0)"
                : loginHovered
                  ? "translateX(0) translateY(-1px)"
                  : "translateX(0) translateY(0)",
              transitionProperty: mounted ? "transform, box-shadow" : "transform",
              transitionDuration: mounted ? "0.2s, 0.2s" : "2.2s",
              transitionTimingFunction: mounted ? "ease, ease" : "cubic-bezier(0.16, 1, 0.3, 1)",
              transitionDelay: "0s",
            }}
            onMouseEnter={() => setLoginHovered(true)}
            onMouseLeave={() => setLoginHovered(false)}
          >
            Log in
          </button>
        </div>
      </nav>

      {/* Cloud Background behind 404 & Character */}
      <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] max-w-[1600px] h-auto z-0 pointer-events-none select-none overflow-visible">
        <img
          src="/Clouds_PNG_Transparent_Clip_Art_Image.png"
          alt="Sky Clouds"
          className="floating-clouds w-full h-auto opacity-30 block pointer-events-none select-none"
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
        />
      </div>

      <div className="flex flex-col items-center text-center gap-5 z-1">
        <div className="relative flex justify-center items-center">
          <div
            className="absolute flex justify-center items-center font-extrabold text-[clamp(280px,38vw,850px)] tracking-[-0.09em] leading-none z-0 select-none -translate-x-[0.045em]"
            style={{
              maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%)",
            }}
          >
            {["4", "0", "4"].map((char, index) => (
              <span
                key={index}
                className="inline-block bg-gradient-to-b from-white to-[#E3EBF9] bg-clip-text text-transparent"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateY(0)" : "translateY(-150px)",
                  transitionProperty: "opacity, transform",
                  transitionDuration: "1.6s, 1.6s",
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1), cubic-bezier(0.16, 1, 0.3, 1)",
                  transitionDelay: `${index * 0.15}s`,
                }}
              >
                {char}
              </span>
            ))}
          </div>
          <div className="absolute bottom-[5px] w-[30%] h-5 rounded-[50%] bg-black/30 blur-md z-2" />
          <video
            src="/ch.webm"
            poster="/charactr.png"
            preload="auto"
            autoPlay
            loop
            muted
            playsInline
            controlsList="nodownload noremoteplayback"
            disablePictureInPicture
            disableRemotePlayback
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
            className="max-h-[54vh] w-auto object-contain relative z-1 pointer-events-none select-none"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "scale(1)" : "scale(0.95)",
              transitionProperty: "opacity, transform",
              transitionDuration: "1.6s, 1.6s",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1), cubic-bezier(0.16, 1, 0.3, 1)",
              transitionDelay: "0s",
            }}
          />
        </div>

        {/* Text Section */}
        <div className="flex flex-col gap-2.5 items-center">
          <h1 className="font-extrabold text-[clamp(36px,4vw,54px)] text-[#2C2A49] m-0 tracking-[-0.03em] flex flex-wrap justify-center">
            {"Oops, I think we're lost".split(" ").map((word, idx) => (
              <span
                key={idx}
                className="inline-block mr-[0.24em]"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateX(0)" : "translateX(-30px)",
                  transitionProperty: "opacity, transform",
                  transitionDuration: "0.8s, 0.8s",
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1), cubic-bezier(0.16, 1, 0.3, 1)",
                  transitionDelay: `${idx * 0.08}s`,
                }}
              >
                {word}
              </span>
            ))}
          </h1>
          <p className="font-medium text-2xl text-[#6E6E6E] m-0 flex flex-wrap justify-center">
            {"Let's get you back to somewhere familiar...".split(" ").map((word, idx) => (
              <span
                key={idx}
                className="inline-block mr-[0.22em]"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateX(0)" : "translateX(-20px)",
                  transitionProperty: "opacity, transform",
                  transitionDuration: "0.7s, 0.7s",
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1), cubic-bezier(0.16, 1, 0.3, 1)",
                  transitionDelay: `${idx * 0.06}s`,
                }}
              >
                {word}
              </span>
            ))}
          </p>
        </div>

        {/* Back to Home Link/Button */}
        <div
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transitionProperty: "opacity, transform",
            transitionDuration: "0.7s, 0.7s",
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1), cubic-bezier(0.16, 1, 0.3, 1)",
            transitionDelay: "0.3s",
          }}
        >
          <button className="font-bold text-xl text-[#2C2A49] bg-gradient-to-b from-white to-[#F6F8FA] border border-white rounded-2xl py-3 px-6 cursor-pointer flex items-center justify-center gap-2.5 relative z-10 shadow-[0_1px_1px_rgba(0,0,0,0.25)] hover:-translate-y-0.5 hover:shadow-[0_3px_6px_rgba(0,0,0,0.2)] transition-all duration-200 ease-in-out">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="block"
            >
              <path d="m11 9l-3 3m0 0l3 3m-3-3h8m5 0a9 9 0 1 0-18 0a9 9 0 0 0 18 0" />
            </svg>
            <span>Back to home</span>
          </button>
        </div>
      </div>

      {/* Footer / Attribution */}
      <div
        className="absolute bottom-4 right-6 z-10"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(10px)",
          transitionProperty: "opacity, transform",
          transitionDuration: "0.8s",
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          transitionDelay: "0.5s",
        }}
      >
        <a
          href="https://www.linkedin.com/in/slim-bouzidi/?skipRedirect=true"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-xs text-[#6E6E6E]/40 hover:text-[#2C2A49]/60 transition-colors duration-200"
        >
          Developed by <span className="font-bold">@Slim Bouzidi</span>
        </a>
      </div>
    </main>
  );
}
