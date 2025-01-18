"use client";
import ButtonMagic from "@/components/ui/ButtonMagic";
import Spinner from "@/components/ui/Spinner";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import {
  FaBlog,
  FaFacebook,
  FaGithub,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import { MdOutlineComment, MdOutlineReply } from "react-icons/md";
import { RiInstagramFill } from "react-icons/ri";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/cjs/styles/prism";
import SearchBlog from "@/components/sub/SearchBlog";
import { SocialMedia } from "@/data";
import Image from "next/image";

const BlogPage = () => {
  const params = useParams();
  const { slug } = params; // الحصول على slug
  const [blogData, setBlogData] = useState({ blog: {}, comments: [] });
  const [newComment, setNewComment] = useState({
    name: "",
    email: "",
    title: "",
    contentpera: "",
    parent: null,
    parentName: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [messageOk, setMessageOk] = useState("");
  // جلب بيانات المدونة
  useEffect(() => {
    const fetchBlogData = async () => {
      if (typeof slug === "string") {
        try {
          const response = await axios.get(`/api/blogs/${slug}`);
          setBlogData(response.data);
        } catch {
          setError("Failed to fetch blog data. Please try again later.");
        } finally {
          setIsLoading(false);
        }
      } else {
        setError("Invalid slug format.");
        setIsLoading(false);
      }
    };

    fetchBlogData();
  }, [slug, setError, setBlogData, setIsLoading]);
  // تنسيق التاريخ
  const formatData = (date) => {
    if (!date || isNaN(Date.parse(date))) {
      return "";
    }
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
  };
  // مكون نسخ الشيفرة البرمجية
  const Code = ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || "");
    const [copied, setCopied] = useState(false);

    const handleCopied = () => {
      navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    };

    if (inline) {
      return <code>{children}</code>;
    } else if (match) {
      return (
        <div className="relative rounded-lg">
          <SyntaxHighlighter
            style={tomorrow}
            language={match[1]}
            PreTag="pre"
            {...props}
            codeTagProps={{
              style: {
                padding: "0",
                borderRadius: "5px",
                overflow: "auto",
                whiteSpace: "pre-wrap",
              },
            }}
          >
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
          <button
            style={{
              position: "absolute",
              top: "8px",
              right: "8px",
              background: "#fff",
              color: "#3d3d3d",
              border: "none",
              padding: "5px 10px",
              borderRadius: "10px",
              cursor: "pointer",
            }}
            onClick={handleCopied}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      );
    } else {
      return <code {...props}>{children}</code>;
    }
  };
  // ردود الفعل على التعليقات
  const replyFormRef = useRef(null);

  const handleReply = (parentCommentId, parentName) => {
    setNewComment({
      ...newComment,
      parent: parentCommentId,
      parentName,
    });
    if (replyFormRef.current) {
      replyFormRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // التعامل مع إزالة الرد
  const handleRemoveReply = () => {
    setNewComment((prev) => ({
      ...prev,
      parent: null,
      parentName: "",
    }));
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/blogs/${slug}`, newComment);
      // تحديث حالة التعليقات
      setBlogData((prevData) => ({
        ...prevData,
        comments: newComment.parent
          ? [...prevData.comments, res.data]
          : [res.data, ...prevData.comments],
      }));
      setNewComment({
        name: "",
        email: "",
        title: "",
        contentpera: "",
        parent: null,
        parentName: "",
      });
      setMessageOk("✅✅ Comment sent successfully");
      setTimeout(() => setMessageOk(""), 3000);
    } catch (error) {
      setMessageOk(`❌❌  Error submitting comment: ${error.message}`);
      setTimeout(() => setMessageOk(""), 3000);
    }
  };

  const renderComments = (comments) => {
    if (!comments) {
      return null;
    }

    const commentsMap = new Map();

    // إنشاء خريطة للتعليقات الفرعية
    comments.forEach((comment) => {
      if (comment.mainComment) {
        commentsMap.set(comment._id, []);
      }
    });

    comments.forEach((comment) => {
      if (!comment.mainComment && comment.parent) {
        if (commentsMap.has(comment.parent)) {
          commentsMap.get(comment.parent).push(comment);
        }
      }
    });

    // عرض التعليقات الرئيسية مع التعليقات الفرعية
    return comments
      .filter((comment) => comment.mainComment)
      .map((parentComment, i) => {
        return (
          <div
            data-aos="fade-out-right"
            data-aos-easing="linear"
            key={i}
            className="p-4 shadow-md rounded-lg mb-4 bg-gradient-card"
          >
            {/* عرض التعليق الرئيسي */}
            <div className="flex justify-between items-center">
              <h3
                data-aos="fade-right"
                className="font-semibold text-lg text-text-color-primary"
              >
                {parentComment.name}
              </h3>
              <span
                data-aos="fade-left"
                className="text-sm text-text-color-secondary ml-2"
              >
                {new Date(parentComment.createdAt).toLocaleString()}
              </span>
            </div>
            <h4 data-aos="fade-right" className="text-text-color-secondary">
              Topic:{"  "}
              <span
                data-aos="fade-right"
                className="font-semibold text-primary-color"
              >
                {parentComment.title}
              </span>
            </h4>
            <p
              data-aos="fade-left"
              className="text-text-color-primary bg-[#2b4b5f] text-md rounded-b-xl rounded-r-xl p-2 ml-2 mt-2"
            >
              {parentComment.contentpera}
            </p>
            <button
              data-aos="fade-right"
              onClick={() => handleReply(parentComment._id, parentComment.name)}
              className="flex gap-1 items-center ml-2 text-primary-color underline mt-1"
            >
              Reply
              <MdOutlineReply className="text-xl" />
            </button>
            {parentComment.parent && (
              <span
                data-aos="fade-right"
                className="text-sm text-gray-400 block mt-1"
              >
                Replied to {parentComment.parentName}
              </span>
            )}

            {/* عرض التعليقات الفرعية */}
            <div
              data-aos="fade-out-left"
              data-aos-easing="linear"
              className="ml-4 pl-4 border-l-2 border-[#2b4b5f] mt-4"
            >
              {commentsMap.get(parentComment._id)?.map((childComment, j) => (
                <div
                  key={j}
                  className="bg-gradient-card shadow-2xl border border-[#c0fff7] p-3 mb-3 rounded"
                >
                  <div className="flex justify-between items-center text-[#c0fff7]">
                    <h3 data-aos="fade-right" className="font-semibold">
                      {childComment.name}
                    </h3>
                    <span data-aos="fade-left" className="text-sm ml-2">
                      {new Date(childComment.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <span
                    data-aos="fade-right"
                    className="text-sm text-[#fae3ff]"
                  >
                    Replied to{" "}
                    <span className="text-yellow-400">
                      {childComment.parentName}
                    </span>
                  </span>
                  <h4 data-aos="fade-right" className="text-[#fae3ff]">
                    Topic:{"  "}
                    <span className="font-semibold text-black">
                      <span className="text-yellow-400">
                        {" "}
                        {childComment.title}
                      </span>
                    </span>
                  </h4>
                  <p
                    data-aos="fade-left"
                    className="text-md text-text-color-primary bg-[#2b4b5f] shadow-2xl rounded-b-xl rounded-r-xl p-2 ml-2 mt-2"
                  >
                    {childComment.contentpera}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      });
  };

  // حالة التحميل
  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  // حالة الخطأ
  if (error) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center text-red-600">
        <p>{error}</p>
        <button
          className="text-white px-4 py-2 rounded mt-4"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  // حالة عدم العثور على المدونة
  if (!blogData.blog) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        Blog not found.
      </div>
    );
  }

  return (
    <>
      <title>{blogData.blog.title}</title>
      <section className="relative w-full grid grid-cols-1 tablet:grid-cols-3 mt-20">
        <div className="tablet:sticky top-24 w-full  tablet:h-screen">
          <SearchBlog />
        </div>
        <div className="col-span-2 flex flex-col gap-y-2 w-full bg-[#030014]">
          <div className="relative w-full max-h-[600px] px-4 pt-4 rounded-lg">
            <Image
              data-aos="fade-out-left"
              data-aos-easing="linear"
              src={blogData.blog.images?.[0] || "/default-image.jpg"} // Fallback image if no image is available
              alt={blogData.blog.title || "Blog image"} // Alt text for accessibility
              width={600} // Set appropriate width (adjust as needed)
              height={400} // Set appropriate height (adjust as needed)
              className="object-cover h-full w-full rounded-lg" // Apply desired styles
              loading="lazy" // Enable lazy loading
            />
          </div>

          {/* icons */}
          <div
            data-aos="fade-right"
            className="flex flex-wrap items-center justify-center gap-3 w-full"
          >
            <div className="px-4 w-fit flex flex-wrap justify-center items-center gap-x-4">
              <div className="flex gap-1 my-2 items-center">
                {/* Displaying the author's image */}
                <Image
                  data-aos="fade-right" // Animation on scroll from the right
                  src={blogData.blog.authorsImg} // Source of the author's image
                  alt={blogData.blog.authorsName} // Alternative text for the image
                  width={32} // Specifying width in pixels (corresponds to Tailwind's w-8)
                  height={32} // Specifying height in pixels (corresponds to Tailwind's h-8)
                  className="rounded-full object-cover" // Styling: rounded and properly scaled
                />

                {/* Displaying the author's name */}
                <span
                  data-aos="fade-left" // Animation on scroll from the left
                  className="text-xl text-text-color-primary font-semibold tracking-wide" // Styling for text
                >
                  {/* Author's name with an underlined effect */}
                  <span className="text-primary-color border-b-2 border-primary-color">
                    {blogData.blog.authorsName} {/* Dynamic author name */}
                  </span>
                </span>
              </div>

              <div
                data-aos="fade-up"
                className="flex gap-1 items-center text-text-color-primary text-sm"
              >
                <MdOutlineComment className="text-2xl" />
                <p>Comment({blogData.comments.length || 0})</p>
              </div>
              <div className="flex gap-1 items-center text-text-color-primary text-sm">
                <CiCalendarDate className="text-2xl" />
                <p>{formatData(blogData.blog.createdAt)}</p>
              </div>
            </div>
            <div
              data-aos="fade-left"
              className="flex text-primary-color items-center md:gap-3 gap-6"
            >
              {SocialMedia.map((item) => (
                <ButtonMagic
                  key={item.id}
                  atherClass="hover:scale-90"
                  mainClass="h-10"
                  href={item.link}
                >
                  <span className="text-xl">
                    {item.id === 1 && <FaFacebook />}
                    {item.id === 2 && <FaLinkedinIn />}
                    {item.id === 3 && <FaGithub />}
                    {item.id === 4 && <RiInstagramFill />}
                  </span>
                </ButtonMagic>
              ))}
              <ButtonMagic
                atherClass="hover:scale-90"
                mainClass="h-10"
                href="http://wa.me/+212772291384"
              >
                <FaWhatsapp className="text-xl" />
              </ButtonMagic>
            </div>
          </div>
          <div className="w-full mt-4 p-4 min-h-[300px]">
            {/* Title */}
            <div
              data-aos="fade-right"
              className="flex w-full justify-between items-center text-2xl text-text-color-primary font-semibold"
            >
              <h1 className="tracking-wide capitalize">
                {blogData.blog.title}
              </h1>
              <FaBlog />
            </div>
            <hr className="mt-1"></hr>
            {/* Code */}
            <div
              data-aos="fade-in-left"
              data-aos-easing="linear"
              className="desc-items relative w-full mt-4 text-lg flex flex-col gap-y-3 blog-items"
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code: Code,
                }}
              >
                {blogData.blog.description}
              </ReactMarkdown>
            </div>
            <hr className="mt-1"></hr>
            {/* Tags */}
            <div className="w-full py-4 flex items-center gap-4">
              <h1
                data-aos="fade-right"
                className="tracking-wide font-bold capitalize text-text-color-primary text-2xl"
              >
                Tags:
              </h1>
              <div className="flex items-center gap-4">
                {blogData &&
                  blogData.blog.tags.map((item, i) => {
                    return (
                      <span
                        data-aos="fade-left"
                        key={i}
                        className="text-text-color-primary bg-secondary-color px-3 py-2 font-medium rounded-xl"
                      >
                        {item}
                      </span>
                    );
                  })}
              </div>
            </div>
            <hr className="mt-1"></hr>
            <div>
              {/* Comments Header */}
              <h1
                data-aos="fade-right"
                className="font-bold text-text-color-primary tracking-wide text-2xl"
              >
                Comments<span className="text-primary-color text-4xl">.</span>
              </h1>

              {/* Render Comments */}
              {renderComments(blogData.comments)}

              {/* Reply Form */}
              <div
                data-aos="fade-right"
                ref={replyFormRef}
                className="w-full py-3 text-text-color-primary flex flex-col gap-y-4"
              >
                {/* Reply Notification */}
                {newComment.parentName ? (
                  <h2 data-aos="fade-right" className="text-lg">
                    Leave a reply to{" "}
                    <span className="font-semibold">
                      {newComment.parentName}
                    </span>
                    <button
                      onClick={handleRemoveReply}
                      className="ml-2 text-red-500 hover:underline"
                      aria-label="Remove reply"
                    >
                      Remove reply
                    </button>
                  </h2>
                ) : (
                  <h2 className="text-lg font-semibold">Leave a Reply</h2>
                )}

                {/* Comment Form */}
                <form
                  data-aos="fade-out-right"
                  data-aos-easing="linear"
                  onSubmit={handleCommentSubmit}
                  className="space-y-4"
                >
                  <p
                    data-aos="fade-right"
                    className="text-text-color-secondary"
                  >
                    Share your thoughts below. We value your feedback!
                  </p>

                  {/* Name and Email Fields */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input
                      data-aos="fade-right"
                      type="text"
                      onChange={(e) =>
                        setNewComment({ ...newComment, name: e.target.value })
                      }
                      value={newComment.name}
                      className="w-full bg-secondary-color p-3 rounded-lg outline-none border-2 border-transparent focus:border-primary"
                      placeholder="Enter your name"
                      required
                      aria-label="Enter your name"
                    />
                    <input
                      data-aos="fade-left"
                      type="email"
                      onChange={(e) =>
                        setNewComment({ ...newComment, email: e.target.value })
                      }
                      value={newComment.email}
                      className="w-full bg-secondary-color p-3 rounded-lg outline-none border-2 border-transparent focus:border-primary"
                      placeholder="Enter your email"
                      required
                      aria-label="Enter your email"
                    />
                  </div>

                  {/* Title Input */}
                  <input
                    data-aos="fade-right"
                    type="text"
                    onChange={(e) =>
                      setNewComment({ ...newComment, title: e.target.value })
                    }
                    value={newComment.title}
                    className="w-full bg-secondary-color p-3 rounded-lg outline-none border-2 border-transparent focus:border-primary"
                    placeholder="Enter title"
                    aria-label="Enter the title of your comment"
                    required
                  />

                  {/* Comment Textarea */}
                  <textarea
                    data-aos="fade-left"
                    rows={4}
                    onChange={(e) =>
                      setNewComment({
                        ...newComment,
                        contentpera: e.target.value,
                      })
                    }
                    value={newComment.contentpera}
                    className="w-full bg-secondary-color p-3 rounded-lg outline-none border-2 border-transparent focus:border-primary"
                    placeholder="Enter your comment"
                    required
                    aria-label="Enter your comment"
                  />

                  {/* Submit Button and Message */}
                  <div
                    data-aos="fade-right"
                    className="flex gap-4 items-center"
                  >
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-md bg-primary-color text-white cursor-pointer disabled:opacity-50"
                      disabled={
                        !newComment.name ||
                        !newComment.email ||
                        !newComment.contentpera
                      }
                    >
                      POST COMMENT
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {messageOk && (
          <p className="text-green-500 fixed right-10 top-24 bg-secondary-color p-4 rounded-lg z-40">
            {messageOk}
          </p>
        )}
      </section>
    </>
  );
};
export default BlogPage;
