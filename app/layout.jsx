"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import StarsCanvas from "@/components/main/StarBackground";
import Navbar from "@/components/main/Navbar";
import Footer from "@/components/main/Footer";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({ children }) {
  useEffect(() => {
    AOS.init({
      disable: false, // تعطيل AOS بناءً على الشرط
      startEvent: "DOMContentLoaded", // الحدث الذي يفعّل AOS
      initClassName: "aos-init", // اسم الكلاس الافتراضي للعناصر
      disableMutationObserver: false, // عدم تعطيل المراقبة للتغييرات DOM
      debounceDelay: 50, // تأخير التخلص من العمليات (debounce)
      throttleDelay: 99, // تأخير خنق العمليات (throttle)

      duration: 600, // مدة الحركة بالميلي ثانية
      offset: 70, // المسافة قبل تشغيل الأنيميشن
      delay: 0, // تأخير تشغيل الأنيميشن
      easing: "ease", // نوع تسهيل الأنيميشن
      once: false, // هل يعمل الأنيميشن مرة واحدة فقط؟
      mirror: false, // هل يعيد الأنيميشن عند التمرير للخلف؟
      anchorPlacement: "top-bottom", // موضع التشغيل بالنسبة للعنصر (العنصر العلوي مقابل السفلي)
    });
  }, []);

  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-[#030014] overflow-y-scroll overflow-x-hidden`}
      >
        <StarsCanvas />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
