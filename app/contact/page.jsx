"use client";

import Titles from "@/components/sub/Titles";
import Terminal from "@/components/ui/Terminal";
import Text from "@/components/ui/Text";
import { ServicesData } from "@/data";
import axios from "axios";
import React, { useState } from "react";
import { FaLinkedinIn, FaPhoneAlt, FaFacebook, FaUser } from "react-icons/fa";
import { FaDiagramProject, FaMessage } from "react-icons/fa6";
import { IoIosSend } from "react-icons/io";
import { MdAccountBalance } from "react-icons/md";
import { TfiEmail } from "react-icons/tfi";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    lname: "",
    email: "",
    company: "",
    phone: "",
    country: "",
    price: "",
    description: "",
    project: [],
  });
  const [messageOk, setMessageOk] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProjectChange = (projectName) => {
    setFormData((prev) => {
      const project = prev.project.includes(projectName)
        ? prev.project.filter((prj) => prj !== projectName)
        : [...prev.project, projectName];
      return { ...prev, project };
    });
  };

  const handlePriceChange = (e) => {
    setFormData((prev) => ({ ...prev, price: e.target.value }));
  };

  const createProduct = async (ev) => {
    ev.preventDefault();
    setMessageOk("Sending...");

    try {
      await axios.post("/api/contacts", formData);
      setMessageOk("Message sent successfully");
      setFormData({
        name: "",
        lname: "",
        email: "",
        company: "",
        phone: "",
        country: "",
        price: "",
        description: "",
        project: [],
      });
    } catch (error) {
      console.error("Error sending message:", error);
      setMessageOk("Failed to send message");
    }
  };

  return (
    <>
      <title>Contact Me</title>
      <section className="relative p-4 md:p-16 mt-20 z-30">
        <Titles
          title="Let's Build Something Great Together"
          desc="We always strive to work closely with our clients to provide innovative and effective solutions. Whether you are looking for website development, user interface design, or digital marketing services, we are here to support you in achieving your goals. Fill out the form below to tell us more about your idea, and we will get back to you as soon as possible. Let us make your next project exceptional"
        />
        <div
          data-aos="fade-up-left"
          data-aos-easing="linear"
          className="relative overflow-hidden rounded-3xl flex items-center justify-center w-full h-full"
        >
          <Terminal>
            <div className="w-full h-full p-6 mt-4">
              <Text
                text="Let's work together.. "
                size="250px"
                anotherClass="text-2xl font-semibold border-r-4 border-[#0f0]"
              />
              <h2
                data-aos="fade-left"
                className="text-xl text-text-color-secondary"
              >
                Or reach us via:
              </h2>

              <ContactInfo />

              <form className="space-y-4" onSubmit={createProduct}>
                <h1 data-aos="fade-right" className="text-xl font-semibold">
                  Your Contact Information
                  <span className="text-4xl text-primary-color">.</span>
                </h1>

                <div
                  data-aos="fade-left"
                  className="flex flex-col sm:flex-row gap-2"
                >
                  <InputField
                    type="text"
                    name="name"
                    icon={<FaUser />}
                    placeholder="First Name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <InputField
                    type="text"
                    name="lname"
                    icon={<FaUser />}
                    placeholder="Last Name"
                    value={formData.lname}
                    onChange={handleChange}
                  />
                </div>

                <div
                  data-aos="fade-right"
                  className="flex flex-col sm:flex-row gap-2"
                >
                  <InputField
                    type="text"
                    name="company"
                    icon={<FaDiagramProject />}
                    placeholder="Company Name"
                    value={formData.company}
                    onChange={handleChange}
                  />
                  <InputField
                    type="text"
                    name="phone"
                    icon={<FaPhoneAlt />}
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div
                  data-aos="fade-right"
                  className="flex flex-col sm:flex-row gap-2"
                >
                  <InputField
                    type="email"
                    name="email"
                    icon={<TfiEmail />}
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <InputField
                    type="text"
                    name="country"
                    icon={<MdAccountBalance />}
                    placeholder="Your Country"
                    value={formData.country}
                    onChange={handleChange}
                  />
                </div>

                <h1 data-aos="fade-left" className="text-xl font-semibold">
                  What services do you need for your project?
                  <span className="text-4xl text-primary">.</span>
                </h1>
                <div
                  data-aos="fade-right"
                  className="grid grid-cols-1 md:grid-cols-2 gap-y-2"
                >
                  {ServicesData.map((item) => (
                    <div key={item.id} className="flex items-center gap-2">
                      <input
                        className="appearance-none relative ml-4"
                        data-aos="fade-right"
                        type="checkbox"
                        id={item.title}
                        checked={formData.project.includes(item.title)}
                        onChange={() => handleProjectChange(item.title)}
                      />
                      <label
                        data-aos="fade-left"
                        htmlFor={item.title}
                        className="text-lg font-medium"
                      >
                        {item.title}
                      </label>
                    </div>
                  ))}
                </div>

                <h1 data-aos="fade-left" className="text-xl font-semibold">
                  Anticipated budget for your next project?
                  <span className="text-4xl text-primary-color">.</span>
                </h1>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-2">
                  {[
                    "Less than 400$",
                    "400$-800$",
                    "800$-1000$",
                    "More than 1000$",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <input
                        data-aos="fade-right"
                        className="relative appearance-none ml-4"
                        type="radio"
                        name="price"
                        id={item}
                        value={item}
                        checked={formData.price === item}
                        onChange={handlePriceChange}
                      />
                      <label
                        data-aos="fade-left"
                        htmlFor={item}
                        className="text-lg font-medium"
                      >
                        {item}
                      </label>
                    </div>
                  ))}
                </div>
                <h1 data-aos="fade-left" className="text-xl font-semibold">
                  Tell us more about your project
                  <span className="text-4xl text-primary">.</span>
                </h1>
                <div
                  data-aos="fade-left"
                  className="relative text-[#030014] w-full flex items-start justify-between bg-[#e4ebff] p-3 rounded-lg shadow-2xl"
                >
                  <textarea
                    rows={4}
                    className="bg-transparent outline-none w-full"
                    placeholder="Enter your message"
                    required
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                  <FaMessage className="absolute right-2 top-2" />
                </div>

                <div className="flex gap-4 items-center">
                  <button
                    data-aos="fade-up"
                    className="bg-[#0f0] text-black p-3 flex items-center gap-2 outline-none rounded-md"
                    type="submit"
                  >
                    <IoIosSend />
                    <span>Send message</span>
                  </button>
                </div>
                {messageOk && <p className="text-green-500">{messageOk}</p>}
              </form>
            </div>
          </Terminal>
        </div>
      </section>
    </>
  );
};

