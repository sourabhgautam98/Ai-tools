import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const slides = [
  {
    id: 1,
    image: "/carouselImage/one.jpg",
    title: "Text To Speech",
    subtitle:
      "Text-to-Speech (TTS) is a technology that converts written text into spoken words.",
    buttonText: "Text To Speech",
    route: "tools/textToSpeech",
  },
  {
    id: 2,
    image: "/carouselImage/two.jpeg",
    title: "Text To Image",
    subtitle:
      "Text-to-Image (TTI) is a technology that converts written text descriptions into visual images.",
    buttonText: "Text To Image",
    route: "tools/textToImage",
  },
  {
    id: 3,
    image: "/carouselImage/three.jpg",
    title: "Background Removal",
    subtitle:
      "Background Removal is a technology that isolates the subject of an image by removing its background.",
    buttonText: "Background Removal",
    route: "tools/backGroundRemover",
  },
];

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Image Slider</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@900&family=Montserrat:wght@300&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Swiper
        modules={[Autoplay, Navigation]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        navigation={true}
        loop={true}
        slidesPerView={1}
        className="h-screen w-screen"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative h-screen w-screen bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>

              <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
                <h1 className="font-orbitron text-[4rem] font-extrabold mb-4 leading-[1.2] uppercase">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl font-montserrat mb-6">
                  {slide.subtitle}
                </p>
                <button
                  aria-label={`${slide.buttonText} - navigate to ${slide.route}`}
                  onClick={() => router.push(`/${slide.route}`)}
                  className="bg-transparent border-2 border-white text-white font-black text-2xl py-5 px-10 rounded-sm hover:bg-white hover:text-black transition duration-300"
                >
                  {slide.buttonText}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
