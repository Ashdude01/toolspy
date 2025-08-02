"use client";

import { useState, useEffect } from "react";

interface TypewriterTextProps {
  words: string[];
  staticText?: string;
  suffix?: string;
  typingSpeed?: number;
  pauseTime?: number;
  deletingSpeed?: number;
  className?: string;
}

export function TypewriterText({
  words,
  staticText = "",
  suffix = "",
  typingSpeed = 100,
  pauseTime = 2000,
  deletingSpeed = 50,
  className = "",
}: TypewriterTextProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    
    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseTime);
      return () => clearTimeout(pauseTimer);
    }

    // Smooth typing/deleting with variable speeds
    const speed = isDeleting 
      ? deletingSpeed + Math.random() * 30  // Add slight randomness for natural feel
      : typingSpeed + Math.random() * 50;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.substring(0, currentText.length + 1));
        } else {
          // Word is complete, pause before deleting
          setIsPaused(true);
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(currentText.substring(0, currentText.length - 1));
        } else {
          // Move to next word
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [currentText, currentWordIndex, isDeleting, isPaused, words, typingSpeed, pauseTime, deletingSpeed]);

  // Smooth cursor blinking
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorTimer);
  }, []);

  return (
    <span className={className}>
      {staticText}
        {currentText}
      <span 
        className={`inline-block transition-all duration-200 ease-in-out ml-1 transform text-white font-extralight ${
          showCursor ? 'opacity-100 scale-100' : 'opacity-40 scale-95'
        }`}
      >
        |
      </span>
      {suffix}
    </span>
  );
}