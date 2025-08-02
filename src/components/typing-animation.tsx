"use client";

import { useState, useEffect } from 'react';

interface TypingAnimationProps {
  text: string;
  speed?: number;
  className?: string;
  onCompleted?: () => void;
}

export function TypingAnimation({ text, speed = 30, className, onCompleted }: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setDisplayedText(''); 
    if (text) {
      let i = 0;
      const intervalId = setInterval(() => {
        setDisplayedText(text.substring(0, i + 1));
        i++;
        if (i > text.length) {
          clearInterval(intervalId);
          if (onCompleted) onCompleted();
        }
      }, speed);
      return () => clearInterval(intervalId);
    }
  }, [text, speed, onCompleted]);

  return <span className={className}>{displayedText}</span>;
}
