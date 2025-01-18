import React from "react";
import { CardContainer } from "../ui/Card3D";
import Link from "next/link";
import Image from "next/image";

const ViewBlogs = ({ item, idx }) => {
  return (
    <Link key={idx} href={`/blogs/${item.slug}`}>
      <div className="border-2 max-w-[500px] mx-auto border-[#7BC9FF] rounded-xl bg-gradient-card text-white font-nunito p-4">
        <CardContainer className="w-full -mt-10 flex flex-col justify-center rounded-t-lg">
          {/* Using Next.js Image component for optimized image rendering */}
          <Image
            src={item.images[0]} // Image source (ensure the domain is configured in next.config.js)
            alt={item.title} // Alternative text for accessibility
            className="h-full w-full object-cover rounded-xl" // Styling for the image
            width={500} // Specify image width (adjust as needed)
            height={300} // Specify image height (adjust as needed)
            layout="responsive" // Makes the image responsive to its container
            objectFit="cover" // Ensures the image covers its container proportionally
          />
        </CardContainer>
        <div className="mt-2 space-y-1">
          <div className="flex gap-x-2 items-center">
            {item.tags.slice(0, 3).map((tag, i) => (
              <h2
                data-aos="fade-right"
                key={i}
                className="p-2 bg-[#27005D] rounded-xl"
              >
                {tag}
              </h2>
            ))}
          </div>
          <h1
            data-aos="fade-right"
            className="capitalize text-linear font-bold text-2xl"
          >
            {item.title}
          </h1>
          <p data-aos="fade-right" className="text-white tracking-wide">
            {item.overview}
          </p>
        </div>
        <div className="flex gap-1 my-2 items-center">
          {/* Displaying the author's image */}
          <Image
            data-aos="fade-right" // Animation on scroll from the right
            src={item.authorsImg} // Source of the author's image
            alt={item.authorsName} // Alternative text for the image
            width={32} // Specifying width in pixels (corresponds to Tailwind's w-8)
            height={32} // Specifying height in pixels (corresponds to Tailwind's h-8)
            className="rounded-full object-cover" // Styling: rounded and properly scaled
          />

          {/* Displaying the author's name */}
          <span
            data-aos="fade-left" // Animation on scroll from the left
            className="text-xl text-tx-primary font-semibold tracking-wide" // Styling for text
          >
            {/* Author's name with an underlined effect */}
            <span className="text-primary border-b-2 border-primary">
              {item.authorsName} {/* Dynamic author name */}
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ViewBlogs;
