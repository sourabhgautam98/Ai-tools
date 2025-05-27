"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Image from "next/image";
import { REMOVER_API_KEY } from "@/utils/constants";

export default function BackgroundRemover() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [inputImage, setInputImage] = useState(null);
  const [outputImage, setOutputImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      const imageUrl = `data:image/png;base64,${base64Image}`;
      setOutputImage(imageUrl);
    } catch (err) {
      console.error("API Error:", err);
      setError(
        err.response?.data?.errors?.[0]?.title || "Failed to remove background. Try again."
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
    <div className="min-h-screen flex flex-col justify-center items-center bg-black px-6 py-12">
      <div className="max-w-6xl w-full text-center">
        <h1 className="text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
          Background Remover
        </h1>
        <p className="text-xl text-gray-300 mb-12 max-w-4xl mx-auto">
          Upload your image, remove the background, and download the result instantly using AI-powered Remove.bg API.
        </p>

        {/* Hidden file input */}
        <input
          ref={inputFileRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="flex flex-row gap-10 w-full">
          {/* Input Box */}
          <div className="flex flex-col items-center bg-gray-900 rounded-3xl p-8 shadow-xl w-1/2">
            <p className="mb-6 text-lg font-semibold text-white">Choose Image</p>

            <button
              onClick={() => inputFileRef.current.click()}
              className="mb-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-3xl shadow-md transition"
            >
              Choose Image
            </button>

            {inputImage ? (
              <div className="relative w-full max-h-72" style={{ height: "18rem" }}>
                <Image
                  src={inputImage}
                  alt="Input"
                  fill
                  style={{ objectFit: "contain" }}
                  className="rounded-lg border border-gray-700 shadow-lg"
                  unoptimized
                  priority
                />
              </div>
            ) : (
              <p className="text-gray-500">No image selected</p>
            )}

            <button
              onClick={handleUpload}
              disabled={loading || !selectedFile}
              className={`mt-6 w-full py-3 rounded-3xl font-semibold shadow-md transition
                ${loading || !selectedFile
                  ? "bg-purple-400 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700 cursor-pointer text-white"}`}
            >
              {loading ? (
                <svg
                  className="animate-spin h-6 w-6 mx-auto text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              ) : (
                "Remove Background"
              )}
            </button>
          </div>

          {/* Output Box */}
          <div className="flex flex-col items-center bg-gray-900 rounded-3xl p-8 shadow-xl w-1/2">
            <p className="mb-6 text-lg font-semibold text-white">Output Image</p>

            {loading ? (
              <p className="text-purple-400">Processing image, please wait...</p>
            ) : outputImage ? (
              <>
                <div className="relative w-full max-h-72 mb-6" style={{ height: "18rem" }}>
                  <Image
                    src={outputImage}
                    alt="Output"
                    fill
                    style={{ objectFit: "contain" }}
                    className="rounded-lg border border-gray-700 shadow-lg"
                    unoptimized
                    priority
                  />
                </div>
                <button
                  onClick={handleDownload}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-3xl shadow-md transition"
                >
                  Download Image
                </button>
              </>
            ) : (
              <p className="text-gray-500">Processed image will appear here</p>
            )}

            {error && (
              <p className="mt-4 text-red-500 font-medium">{error}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
