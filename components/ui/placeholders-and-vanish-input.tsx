"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface PlaceholderInputProps {
  placeholders: string[];
}

export function PlaceholderInput({ placeholders }: PlaceholderInputProps) {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Function to start animation of placeholders cycling
  const startAnimation = () => {
    intervalRef.current = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
    }, 3000);
  };

  // Handle tab visibility changes
  const handleVisibilityChange = () => {
    if (document.visibilityState !== "visible" && intervalRef.current) {
      clearInterval(intervalRef.current); // Clear interval when tab is hidden
      intervalRef.current = null;
    } else if (document.visibilityState === "visible") {
      startAnimation(); // Restart interval when tab becomes visible
    }
  };

  // Set up effect to start animation and handle tab visibility changes
  useEffect(() => {
    startAnimation();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current); // Clean up interval on component unmount
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [placeholders]);

  return (
    <AnimatePresence mode="wait">
      <motion.input
        key={`current-placeholder-${currentPlaceholder}`}
        placeholder={placeholders[currentPlaceholder]}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "linear" }}
        className="input-class placeholder-opacity-70 bg-transparent"
      />
    </AnimatePresence>
  );
}
