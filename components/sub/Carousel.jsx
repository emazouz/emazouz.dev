"use client";

import React, { useEffect, useState } from "react";
import { GoArrowDownRight } from "react-icons/go";
import BorderAnimate from "../ui/BorderAnimate";
import Image from "next/image";


const Carousel = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationActive, setAnimationActive] = useState(false);
  const duration = 5000; // مدة تغيير الشريحة

  // التحكم في تغيير الشرائح تلقائيًا
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.services.length);
      setAnimationActive(true);

      const animationTimer = setTimeout(() => setAnimationActive(false), 900);
      return () => clearTimeout(animationTimer);
    }, duration);

    return () => clearTimeout(timer);
  }, [currentIndex, data.services.length]);

  // تغيير الشريحة عند النقر على الصور المصغّرة
  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
    setAnimationActive(true);

    const timer = setTimeout(() => setAnimationActive(false), 900);
    return () => clearTimeout(timer);
  };

  // عرض الشريحة النشطة
  const renderSlide = () => {
    const slide = data.services[currentIndex];

    return (
      <div className="relative h-96">
        <Image
          src={data.thumbnail}
          alt={slide.name}
          className="rounded-md opacity-50 object-cover"
          width={500}
          height={256}
        />
        <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black to-transparent w-full">
          <div
            className={`text-text-color-primary transition-all duration-500 ${
              animationActive ? "animate-fade-in-text-left" : ""
            }`}
          >
            <h1 className="text-2xl font-bold">{slide.name}</h1>
            <p className="mt-3">{slide.description}</p>
          </div>
        </div>
      </div>
    );
  };

  // عرض الصور المصغّرة
  const renderThumbnails = () => {
    return data.services.map((item, index) => (
      <div
        key={item.id}
        className={`cursor-pointer text-text-color-primary rounded-full w-10 h-10 flex items-center justify-center transition ${
          index === currentIndex
            ? "bg-primary-color shadow-2xl"
            : "hover:bg-gray-800"
        }`}
        onClick={() => handleThumbnailClick(index)}
      >
        <p
          className={`text-lg font-medium ${
            index === currentIndex ? "text-text-color-primary" : ""
          }`}
        >
          0{item.id}
        </p>
      </div>
    ));
  };

  return (
    <BorderAnimate>
      <div className="relative group bg-gray-900 rounded-md">
        <div className="w-full flex items-center justify-between gap-2 p-4">
          <div className="h-6 w-6 rounded-full border flex font-medium items-center justify-center border-text-color-secondary text-text-color-secondary transition duration-500 group-hover:-rotate-90 group-hover:bg-primary-color group-hover:text-black">
            <GoArrowDownRight />
          </div>
          <h1 className="font-bold text-2xl text-linear">{data.title}</h1>
        </div>
        <div className="relative flex mx-auto space-y-1 min-h-[350px] sm:w-[440px]">
          <div className="flex flex-col justify-center gap-3 p-2">
            {renderThumbnails()}
          </div>
          <div className="overflow-hidden shadow-lg w-full">
            {renderSlide()}
          </div>
        </div>
      </div>
    </BorderAnimate>
  );
};

export default Carousel;
