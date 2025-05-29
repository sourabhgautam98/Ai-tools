"use client";

import { useState } from "react";
import Image from "next/image";
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

    // Updated list of working models as of 2024
    const models = [
      "black-forest-labs/FLUX.1-schnell",
      "stabilityai/stable-diffusion-xl-base-1.0",
      "prompthero/openjourney-v4",
      "stabilityai/stable-diffusion-2-1",
    ];

    for (let i = 0; i < models.length; i++) {
      try {
        console.log(`Trying model: ${models[i]}`);

        const response = await fetch(
          `https://api-inference.huggingface.co/models/${models[i]}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${IMAGE_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              inputs: text,
            }),
          }
        );

        console.log(`Response status for ${models[i]}:`, response.status);

        if (response.ok) {
          const blob = await response.blob();
          console.log("Blob size:", blob.size, "Blob type:", blob.type);

          // Check if the blob contains image data
          if (blob.size > 1000) {
            // Image should be larger than 1KB
            const imageUrl = URL.createObjectURL(blob);
            setImage(imageUrl);
            setLoading(false);
            console.log("Success with model:", models[i]);
            return; // Success - exit the function
          }
        } else {
          // Log the error response
          const errorText = await response.text();
          console.log(`Error response for ${models[i]}:`, errorText);
        }
      } catch (err) {
        console.error(`Network error with model ${models[i]}:`, err);
      }

      // Add delay between attempts to avoid rate limiting
      if (i < models.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    // If we get here, all models failed
    setError(
      "Unable to generate image. This could be due to:\n" +
        "• Invalid or missing API key\n" +
        "• Models are currently unavailable\n" +
        "• Rate limiting\n" +
        "Please check your API key and try again later."
    );
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black px-4 py-8">
      <div className="max-w-4xl w-full text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-lg">
          AI Image: Create images from text.
        </h1>
        <p className="text-lg md:text-xl text-gray-300">
          This is an AI Image Generator. It creates an image from scratch from a
          text description.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] max-w-xl w-full mx-auto gap-2 mb-6">
        <input
          type="text"
          placeholder="Describe your image..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="p-4 rounded-2xl border border-gray-700 bg-gray-900 text-gray-200
      focus:outline-none focus:ring-4 focus:ring-purple-600 transition shadow-inner w-full"
          disabled={loading}
        />
        <button
          onClick={handleGenerate}
          disabled={loading || !text.trim()}
          className={`bg-purple-600 text-white font-semibold px-6 py-4 rounded-2xl transition-all duration-300
      shadow-md w-full
      ${
        loading || !text.trim()
          ? "opacity-50 cursor-not-allowed"
          : "hover:bg-purple-700 cursor-pointer"
      }`}
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>

      {loading && (
        <div className="flex items-center justify-center mb-6 space-x-3 text-purple-400">
          <svg
            className="animate-spin h-6 w-6 text-purple-400"
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
          <span className="text-lg font-medium">
            Image Generating, please wait...
          </span>
        </div>
      )}

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {image && !loading && (
        <div className="text-center max-w-3xl">
          <h3 className="mb-4 text-white font-semibold">Generated Image:</h3>
          <Image
            src={image}
            alt="Generated result"
            width={300}
            height={300}
            className="mx-auto rounded-lg shadow-lg mb-4 border border-gray-700"
            style={{ objectFit: "cover" }}
          />
          <a
            href={image}
            download="generated-image.png"
            className="inline-block bg-green-600 hover:bg-green-700 px-6 py-2 rounded text-white font-semibold transition"
          >
            Download Image
          </a>
        </div>
      )}
    </div>
  );
}
