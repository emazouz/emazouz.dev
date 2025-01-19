import Hero from "@/components/main/Hero";
import Services from "@/components/main/Services";
import About from "@/components/main/About";
import RecentWorks from "@/components/main/RecentWorks";
import Blogs from "@/components/main/Blogs";

export const metadata = {
  title: "Portfolio | Full Stack Developer",
  description: "Showcasing my skills and projects as a full stack web developer.",
  icons: {
    icon: "/svg/e.svg",
    shortcut: "/svg/e.svg",
    apple: "/svg/e.svg",
  },
};
export default function Home() {

  return (
    <>
      <title>Home Page</title>
      <main className="h-full w-full">
        <Hero />
        <About />
        <Services />
        <RecentWorks />
        <Blogs />
      </main>
    </>
  );
}
