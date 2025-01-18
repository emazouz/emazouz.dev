"use client";

import useFetchData from "@/hooks/useFetchData";
import { useRef, useState } from "react";
import ContentCard from "@/components/sub/ContentCard";
import Spinner from "@/components/ui/Spinner";
import ViewBlogs from "@/components/sub/ViewBlogs";
import Titles from "@/components/sub/Titles";
import { CiSearch } from "react-icons/ci";

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState(""); // بحث
  const { allData, loading } = useFetchData("/api/blogs");
  // تصفية المدونات بناءً على البحث
  const filteredBlogs =
    searchQuery.trim() === ""
      ? allData || []
      : allData.filter((blog) =>
          blog.title?.toLowerCase().includes(searchQuery.toLowerCase())
        );
  const publishedBlogs = filteredBlogs.filter((db) => db.status === "publish");

  const replyFormRef = useRef(null);
  const handleSearch = () => {
    if (replyFormRef.current) {
      replyFormRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main>
      <div className="w-full relative flex flex-col items-center justify-center mt-20">
        {/* Radial gradient for the container to give a faded look */}
        <div className="mx-auto p-4 py-10">
          <Titles
            title="Blogs Sections"
            desc="Welcome to our Blog Section, where we share insightful and engaging content designed to inspire and inform. From advanced tech tips and the latest industry news to inspiring success stories and in-depth analyses, our posts aim to enhance your understanding of the digital landscape. Join us in exploring innovative ideas and stay updated on the trends shaping the future of technology"
          />
          <form
            data-aos="fade-right"
            action="#"
            className="max-w-xl h-12 mt-4 bg-secondary-color flex items-center px-3 gap-px ms:gap-2 rounded-full mx-auto"
            onSubmit={(e) => {
              e.preventDefault(); // منع الإرسال الافتراضي
              // أضف هنا كود البحث
            }}
          >
            <CiSearch
              className="text-text-color-primary text-3xl"
              type="submit"
              onClick={handleSearch}
            />

            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              placeholder="Search blog name..."
              className="text-text-color-primary bg-transparent border-none outline-none w-full h-full relative p-3 placeholder:text-neutral-400 rounded-full"
              aria-label="Search blog name"
            />
          </form>
        </div>

        {/* BLOGS */}
        <ContentCard data={publishedBlogs} link='/blogs' />
      </div>

      <div className="w-[100vw] relative bg-mode py-10">
        <h1
          data-aos="fade-right"
          ref={replyFormRef}
          className="text-linear text-xl font-semibold px-5 mt-6"
        >
          Latest Articles :
        </h1>
        <div
          data-aos="fade-up"
          className="w-full grid grid-cols-1 gap-6 p-4 smallDesktop:grid-cols-2 largeDesktop:grid-cols-3 mt-10"
        >
          {loading ? (
            <Spinner />
          ) : publishedBlogs.length > 0 ? (
            publishedBlogs.map((item, i) => (
              <ViewBlogs key={i} item={item} idx={i} />
            ))
          ) : (
            <div className="w-full h-full flex justify-center col-span-2">
              <p className="text-white">No blogs found for this category.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
