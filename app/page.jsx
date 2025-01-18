import Hero from "@/components/main/Hero";
import Services from "@/components/main/Services";
import About from "@/components/main/About";
import RecentWorks from "@/components/main/RecentWorks";
import Blogs from "@/components/main/Blogs";

export default function Home() {
  return (
    <main className="h-full w-full">
      <Hero />
      <About />
      <Services />
      <RecentWorks />
      <Blogs />
    </main>
  );
}
