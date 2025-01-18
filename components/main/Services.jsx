import { ServicesData } from "@/data";
import Image from "next/image";
import React from "react";
import Titles from "../sub/Titles";
const Services = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-3 h-full relative overflow-hidden">
      <Titles
        title="Welcome to Our Services"
        desc="We offer a comprehensive range of specialized services that aim to meet our clients’ needs and achieve their goals. From web development and user interface design to digital marketing strategies and website maintenance, we are here to help you enhance your digital presence and achieve success. Enjoy innovative and professional solutions that ensure high performance and an excellent user experience"
      />
      <ul className="grid gap-4 grid-cols-1 lg:grid-cols-2 p-4">
        {ServicesData.map((item) => (
          <li
            key={item.id}
            data-aos={item.id % 2 !== 0 ? "fade-down-right" : "fade-up-left"}
            className="pulse relative p-2"
          >
            <span className="absolute -z-10 inset-1 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 opacity-75 blur transition duration-300 group-hover:opacity-100"></span>

            <div className="relative rounded-xl bg-main-back w-full h-full flex flex-col sm:flex-row items-start sm:items-center p-2 sm:p-4 gap-6">
              {/* Optimized image component */}
              <Image
                src={item.thumbnail} // Path to the image asset
                alt={item.title} // Alt text for accessibility
                className="rounded" // Add any additional styling if necessary
                width={150} // Set appropriate width (adjust as needed)
                height={150} // Set appropriate height (adjust as needed)
                layout="intrinsic" // Maintain the aspect ratio of the image
              />
              <div className="text-start">
                {/* Title */}
                <h1 className="text-3xl font-medium tracking-tight text-linear">
                  {item.title}
                </h1>
                {/* Description */}
                <p className="text-text-color-secondary mt-3">
                  {item.description}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Services;
