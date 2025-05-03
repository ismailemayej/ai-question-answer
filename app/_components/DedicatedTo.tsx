"use client";
import React from "react";
import { Heart, Sparkles } from "lucide-react";

const DedicatedTo = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-gradient-to-br from-pink-100 via-rose-50 to-white text-center bangla">
      <div className="max-w-2xl bg-white shadow-xl rounded-2xl p-8 border border-rose-200">
        <div className="text-rose-600 mb-4">
          <Sparkles className="mx-auto w-10 h-10 animate-bounce" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          উৎসর্গ
        </h1>
        <p className="text-lg md:text-xl font-medium text-gray-700 leading-relaxed">
          এই ওয়েবসাইটটি আমি আমার প্রিয় স্ত্রী{" "}
          <span className="text-rose-600 font-semibold">
            মিস মারিয়াম আক্তার মীম
          </span>{" "}
          কে ভালোবাসা ও কৃতজ্ঞতা সহকারে উৎসর্গ করছি।
        </p>
        <p className="mt-4 text-gray-600 text-sm">
          তিনি আমার জীবনের প্রেরণা, ধৈর্যের প্রতীক এবং আমার প্রতিটি সফলতার
          নেপথ্য সহযাত্রী। এই সফরের প্রতিটি পদক্ষেপে তাঁর অনুপ্রেরণা ও ভালোবাসা
          ছিল অমূল্য।
        </p>
        <div className="mt-6">
          <Heart className="w-8 h-8 text-rose-500 animate-pulse mx-auto" />
        </div>
      </div>
    </div>
  );
};

export default DedicatedTo;
