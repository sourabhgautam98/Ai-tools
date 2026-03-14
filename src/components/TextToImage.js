"use client";

import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import { IMAGE_API_KEY } from "@/utils/constants";

export default function TextToImageUI() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setError("");
    setImage(null);

    try {
      const response = await axios.request({
        method: "POST",
        url: "https://ai-text-to-image-generator-flux-free-api.p.rapidapi.com/aaaaaaaaaaaaaaaaaiimagegenerator/quick.php",
        headers: {
          "x-rapidapi-key": IMAGE_API_KEY,
          "x-rapidapi-host": "ai-text-to-image-generator-flux-free-api.p.rapidapi.com",
          "Content-Type": "application/json",
        },
        data: {
          prompt: text,
          style_id: 4,
          size: "1-1",
        },
      });

      const data = response.data;

      // API returns { final_result: [{ origin, thumb, index, nsfw }, ...] }
      const imageUrl = data?.final_result?.[0]?.origin || null;

      if (imageUrl) {
        setImage(imageUrl);
      } else {
        setError("Unable to generate image. Please try again.");
      }
    } catch (err) {
      console.error("Image generation failed:", err);
      setError(
        err.response?.data?.message ||
          "Unable to generate image. Please check your API key and try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Text to Image — AI Tools</title>
        <meta name="description" content="Generate stunning images from text descriptions using AI." />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <style jsx global>{`
        .tti-page {
          min-height: 100vh;
          background: linear-gradient(145deg, #0a0a1a 0%, #0b1628 40%, #0a0a1a 100%);
          font-family: 'Inter', sans-serif;
          position: relative;
          overflow: hidden;
        }
        .tti-page::before {
          content: '';
          position: absolute;
          top: -200px;
          left: -200px;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .tti-page::after {
          content: '';
          position: absolute;
          bottom: -200px;
          right: -200px;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 70%);
          pointer-events: none;
        }
        .tti-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 24px;
          backdrop-filter: blur(12px);
          padding: 2rem;
        }
        .tti-input-row {
          display: flex;
          gap: 0.75rem;
          align-items: stretch;
        }
        @media (max-width: 640px) {
          .tti-input-row {
            flex-direction: column;
          }
        }
        .tti-input {
          flex: 1;
          padding: 1rem 1.25rem;
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.04);
          color: #e2e8f0;
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          outline: none;
          transition: all 0.3s ease;
        }
        .tti-input::placeholder {
          color: rgba(255, 255, 255, 0.25);
        }
        .tti-input:focus {
          border-color: rgba(56, 189, 248, 0.5);
          box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.1), 0 0 30px rgba(56, 189, 248, 0.05);
        }
        .tti-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          border-radius: 14px;
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          color: #fff;
          background: linear-gradient(135deg, #38bdf8, #0ea5e9);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(56, 189, 248, 0.3);
          white-space: nowrap;
        }
        .tti-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 28px rgba(56, 189, 248, 0.45);
        }
        .tti-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
          transform: none;
        }
        .tti-result {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 20px;
          padding: 1.5rem;
          animation: ttiFadeUp 0.6s ease both;
        }
        .tti-download {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.75rem;
          border-radius: 12px;
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          color: #fff;
          background: linear-gradient(135deg, #34d399, #059669);
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 4px 16px rgba(52, 211, 153, 0.25);
        }
        .tti-download:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 24px rgba(52, 211, 153, 0.4);
        }
        @keyframes ttiFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .tti-skeleton {
          border-radius: 16px;
          background: linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 75%);
          background-size: 200% 100%;
          animation: shimmer 1.8s ease-in-out infinite;
        }
      `}</style>

      <div className="tti-page">
        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "720px",
            margin: "0 auto",
            padding: "5rem 1.5rem 3rem",
          }}
        >
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.35rem 1rem",
                borderRadius: "999px",
                background: "rgba(56, 189, 248, 0.1)",
                border: "1px solid rgba(56, 189, 248, 0.2)",
                marginBottom: "1.25rem",
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#38bdf8" }} />
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "#38bdf8",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                AI Powered
              </span>
            </div>

            <h1
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(1.75rem, 5vw, 2.75rem)",
                fontWeight: 700,
                color: "#fff",
                margin: "0 0 0.75rem",
                lineHeight: 1.2,
              }}
            >
              Text to Image
            </h1>
            <p
              style={{
                fontSize: "1.05rem",
                color: "rgba(255,255,255,0.5)",
                maxWidth: "480px",
                margin: "0 auto",
                lineHeight: 1.6,
              }}
            >
              Turn your ideas into stunning visuals with AI-powered image generation.
            </p>
          </div>

          {/* Input card */}
          <div className="tti-card">
            <div className="tti-input-row">
              <input
                type="text"
                className="tti-input"
                placeholder="Describe your image..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                disabled={loading}
                onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
              />
              <button
                className="tti-btn"
                onClick={handleGenerate}
                disabled={loading || !text.trim()}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin"
                      style={{ width: 18, height: 18 }}
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    Generating...
                  </>
                ) : (
                  <>
                    <svg style={{ width: 18, height: 18 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Generate
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Loading skeleton */}
          {loading && (
            <div style={{ marginTop: "1.5rem" }}>
              <div className="tti-skeleton" style={{ width: "100%", height: 320 }} />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.75rem",
                  marginTop: "1rem",
                  color: "#38bdf8",
                }}
              >
                <svg className="animate-spin" style={{ width: 18, height: 18 }} fill="none" viewBox="0 0 24 24">
                  <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                <span style={{ fontSize: "0.9rem", fontWeight: 500 }}>
                  Generating image, please wait...
                </span>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div
              style={{
                marginTop: "1.5rem",
                padding: "1rem 1.25rem",
                borderRadius: 14,
                background: "rgba(239, 68, 68, 0.08)",
                border: "1px solid rgba(239, 68, 68, 0.2)",
                color: "#fca5a5",
                fontSize: "0.9rem",
                lineHeight: 1.6,
              }}
            >
              {error}
            </div>
          )}

          {/* Image result */}
          {image && !loading && (
            <div className="tti-result" style={{ marginTop: "1.5rem", textAlign: "center" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  marginBottom: "1rem",
                }}
              >
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: "#34d399",
                    boxShadow: "0 0 8px rgba(52,211,153,0.5)",
                  }}
                />
                <span
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.6)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  Generated Image
                </span>
              </div>

              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: 360,
                  borderRadius: 16,
                  overflow: "hidden",
                  marginBottom: "1.25rem",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <Image
                  src={image}
                  alt="Generated result"
                  fill
                  style={{ objectFit: "contain" }}
                  unoptimized
                />
              </div>

              <a href={image} download="generated-image.png" className="tti-download">
                <svg style={{ width: 16, height: 16 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Image
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
