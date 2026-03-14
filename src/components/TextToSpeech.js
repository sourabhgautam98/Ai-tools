'use client';

import { useState } from 'react';
import Head from 'next/head';
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
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to convert text to speech. Please try again.');
    }

    setLoading(false);
  };

  const charCount = text.length;

  return (
    <>
      <Head>
        <title>Text to Speech — AI Tools</title>
        <meta name="description" content="Convert text to natural-sounding AI speech for free." />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <style jsx global>{`
        .tts-page {
          min-height: 100vh;
          background: linear-gradient(145deg, #0a0a1a 0%, #0d0d2b 40%, #0a0a1a 100%);
          font-family: 'Inter', sans-serif;
          position: relative;
          overflow: hidden;
        }
        .tts-page::before {
          content: '';
          position: absolute;
          top: -200px;
          right: -200px;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .tts-page::after {
          content: '';
          position: absolute;
          bottom: -150px;
          left: -150px;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 70%);
          pointer-events: none;
        }
        .tts-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 24px;
          backdrop-filter: blur(12px);
          padding: 2.5rem;
        }
        .tts-textarea {
          width: 100%;
          min-height: 200px;
          padding: 1.25rem 1.5rem;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.04);
          color: #e2e8f0;
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          line-height: 1.7;
          resize: vertical;
          transition: all 0.3s ease;
          outline: none;
        }
        .tts-textarea::placeholder {
          color: rgba(255, 255, 255, 0.25);
        }
        .tts-textarea:focus {
          border-color: rgba(167, 139, 250, 0.5);
          box-shadow: 0 0 0 3px rgba(167, 139, 250, 0.1), 0 0 30px rgba(167, 139, 250, 0.05);
        }
        .tts-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.875rem 2.5rem;
          border-radius: 14px;
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          color: #fff;
          background: linear-gradient(135deg, #a78bfa, #7c3aed);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(167, 139, 250, 0.3);
          position: relative;
          overflow: hidden;
        }
        .tts-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 28px rgba(167, 139, 250, 0.45);
        }
        .tts-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
          transform: none;
        }
        .tts-audio-card {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 1.5rem 2rem;
          animation: fadeUp 0.5s ease both;
        }
        .tts-audio-card audio {
          width: 100%;
          border-radius: 12px;
          height: 48px;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.9); opacity: 0.6; }
          50% { transform: scale(1.1); opacity: 0.3; }
          100% { transform: scale(0.9); opacity: 0.6; }
        }
      `}</style>

      <div className="tts-page">
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: '720px',
            margin: '0 auto',
            padding: '5rem 1.5rem 3rem',
          }}
        >
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.35rem 1rem',
                borderRadius: '999px',
                background: 'rgba(167, 139, 250, 0.1)',
                border: '1px solid rgba(167, 139, 250, 0.2)',
                marginBottom: '1.25rem',
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#a78bfa' }} />
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: '#a78bfa',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                AI Powered
              </span>
            </div>

            <h1
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(1.75rem, 5vw, 2.75rem)',
                fontWeight: 700,
                color: '#fff',
                margin: '0 0 0.75rem',
                lineHeight: 1.2,
              }}
            >
              Text to Speech
            </h1>
            <p
              style={{
                fontSize: '1.05rem',
                color: 'rgba(255,255,255,0.5)',
                maxWidth: '480px',
                margin: '0 auto',
                lineHeight: 1.6,
              }}
            >
              Convert text into natural-sounding AI speech instantly.
            </p>
          </div>

          {/* Main card */}
          <div className="tts-card">
            <textarea
              className="tts-textarea"
              rows={8}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type or paste your text here..."
              spellCheck={false}
            />

            {/* Character count */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: '0.5rem',
                marginBottom: '1.5rem',
              }}
            >
              <span
                style={{
                  fontSize: '0.8rem',
                  color: 'rgba(255,255,255,0.3)',
                }}
              >
                {charCount} characters
              </span>
            </div>

            {/* Convert button */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                className="tts-btn"
                onClick={handleConvert}
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
                      <circle
                        style={{ opacity: 0.25 }}
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        style={{ opacity: 0.75 }}
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                    Converting...
                  </>
                ) : (
                  <>
                    <svg
                      style={{ width: 18, height: 18 }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707A1 1 0 0112 5.586v12.828a1 1 0 01-1.707.707L5.586 15z"
                      />
                    </svg>
                    Convert to Speech
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Audio result */}
          {audioUrl && (
            <div className="tts-audio-card" style={{ marginTop: '1.5rem' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  marginBottom: '1rem',
                }}
              >
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: '#34d399',
                    boxShadow: '0 0 8px rgba(52,211,153,0.5)',
                    animation: 'pulse-ring 2s ease infinite',
                  }}
                />
                <span
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.6)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}
                >
                  Audio Ready
                </span>
              </div>
              <audio controls src={audioUrl} style={{ width: '100%', borderRadius: 12 }} />
            </div>
          )}

          {/* Loading pulse */}
          {loading && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                marginTop: '1.5rem',
                color: '#a78bfa',
                animation: 'fadeUp 0.3s ease',
              }}
            >
              <svg
                className="animate-spin"
                style={{ width: 20, height: 20 }}
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  style={{ opacity: 0.25 }}
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  style={{ opacity: 0.75 }}
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              <span style={{ fontSize: '0.95rem', fontWeight: 500 }}>
                Generating audio, please wait...
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}