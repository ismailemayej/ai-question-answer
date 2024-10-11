"use client";

import React from "react";

export default function NoQuestion() {
  return (
    <div className="flex text-white flex-col items-center justify-center mx-3 lg:mx-8 md:mx-5 my-8 bg-[#010111] shadow-lg shadow-[#ffffff]">
      <div className="w-full max-w-2xl text-white p-4 bg-[#010111] rounded-lg shadow-md">
        <h1 className="lg:text-3xl text-2xl font-bold  text-white mb-4">
          Welcome to Islamic Question & Answer AI
        </h1>
        <p className="text-lg text-white mb-4">
          Ask any Islamic question and get an answer. To get started, please
          enter your question in the input box above.
        </p>
        <div className="bg-[#010111] border-l-4 border-blue-500 p-4 mb-6">
          <p className="text-white">
            Tip: For the best results, be specific in your questions and provide
            context when necessary.
          </p>
        </div>
        <div className="flex items-center justify-center">
          <svg
            className="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
