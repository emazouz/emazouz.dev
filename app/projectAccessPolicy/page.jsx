import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center px-3 mt-16">
      <div className="max-w-4xl w-fit">
        <div className="relative bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-800">
          <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-pink-500 rounded-tl-2xl"></div>
          <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-red-400 rounded-tr-2xl"></div>
          <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-yellow-500 rounded-bl-2xl"></div>
          <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-pink-500 rounded-br-2xl"></div>

          <div className="relative">
            <div className="absolute -top-12 left-0 px-6 py-2 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full text-sm text-white">
              Project Access Policy
            </div>

            <h2 className="text-3xl font-bold mb-2 text-white">
              Sorry this project is not available as open source on GitHub
            </h2>

            <p className="text-lg text-gray-300 mb-8">
              The project was developed for private or commercial use and has
              not been publicly shared on open platforms like GitHub. If you
              need more information, or would like to discuss collaboration
              opportunities or access to the project, please feel free to
              contact us directly, and we will be happy to assist you.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-t from-pink-500 via-red-400 to-yellow-500 hover:opacity-90 transition-opacity text-white"
              >
                Go to Home
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
              <Link
                target="_blank"
                href="https://www.linkedin.com/in/younes-mazouz-2b809431b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-t from-pink-500 via-red-400 to-yellow-500 hover:opacity-90 transition-opacity text-white"
              >
                Contact on LinkedIn
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
