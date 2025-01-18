import Link from "next/link";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// Import required modules
import { FreeMode, Pagination } from "swiper/modules";
import { CardContainer } from "@/components/ui/Card3D";
import Image from "next/image";

const ContentCard = ({ data, link }) => {
  return (
    <div className="relative w-full py-10 p-5 bg-main-back">
      <Swiper
        spaceBetween={10}
        freeMode={true}
        pagination={{ clickable: true }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        {data.slice(0, 4).map((item, index) => (
          <SwiperSlide key={index} className=" max-w-[350px]">
            <Link href={`${link}/${item.slug}`}>
              <div className="relative mt-10 bg-gray-900/50 backdrop-blur-xl rounded-2xl p-2 border border-gray-800">
                <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-pink-500 rounded-tl-2xl"></div>
                <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-red-400 rounded-tr-2xl"></div>
                <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-yellow-500 rounded-bl-2xl"></div>
                <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-pink-500 rounded-br-2xl"></div>

                <div className="relative">
                  <div className="absolute -top-10 left-0 px-6 py-2 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full text-sm text-white z-20">
                    {new Date(item.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>

                  <CardContainer className="w-full flex flex-col justify-center rounded-t-lg mt-4">
                    <Image
                      data-aos="fade-left" // Animation on scroll from the left
                      src={item.images[0]} // Path to the image asset
                      alt={item.title} // Alternative text for accessibility
                      loading="lazy" // Enable lazy loading for optimization
                      className="rounded-t-lg" // Additional styling
                      width={500} // Define appropriate width (adjust as needed)
                      height={300} // Define appropriate height (adjust as needed)
                      layout="responsive" // Makes the image responsive to its container
                      objectFit="cover" // Ensures the image fills the container proportionally
                    />
                  </CardContainer>
                  <p className="text-lg pt-4 mb-2 text-transparent bg-clip-text bg-gradient-to-t from-pink-500 via-red-400 to-yellow-500">
                    {item.overview}
                  </p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ContentCard;
