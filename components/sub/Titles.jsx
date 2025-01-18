import React from "react";

const Titles = ({ title, desc }) => {
  return (
    <div
      data-aos="fade-out"
      className="relative w-full flex flex-col items-center gap-6 p-6 text-center z-10"
    >
      <h1
        data-aos="fade-right"
        className="text-5xl sm:text-6xl font-extrabold tracking-wide text-linear"
      >
        {title}
      </h1>
      <p
        data-aos="fade-left"
        className="w-full max-w-5xl mx-auto text-xl text-text-color-secondary leading-relaxed"
      >
        {desc}
      </p>
    </div>
  );
};

export default Titles;
