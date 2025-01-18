"use client";
import ViewProjects from "../sub/ViewProjects";
import Titles from "../sub/Titles";
import MovingCards from "../ui/MovingCards";
import { companies } from "@/data";

const RecentWorks = () => {
  return (
    <section className="relative w-full flex flex-col items-center justify-center overflow-hidden py-6">
      <div className="py-5">
        <MovingCards id={2} items={companies} />
        <MovingCards direction="right" id={2} items={companies} />
      </div>
      <Titles
        title="My Recent Works"
        desc="
        We offer a range of innovative projects that reflect our expertise in delivering outstanding digital solutions. From website and app design to effective marketing strategies, we help our clients successfully achieve their goals. Join us and leverage our expertise to realize your vision!
        "
      />
      {/* Recent Works */}
      <ViewProjects id={1} />
      <div className="absolute top-40 inset-x-0">
        <div className="w-full h-full opacity-30 absolute flex items-center justify-center bg-cover">
          <video
            className="w-full h-auto -z-10"
            preload="false"
            playsInline
            loop
            muted
            autoPlay
            src="/cards-video.webm"
          />
        </div>
      </div>
    </section>
  );
};

export default RecentWorks;
