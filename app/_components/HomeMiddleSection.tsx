import React from "react";
import {
  FaMosque,
  FaStar,
  FaQuestionCircle,
  FaQuran,
  FaPray,
} from "react-icons/fa";
interface HomeMiddleSectionProps {
  onAskQuestion: () => void;
}
const HomeMiddleSection: React.FC<HomeMiddleSectionProps> = ({
  onAskQuestion,
}) => {
  return (
    <div className="min-h-[60vh] bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4 text-white">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center bg-emerald-900 text-emerald-400 p-4 rounded-full mb-6">
            <FaMosque className="text-3xl mr-3" />
            <h1 className="text-3xl font-bold">Islamic Q&A Portal</h1>
          </div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Get authentic answers to your Islamic questions based on Quran,
            Hadith, and Islamic scholarship.
          </p>
        </div>
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gray-800 p-6 rounded-xl shadow-md border border-emerald-900 hover:shadow-lg transition-shadow">
            <div className="text-emerald-400 mb-4">
              <FaQuran className="text-4xl" />
            </div>
            <h3 className="text-xl font-bold text-emerald-400 mb-2">
              Quran & Hadith
            </h3>
            <p className="text-gray-300">
              Authentic answers based on primary Islamic sources
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl shadow-md border border-emerald-900 hover:shadow-lg transition-shadow">
            <div className="text-emerald-400 mb-4">
              <FaPray className="text-4xl" />
            </div>
            <h3 className="text-xl font-bold text-emerald-400 mb-2">
              Fiqh Rulings
            </h3>
            <p className="text-gray-300">
              Jurisprudential answers from qualified scholars
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl shadow-md border border-emerald-900 hover:shadow-lg transition-shadow">
            <div className="text-emerald-400 mb-4">
              <FaQuestionCircle className="text-4xl" />
            </div>
            <h3 className="text-xl font-bold text-emerald-400 mb-2">
              Ask Questions
            </h3>
            <p className="text-gray-300">
              Get personalized answers to your specific questions
            </p>
          </div>
        </div>
        {/* Popular Questions */}
        <div className="bg-gray-800 p-8 rounded-xl border border-emerald-900">
          <div className="flex items-center mb-6">
            <FaStar className="text-2xl text-yellow-400 mr-3" />
            <h2 className="text-2xl font-bold text-emerald-400">
              Popular Questions
            </h2>
          </div>

          <div className="space-y-4">
            {[
              "What are the conditions for a valid Islamic marriage?",
              "How to perform Wudu correctly according to Hanafi fiqh?",
              "What is the ruling on listening to music in Islam?",
            ].map((question, index) => (
              <div
                key={index}
                className="bg-gray-700 p-4 rounded-lg shadow-sm hover:bg-emerald-900 transition-colors cursor-pointer border-l-4 border-emerald-500"
              >
                <p className="font-medium text-gray-100">{question}</p>
              </div>
            ))}
          </div>

          <button
            onClick={onAskQuestion}
            className="mt-6 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center mx-auto"
          >
            <FaQuestionCircle className="mr-2" /> Ask Your Question
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeMiddleSection;
