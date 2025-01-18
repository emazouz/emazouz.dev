"use client";

import Spinner from "@/components/ui/Spinner";
import ViewBlogs from "@/components/sub/ViewBlogs";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBlog } from "react-icons/fa";

const Category = () => {
  const params = useParams();
  const { category } = params;
  const [blogData, setBlogData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const title = category.replace("-", " ");
  useEffect(() => {
    const fetchBlogData = async () => {
      if (category) {
        try {
          const response = await axios.get(`/api/blogs`);
          setBlogData(response.data);
          setIsLoading(false);
        } catch (error) {
          console.log("Failed to fetch blog data. Please try again later.");
          setIsLoading(false);
        }
      }
    };
    fetchBlogData();
  }, [category]);

  const filteredBlog = blogData.filter(
    (blog) => blog.blogCategory[0] === title
  );

  return (
    <>
      <title>{title}</title>
      <div className="bg-mode relative p-4 mt-20">
        {/* Blogs Content */}
        <div data-aos="fade-right" className="max-w-6xl py-10">
          <h1 className="relative z-10 text-lg md:text-7xl text-linear font-sans font-bold">
            {title}
          </h1>
          <p></p>
          <p className="text-text-color-secondary max-w-2xl my-2 text-sm relative z-10">
            Welcome to our Blog Section, where we share insightful and engaging
            content designed to inspire and inform. From advanced tech tips and
            the latest industry news to inspiring success stories and in-depth
            analyses, our posts aim to enhance your understanding of the digital
            landscape. Join us in exploring innovative ideas and stay updated on
            the trends shaping the future of technology
          </p>
        </div>

        <div
          data-aos="fade-left"
          className="flex w-full justify-between items-center text-2xl text-text-color-primary font-semibold"
        >
          <h1 className="tracking-wide capitalize">{title}</h1>
          <FaBlog />
        </div>
        <hr className="mt-1"></hr>

        <div className="relative w-full mt-16  tablet:px-16">
          <span className="absolute rounded-lg inset-0"></span>
          <div
            data-aos="fade-out-right"
            data-aos-easing="linear"
            className="relative mt-10 w-full grid grid-cols-1 smallDesktop:grid-cols-2 largeDesktop:grid-cols-3 gap-4"
          >
            {isLoading ? (
              <Spinner />
            ) : filteredBlog.length > 0 ? (
              filteredBlog.map((item, i) => (
                <ViewBlogs key={i} item={item} idx={i} />
              ))
            ) : (
              <div className="w-full h-full flex justify-center col-span-3">
                <p className="text-white">No blogs found for this category.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
