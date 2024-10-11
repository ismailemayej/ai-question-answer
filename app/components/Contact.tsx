import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Facebook,
  MessageCircle,
} from "lucide-react";

const Contact: React.FC = () => {
  return (
    <div className="bg-[#010111] text-white py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Contact Me</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <Mail className="w-10 h-10 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <p className="text-center">ismaile535@gmail.com</p>
          </div>
          <div className="flex flex-col items-center">
            <Phone className="w-10 h-10 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Phone</h3>
            <p className="text-center">+880 1858-226967</p>
          </div>
          <div className="flex flex-col items-center">
            <MapPin className="w-10 h-10 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Address</h3>
            <p className="text-center">Chandpur, Bangladesh</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
          <div className="flex flex-col items-center">
            <MessageCircle className="w-10 h-10 mb-4" />
            <h3 className="text-xl font-semibold mb-2">WhatsApp</h3>
            <p className="text-center">+8801858226967</p>
          </div>
          <div className="flex flex-col items-center">
            <Linkedin className="w-10 h-10 mb-4" />
            <h3 className="text-xl font-semibold mb-2">LinkedIn</h3>
            <a
              href="https://www.linkedin.com/in/ismaile535/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-center hover:text-blue-400"
            >
              ismaile535
            </a>
          </div>
          <div className="flex flex-col items-center">
            <Facebook className="w-10 h-10 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Facebook</h3>
            <a
              href="https://www.facebook.com/ismaile.moyaj"
              target="_blank"
              rel="noopener noreferrer"
              className="text-center hover:text-blue-400"
            >
              ismaile.moyaj
            </a>
          </div>
          <div className="flex flex-col items-center">
            <MessageCircle className="w-10 h-10 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Discord</h3>
            <a
              href="https://discord.com/channels/@ismailemayej"
              target="_blank"
              rel="noopener noreferrer"
              className="text-center hover:text-blue-400"
            >
              @ismailemayej
            </a>
          </div>
        </div>
        <div className="mt-12">
          <form className="max-w-lg mx-auto">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-2 bg-gray-800 rounded"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-2 bg-gray-800 rounded"
              />
            </div>
            <div className="mb-4">
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full p-2 bg-gray-800 rounded"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
