"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaBloggerB, FaHome } from "react-icons/fa";
import { sections, SocialMedia } from "@/data";
import { GrGallery, GrProjects, GrServices } from "react-icons/gr";
import { MdContacts } from "react-icons/md";
import { BiMenuAltRight } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
const Navbar = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  return (
    <div className="w-[100vw] h-[65px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001417] backdrop-blur-md z-50 px-4 ms:px-10">
      <div className="w-full h-full flex flex-row items-center justify-between m-auto">
        <a href="#about-me" className="h-auto w-auto flex items-center">
          <Image
            src="/assets/logo.png"
            alt="logo"
            width={45}
            height={45}
            className="cursor-pointer hover:scale-95"
          />

          <span className="font-bold text-xl hidden md:block text-white">
            mazouz
          </span>
        </a>

        <div className="relative flex h-full items-center gap-5 ">
          <ul className="hidden smallDesktop:flex items-center gap-5 w-full h-auto border border-[#7042f861] bg-[#0300145e] px-[20px] py-[10px] rounded-full text-gray-200">
            {sections.map((item) => (
              <li onClick={() => setActiveSection(item.id)} key={item.id}>
                <Link
                  href={item.link}
                  className={`relative ${
                    activeSection === item.id
                      ? "text-teal-300"
                      : "text-text-color-primary duration-300 hover:text-teal-300"
                  }`}
                >
                  {item.name}
                  {activeSection === item.id && (
                    <div className="bg-teal-300 absolute bottom-[-4px] left-0 w-full h-[3px] rotate-[-2deg] rounded-[30%] animate-text-expand-scroll"></div>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-row gap-5">
          {SocialMedia.map((social) => (
            <Link target="_blanck" key={social.id} href={social.link}>
              <Image
                src={social.src}
                alt={social.name}
                width={24}
                height={24}
              />
            </Link>
          ))}
          {/* btn toggel */}
          <span
            onClick={(e) => setIsMobile(!isMobile)}
            className="smallDesktop:hidden text-text-color-primary text-3xl cursor-pointer"
          >
            {isMobile ? <IoMdClose /> : <BiMenuAltRight />}
          </span>
        </div>

        <div
          className={`${
            isMobile
              ? "absolute inset-x-0 top-[67px] backdrop-blur-xl z-50"
              : "hidden"
          }`}
        >
          <ul className="smallDesktop:hidden flex items-center gap-x-3 mx-auto w-fit h-auto border border-[#7042f861] bg-[#0300145e] px-[20px] py-[10px] rounded-full text-gray-200">
            {sections.map((item) => (
              <li onClick={() => setActiveSection(item.id)} key={item.id}>
                <Link
                  onClick={(e) => setIsMobile(!isMobile)}
                  key={item.id}
                  href={item.link}
                  className={`relative ${
                    activeSection === item.id
                      ? "text-teal-300"
                      : "text-text-color-primary duration-300 hover:text-teal-300"
                  }`}
                >
                  <span
                    className={` ${
                      activeSection === item.id
                        ? "text-primary"
                        : "text-tx-primary"
                    } relative block sm:hidden bg-main-back rounded-md p-2 duration-200 hover:text-primary`}
                  >
                    {item.id === 1 && <FaHome />}
                    {item.id === 2 && <GrServices />}
                    {item.id === 3 && <GrProjects />}
                    {item.id === 4 && <FaBloggerB />}
                    {item.id === 5 && <GrGallery />}
                    {item.id === 6 && <MdContacts />}
                  </span>
                  <span className="hidden sm:block">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
