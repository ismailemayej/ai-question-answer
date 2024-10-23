"use client";
import CustomLoading from "./_components/CustomLoading";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { SquareChevronRight } from "lucide-react";
import NoQuestion from "./_components/NoQuestion";
import { PlaceholderInput } from "@/components/ui/placeholders-and-vanish-input"; // PlaceholderInput component
import { Questions } from "./_components/Questions";
import { BorderMove } from "@/components/ui/moving-border";

interface ResponseData {
  question: string;
  answer: string;
  references: string[];
}

export default function MainPage() {
  const {
    register,
    handleSubmit,
    setValue, // Added to set input value
    formState: { errors },
  } = useForm<Inputs>();

  type Inputs = {
    textfield: string;
    language: string; // Include language in inputs
  };

  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ResponseData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState("en"); // State for selected language

  const handleQuestion = async ({ textfield, language }: Inputs) => {
    const promptData = `You will search the Islamic question and answer web sites and from there you will find the answer to the question of the questioner and give the answer in the language of the questioner, which is ${language}. If asked a question other than an Islamic question, you say "Ask me an Islamic question.". When the answer is given, it will be divided into 3 parts and given in json format. If there are any references in support of your answer which you can find on the mentioned site then please mention them. Or you won't mention it. 1. question, 2. answer, 3. references. The references should be from the Quran, Hadith and various Islamic tafsirs. For example: {"question": "...", "answer": "...", "references": ["Surah Fatiha: 2", "Sahih Muslim: 2562"]}. question: ${textfield}`;

    setLoading(true);
    setError(null);

    try {
      if (textfield) {
        const res = await axios.post("/api/question-api", {
          prompt: promptData,
        });
        setResponse(res.data.result);
        setInputValue(res.data.result.question);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while processing your request.");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    handleQuestion(data);
    // Clear the input after submission
    setValue("textfield", ""); // Clear the text field
  };

  return (
    <main className="flex flex-col items-center justify-between mx-3 lg:mx-8 md:mx-5 my-8 overflow-x-hidden">
      {/* Loading Spinner */}
      <CustomLoading loading={loading} />

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-4 bg-[#010111] border border-red-400 text-white rounded-md">
          <p className="font-semibold">Error:</p>
          <p>{error}</p>
        </div>
      )}

      {/* Response Block */}
      {response ? (
        <div className="mt-8 p-3 bg-[#010111] lg:p-8 border border-gray-600 rounded-xl w-full">
          {response.question && (
            <>
              <h2 className="text-2xl font-bold mb-4 text-gray-300">
                Question
              </h2>
              <div className="p-6 rounded-lg shadow-[#ffffff] shadow-inner">
                <p className="leading-relaxed break-words">
                  {response.question}
                </p>
              </div>
            </>
          )}
          {response.answer && (
            <>
              <h2 className="text-2xl font-bold mb-4 mt-4 text-gray-300">
                Answer
              </h2>
              <div className="bg-[#010111] shadow-[#ffffff] p-6 rounded-lg shadow-inner">
                <p className="text-white leading-relaxed break-words">
                  {response.answer}
                </p>
              </div>
            </>
          )}
          {response.references && response.references.length > 0 && (
            <div className="mt-6 mx-2">
              <h3 className="text-xl font-semibold mb-2 text-gray-300">
                References
              </h3>
              <ul className="list-disc list-inside text-white">
                {response.references.map((ref: string, index: number) => (
                  <li key={index} className="mb-1 break-words">
                    {ref}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <NoQuestion />
      )}

      {/* Form with PlaceholderInput */}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex items-center justify-center"
      >
        {/* Language selection dropdown */}
        <select
          {...register("language")}
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="shadow-[#ffffff] shadow-inner px-3 pl-2 bg-[#010111] text-white rounded-l-full border-gray-600 py-[18.5px]"
        >
          <option value="en">English</option>
          <option value="bn">বাংলা</option>
          <option value="ar">Arabic</option>
          <option value="ur">Urdu</option>
          <option value="hi">Hindi</option>
          <option value="fr">French</option>
          <option value="es">Spanish</option>
          <option value="tr">Turkish</option>
          <option value="id">Indonesian</option>
        </select>

        {/* Textarea with dynamic placeholder */}
        <div className="relative w-full">
          <input
            type="text"
            {...register("textfield", { required: true })}
            className="w-full pl-4 py-4 shadow-[#ffffff] shadow-inner relative z-10 bg-transparent"
            onChange={(e) => {
              setInputValue(e.target.value);
              // Hide PlaceholderInput when input is present
            }}
          />

          {/* PlaceholderInput: Only show if input is empty */}
          {inputValue === "" && (
            <p className="absolute top-0 left-0 w-full h-full flex items-center pl-8 text-gray-400 pointer-events-none">
              <PlaceholderInput placeholders={Questions} />
            </p>
          )}
        </div>
        {errors?.textfield && (
          <p className="text-red-500 text-sm mt-1">
            Please enter a valid Islamic question.
          </p>
        )}

        <Button
          type="submit"
          className="w-24 hover:bg-lime-400 hover:text-black rounded-r-full flex gap-1 py-7 shadow-[#ffffff] shadow-inner"
        >
          Ask <SquareChevronRight className="w-7 h-7" />
        </Button>
      </form>
    </main>
  );
}
