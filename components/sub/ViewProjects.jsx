"use client"; // Ensures client-side rendering
import { recentWorks } from "@/data"; // Importing recent works data
import React, { useEffect, useState } from "react";
import { CgWebsite } from "react-icons/cg";
import { FaCss3, FaDigitalOcean, FaGithub, FaMedapps } from "react-icons/fa";
import { MdOutlineVerticalDistribute } from "react-icons/md";
import { CardContainer } from "../ui/Card3D"; // Custom 3D card container component
import Link from "next/link"; // Next.js link component for client-side navigation
import { AiOutlineArrowRight } from "react-icons/ai";
import ArrowBtn from "../ui/ArrowBtn"; // Reusable button with an arrow icon
import Spinner from "../ui/Spinner"; // Spinner component for loading state
import Image from "next/image"; // Optimized image rendering

const ViewProjects = ({ id }) => {
  const [loading, setLoading] = useState(true); // Loading state
  const [allData, setAllData] = useState([]); // All fetched projects
  const [filteredProjects, setFilteredProjects] = useState([]); // Filtered projects based on category
  const [selectedCategory, setSelectedCategory] = useState("All"); // Selected category

  // Fetch projects from the API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/projects"); // API endpoint for fetching projects
        if (!response.ok) {
          throw new Error("Failed to fetch projects"); // Error handling for failed response
        }
        const projectData = await response.json(); // Parsing JSON response
        setAllData(projectData); // Storing project data
      } catch (error) {
        console.error("Error fetching data:", error); // Log error
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchData();
  }, []);

  // Filter projects based on the selected category
  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredProjects(
        allData.filter((project) => project.status === "publish")
      );
    } else {
      setFilteredProjects(
        allData.filter(
          (project) =>
            project.status === "publish" &&
            Array.isArray(project.projectCategory) &&
            project.projectCategory[0] === selectedCategory
        )
      );
    }
  }, [selectedCategory, allData]);

  // Determine the number of projects to display based on the `id` prop
  const data = id === 1 ? filteredProjects.slice(0, 5) : filteredProjects;

  return (
    <div data-aos="fade-down" className="w-full my-5 relative p-4 z-20">
      {/* Category Selection Section */}
      <div className="flex items-center justify-center gap-5 flex-wrap">
        {recentWorks.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedCategory(item.name)} // Update category on click
            className={`${
              selectedCategory === item.name
                ? "bg-primary-color" // Active category style
                : "bg-secondary-color text-text-color-secondary duration-200 hover:text-text-color-primary"
            } cursor-pointer flex items-center gap-2 text-md font-medium tracking-wide p-2 rounded-lg`}
          >
            <span>
              {/* Display corresponding icon for each category */}
              {item.id === 1 && <MdOutlineVerticalDistribute />}
              {item.id === 2 && <CgWebsite />}
              {item.id === 3 && <FaCss3 />}
              {item.id === 4 && <FaMedapps />}
              {item.id === 5 && <FaDigitalOcean />}
            </span>
            <span>{item.name}</span>
          </div>
        ))}
      </div>

      {/* Projects Display Section */}
      <div
        data-aos="fade-out"
        data-aos-duration="1500"
        className="mt-16 w-full grid grid-cols-1 smallDesktop:grid-cols-2 largeDesktop:grid-cols-3 gap-6 p-4"
      >
        {loading ? (
          <Spinner /> // Show spinner while data is loading
        ) : data.length > 0 ? (
          data.map((item, i) => (
            <div
              key={i}
              className="box relative h-full w-full bg-gradient-card max-w-[500px] rounded-lg mx-auto p-4"
            >
              <CardContainer className="relative -mt-12 flex flex-col justify-center w-full rounded-lg overflow-hidden">
                <Link href={`/projects/${item.slug}`}>
                  <Image
                    src={item.images[0]} // Display the first image from the project
                    alt={item.title} // Image alt text for accessibility
                    width={500}
                    height={300}
                    className="h-full w-full object-cover rounded-lg duration-300 hover:scale-110"
                  />
                </Link>
              </CardContainer>

              {/* Project Description */}
              <div className="text-text-color-primary w-full mt-2">
                <div className="space-y-1">
                  <div
                    data-aos="fade-right"
                    className="flex gap-x-3 items-center"
                  >
                    {item.tags.slice(0, 3).map((tag, i) => (
                      <h2 key={i} className="p-2 bg-[#1C1678] rounded-xl">
                        {tag} {/* Display up to 3 tags */}
                      </h2>
                    ))}
                  </div>
                  <h1
                    data-aos="fade-right"
                    className="capitalize text-linear font-bold text-2xl"
                  >
                    {item.title}
                  </h1>
                  <p
                    data-aos="fade-right"
                    className="text-text-color-secondary mt-5"
                  >
                    {item.overview}
                  </p>
                </div>
                {/* Action Buttons */}
                <div
                  data-aos="fade-up"
                  className="flex gap-2 items-center mt-3"
                >
                  <Link target="_blank" href={item.livePreview}>
                    <ArrowBtn
                      title={"Live View"}
                      icon={<AiOutlineArrowRight />}
                    />
                  </Link>

                  <Link
                    target="_blank"
                    href={item.openSource || "/projectAccessPolicy"}
                  >
                    <ArrowBtn title={"GitHub"} icon={<FaGithub />} />
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full h-full flex justify-center col-span-3">
            <p className="text-white">No project found for this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewProjects;
