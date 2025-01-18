import { FocusCards } from "@/components/ui/FocusCards";
import Image from "next/image";
import React from "react";

const Gallery = () => {
  return (
    <div className="w-full relative min-h-screen mt-20">
      {/* Main container with full width and minimum screen height, includes top margin */}

      {/* Radial gradient for the container to give a faded look */}
      <div className="relative w-full flex flex-col lg:flex-row lg:justify-between items-center">
        {/* Wrapper for layout flexibility between content and decorative elements */}

        {/* Content Section */}
        <div
          data-aos="fade-right" // Animation triggered on scroll for fading in from the right
          className="w-full p-6 xl:p-16 text-center lg:text-left z-10"
        >
          <h1 className="text-3xl md:text-6xl font-bold text-linear">
            Our creativity in pictures
          </h1>
          {/* Section headline with responsive font size and a gradient text */}

          <p className="text-text-color-primary mt-4 md:mt-6 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Explore our portfolio that reflects our passion for creativity and
            innovation. Here you will find a selection of our past projects,
            showcasing the quality of our designs and our professionalism in
            delivering solutions. Whether you are looking for inspiration for
            your next project or want to see what we can achieve, this section
            is a glimpse into our skills and creativity.
          </p>
          {/* Paragraph with responsive styling, describing the portfolio purpose */}

          <div data-aos="fade-down" className="mt-8">
            {/* Call-to-action button with fade-down animation */}
            <a
              href="#allgrallery"
              className="inline-flex items-center px-6 py-3 bg-primary-color text-white font-medium rounded-md shadow-lg hover:bg-blue-700 transition"
            >
              <span>View More</span>
            </a>
          </div>
          {/* Button for navigation to the gallery section */}
        </div>

        {/* Decorative Boxes */}
        <div className="rightimgsec p-6 flex flex-wrap-reverse lg:flex-nowrap">
          {/* Wrapper for decorative images, switches layout on large screens */}

          <Image
            data-aos="fade-right" // Animation for fading in from the right
            src="/assets/gallery1.jpg" // Path to the first gallery image
            alt="gallery-1" // Alt text for accessibility
            width={250} // Original image width
            height={350} // Original image height
            loading="lazy" // Lazy loading for performance optimization
            className="w-full h-auto object-cover"
          />
          {/* Main image with responsive styling */}

          <div className="flex flex-wrap lg:flex-nowrap lg:flex-col justify-center gap-4">
            {/* Wrapper for additional images */}

            <Image
              data-aos="fade-down" // Animation for fading in from the top
              src="/assets/gallery2.jpg" // Path to the second gallery image
              alt="gallery-2"
              width={250}
              height={350}
              loading="lazy"
              className="w-full h-auto object-cover"
            />
            {/* Second image */}

            <Image
              data-aos="fade-left" // Animation for fading in from the left
              src="/assets/gallery3.jpg" // Path to the third gallery image
              alt="gallery-3"
              width={250}
              height={350}
              loading="lazy"
              className="w-full h-auto object-cover"
            />
            {/* Third image */}
          </div>
        </div>
      </div>

      {/* Additional Section */}
      <div
        data-aos="fade-left" // Animation for fading in from the left
        className="relative w-full p-4 mt-10 space-y-6"
        id="allgrallery" // Anchor for navigation
      >
        <h2 className="text-linear italic text-3xl font-medium text-center my-4 md:my-6 max-w-3xl mx-auto leading-relaxed">
          Designs that combine creativity and technology to provide a unique and
          distinctive experience!
        </h2>
        {/* Subheading for the gallery section with gradient text and responsive styling */}

        <FocusCards />
        {/* Component displaying specific focus cards */}
      </div>
    </div>
  );
};

export default Gallery;
