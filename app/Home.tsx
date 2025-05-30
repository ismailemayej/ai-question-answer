"use client";
import React, { useState, useRef, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { Send, Bot, User, BookOpen, Loader2 } from "lucide-react";
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
  const { setTheme } = useTheme();
  const typingIntervals = useRef<Record<string, NodeJS.Timeout>>({});

  useEffect(() => {
    setTheme("dark");
  }, [setTheme]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<Inputs>();

  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  useEffect(() => {
    setMessages([
      {
        id: "1",
        role: "assistant",
        content:
          "আসসালামু আলাইকুম! আমি একজন ইসলামিক স্কলার। আপনার ইসলামিক প্রশ্নের উত্তর দিতে প্রস্তুত আছি। আপনার প্রশ্ন করুন। যেমনঃ রক্ত বের হলে নামায হবে কি?",
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
    // Clear any existing interval for this message
    if (typingIntervals.current[messageId]) {
      clearInterval(typingIntervals.current[messageId]);
    }

    let index = 0;
    typingIntervals.current[messageId] = setInterval(() => {
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
        clearInterval(typingIntervals.current[messageId]);
        delete typingIntervals.current[messageId];
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === messageId ? { ...msg, isTyping: false, references } : msg
          )
        );
        setIsProcessing(false);
      }
    }, speed);
  };

  const stopTyping = () => {
    // Clear all typing intervals
    Object.values(typingIntervals.current).forEach(clearInterval);
    typingIntervals.current = {};

    // Abort any ongoing API request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }

    // Update messages to remove typing states
    setMessages((prev) =>
      prev.map((msg) => (msg.isTyping ? { ...msg, isTyping: false } : msg))
    );

    setIsProcessing(false);
  };

  useEffect(() => {
    return () => {
      stopTyping();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmitMessage = async ({ message }: Inputs) => {
    if (!message.trim()) return;

    setError(null);
    setIsProcessing(true);
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
      // Create new AbortController for this request
      abortControllerRef.current = new AbortController();

      const promptData = `
      তুমি একজন অভিজ্ঞ ইসলামিক স্কলার, হাদীস ও ফিকহ বিশারদ, বিশেষজ্ঞ মুফতী এবং হানাফি মাযহাব অনুসরণকারী আলেম।
      
      🔰 তোমার দায়িত্বসমূহ:
      1. শুধুমাত্র ইসলামিক প্রশ্নের উত্তর প্রদান করা।
      2. উত্তর অবশ্যই কুরআন, সহীহ হাদীস এবং হানাফি ফিকহভিত্তিক নির্ভরযোগ্য কিতাবসমূহ থেকে দিতে হবে।
      3. উত্তর সংক্ষেপে নয়, বরং বিস্তারিত ব্যাখ্যা, দলীল এবং ফিকহী বিশ্লেষণসহ দিতে হবে।
      4. প্রতিটি উত্তরের শেষে অবশ্যই নির্ভরযোগ্য রেফারেন্সসহ **কিতাবের নাম, খণ্ড (যদি থাকে), ও পৃষ্ঠা নম্বর** উল্লেখ করতে হবে — যেন পাঠক ইচ্ছা করলে যাচাই করতে পারে।
      5. প্রশ্নের ভাষা অনুযায়ী উত্তর দিতে হবে। যেমন: বাংলা, ইংরেজি, আরবি, হিন্দি, উর্দু ইত্যাদি।
      6.যদি প্রশ্নটির উত্তর বিস্তৃত আলোচনা হয়, অর্থাৎ অনেক রেফারেন্স থাকে তাহলে ১ টি বা ২ টি নাম্বার উল্লেখ করে বাকি গুলোর ক্ষেত্রে বলবে বিষসুত নাম্বার আরো অনেক আছে।
      ⚠️ যদি প্রশ্নটি ইসলামবিরোধী, হাস্যকর, বা শরীয়তের দৃষ্টিতে অনুপযুক্ত হয়, তাহলে বিনয়ের সাথে জানাবে:
      **"এই প্রশ্নটি ইসলামিক নয়, তাই আমি এর উত্তর দিতে পারছি না।"**
      
      📚 তোমার রেফারেন্সের জন্য কিতাবসমূহ দুই ভাগে ভাগ করা হলো:
      
      ১️⃣ **মূল উৎসসমূহ (কুরআন, হাদীস, ফিকহ)**  
      - কুরআন
      - সহীহ বুখারী
      - সহীহ মুসলিম
      - সুনানে আবু দাউদ
      - সুনান আত-তিরমিযি
      - সুনানে নাসাঈ
      - সুনানে ইবনে মাজাহ
      - মুসনাদে আহমাদ
      - মিশকাত আল-মাসাবিহ
      - বুলুগুল মারাম
      - রিয়াযুস সালিহিন
      - আত-তারগীব ওয়াত-তারাহীব
      - আল-মুস্তাদরাক আলা আল-সহীহাইন
      - সহীহ ইবনে হিব্বান
      - সহীহ ইবনে খুজাইমাহ
      - মুসান্নাফ ইবনে আবি শায়বাহ
      - মুসান্নাফ আবদুর রাজ্জাক
      - মুয়াত্তা ইমাম মালিক
      - মুয়াত্তা মুহাম্মদ
      - সুনান আদ-দারিমী
      - সুনানে দার আল-কুতনি
      - সুনান সাঈদ ইবনে মানসুর
      - মুসনাদ আবু দাউদ তায়ালিসী
      - মুসনাদ ইসহাক ইবনে রাহওয়াইহ
      - মুসনাদ হুমাইদি
      - মুসনাদ আল বাজ্জার
      - মুসনাদ আবু ইয়ালা
      - আল-আদাবুল মুফরাদ
      - শুয়াবুল ইমান
      - শামায়েল তিরমিযি
      
      ২️⃣ **ফিকহ ও ফতোয়ার প্রামাণ্য কিতাবসমূহ (বিশেষ করে হানাফি ফিকহ)**  
      - আল-হেদায়া
      - ফাতহুল কাদির
      - ফতোয়ায়ে হিন্দিয়া
      - রদ্দুল মুহতার
      - তানবীরুল আবছার
      - আদ-দুররুল মুখতার
      - বেদায়েউস সানায়ি
      - ফতোয়ায়ে রশীদিয়া
      - আল-মাবসুত
      - জামিউল ফাতওয়া
      - মুসনাদে আবু হানিফা
      - আল জামে'ঊর রদ্বভী — সৈয়দ যুফারুদ্দীন রেজভী
      - জামেউল আহাদিস — ইমাম আহমদ রিদ্বা খান
      - ফয়যুল ক্বদীর শরহে জামেউস সগীর
      - উমদাতুল ক্বারি আলা সহিহিল বুখারী
      - ইকমালুল মু'আল্লিম শরহে সহীহ মুসলিম
      - আয-যাহরুর রুবা আলা শরহে মুজতাবা
      - মিশকাতুল মাসাবীহ এর বিভিন্ন শরহসমূহ (আল-বাগাভী, ত্বীবি, মাযাহিরে হক ইত্যাদি)
      
      ✅ **রেফারেন্স লেখার নিয়ম:**  
      - কুরআন: [সূরার নাম], আয়াত: [নাম্বার]  
      - হাদীস: [হাদীসের কিতাবের নাম], হাদীস নম্বর: [নাম্বার]  
      - ফিকহি কিতাব: [কিতাবের নাম], খণ্ড: [নাম্বার], পৃষ্ঠা: [নাম্বার]  
  
      ---
      
      এখন নিচের প্রশ্নের সঠিক ইসলামিক উত্তর দাও, বিস্তারিত ব্যাখ্যা, দলীল এবং নির্ভরযোগ্য রেফারেন্সসহ:
      
      প্রশ্ন: ${message}
      `;

      const res = await axios.post(
        "/api/question-api",
        {
          prompt: promptData,
        },
        {
          signal: abortControllerRef.current.signal,
        }
      );

      typewriterEffect(
        loadingMessage.id,
        res.data.result.answer,
        res.data.result.references
      );
    } catch (error) {
      if (axios.isCancel(error)) {
        // Request was cancelled
        setMessages((prev) =>
          prev.filter((msg) => msg.id !== loadingMessage.id)
        );
        return;
      }

      setError(`Failed to get response. Please try again.`);
      setMessages((prev) => prev.filter((msg) => msg.id !== loadingMessage.id));

      const errorMessage: Message = {
        id: "error-" + Date.now().toString(),
        role: "assistant",
        content: "Sorry, I couldn't process your request. Please try again.",
        language: "en",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      reset({ message: "" });
      abortControllerRef.current = null;
    }
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    handleSubmitMessage(data);
  };

  return (
    <div className="bangla flex flex-col h-screen bg-gray-900 text-white">
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
                    : "bg-gray-800 border border-gray-700"
                }`}
                dir={message.language === "ar" ? "rtl" : "ltr"}
              >
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8 mt-0.5">
                    <AvatarFallback>
                      {message.role === "user" ? (
                        <User className="h-4 w-4" />
                      ) : message.content ? (
                        <Bot className="h-4 w-4" />
                      ) : (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>
                        {message.role === "user" ? "You" : "Islamic Scholar"}
                      </span>
                      <span className="text-gray-400">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    {message.isTyping && !message.content ? (
                      <div className="flex items-center space-x-2">
                        <Loader2 className="h-4 w-4 animate-spin text-emerald-500" />
                        <span className="text-gray-400">
                          Researching Islamic sources...
                        </span>
                      </div>
                    ) : (
                      <>
                        <div className="prose prose-sm max-w-none text-gray-100">
                          <Markdown>{message.content}</Markdown>
                          {message.isTyping && (
                            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 ml-1 animate-pulse"></span>
                          )}
                        </div>

                        {message.references &&
                          message.references.length > 0 &&
                          !message.isTyping && (
                            <div className="mt-3 pt-3 border-t border-gray-700">
                              <div className="flex items-center text-sm text-emerald-400 mb-2">
                                <BookOpen className="h-4 w-4 mr-2" />
                                <span>References</span>
                              </div>
                              <ul className="text-xs text-gray-400 space-y-1">
                                {message.references.map((ref, index) => (
                                  <li key={index} className="flex">
                                    <span className="text-emerald-500 mr-2">
                                      •
                                    </span>
                                    <span>{ref}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                      </>
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
          disabled={isSubmitting || isProcessing}
          className="bg-gray-800 border-gray-700 focus:border-emerald-500 text-white"
        />

        {isProcessing || messages.some((msg) => msg.isTyping) ? (
          <Button
            type="button"
            onClick={stopTyping}
            variant="destructive"
            className="flex items-center gap-1"
          >
            <Loader2 className="h-4 w-4 animate-spin" />
            Stop
          </Button>
        ) : (
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-emerald-600 hover:bg-emerald-700 text-white "
          >
            <Send className="h-4 w-4 mr-1" /> Send
          </Button>
        )}
      </form>

      {error && (
        <div className="text-red-400 text-sm text-center pb-2">{error}</div>
      )}
    </div>
  );
}
