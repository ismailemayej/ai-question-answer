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

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  language: string;
  references?: string[];
  timestamp: Date;
  isTyping?: boolean;
}

type Inputs = {
  message: string;
};

const detectLanguage = (text: string): string => {
  const isBangla = /[\u0980-\u09FF]/.test(text);
  const isArabic = /[\u0600-\u06FF]/.test(text);
  const isHindi = /[\u0900-\u097F]/.test(text);
  const isUrdu = /[\u0600-\u06FF\u0750-\u077F]/.test(text);
  if (isBangla) return "bn";
  if (isArabic) return "ar";
  if (isHindi) return "hi";
  if (isUrdu) return "ur";
  return "en";
};

export default function IslamicChat() {
  const { theme } = useTheme();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<Inputs>();

  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  const typewriterEffect = (
    messageId: string,
    fullText: string,
    references?: string[],
    speed: number = 20
  ) => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === messageId
              ? {
                  ...msg,
                  content: fullText.slice(0, index + 1),
                  isTyping: true,
                }
              : msg
          )
        );
        index++;
      } else {
        clearInterval(interval);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === messageId ? { ...msg, isTyping: false, references } : msg
          )
        );
      }
    }, speed);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmitMessage = async ({ message }: Inputs) => {
    const detectedLanguage = detectLanguage(message);

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: message,
      language: detectedLanguage,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    const loadingMessage: Message = {
      id: "loading-" + Date.now().toString(),
      role: "assistant",
      content: "",
      language: detectedLanguage,
      timestamp: new Date(),
      isTyping: true,
    };
    setMessages((prev) => [...prev, loadingMessage]);

    try {
      const promptData = `প্রশ্নটি যেই ভাষায় করা হোক না কেন, অনুগ্রহ করে উত্তর সেই ভাষাতেই দাও। প্রশ্নটি একটি মাদ্রাসার একাডেমিক প্রশ্ন, তাই উত্তর হবে বিশদ, গবেষণাভিত্তিক এবং শিক্ষামূলক।

উত্তর দেওয়ার সময় নিচের নিয়মগুলো অনুসরণ করো:

1. **উত্তরের শুরুতে একটি প্রাঞ্জল ও চিন্তাশীল ভূমিকা** লিখো — যাতে প্রশ্নের প্রেক্ষাপট ও গুরুত্ব তুলে ধরা হয়।
2. **মূল আলোচনাটি হেডলাইন আকারে** বিভক্ত করো। প্রতিটি হেডলাইনের নিচে প্রশ্নভিত্তিক ব্যাখ্যা থাকবে।
3. **প্রাসঙ্গিক কোটেশন** ব্যবহার করো — যেমন: কোরআনের আয়াত, হাদীসের বাণী, বা ইসলামী গ্রন্থের উদ্ধৃতি।

   - ইসলামিক প্রশ্ন হলে অবশ্যই **মূল আরবি আয়াত** উল্লেখ করো (শুধু অনুবাদ নয়)।  
   - প্রতিটি কোটেশনের পর **একটু খালি জায়গা** রাখো, যেন চোখে সুন্দরভাবে ধরা পড়ে।
4. **উত্তরের শেষে একটি উপসংহার** লিখো — যা আলোচনার সারাংশ উপস্থাপন করবে এবং শিক্ষণীয় বার্তা দেবে।

উত্তরটি **দীর্ঘ, প্রাঞ্জল ও স্পষ্ট** হওয়া উচিত। যাতে একজন মাদ্রাসার ছাত্র, শিক্ষক কিংবা সাধারণ পাঠক সহজেই বুঝতে পারে।

প্রশ্ন: ${message}`;

      const res = await axios.post("/api/question-api", {
        prompt: promptData,
      });

      // Start typewriter effect with the response
      typewriterEffect(
        loadingMessage.id,
        res.data.result.answer,
        res.data.result.references
      );
    } catch (err) {
      setError("Failed to get response. Please try again.");
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
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <ScrollArea className="flex-1 px-4 py-2 w-full mx-auto">
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
                    ? "bg-emerald-600 text-white"
                    : theme === "dark"
                    ? "bg-gray-800 border text-white"
                    : "bg-white border shadow-sm"
                }`}
                dir={message.language === "ar" ? "rtl" : "ltr"}
              >
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8 mt-0.5 text-white ">
                    <AvatarFallback>
                      {message.role === "user" ? (
                        <User className="h-4 w-4 text-black" />
                      ) : message.content ? (
                        <Bot className="h-4 w-4 dark:text-white text-black" />
                      ) : (
                        <div className="animate-pulse h-4 w-4 rounded-full bg-gray-300" />
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>
                        {message.role === "user" ? "You" : "Islamic Scholar"}
                      </span>
                      <span>
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <div
                      className={`prose prose-sm max-w-none bangla ${
                        theme === "dark" ? "prose-invert" : ""
                      }`}
                    >
                      <Markdown>{message.content || "..."}</Markdown>
                      {message.isTyping && (
                        <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 ml-1 animate-pulse"></span>
                      )}
                    </div>

                    {message.references &&
                      message.references.length > 0 &&
                      !message.isTyping && (
                        <div className="mt-2 text-xs text-gray-500">
                          <BookOpen className="inline h-4 w-4 mr-1" />
                          References: {message.references.join(", ")}
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

      {/* Input Section */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl mx-auto px-4 pb-4 flex gap-2"
      >
        <Input
          type="text"
          placeholder="Write your Islamic question..."
          {...register("message", { required: true })}
          disabled={isSubmitting}
        />
        <Button type="submit" disabled={isSubmitting}>
          <Send className="h-4 w-4 mr-1" /> Send
        </Button>
      </form>
    </div>
  );
}
