import React, { useRef, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slides = [
  {
    id: 1,
    image: "/carouselImage/one.jpg",
    title: "Text to Speech",
    subtitle:
      "Convert written content into natural-sounding speech using advanced AI voice technology.",
    buttonText: "Text to Speech",
    route: "tools/textToSpeech",
    accent: "#a78bfa",
  },
  {
    id: 2,
    image: "/carouselImage/two.jpeg",
    title: "Text to Image",
    subtitle:
      "Turn your ideas into stunning visuals using AI-powered text-to-image generation.",
    buttonText: "Generate Images",
    route: "tools/textToImage",
    accent: "#38bdf8",
  },
  {
    id: 3,
    image: "/carouselImage/three.jpg",
    title: "Background Removal",
    subtitle:
      "Instantly remove image backgrounds with pixel-perfect AI precision.",
    buttonText: "Remove Background",
    route: "tools/backGroundRemover",
    accent: "#34d399",
  },
];

export default function Carousel() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);

  const activeAccent = slides[activeIndex]?.accent || "#a78bfa";

  return (
    <>
      <Head>
        <title>AI Tools — Powerful AI Utilities</title>
        <meta
          name="description"
          content="Free AI tools: Text to Speech, Text to Image, Background Removal. Powered by cutting-edge artificial intelligence."
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* Custom styles for Swiper and animations */}
      <style jsx global>{`
        /* ── Lock page scroll ─────────────────────────────── */
        html, body {
          margin: 0;
          padding: 0;
          overflow: hidden;
          height: 100vh;
        }

        /* ── Swiper overrides ─────────────────────────────── */
        .carousel-swiper .swiper-button-next,
        .carousel-swiper .swiper-button-prev {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          transition: all 0.3s ease;
        }
        .carousel-swiper .swiper-button-next:hover,
        .carousel-swiper .swiper-button-prev:hover {
          background: rgba(255, 255, 255, 0.18);
          border-color: ${activeAccent};
          box-shadow: 0 0 20px ${activeAccent}44;
        }
        .carousel-swiper .swiper-button-next::after,
        .carousel-swiper .swiper-button-prev::after {
          font-size: 16px;
          font-weight: 700;
          color: #fff;
        }

        .carousel-swiper .swiper-pagination-bullet {
          width: 28px;
          height: 4px;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.35);
          opacity: 1;
          transition: all 0.4s ease;
        }
        .carousel-swiper .swiper-pagination-bullet-active {
          width: 44px;
          background: ${activeAccent};
          box-shadow: 0 0 12px ${activeAccent}88;
        }

        /* ── Slide animations ─────────────────────────────── */
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.85);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .slide-active .slide-badge {
          animation: fadeIn 0.6s ease 0.1s both;
        }
        .slide-active .slide-title {
          animation: fadeUp 0.7s ease 0.2s both;
        }
        .slide-active .slide-subtitle {
          animation: fadeUp 0.7s ease 0.4s both;
        }
        .slide-active .slide-cta {
          animation: scaleIn 0.5s ease 0.6s both;
        }
        .slide-active .slide-decoration {
          animation: fadeIn 1s ease 0.8s both;
        }
      `}</style>

      <Swiper
        modules={[Autoplay, Navigation, Pagination, EffectFade]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        navigation
        pagination={{ clickable: true }}
        loop
        speed={800}
        slidesPerView={1}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="carousel-swiper"
        style={{ height: "100vh", width: "100vw" }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            {({ isActive }) => (
              <section
                className={`relative h-screen w-screen overflow-hidden ${isActive ? "slide-active" : ""
                  }`}
              >
                {/* Background image with zoom effect */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[8000ms] ease-out"
                  style={{
                    backgroundImage: `url(${slide.image})`,
                    transform: isActive ? "scale(1.08)" : "scale(1)",
                  }}
                />

                {/* Multi-layer gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />

                {/* Decorative accent glow */}
                <div
                  className="slide-decoration absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle, ${slide.accent}18 0%, transparent 70%)`,
                  }}
                />

                {/* Content */}
                <div className="relative z-10 flex h-full items-center justify-center px-6">
                  <div className="max-w-3xl text-center">
                    {/* Badge */}
                    <div className="slide-badge opacity-0 mb-6">
                      <span
                        className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
                        style={{
                          color: slide.accent,
                          background: `${slide.accent}15`,
                          border: `1px solid ${slide.accent}30`,
                        }}
                      >
                        <span
                          className="inline-block w-1.5 h-1.5 rounded-full"
                          style={{ background: slide.accent }}
                        />
                        AI Powered
                      </span>
                    </div>

                    {/* Title */}
                    <h2
                      className="slide-title opacity-0 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 text-white"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {slide.title}
                    </h2>

                    {/* Subtitle */}
                    <p
                      className="slide-subtitle opacity-0 text-base sm:text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        color: "rgba(255,255,255,0.7)",
                      }}
                    >
                      {slide.subtitle}
                    </p>

                    {/* CTA Button */}
                    <div className="slide-cta opacity-0">
                      <button
                        id={`carousel-cta-${slide.id}`}
                        aria-label={slide.buttonText}
                        onClick={() => router.push(`/${slide.route}`)}
                        className="group relative inline-flex items-center gap-3 rounded-full px-8 py-4 text-base font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black cursor-pointer"
                        style={{
                          background: `linear-gradient(135deg, ${slide.accent}, ${slide.accent}cc)`,
                          boxShadow: `0 4px 24px ${slide.accent}40`,
                          focusRingColor: slide.accent,
                        }}
                      >
                        {/* Hover shine effect */}
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                        <span className="relative z-10">{slide.buttonText}</span>
                        <svg
                          className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bottom fade for seamless transition to page content */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              </section>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
