"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import Image from "next/image";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Carousil({
  imagesList,
  slidesPerView = 3,
  onSlideChange,
}: {
  imagesList: string[];
  slidesPerView?: number;
  onSlideChange: (img: string) => void;
}) {
  return (
    <Swiper
      modules={[Pagination]}
      navigation
      pagination={{ clickable: true }}
      spaceBetween={5}
      slidesPerView={slidesPerView}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {imagesList.map((img) => {
        return (
          <SwiperSlide key={img} className="">
            <Image
              onClick={() => onSlideChange(img)}
              src={img}
              width={200}
              height={200}
              alt="pic"
              className=" "
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
