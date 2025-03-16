"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import styles from "./Carousel.module.css";
import Nav from "../Navbar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

const Carousel = ({data}) => {
  const router = useRouter();

  const handleButtonClick = (route) => {
    router.push(route);
  };

  if (!data || data.length === 0) {
    return <div className={styles.carousel}>No images to display</div>;
  }

  return (
    <>
    <Nav/>    
    <Swiper
        pagination={{ clickable: true }} 
        navigation={true}
        autoplay={{ delay: 3000 }} 
        modules={[Pagination, Autoplay, Navigation]} 
        className="mySwiper"
        style={{ height: "100vh" }} 
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}  style={{ height: "100vh" }}>
            <img src={item.src} alt={item.alt} className={styles.carouselImage} />
            <div className={styles.content}>
              <h1 className={styles.headline}>{item.headline}</h1>
              <p className={styles.subheadline}>{item.subheadline}</p>
              <button
                className={styles.actionButton}
                onClick={() => handleButtonClick(item.route)}
              >
                {item.buttonText}
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Carousel;
