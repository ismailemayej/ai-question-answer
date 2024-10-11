"use client";
import React from "react";
import Image from "next/image";
import me from "./me.png";

const About: React.FC = () => {
  return (
    <div className="bg-[#010111] text-white py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">About Me</h2>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <Image
              src={me}
              alt="Md Ismaile Hossain"
              width={800}
              height={800}
              className="rounded-full mx-auto -mt-24"
            />
          </div>
          <div className="md:w-1/2 shadow-inner shadow-[#ffffff] rounded-lg p-3">
            <h3 className="text-2xl font-semibold mb-4">Md Ismaile Hossain</h3>
            <p className="mb-4">
              I am a passionate Full Stack Web Developer with expertise in
              React.js, Next.js, Node.js, and MongoDB. My journey in web
              development has equipped me with a strong foundation in both
              front-end and back-end technologies.
            </p>
            <p className="mb-4">
              With a keen eye for design and a love for clean, efficient code, I
              strive to create web applications that are not only functional but
              also visually appealing and user-friendly.
            </p>
            <p className="mb-4">
              My goal is to contribute to innovative projects and continue
              learning in this ever-evolving field of web development.
            </p>
            <div className="mt-6">
              <h4 className="text-xl font-semibold mb-2">Skills:</h4>
              <ul className="list-disc list-inside">
                <li>React.js & Next.js</li>
                <li>Node.js & Express.js</li>
                <li>MongoDB & MySQL</li>
                <li>HTML5, CSS3, JavaScript</li>
                <li>Responsive Web Design</li>
                <li>RESTful API Development</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
