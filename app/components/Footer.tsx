import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#010111] flex gap-4 justify-center items-center text-white py-1 text-center border-t border-gray-600">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Q&A AI. All rights reserved.
      </p>
      <p className="text-sm">
        Developed by
        <a
          href="https://www.facebook.com/ismaile.moyaj"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline ml-1"
        >
          Md Ismaile Hossain
        </a>
      </p>
    </footer>
  );
};

export default Footer;
