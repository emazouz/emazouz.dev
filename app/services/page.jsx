import Carousel from "@/components/sub/Carousel";
import Titles from "@/components/sub/Titles";
import { plans, ServicesData } from "@/data";
import Link from "next/link";
import React from "react";

const PageServices = () => {
  return (
    <>
      <title>Services</title>
      <div className="relative p-4 mt-32">
        <Titles
          title="Welcome to Our Services"
          desc="We offer a comprehensive range of specialized services that aim to meet our clients’ needs and achieve their goals. From web development and user interface design to digital marketing strategies and website maintenance, we are here to help you enhance your digital presence and achieve success. Enjoy innovative and professional solutions that ensure high performance and an excellent user experience"
        />
        <div className="p-4  bg-mode flex flex-wrap items-center justify-center gap-4 z-10">
          {ServicesData.map((item, i) => (
            <Carousel key={i} data={item} />
          ))}
        </div>

        <div className="relative text-white flex items-center justify-center bg-main-back py-10">
          <div className="w-full max-w-7xl px-4">
            <div data-aos="fade-out" className="text-center py-12 ">
              <h2
                data-aos="fade-left"
                className="text-5xl font-extrabold text-linear mb-4"
              >
                Pricing My Work
              </h2>
              <p
                data-aos="fade-right"
                className="text-lg text-tx-secondary max-w-5xl mx-auto leading-relaxed"
              >
                Whether you&apos;re an individual seeking a strong start, a
                professional enhancing your skills, or a business aiming for
                excellence, we have the right plan for you. Choose the Life Plan
                for an affordable start, the Premium Plan to accelerate growth,
                or the Pro Plan for flexibility and advanced features. Powerful
                tools and reliable support make success within reach.
              </p>
            </div>

            <div className="card-services bg-mode grid grid-cols-1 sm:grid-cols-2  tablet:grid-cols-3 gap-6">
              {plans.map((plan, index) => (
                <div
                  data-aos={
                    index === 0
                      ? "fade-right"
                      : index === 1
                      ? "fade-up"
                      : "fade-left"
                  }
                  data-aos-easing="linear"
                  key={index}
                  className={`relative overflow-hidden rounded-[40px] border border-[#2A0E61] p-10`}
                >
                  <ul className="creative-dots">
                    <li className="big-dot"></li>
                    <li className="semi-big-dot"></li>
                    <li className="medium-dot"></li>
                    <li className="semi-medium-dot"></li>
                    <li className="semi-small-dot"></li>
                    <li className="small-dot"></li>
                  </ul>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-linear">
                      {plan.title}
                    </h2>
                    <span>{plan.quality}</span>
                  </div>

                  <p className="mb-6">{plan.desc}</p>
                  <div className="text-4xl font-bold mb-4 text-primary-color">
                    ${plan.price.toFixed(2)}{" "}
                    <span className="text-sm font-normal">Monthly</span>
                  </div>
                  <button
                    className={`bg-gradient-card w-full text-text-color-primary font-semibold py-2 px-4 rounded-lg duration-200 hover:bg-primary-color`}
                  >
                    <Link
                      href="https://www.linkedin.com/in/younes-mazouz-2b809431b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                      target="_blanck"
                    >
                      Get Start Now
                    </Link>
                  </button>
                  <ul className="mt-6 space-y-2 text-primary-color">
                    {plan.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageServices;
