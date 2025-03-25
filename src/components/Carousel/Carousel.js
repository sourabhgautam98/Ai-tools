"use client";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import styles from "./Carousel.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Carousel = ({ data }) => {
  const router = useRouter();

  const handleButtonClick = (route) => {
    router.push(route);
  };

  if (!data || data.length === 0) {
    return <div className={styles.carousel}>No content to display</div>;
  }

  return (
    <>
      <Swiper
        pagination={{ clickable: true }}
        navigation={true}
        autoplay={{ delay: 3000 }}
        modules={[Pagination, Autoplay, Navigation]}
        className="mySwiper"
        style={{ height: "100vh" }}
      >
        {data.map((item, index) => (
          <SwiperSlide key={index} style={{ height: "100vh" }}>
            <video
              autoPlay
              loop
              muted
              playsInline
              className={styles.carouselImage}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            >
              <source src={item.src} type={item.type} />
              Your browser does not support the video tag.
            </video>
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