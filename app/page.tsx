"use client";
import CustomLoading from "./_components/CustomLoading";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { SquareChevronRight } from "lucide-react";
import NoQuestion from "./_components/NoQuestion";

interface ResponseData {
  question: string;
  answer: string;
  references: string[];
}
export default function HomePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  type Inputs = {
    textfield: string;
  };

  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ResponseData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleQuestion = async () => {
    const promptData = `You will search the Islamic question and answer web sites and from there you will find the answer to the question of the questioner and give the answer in the language of the questioner.If asked a question other than an Islamic question, you say "Ask me an Islamic question.". When the answer is given, it will be divided into 3 parts and given in json format. If there are any references in support of your answer which you can find on the mentioned site then please mention them. Or you won't mention it. 1. question, 2. answer, 3. references. The references should be from the Quran, Hadith and various Islamic tafsirs. For example: {"question": "...", "answer": "...", "references": ["Surah Fatiha: 2", "Sahih Muslim: 2562"]}. question: ${inputValue} or If they tell you who made you, or ask questions about this site, say Md. Ismail Hossain. Web Developer, mobile:01858226967, email:ismaile535@gmail.com`;
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await axios.post("/api/question-api", {
        prompt: promptData,
      });
      console.log("res.data.result", res.data.result);
      setResponse(res.data.result);
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while processing your request.");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setInputValue(data.textfield);
    handleQuestion();
  };

  return (
    <main className="flex flex-col items-center justify-between mx-3 lg:mx-8 md:mx-5 my-8 overflow-x-hidden">
      <CustomLoading loading={loading} />
      {error && (
        <div className="mt-4 p-4 bg-[#010111] border border-red-400 text-white rounded-md">
          <p className="font-semibold">Error:</p>
          <p>{error}</p>
        </div>
      )}
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

      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" w-full flex gap-2 items-center justify-center my-8 mx-20"
      >
        <div className="container">
          <Textarea
            {...register("textfield", { required: true })}
            placeholder="Enter Only islamic question"
            className="w-full shadow-[#ffffff] shadow-inner"
          />
          {errors?.textfield && (
            <p className="text-red-500 text-sm mt-1">
              Please enter a valid Islamic question.
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-24 flex gap-1 py-7 shadow-[#ffffff] shadow-inner"
        >
          Ask <SquareChevronRight className="w-7 h-7" />
        </Button>
      </form>
    </main>
  );
}
