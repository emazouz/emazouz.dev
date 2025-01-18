"use client";

import useFetchData from "@/hooks/useFetchData";
import { useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import Titles from "@/components/sub/Titles";
import ViewProjects from "@/components/sub/ViewProjects";
import ContentCard from "@/components/sub/ContentCard";

const PageProjects = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { allData, loading } = useFetchData("/api/projects");

  // Filter projects based on search query
  const filteredprojects =
    searchQuery.trim() === ""
      ? allData || []
      : allData.filter((project) =>
          project.title?.toLowerCase().includes(searchQuery.toLowerCase())
        );

  const publishedprojects = filteredprojects.filter(
    (project) => project.status === "publish"
  );

  const replyFormRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (replyFormRef.current) {
      replyFormRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <div className="w-full relative flex flex-col items-center justify-center mt-20">
        <div className="mx-auto p-4 py-10">
          <Titles
            title="projects Sections"
            desc="Welcome to our project Section, where we share insightful and engaging content designed to inspire and inform. From advanced tech tips and the latest industry news to inspiring success stories and in-depth analyses, our posts aim to enhance your understanding of the digital landscape."
          />
          <form
            data-aos="fade-left"
            className="max-w-xl h-12 mt-4 bg-secondary-color flex items-center px-3 gap-px ms:gap-2 rounded-full mx-auto"
            onSubmit={handleSearch}
          >
            <CiSearch className="text-text-color-primary text-3xl" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              placeholder="Search project name..."
              className="text-text-color-primary bg-transparent border-none outline-none w-full h-full relative p-3 placeholder:text-neutral-400 rounded-full"
              aria-label="Search project name"
            />
          </form>
        </div>

        {/* project Section */}
        <ContentCard data={publishedprojects} link='/projects' />
      </div>

      <div className="w-[100vw] relative bg-mode py-10">
        {/* Latest Articles */}
        <h1
          data-aos="fade-right"
          ref={replyFormRef}
          className="text-linear text-xl font-semibold px-5 mt-6"
        >
          Latest Projects:
        </h1>
        <ViewProjects id={2} />
      </div>
    </div>
  );
};

export default PageProjects;
