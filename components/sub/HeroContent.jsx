"use client"; // Indicates that this is a client-side rendered component.

import React from "react";
import { motion } from "framer-motion"; // Framer Motion for animations.
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/utils/motion"; // Custom animation variants for motion components.
import { SparklesIcon } from "@heroicons/react/24/solid"; // Icon from Heroicons.
import Image from "next/image"; // Next.js Image component for optimized image rendering.

const HeroContent = () => {
  return (
    <motion.div
      initial="hidden" // Initial animation state.
      animate="visible" // Final animation state after the component is mounted.
      className="flex items-center justify-center px-10 lg:px-20 mt-40 w-full z-[20]"
    >
      {/* Main text content container */}
      <div
        data-aos="fade-in-right" // AOS (Animate on Scroll) animation for fade-in from right.
        className="h-full w-full flex flex-col gap-5 justify-center items-center tablet:items-start text-center m-auto tablet:text-start"
      >
        {/* Top welcome box with an icon */}
        <motion.div
          variants={slideInFromTop} // Slide-in animation from the top.
          className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9] bg-main-back z-10"
        >
          <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />{" "}
          {/* Decorative sparkles icon */}
          <h1 className="Welcome-text text-[13px]">
            Full Stack Developer
          </h1>{" "}
          {/* Role title */}
        </motion.div>

        {/* Main headline */}
        <motion.div
          variants={slideInFromLeft(0.5)} // Slide-in animation from the left with a delay of 0.5 seconds.
          className="flex flex-col gap-6 mt-6 text-6xl font-bold text-white max-w-[600px] w-auto h-auto"
        >
          <span>
            Providing
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              {" "}
              the best{" "}
            </span>
            project experience
          </span>
        </motion.div>

        {/* Paragraph description */}
        <motion.p
          variants={slideInFromLeft(0.8)} // Slide-in animation from the left with a delay of 0.8 seconds.
          className="text-lg text-gray-400 my-5 max-w-[600px]"
        >
          I&apos;m a Full Stack Software Engineer specializing in web, mobile,
          and software development. With a strong foundation in modern
          technologies and a passion for creating innovative solutions, I bring
          ideas to life through clean and efficient code. Explore my projects to
          discover my skills and expertise.
        </motion.p>

        {/* Call-to-action button */}
        <motion.a
          href="#about-me" // Link to the "About Me" section.
          variants={slideInFromLeft(1)} // Slide-in animation from the left with a delay of 1 second.
          className="p-4 button-primary text-center text-white cursor-pointer rounded-lg max-w-[200px]"
        >
          Learn More
        </motion.a>
      </div>

      {/* Image section (right side) */}
      <motion.div
        variants={slideInFromRight(0.8)} // Slide-in animation from the right with a delay of 0.8 seconds.
        className="hidden w-full h-full -mr-16 tablet:flex justify-center items-center"
      >
        <Image
          data-aos="fade-in-left" // AOS animation for fade-in from the left.
          src="/svg/mainIconsdark.svg" // Path to the SVG image.
          alt="work icons" // Alt text for accessibility.
          height={600} // Image height.
          width={600} // Image width.
        />
      </motion.div>
    </motion.div>
  );
};

export default HeroContent; // Exports the component for use in other parts of the application.
