import useFetchData from "@/hooks/useFetchData";
import Link from "next/link";
import React, { useState, useMemo } from "react";
import { FaBlog } from "react-icons/fa";

const SearchBlog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { allData, loading } = useFetchData("/api/blogs");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // تصفية المدونات بناءً على البحث
  const filteredBlogs = useMemo(() => {
    if (!allData) return [];
    if (!searchQuery.trim())
      return allData.filter((blog) => blog.status === "publish");
    return allData.filter(
      (blog) =>
        blog.title?.toLowerCase().includes(searchQuery.toLowerCase()) &&
        blog.status === "publish"
    );
  }, [searchQuery, allData]);

  // تقسيم الصفحات
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const currentBlogs = filteredBlogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // التنقل بين الصفحات
  const goToNextPage = () =>
    currentPage < totalPages && setCurrentPage((prev) => prev + 1);
  const goToPrevPage = () =>
    currentPage > 1 && setCurrentPage((prev) => prev - 1);

  return (
    <div
      data-aos="fade-right"
      className="w-full flex flex-col gap-y-4 items-center p-4"
    >
      {/* البحث */}
      <form className="w-11/12 h-12 mt-4 flex gap-2 rounded-full">
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          placeholder="Search blog name..."
          className="text-text-color-primary max-w-2xl mx-auto bg-secondary-color border-2 border-secondary-color  outline-none w-full h-full p-3 duration-200 focus:border-primary placeholder:text-neutral-400 rounded-full"
        />
      </form>

      {/* حالة التحميل */}
      {loading && <span>Loading...</span>}

      {/* عرض النتائج */}
      {!loading && (
        <div data-aos="fade-up" className="w-full px-5 mt-2">
          {filteredBlogs.length === 0 ? (
            <span className="text-gray-500 px-4">
              No blogs match your search.
            </span>
          ) : searchQuery === "" ? (
            ""
          ) : (
            // blog-scroll
            <div className="relative w-full h-52 overflow-y-scroll scroll-smooth">
              {currentBlogs.map((blog, index) => (
                <Link
                  key={index}
                  href={`/blogs/${blog.slug}`}
                  className="block bg-secondary-color text-white py-2 px-4 mb-2 rounded-lg shadow hover:bg-gray-700 transition"
                >
                  <span className="font-semibold text-md">
                    {blog.title} <span className="text-primary-color">*</span>
                  </span>

                  <div className="flex items-center flex-wrap gap-2">
                    {blog.tags.map((item, i) => (
                      <span
                        key={i}
                        className="text-text-color-primary bg-secondary-color px-2 py-1 text-sm rounded-md"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
      <div className="w-full">
        <div className="flex w-full px-4 py-2 justify-between items-center text-2xl text-text-color-primary font-semibold">
          <h1 className="tracking-wide capitalize">Categorise</h1>
          <FaBlog />
        </div>
        <hr />
        <Link
          href={`/blogs/category/Trending-Blogs`}
          className="flex justify-between items-center mt-2 p-4 rounded-lg duration-200 hover:bg-secondary-color"
        >
          <span className="text-text-color-primary text-lg font-medium">
            Trending Blogs
          </span>
          <span className="text-primary-color font-bold ">
            (
            {
              allData.filter(
                (blog) => blog.blogCategory[0] === "Trending Blogs"
              ).length
            }
            )
          </span>
        </Link>

        <Link
          href={`/blogs/category/Programming-Tips`}
          className="flex justify-between items-center mt-2 p-4 rounded-lg duration-200 hover:bg-secondary-color"
        >
          <span className="text-text-color-primary text-lg font-medium">
            Programming Tips
          </span>
          <span className="text-primary-color font-bold ">
            (
            {
              allData.filter(
                (blog) => blog.blogCategory[0] === "Programming Tips"
              ).length
            }
            )
          </span>
        </Link>

        <Link
          href={`/blogs/category/Top-Tools`}
          className="flex justify-between items-center mt-2 p-4 rounded-lg duration-200 hover:bg-secondary-color"
        >
          <span className="text-text-color-primary text-lg font-medium">
            Top Tools
          </span>
          <span className="text-primary-color font-bold ">
            (
            {
              allData.filter((blog) => blog.blogCategory[0] === "Top Tools")
                .length
            }
            )
          </span>
        </Link>
      </div>
      {/* أزرار التنقل بين الصفحات */}
      {filteredBlogs.length > itemsPerPage && (
        <div className="flex gap-4 mt-4">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${
              currentPage === 1
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white`}
          >
            Previous
          </button>
          <span className="text-gray-300">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded ${
              currentPage === totalPages
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBlog;
