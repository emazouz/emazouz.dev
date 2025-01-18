"use client";
import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import Image from "next/image";

export const Card = React.memo(({ card, index, hovered, setHovered }) => (
  <div
    onMouseEnter={() => setHovered(index)}
    onMouseLeave={() => setHovered(null)}
    className={`rounded-lg relative  h-80 sm:h-96 w-full transition-all duration-300 ease-out 
        ${hovered !== null && hovered !== index && "blur-sm scale-[0.98]"}`}
  >
    <Image
      data-aos="fade-out-left" // Animation effect on scroll
      data-aos-easing="linear" // Easing effect for animation
      src={card.src} // Source of the image
      alt={card.title} // Alternative text for the image
      className="w-full h-full object-cover absolute rounded-md inset-0" // Styling for positioning and appearance
      width={500} // Set a width for the image (adjust as needed)
      height={500} // Set a height for the image (adjust as needed)
    />
    <div
      className={`relative transition-opacity duration-300
          ${hovered === index ? "opacity-100" : "opacity-0"}`}
    >
      {" "}
    </div>
  </div>
));

Card.displayName = "Card";
export function FocusCards() {
  const [hovered, setHovered] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allData, setAllData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/photos");
        if (!response.ok) {
          throw new Error("Failed to fetch photos");
        }
        const photoData = await response.json();
        setAllData(photoData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setAllData, setError, setLoading]);

  if (error) {
    return <div className="text-center text-red-500 py-10">Error: {error}</div>;
  }

  return (
    <div className="grid mobile:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-10 md:max-w-11/12 mx-auto px-4 md:px-8 w-full">
      {loading ? (
        <Spinner />
      ) : (
        allData.map((data, index) => {
          const firstImage = data.images[0] || ""; // اختيار الصورة الأولى إذا كانت موجودة
          if (!firstImage) return null; // تخطي البطاقات بدون صور
          return (
            <Card
              key={index}
              card={{ title: data.title, src: firstImage }}
              index={index}
              hovered={hovered}
              setHovered={setHovered}
            />
          );
        })
      )}
    </div>
  );
}
