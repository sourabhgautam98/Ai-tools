'use client';

import { useState } from 'react';
import axios from 'axios';
import { SPEECH_API_KEY } from '@/utils/constants';

export default function TextToSpeechUI() {
  const [text, setText] = useState('');
  const [audioUrl, setAudioUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleConvert = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setAudioUrl(null);

    try {
      const options = {
        method: 'POST',
        url: 'https://open-ai-text-to-speech1.p.rapidapi.com/',
        headers: {
          'x-rapidapi-key': SPEECH_API_KEY,
          'x-rapidapi-host': 'open-ai-text-to-speech1.p.rapidapi.com',
          'Content-Type': 'application/json',
        },
        data: {
          model: 'tts-1',
          input: text,
          voice: 'alloy',
        },
        responseType: 'arraybuffer',
      };

      const response = await axios.request(options);

      const audioBlob = new Blob([response.data], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(audioUrl);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to convert text to speech. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black px-4 py-12">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
          Text to Speech with High Quality
        </h1>
        <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
          Convert text to the most natural sounding AI voice online for free!
        </p>

        <textarea
          rows={8}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your text here..."
          className="w-full p-5 rounded-3xl border border-gray-700 bg-gray-900 text-gray-100 resize-none
            focus:outline-none focus:ring-4 focus:ring-indigo-500 transition shadow-lg"
          spellCheck={false}
        />

        <div className="mt-8 flex justify-center">
          <button
  onClick={handleConvert}
  disabled={loading || !text.trim()}
  className={`bg-purple-600 text-white font-semibold py-4 px-10 rounded-3xl transition
    duration-300 shadow-md
    ${loading || !text.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700 cursor-pointer'}`}
>
  {loading ? 'Converting...' : 'Convert to Speech'}
</button>
        </div>

        {audioUrl && (
          <div className="mt-10 w-full max-w-xl mx-auto">
            <audio controls src={audioUrl} className="w-full rounded-xl shadow-2xl" />
          </div>
        )}

        {/* Loading indicator below audio player */}
        {loading && (
          <div className="flex items-center justify-center mt-6 space-x-3 text-indigo-400">
            <svg
              className="animate-spin h-6 w-6 text-indigo-400"
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
            <span className="text-lg font-medium">Converting audio, please wait...</span>
          </div>
        )}
      </div>
    </div>
  );
}