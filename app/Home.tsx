"use client";
import React, { useState, useRef, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { Send, Bot, User, BookOpen } from "lucide-react";

import Markdown from "react-markdown";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  language: string; // Added language field to track message language
  references?: string[];
  timestamp: Date;
}

type Inputs = {
  message: string;
};

// Language detection function
const detectLanguage = (text: string): string => {
  // Simple language detection based on Unicode ranges
  const isBangla = /[\u0980-\u09FF]/.test(text);
  const isArabic = /[\u0600-\u06FF]/.test(text);
  const isHindi = /[\u0900-\u097F]/.test(text);
  const isUrdu = /[\u0600-\u06FF\u0750-\u077F]/.test(text);

  if (isBangla) return "bn";
  if (isArabic) return "ar";
  if (isHindi) return "hi";
  if (isUrdu) return "ur";
  return "en"; // Default to English
};

export default function IslamicChat() {
  const { theme } = useTheme();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sample welcome message
  useEffect(() => {
    setMessages([
      {
        id: "1",
        role: "assistant",
        content:
          "Assalamu alaikum! I'm your Islamic Q&A assistant. How can I help you today?",
        language: "en",
        timestamp: new Date(),
      },
    ]);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmitMessage = async ({ message }: Inputs) => {
    const detectedLanguage = detectLanguage(message);

    // Add user message to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: message,
      language: detectedLanguage,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Add loading message
    const loadingMessage: Message = {
      id: "loading-" + Date.now().toString(),
      role: "assistant",
      content: "",
      language: detectedLanguage,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, loadingMessage]);

    try {
      const promptData = `Answer this Islamic question in the same language as the question (${detectedLanguage}): ${message}. Provide authentic references from Quran, Hadith, or scholarly works when possible.`;

      const res = await axios.post("/api/question-api", {
        prompt: promptData,
      });

      // Replace loading message with actual response
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === loadingMessage.id
            ? {
                ...msg,
                content: res.data.result.answer,
                references: res.data.result.references,
              }
            : msg
        )
      );
    } catch (error) {
      setError(`Failed to get response. Please try again. Error: ${error}`);
      // Remove loading message on error
      setMessages((prev) => prev.filter((msg) => msg.id !== loadingMessage.id));
    } finally {
      reset({ message: "" });
    }
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setError(null);
    handleSubmitMessage(data);
  };

  return (
    <div
      className={`flex flex-col h-screen ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Chat Area */}
      <ScrollArea
        className={`flex-1 px-4 py-2 w-full mx-auto ${
          theme === "dark" ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <div className="space-y-6 mt-16 lg:max-w-4xl mx-auto pb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-3xl rounded-lg px-4 py-3 ${
                  message.role === "user"
                    ? theme === "dark"
                      ? "bg-emerald-700 text-gray-50"
                      : "bg-emerald-600 text-white"
                    : theme === "dark"
                    ? "bg-gray-800 border-gray-700 text-gray-100"
                    : "bg-white border shadow-sm"
                }`}
                dir={message.language === "ar" ? "rtl" : "ltr"} // RTL for Arabic
              >
                <div className="flex gap-3 bangla">
                  <Avatar className="h-8 w-8 mt-0.5 flex-shrink-0">
                    <AvatarFallback
                      className={
                        message.role === "user"
                          ? theme === "dark"
                            ? "bg-emerald-800"
                            : "bg-emerald-700"
                          : theme === "dark"
                          ? "bg-gray-700"
                          : "bg-gray-100"
                      }
                    >
                      {message.role === "user" ? (
                        <User className="h-4 w-4 text-white" />
                      ) : message.content ? (
                        <Bot
                          className={`h-4 w-4 ${
                            theme === "dark" ? "text-gray-300" : "text-gray-800"
                          }`}
                        />
                      ) : (
                        <div
                          className={`animate-pulse h-4 w-4 rounded-full ${
                            theme === "dark" ? "bg-gray-600" : "bg-gray-300"
                          }`}
                        />
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={`font-medium text-sm ${
                          message.role === "user"
                            ? "text-gray-50"
                            : theme === "dark"
                            ? "text-emerald-400"
                            : "text-emerald-600"
                        }`}
                      >
                        {message.role === "user" ? "You" : "Islamic Scholar"}
                      </span>
                      <span
                        className={`text-xs min-w-32 ml-2 ${
                          message.role === "user"
                            ? "text-gray-200"
                            : theme === "dark"
                            ? "text-gray-400"
                            : "text-gray-500"
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    {message.content ? (
                      <>
                        <div
                          className={`prose prose-sm max-w-none ${
                            theme === "dark" ? "prose-invert" : ""
                          }`}
                        >
                          <Markdown>{message.content}</Markdown>
                        </div>

                        {message.references &&
                          message.references.length > 0 && (
                            <div
                              className={`mt-3 pt-3 ${
                                theme === "dark"
                                  ? "border-gray-700"
                                  : "border-gray-100"
                              } border-t`}
                            >
                              <div className="flex items-center gap-2 mb-2">
                                <BookOpen
                                  className={`h-4 w-4 ${
                                    theme === "dark"
                                      ? "text-gray-500"
                                      : "text-gray-400"
                                  }`}
                                />
                                <h4
                                  className={`text-xs font-medium ${
                                    theme === "dark"
                                      ? "text-gray-400"
                                      : "text-gray-500"
                                  }`}
                                >
                                  References
                                </h4>
                              </div>
                              <ul className="space-y-1">
                                {message.references.map((ref, i) => (
                                  <li
                                    key={i}
                                    className={`text-xs ${
                                      theme === "dark"
                                        ? "text-gray-300"
                                        : "text-gray-600"
                                    }`}
                                  >
                                    • {ref}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                      </>
                    ) : (
                      <div className="space-y-2">
                        <Skeleton
                          className={`h-4 w-[100%] ${
                            theme === "dark" ? "bg-gray-700" : ""
                          }`}
                        />
                        <Skeleton
                          className={`h-4 w-[90%] ${
                            theme === "dark" ? "bg-gray-700" : ""
                          }`}
                        />
                        <Skeleton
                          className={`h-4 w-[80%] ${
                            theme === "dark" ? "bg-gray-700" : ""
                          }`}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div
        className={`border-t py-4 px-4 ${
          theme === "dark"
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="max-w-4xl mx-auto">
          {error && (
            <div
              className={`mb-3 px-4 py-2 rounded-lg text-sm ${
                theme === "dark"
                  ? "bg-red-900/50 border-red-800 text-red-200"
                  : "bg-red-50 border-red-200 text-red-600"
              } border`}
            >
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="relative">
            <Input
              {...register("message", {
                required: "Please enter your question",
              })}
              placeholder="Ask your Islamic question in any language..."
              className={`pr-12 ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                  : ""
              }`}
              disabled={isSubmitting}
            />
            <Button
              type="submit"
              size="icon"
              className={`absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 ${
                theme === "dark"
                  ? "bg-emerald-700 hover:bg-emerald-600 text-gray-50"
                  : "bg-emerald-600 hover:bg-emerald-700 text-white"
              }`}
              disabled={isSubmitting}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
          {errors.message && (
            <p
              className={`mt-1 text-sm px-2 ${
                theme === "dark" ? "text-red-400" : "text-red-500"
              }`}
            >
              {errors.message.message}
            </p>
          )}
          <p
            className={`text-xs text-center mt-3 ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Answers will be provided in the same language as your question
          </p>
        </div>
      </div>
    </div>
  );
}
