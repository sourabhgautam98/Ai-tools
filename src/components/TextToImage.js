'use client';

import { useState } from 'react';
import axios from 'axios';
import { IMAGE_API_KEY } from '@/utils/constants';

export default function TextToImageUI() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setError('');
    setImage(null);

    try {
      const response = await axios.post(
        'https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev',
        { inputs: text },
        {
          headers: {
            Authorization: `Bearer ${IMAGE_API_KEY}`,
            'Content-Type': 'application/json',
          },
          responseType: 'blob',
        }
      );

      const imageUrl = URL.createObjectURL(response.data);
      setImage(imageUrl);
    } catch (err) {
      setError(err.message || 'Failed to generate image.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black px-4 py-8">
      <div className="max-w-4xl w-full text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-lg">
          AI Image: Create images from text.
        </h1>
        <p className="text-lg md:text-xl text-gray-300">
          This is an AI Image Generator. It creates an image from scratch from a text description.
        </p>
      </div>

      <div className="flex max-w-xl w-full mx-auto mb-6">
        <input
          type="text"
          placeholder="Describe your image..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-grow p-4 rounded-l-2xl border border-gray-700 bg-gray-900 text-gray-200
            focus:outline-none focus:ring-4 focus:ring-purple-600 transition shadow-inner"
          disabled={loading}
        />
        <button
          onClick={handleGenerate}
          disabled={loading || !text.trim()}
          className={`bg-purple-600 text-white font-semibold px-6 rounded-r-2xl transition-all duration-300
            shadow-md
            ${loading || !text.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-700 cursor-pointer'}`}
        >
          {loading ? 'Generating...' : 'Generate'}
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
          <span className="text-lg font-medium">Image Generating, please wait...</span>
        </div>
      )}

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {image && !loading && (
        <div className="text-center max-w-3xl">
          <h3 className="mb-4 text-white font-semibold">Generated Image:</h3>
          <img
            src={image}
            alt="Generated result"
            className="mx-auto rounded-lg shadow-lg mb-4 max-w-full h-auto border border-gray-700"
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
