"use client";
import React, { useEffect, useState } from "react";
import { category } from "@/data";
import Titles from "../sub/Titles";
import useFetchData from "@/hooks/useFetchData";
import Spinner from "../ui/Spinner";
import ViewBlogs from "../sub/ViewBlogs";

const Blogs = () => {
  const { allData, loading } = useFetchData("/api/blogs");
  const [selectedCategory, setSelectedCategory] = useState("All Posts");
  const [filteredData, setFilteredData] = useState([]);

  // تصفية البيانات بناءً على الفئة المحددة
  useEffect(() => {
    if (selectedCategory === "All Posts") {
      setFilteredData(allData.filter((blog) => blog.status === "publish"));
    } else {
      setFilteredData(
        allData.filter(
          (blog) =>
            blog.status === "publish" &&
            blog.blogCategory[0] === selectedCategory
        )
      );
    }
  }, [selectedCategory, allData]);

  return (
    <section className="relative py-10 min-h-screen z-30">
      {/* Header Section */}
      <Titles
        title="Recent Blogs"
        desc="
        Welcome to our Blog Section, where we share insightful and engaging content designed to inspire and inform. From advanced tech tips and the latest industry news to inspiring success stories and in-depth analyses, our posts aim to enhance your understanding of the digital landscape. Join us in exploring innovative ideas and stay updated on the trends shaping the future of technology"
      />
      {/* Blogs Container */}
      <div className="relative w-full flex flex-col lg:flex-row gap-6 p-4 z-10">
        {/* Sidebar with Sticky */}
        <div
          data-aos="fade-down-right"
          className="lg:w-[25%] flex flex-col gap-4"
        >
          <div className="sticky top-20 flex justify-center flex-wrap gap-6  lg:flex-col">
            {category.map((item) => (
              <div
                onClick={() => setSelectedCategory(item.name)}
                key={item.id}
                className="relative py-3 pr-6 w-fit group block cursor-pointer"
              >
                <span
                  className={`${
                    selectedCategory === item.name
                      ? "text-linear"
                      : "text-secondary-color"
                  } text-xl sm:text-3xl font-medium`}
                >
                  {item.name}
                </span>
                <div
                  className={`${
                    selectedCategory === item.name
                      ? "bg-gradient-back"
                      : "bg-secondary-color"
                  } absolute bottom-[-4px] left-0 w-full h-[3px] rotate-[-2deg] rounded-[30%] animate-text-expand-scroll`}
                ></div>
              </div>
            ))}
          </div>
        </div>

        {/* Blogs Content */}
        <div className="relative w-full min-h-[700px] p-4">
          <span className="bg-gradient-back absolute rounded-lg inset-0"></span>
          <div className="scrollbar-hidden absolute inset-[3px] min-h-[770px] bg-main-back md:p-8 rounded-t-lg overflow-y-scroll scroll-smooth">
            <div
              data-aos="fade-out"
              data-aos-duration="1500"
              className="mt-10 w-full grid grid-cols-1 gap-6 p-2 md:grid-cols-2"
            >
              {loading ? (
                <Spinner />
              ) : filteredData.length > 0 ? (
                filteredData.map((item, i) => (
                  <ViewBlogs key={i} item={item} idx={i} />
                ))
              ) : (
                <div className="w-full h-full flex justify-center col-span-2">
                  <p className="text-white">
                    No blogs found for this category.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blogs;
