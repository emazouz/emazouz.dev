import React, { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";

const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
}) => {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);
  const [start, setStart] = useState(false);

  // استخدام useCallback لتجنب إعادة تعريف الدالة في كل رندر
  const updateStyles = useCallback(() => {
    if (containerRef.current) {
      const duration =
        speed === "fast" ? "20s" : speed === "slow" ? "80s" : "40s";
      const animationDirection = direction === "left" ? "forwards" : "reverse";

      containerRef.current.style.setProperty("--animation-duration", duration);
      containerRef.current.style.setProperty(
        "--animation-direction",
        animationDirection
      );
    }
  }, [direction, speed]);

  useEffect(() => {
    const addAnimation = () => {
      if (containerRef.current && scrollerRef.current) {
        const scrollerContent = Array.from(scrollerRef.current.children);
        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true);
          scrollerRef.current.appendChild(duplicatedItem);
        });

        updateStyles(); // استدعاء updateStyles هنا
        setStart(true);
      }
    };

    addAnimation();
  }, [direction, speed, updateStyles]); // إضافة updateStyles إلى مصفوفة التبعيات

  return (
    <div
      ref={containerRef}
      className="scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]"
    >
      <ul
        ref={scrollerRef}
        className={`flex min-w-full shrink-0 gap-12 py-4 w-max flex-nowrap ${
          start ? "animate-scroll" : ""
        } ${pauseOnHover ? "hover:[animation-play-state:paused]" : ""}`}
      >
        {items.map((item) => (
          <li
            data-aos={`fade-${direction}`}
            key={item.id}
            className="p-3 flex items-center gap-4 mr-10 hover:[animation-play-state:paused]"
          >
            {["img", "nameImg"].map(
              (key) =>
                item[key] && (
                  <Image
                    key={key}
                    src={item[key]}
                    alt={item.name}
                    width={key === "img" ? 50 : 85}
                    height={key === "img" ? 50 : 85}
                    className="object-cover rounded-md"
                  />
                )
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InfiniteMovingCards;
