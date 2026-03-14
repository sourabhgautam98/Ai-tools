"use client";

import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import axios from "axios";
import Image from "next/image";
import { REMOVER_API_KEY } from "@/utils/constants";

export default function BackgroundRemover() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [inputImage, setInputImage] = useState(null);
  const [outputImage, setOutputImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const inputFileRef = useRef();

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setError(null);
    setSelectedFile(file);
    setOutputImage(null);
    setLoading(false);
    const previewUrl = URL.createObjectURL(file);
    setInputImage(previewUrl);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setError(null);
      setSelectedFile(file);
      setOutputImage(null);
      setLoading(false);
      setInputImage(URL.createObjectURL(file));
    }
  }

  async function handleUpload() {
    if (!selectedFile) {
      setError("Please select an image first.");
      return;
    }
    setLoading(true);
    setError(null);
    setOutputImage(null);

    const formData = new FormData();
    formData.append("image_file", selectedFile);
    formData.append("size", "auto");

    try {
      const response = await axios.post(
        "https://api.remove.bg/v1.0/removebg",
        formData,
        {
          headers: {
            "X-Api-Key": REMOVER_API_KEY,
            "Content-Type": "multipart/form-data",
          },
          responseType: "arraybuffer",
        }
      );
      const base64Image = Buffer.from(response.data, "binary").toString("base64");
      setOutputImage(`data:image/png;base64,${base64Image}`);
    } catch (err) {
      console.error("API Error:", err);
      setError(
        err.response?.data?.errors?.[0]?.title ||
          "Failed to remove background. Try again."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleDownload() {
    if (!outputImage) return;
    const link = document.createElement("a");
    link.href = outputImage;
    link.download = "background_removed_image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  useEffect(() => {
    return () => {
      if (inputImage) URL.revokeObjectURL(inputImage);
    };
  }, [inputImage]);

  return (
    <>
      <Head>
        <title>Background Remover — AI Tools</title>
        <meta name="description" content="Remove image backgrounds instantly with AI precision." />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <style jsx global>{`
        .bgr-page {
          min-height: 100vh;
          background: linear-gradient(145deg, #0a0a1a 0%, #0a1a15 40%, #0a0a1a 100%);
          font-family: 'Inter', sans-serif;
          position: relative;
          overflow: hidden;
        }
        .bgr-page::before {
          content: '';
          position: absolute;
          top: -200px;
          right: -200px;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(52,211,153,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .bgr-page::after {
          content: '';
          position: absolute;
          bottom: -150px;
          left: -150px;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(56,189,248,0.05) 0%, transparent 70%);
          pointer-events: none;
        }
        .bgr-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 20px;
          backdrop-filter: blur(12px);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .bgr-dropzone {
          width: 100%;
          height: 260px;
          border-radius: 16px;
          border: 2px dashed rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.02);
        }
        .bgr-dropzone:hover, .bgr-dropzone.drag-over {
          border-color: rgba(52, 211, 153, 0.4);
          background: rgba(52, 211, 153, 0.04);
        }
        .bgr-btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.875rem 2rem;
          border-radius: 14px;
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          color: #fff;
          background: linear-gradient(135deg, #34d399, #059669);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(52, 211, 153, 0.3);
          width: 100%;
        }
        .bgr-btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 28px rgba(52, 211, 153, 0.45);
        }
        .bgr-btn-primary:disabled {
          opacity: 0.4;
          cursor: not-allowed;
          transform: none;
        }
        .bgr-btn-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.6rem 1.25rem;
          border-radius: 10px;
          font-family: 'Inter', sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          color: rgba(255,255,255,0.7);
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.08);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .bgr-btn-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
        }
        .bgr-btn-download {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.875rem 2rem;
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
          width: 100%;
        }
        .bgr-btn-download:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 28px rgba(56, 189, 248, 0.45);
        }
        @keyframes bgrFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .bgr-skeleton {
          border-radius: 16px;
          background: linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 75%);
          background-size: 200% 100%;
          animation: shimmer 1.8s ease-in-out infinite;
        }
      `}</style>

      <div className="bgr-page">
        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "960px",
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
                background: "rgba(52, 211, 153, 0.1)",
                border: "1px solid rgba(52, 211, 153, 0.2)",
                marginBottom: "1.25rem",
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#34d399" }} />
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "#34d399",
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
              Background Remover
            </h1>
            <p
              style={{
                fontSize: "1.05rem",
                color: "rgba(255,255,255,0.5)",
                maxWidth: "520px",
                margin: "0 auto",
                lineHeight: 1.6,
              }}
            >
              Upload your image and remove the background instantly with AI precision.
            </p>
          </div>

          {/* Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1.25rem",
            }}
            className="bgr-grid"
          >
            {/* Input card */}
            <div className="bgr-card">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "1rem",
                  alignSelf: "flex-start",
                }}
              >
                <span
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.5)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  Input Image
                </span>
              </div>

              <input
                ref={inputFileRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />

              {inputImage ? (
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: 260,
                    borderRadius: 16,
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.06)",
                    marginBottom: "1rem",
                  }}
                >
                  <Image
                    src={inputImage}
                    alt="Input"
                    fill
                    style={{ objectFit: "contain" }}
                    unoptimized
                    priority
                  />
                </div>
              ) : (
                <div
                  className={`bgr-dropzone ${dragOver ? "drag-over" : ""}`}
                  onClick={() => inputFileRef.current.click()}
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  style={{ marginBottom: "1rem" }}
                >
                  <div style={{ textAlign: "center" }}>
                    <svg
                      style={{ width: 40, height: 40, margin: "0 auto 0.75rem", color: "rgba(255,255,255,0.2)" }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.9rem", margin: "0 0 0.25rem" }}>
                      Drop image here or click to browse
                    </p>
                    <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.75rem" }}>
                      PNG, JPG, WEBP supported
                    </p>
                  </div>
                </div>
              )}

              {inputImage && (
                <button
                  className="bgr-btn-secondary"
                  onClick={() => inputFileRef.current.click()}
                  style={{ marginBottom: "0.75rem" }}
                >
                  Change Image
                </button>
              )}

              <button
                className="bgr-btn-primary"
                onClick={handleUpload}
                disabled={loading || !selectedFile}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin" style={{ width: 18, height: 18 }} fill="none" viewBox="0 0 24 24">
                      <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <svg style={{ width: 18, height: 18 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Remove Background
                  </>
                )}
              </button>
            </div>

            {/* Output card */}
            <div className="bgr-card">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "1rem",
                  alignSelf: "flex-start",
                }}
              >
                <span
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.5)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  Output Image
                </span>
              </div>

              {loading ? (
                <div className="bgr-skeleton" style={{ width: "100%", height: 260, marginBottom: "1rem" }} />
              ) : outputImage ? (
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: 260,
                    borderRadius: 16,
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.06)",
                    marginBottom: "1rem",
                    // Checkerboard pattern for transparency
                    backgroundImage: `
                      linear-gradient(45deg, rgba(255,255,255,0.05) 25%, transparent 25%),
                      linear-gradient(-45deg, rgba(255,255,255,0.05) 25%, transparent 25%),
                      linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.05) 75%),
                      linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.05) 75%)
                    `,
                    backgroundSize: "20px 20px",
                    backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
                    animation: "bgrFadeUp 0.5s ease both",
                  }}
                >
                  <Image
                    src={outputImage}
                    alt="Output"
                    fill
                    style={{ objectFit: "contain" }}
                    unoptimized
                    priority
                  />
                </div>
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: 260,
                    borderRadius: 16,
                    border: "2px dashed rgba(255,255,255,0.06)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.9rem" }}>
                    Result will appear here
                  </p>
                </div>
              )}

              {outputImage && (
                <button className="bgr-btn-download" onClick={handleDownload}>
                  <svg style={{ width: 18, height: 18 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Image
                </button>
              )}

              {loading && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    color: "#34d399",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                  }}
                >
                  <svg className="animate-spin" style={{ width: 16, height: 16 }} fill="none" viewBox="0 0 24 24">
                    <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  Processing image...
                </div>
              )}
            </div>
          </div>

          {/* Error */}
          {error && (
            <div
              style={{
                marginTop: "1.25rem",
                padding: "1rem 1.25rem",
                borderRadius: 14,
                background: "rgba(239, 68, 68, 0.08)",
                border: "1px solid rgba(239, 68, 68, 0.2)",
                color: "#fca5a5",
                fontSize: "0.9rem",
              }}
            >
              {error}
            </div>
          )}
        </div>
      </div>

      {/* Responsive grid override */}
      <style jsx global>{`
        @media (max-width: 768px) {
          .bgr-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}