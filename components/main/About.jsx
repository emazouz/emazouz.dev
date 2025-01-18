"use client";

import { useState } from "react";

import Button from "../sub/Button";
import GlobeDemo from "../sub/GlobeDemo";
import Link from "next/link";
import Image from "next/image";

const About = () => {
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(" wb.mazouz@gmail.com");
    setHasCopied(true);

    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };

  return (
    <section id="about-me" className="px-10 bg-main-back py-5">
      <div className="grid xl:grid-cols-3 xl:grid-rows-2 md:grid-cols-2 grid-cols-1 gap-5 h-full">
        <div
          className="col-span-1 xl:row-span-2"
        >
          <div className="grid-container" data-aos="fade-right">
            <Image
              src="/assets/grid1.png" // Path to the image (must be inside the public directory for Next.js)
              alt="Grid 1 illustration" // Description for accessibility and SEO
              className="w-full sm:h-[276px] h-fit object-contain" // Styling for responsiveness
              width={500} // Image width (helps optimize rendering)
              height={276} // Image height
            />

            <div data-aos="fade-right">
              <p className="grid-headtext">
                Hi, I&apos;m Younes Mazouz{" "}
                <span className="waving-hand">👋</span>
              </p>
              <p className="grid-subtext">
                With 3 years of experience, I have refined my expertise in both
                frontend and backend development, crafting dynamic and
                responsive websites that deliver seamless user experiences
              </p>
            </div>
          </div>
        </div>

        <div
          className="col-span-1 xl:row-span-2"
        >
          <div className="grid-container" data-aos="fade-up">
            <Image
              src="/svg/b5.svg" // Path to the SVG file (must be inside the public directory)
              alt="Illustration of Tech Stack" // Description for accessibility and SEO
              className="w-full sm:h-[276px] h-fit object-contain" // Styling for responsiveness
              width={500} // Image width (improves optimization)
              height={276} // Image height
            />

            <div data-aos="fade-left">
              <p className="grid-headtext">Tech Stack</p>
              <p className="grid-subtext">
                I specialize in a wide range of languages, frameworks, and
                tools, enabling me to build robust, scalable, and efficient
                applications.
              </p>
            </div>
          </div>
        </div>

        <div
          data-aos="fade-left"
          className="col-span-1 xl:row-span-3"
        >
          <div className="grid-container">
            <div className="rounded-3xl w-full sm:h-[326px] h-fit flex justify-center items-center">
              <GlobeDemo />
            </div>
            <div data-aos="fade-rihgt">
              <p className="grid-headtext">
                I&apos;m highly adaptable to different time zones and locations,
                ensuring seamless communication and collaboration
              </p>
              <p className="grid-subtext">
                I&apos;am based in Ouarzazate, Morocco and looking for remote
                work opportunities anywhere in the world.
              </p>
              <Link
                target="_blanck"
                href="https://www.linkedin.com/in/younes-mazouz-2b809431b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              >
                <Button
                  name="Contact Me"
                  isBeam
                  containerClass="w-full mt-10 bg-main-back"
                />
              </Link>
            </div>
          </div>
        </div>

        <div
          className="xl:col-span-2 xl:row-span-2 animate-fadeRight"
        >
          <div className="grid-container" data-aos="fade-right">
            {/* Decorative Image */}
            <Image
              src="/assets/grid3.png" // Path to the image asset
              alt="grid-3" // Alternative text for accessibility
              className="w-full sm:h-[266px] h-fit object-contain" // Responsive image styling
              layout="intrinsic" // Maintains aspect ratio of the image
              width={500} // Provide an appropriate width value (adjust as needed)
              height={266} // Provide an appropriate height value (adjust as needed)
            />

            <div>
              <p className="grid-headtext">My Passion for Coding</p>
              <p className="grid-subtext">
                I love solving problems and creating through code. Programming
                isn&apos;t just my profession—it&apos;s my passion. I thrive on
                exploring new technologies and continuously enhancing my skills.
              </p>
            </div>
          </div>
        </div>

        <div
          data-aos="fade-up"
          className="xl:col-span-1"
        >
          <div className="grid-container">
            <Image
              src="/assets/grid4.png" // Path to the image asset
              alt="grid-4" // Alternative text for accessibility
              className="w-full md:h-[126px] sm:h-[276px] h-fit object-cover sm:object-top" // Responsive image styling with object position adjustments
              layout="intrinsic" // Ensures the image maintains its aspect ratio while resizing
              width={500} // Provide an appropriate width value (adjust as needed)
              height={276} // Provide an appropriate height value (adjust as needed)
            />

            <div className="space-y-2 z-10">
              <p
                data-aos="fade-right"
                className="text-[#afb0b6] text-base font-generalsans text-center"
              >
                Contact me
              </p>
              <div
                className="cursor-pointer flex justify-center items-center gap-2"
                onClick={handleCopy}
              >
                <Image
                  data-aos="fade-right" // Animation on scroll from the right
                  src={hasCopied ? "/svg/tick.svg" : "/svg/copy.svg"} // Switches between tick and copy icon based on `hasCopied`
                  alt="copy"
                  width={24} // Set appropriate width for the icon
                  height={24} // Set appropriate height for the icon
                />
                <p
                  data-aos="fade-left"
                  className="lg:text-2xl md:text-xl font-medium bg-gradient-to-r from-[#BEC1CF] from-60% via-[#D5D8EA] via-60% to-[#D5D8EA] to-100% bg-clip-text text-transparent"
                >
                  wb.mazouz@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
