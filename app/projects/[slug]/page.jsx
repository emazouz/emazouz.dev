"use client";

import ButtonMagic from "@/components/ui/ButtonMagic";
import Spinner from "@/components/ui/Spinner";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  FaFacebook,
  FaGithub,
  FaLinkedinIn,
  FaProjectDiagram,
  FaWhatsapp,
} from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { RiInstagramFill } from "react-icons/ri";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
// import "swiper/css/free-white";
import "swiper/css/pagination";

// import required modules
import { FreeMode, Pagination } from "swiper/modules";
import { SocialMedia } from "@/data";
import Link from "next/link";
import Image from "next/image";

const ProjectPage = () => {
  const { slug } = useParams(); // الحصول على slug
  const [projectData, setProjectData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // جلب بيانات المشروع
  useEffect(() => {
    const fetchProjectData = async () => {
      if (slug) {
        try {
          const response = await axios.get(`/api/projects/${slug}`);
          setProjectData(response.data);
        } catch {
          setError("Failed to fetch project data. Please try again later.");
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchProjectData();
  }, [slug]);

  // تنسيق التاريخ
  const formatData = (date) => {
    if (!date || isNaN(Date.parse(date))) return "";

    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };

    return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
  };

  // مكون لصندوق الشيفرة
  const Code = ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || "");
    const [copied, setCopied] = useState(false);

    const handleCopied = () => {
      navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    };

    if (inline) {
      return <code>{children}</code>;
    } else if (match) {
      return (
        <div className="relative rounded-lg">
          <SyntaxHighlighter
            style={tomorrow}
            language={match[1]}
            PreTag="pre"
            {...props}
            codeTagProps={{
              style: {
                padding: "0",
                borderRadius: "5px",
                overflow: "auto",
                whiteSpace: "pre-wrap",
              },
            }}
          >
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
          <button
            style={{
              position: "absolute",
              top: "8px",
              right: "8px",
              background: "#3d3d3d",
              color: "#fff",
              border: "none",
              padding: "5px 10px",
              borderRadius: "10px",
              cursor: "pointer",
            }}
            onClick={handleCopied}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      );
    } else {
      return <code {...props}>{children}</code>;
    }
  };

  // حالة التحميل
  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center text-red-600">
        <p>{error}</p>
        <button
          className="text-white px-4 py-2 rounded mt-4"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  // حالة عدم العثور على المشروع
  if (!projectData) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        Project not found.
      </div>
    );
  }

  return (
    <>
      <title>{projectData.title}</title>
      <section className="relative w-full grid grid-cols-1 tablet:grid-cols-3 mt-20 z-30">
        <div
          data-aos="fade-right"
          className="col-span-2 flex flex-col gap-y-2 w-full bg-[#030014]"
        >
          <div className="relative w-full max-h-[600px] px-4 pt-4 rounded-lg">
            <Image
              data-aos="fade-out-right"
              data-aos-easing="linear"
              src={projectData.images?.[0] || "/default-image.jpg"} // Use default image if no images available
              alt={projectData.title || "Project image"} // Default alt text if title is missing
              className="object-cover h-full w-full rounded-lg"
              width={600} // Provide width for image optimization
              height={400} // Provide height for image optimization
              loading="lazy" // Lazy loading to improve performance
            />
          </div>

          {/* icons */}
          <div className="flex flex-wrap items-center justify-between gap-y-3 px-4 w-full">
            <div className="flex gap-1 my-2 items-center">
              {/* Displaying the author's image */}
              <Image
                data-aos="fade-right" // Animation on scroll from the right
                src='/assets/me.jpg'// Source of the author's image
                alt="mazouz" // Alternative text for the image
                width={32} // Specifying width in pixels (corresponds to Tailwind's w-8)
                height={32} // Specifying height in pixels (corresponds to Tailwind's h-8)
                className="rounded-full w-12 h-12 object-cover" // Styling: rounded and properly scaled
              />

              {/* Displaying the author's name */}
              <span
                data-aos="fade-left" // Animation on scroll from the left
                className="text-xl text-text-color-primary font-semibold tracking-wide" // Styling for text
              >
                {/* Author's name with an underlined effect */}
                <span className="text-primary-color">
                  mazouz{/* Dynamic author name */}
                </span>
              </span>
            </div>
            <div
              data-aos="fade-left"
              className="flex items-center md:gap-3 gap-6"
            >
              {SocialMedia.map((item) => (
                <ButtonMagic
                  key={item.id}
                  atherClass="hover:scale-90"
                  mainClass="h-10"
                  href={item.link}
                >
                  <span className="text-xl text-primary-color">
                    {item.id === 2 && <FaFacebook />}
                    {item.id === 4 && <FaLinkedinIn />}
                    {item.id === 3 && <FaGithub />}
                    {item.id === 1 && <RiInstagramFill />}
                  </span>
                </ButtonMagic>
              ))}
              <ButtonMagic
                atherClass="hover:scale-90 text-primary-color text-xl"
                mainClass="h-10"
                href="http://wa.me/+212772291384"
              >
                <FaWhatsapp className="size-5" />
              </ButtonMagic>
            </div>
          </div>

          <div className="w-full mt-4 p-4 min-h-[300px]">
            <div className="flex w-full justify-between items-center text-2xl text-text-color-primary font-semibold">
              <h1 data-aos="fade-right" className="tracking-wide capitalize">
                {projectData.title}
              </h1>
              <FaProjectDiagram />
            </div>
            {/* Tags */}
            <hr data-aos="fade-right" className="mt-1" />
            <div className="w-full py-4 flex items-center gap-4">
              <h1
                data-aos="fade-right"
                className="tracking-wide font-bold capitalize text-text-color-primary text-2xl"
              >
                Tags:
              </h1>
              <div className="flex flex-wrap items-center gap-4">
                {projectData.tags.map((tag, index) => (
                  <span
                    data-aos="fade-left"
                    key={index}
                    className="text-text-color-primary bg-secondary-color px-3 py-2 font-medium rounded-xl"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <hr className="mt-1" />

            {/* images */}
            <div className="relative w-full space-y-4 mt-6">
              <div className="flex w-full justify-between items-center text-2xl text-text-color-primary font-semibold">
                <h1 data-aos="fade-right" className="tracking-wide capitalize">
                  Other Pictures
                </h1>
                <FaProjectDiagram />
              </div>
              <Swiper
                slidesPerView={3}
                spaceBetween={30}
                freeMode={true}
                pagination={{
                  clickable: true,
                }}
                modules={[FreeMode, Pagination]}
                className="mySwiper"
              >
                {projectData.images.map((item, i) => (
                  <SwiperSlide key={i}>
                    <Image
                      data-aos="fade-out-right"
                      className="w-64 h-24 sm:h-56 object-cover rounded-lg"
                      src={item} // Image source
                      alt={`img-${i}`} // Set alt text for accessibility (consider adding a meaningful alt text here)
                      width={256} // Set width (adjust as per your needs)
                      height={224} // Set height (adjust as per your needs)
                      loading="lazy" // Lazy load the image
                    />
                  </SwiperSlide> 
                ))}
              </Swiper>
            </div>
          </div>

          <div
            data-aos="fade-out-right"
            data-aos-easing="linear"
            className="desc-items w-full mt-4 text-lg flex flex-col gap-y-3 p-4"
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code: Code,
              }}
            >
              {projectData.description}
            </ReactMarkdown>
          </div>
        </div>

        <div
          data-aos="fade-left"
          className="tablet:sticky top-20 right-0  tablet:max-w-[530px] w-full h-fit"
        >
          <div className="text-text-color-primary p-6 rounded-lg shadow-lg space-y-3">
            {/* الفئة */}
            <div className="space-y-2 border-b pb-4">
              <h2 className="text-text-color-secondary text-lg font-semibold uppercase tracking-wide">
                Category
              </h2>
              <h1 className="text-3xl font-bold text-text-color-primary flex items-center">
                {projectData.projectCategory}
              </h1>
            </div>

            {/* العميل */}
            <div className="space-y-2 border-b pb-4">
              <h2 className="text-text-color-secondary text-lg font-semibold uppercase tracking-wide">
                Client
              </h2>
              <h1 className="text-3xl  font-bold text-text-color-primary flex items-center">
                {projectData.client}
              </h1>
            </div>

            {/* تاريخ البداية */}
            <div className="space-y-2 border-b pb-4">
              <h2 className="text-text-color-secondary text-lg font-semibold uppercase tracking-wide">
                Start Date
              </h2>
              <h1 className="text-3xl font-bold text-text-color-primary">
                {new Date(projectData.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </h1>
            </div>

            {/* العنوان */}
            <div className="space-y-3 border-b pb-4">
              <h2 className="text-text-color-secondary text-lg font-semibold uppercase tracking-wide">
                Title
              </h2>
              <h1 className="text-3xl capitalize font-bold text-text-color-primary flex items-center">
                {projectData.title}
              </h1>
            </div>

            {/* الوصف */}
            <div className="space-y-2 border-b pb-4 col-span-2">
              <h2 className="text-text-color-secondary text-lg font-semibold uppercase tracking-wide">
                Description
              </h2>
              <p className="text-lg text-text-color-primary leading-relaxed">
                {projectData.overview}
              </p>
            </div>

            {/* الأزرار التفاعلية */}
            <div className="col-span-2 flex items-center gap-x-4 text-white">
              <Link
                target="_blanck"
                href={projectData.livePreview}
                className="px-4 py-2 bg-primary-color rounded"
              >
                View Project
              </Link>
              <Link
                href={projectData.openSource}
                className="px-4 py-2 bg-primary-color rounded"
              >
                Open Source
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectPage;
