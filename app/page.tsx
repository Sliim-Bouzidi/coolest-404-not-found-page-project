"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [loginHovered, setLoginHovered] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        overflow: "hidden",
        background: "linear-gradient(to bottom, #5C9FCB, #E4ECF9)",
        position: "relative",
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "24px 40px",
          zIndex: 10,
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", overflow: "hidden" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              transform: mounted ? "translateX(0)" : "translateX(-115%)",
              transition: "transform 2.2s cubic-bezier(0.16, 1, 0.3, 1)",
              transitionDelay: "0.2s",
            }}
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path
                d="M20 0 C20 0, 23 15, 40 20 C40 20, 23 23, 20 40 C20 40, 17 23, 0 20 C0 20, 17 17, 20 0Z"
                fill="white"
              />
            </svg>
            <span
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 800,
                fontSize: "28px",
                color: "#FFFFFF",
              }}
            >
              Sculpt
            </span>
          </div>
        </div>

        {/* Login Button */}
        <div style={{ display: "flex", overflow: "hidden" }}>
          <button
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 700,
              fontSize: "20px",
              color: "#6E6E6E",
              background: "linear-gradient(to bottom, #FFFFFF, #F6F8FA)",
              border: "1px solid #FFFFFF",
              borderRadius: "16px",
              padding: "12px 24px",
              cursor: "pointer",
              boxShadow: loginHovered
                ? "0px 3px 6px 0px rgba(0, 0, 0, 0.2)"
                : "0px 1px 1px 0px rgba(0, 0, 0, 0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: !mounted
                ? "translateX(115%) translateY(0)"
                : loginHovered
                  ? "translateX(0) translateY(-1px)"
                  : "translateX(0) translateY(0)",
              transition: mounted
                ? "transform 0.2s ease, box-shadow 0.2s ease"
                : "transform 2.2s cubic-bezier(0.16, 1, 0.3, 1)",
              transitionDelay: mounted ? "0s" : "0.2s",
            }}
            onMouseEnter={() => setLoginHovered(true)}
            onMouseLeave={() => setLoginHovered(false)}
          >
            Log in
          </button>
        </div>
      </nav>

      {/* Cloud Background behind 404 & Character */}
      <div
        style={{
          position: "absolute",
          top: "45%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "110%",
          maxWidth: "1600px",
          height: "auto",
          zIndex: 0,
          pointerEvents: "none",
          userSelect: "none",
          overflow: "visible",
        }}
      >
        <img
          src="/Clouds_PNG_Transparent_Clip_Art_Image.png"
          alt="Sky Clouds"
          className="floating-clouds"
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
          style={{
            width: "100%",
            height: "auto",
            opacity: 0.3,
            display: "block",
            pointerEvents: "none",
            userSelect: "none",
            WebkitUserSelect: "none",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "20px",
          zIndex: 1,
        }}
      >
        <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div
            style={{
              position: "absolute",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(250px, 33vw, 750px)",
              letterSpacing: "-0.09em",
              lineHeight: 1,
              zIndex: 0,
              userSelect: "none",
              transform: "translateX(-0.045em)",
              maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%)",
            }}
          >
            {["4", "0", "4"].map((char, index) => (
              <span
                key={index}
                style={{
                  display: "inline-block",
                  background: "linear-gradient(to bottom, #FFFFFF, #E3EBF9)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateY(0)" : "translateY(-150px)",
                  transition: "opacity 1.6s cubic-bezier(0.16, 1, 0.3, 1), transform 1.6s cubic-bezier(0.16, 1, 0.3, 1)",
                  transitionDelay: `${0.4 + index * 0.25}s`,
                }}
              >
                {char}
              </span>
            ))}
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "5px",
              width: "30%",
              height: "20px",
              borderRadius: "50%",
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              filter: "blur(10px)",
              zIndex: 2,
            }}
          />
          <video
            src="/ch.webm"
            autoPlay
            loop
            muted
            playsInline
            controlsList="nodownload noremoteplayback"
            disablePictureInPicture
            disableRemotePlayback
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
            style={{
              maxHeight: "54vh",
              width: "auto",
              objectFit: "contain",
              position: "relative",
              zIndex: 1,
              pointerEvents: "none",
              userSelect: "none",
              WebkitUserSelect: "none",
            }}
          />
        </div>

        {/* Text Section */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
          <h1
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(36px, 4vw, 54px)",
              color: "#2C2A49",
              margin: 0,
              letterSpacing: "-0.03em",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {"Oops, I think we're lost".split(" ").map((word, idx) => (
              <span
                key={idx}
                style={{
                  display: "inline-block",
                  marginRight: "0.24em",
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateX(0)" : "translateX(-30px)",
                  transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                  transitionDelay: `${0.5 + idx * 0.08}s`,
                }}
              >
                {word}
              </span>
            ))}
          </h1>
          <p
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 500,
              fontSize: "24px",
              color: "#6E6E6E",
              margin: 0,
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {"Let's get you back to somewhere familiar...".split(" ").map((word, idx) => (
              <span
                key={idx}
                style={{
                  display: "inline-block",
                  marginRight: "0.22em",
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateX(0)" : "translateX(-20px)",
                  transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
                  transitionDelay: `${0.9 + idx * 0.06}s`,
                }}
              >
                {word}
              </span>
            ))}
          </p>
        </div>

        {/* Back to Home Link/Button */}
        <button
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 700,
            fontSize: "20px",
            color: "#2C2A49",
            background: "linear-gradient(to bottom, #FFFFFF, #F6F8FA)",
            border: "1px solid #FFFFFF",
            borderRadius: "16px",
            padding: "12px 24px",
            cursor: "pointer",
            boxShadow: "0px 1px 1px 0px rgba(0, 0, 0, 0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            position: "relative",
            zIndex: 10,
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow = "0px 3px 6px 0px rgba(0, 0, 0, 0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "none";
            e.currentTarget.style.boxShadow = "0px 1px 1px 0px rgba(0, 0, 0, 0.25)";
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ display: "block" }}
          >
            <path d="m11 9l-3 3m0 0l3 3m-3-3h8m5 0a9 9 0 1 0-18 0a9 9 0 0 0 18 0" />
          </svg>
          <span>Back to home</span>
        </button>
      </div>
    </main>
  );
}
