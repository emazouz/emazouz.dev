"use client";
import React from "react";
import { FaFacebook, FaGithub, FaLinkedinIn } from "react-icons/fa";
import ButtonMagic from "../ui/ButtonMagic";
import { RiInstagramFill } from "react-icons/ri";
import { MdOutlineArrowOutward } from "react-icons/md";
import { SocialMedia } from "@/data";
import Link from "next/link";
import ArrowBtn from "../ui/ArrowBtn";
const Footer = () => {
  return (
    <footer className="relative text-center bg-main-back p-10">
      <div className="flex p-2 flex-col items-center">
        <h1
          data-aos="fade-down"
          className="text-text-color-secondary lg:max-w-[45vw]"
        >
          Ready to take <span className="">your</span> digital presence to the
          next level?
        </h1>
        <p
          data-aos="fade-down"
          className="text-text-color-secondary capitalize font-bold md:mt-10 my-5 text-center"
        >
          Reach out to me today and let&apos;s discuss how I can help you
          achieve your goals.
        </p>
        <Link data-aos="fade-up" href="/contact">
          <ArrowBtn
            title={"Let's get in touch"}
            icon={<MdOutlineArrowOutward />}
          />
        </Link>
      </div>
      <div className="flex mt-16 md:flex-row flex-col justify-between items-center gap-3">
        <p className="md:text-base text-text-color-primary text-sm md:font-normal font-light">
          Copyright © 2024 Younes Mazouz
        </p>

        <div className="flex items-center justify-between md:gap-3 gap-6">
          <div className="flex items-center md:gap-3 gap-6">
            {SocialMedia.map((item) => (
              <ButtonMagic
                key={item.id}
                atherClass="hover:scale-90"
                mainClass="h-10"
                href={item.link}
              >
                <span className="text-xl">
                  {item.id === 1 && <FaFacebook />}
                  {item.id === 2 && <FaLinkedinIn />}
                  {item.id === 3 && <FaGithub />}
                  {item.id === 4 && <RiInstagramFill />}
                </span>
              </ButtonMagic>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