const ContactInfo = () => (
  <ul className="w-full grid gap-y-2 grid-cols-1 md:grid-cols-2">
    <ContactItem
      icon={FaPhoneAlt}
      text="Phone"
      value="+212 772-291-384"
      href="http://wa.me/+212772291384"
    />
    <ContactItem
      icon={TfiEmail}
      text="Email"
      value="wb.mazouz@gmail.com"
      href="mailto:wb.mazouz@gmail.com"
    />
    <ContactItem
      icon={FaFacebook}
      text="Facebook"
      value="Creative Coder"
      href="https://www.facebook.com/profile.php?id=61552785323792&mibextid=ZbWKwL"
    />
    <ContactItem
      icon={FaLinkedinIn}
      text="LinkedIn"
      value="Younes-mazouz"
      href="https://www.linkedin.com/in/younes-mazouz-2b809431b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
    />
  </ul>
);

const ContactItem = ({ icon: Icon, text, value, href }) => (
  <li className="flex items-center gap-2">
    <Icon data-aos="fade-right" />
    <span data-aos="fade-left" className="text-lg font-medium">
      {text}:{" "}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-text-color-secondary duration-200 hover:text-primary-color"
      >
        {value}
      </a>
    </span>
  </li>
);

const InputField = ({ type, name, icon, placeholder, value, onChange }) => (
  <div className="w-full flex items-center justify-between bg-[#e4ebff] text-[#030014] pr-2 rounded-lg shadow-2xl">
    <input
      type={type}
      name={name}
      className="p-2 w-full text-lg bg-transparent outline-none"
      placeholder={placeholder}
      required
      value={value}
      onChange={onChange}
    />
    <span className="text-green-700">{icon}</span>
  </div>
);

export default ContactPage;
