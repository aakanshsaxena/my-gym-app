// src/components/AnimatedGreeting.jsx
import React, { useState, useEffect } from 'react';

const greetings = [
  'Hello',
  'Hola',
  'Bonjour',
  'Hallo',
  'Ciao',
  'Olá',
  'Namaste',
  'Konnichiwa',
];

const typingSpeed = 150; // milliseconds
const erasingSpeed = 100; // milliseconds
const delayBetweenGreetings = 1500; // milliseconds

const AnimatedGreeting = ({ username }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [greetingIndex, setGreetingIndex] = useState(0);

  useEffect(() => {
    let timer;
    const currentGreeting = greetings[greetingIndex];

    if (isTyping) {
      if (displayedText.length < currentGreeting.length) {
        timer = setTimeout(() => {
          setDisplayedText(currentGreeting.substring(0, displayedText.length + 1));
        }, typingSpeed);
      } else {
        setTimeout(() => setIsTyping(false), delayBetweenGreetings);
      }
    } else {
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(currentGreeting.substring(0, displayedText.length - 1));
        }, erasingSpeed);
      } else {
        setIsTyping(true);
        setGreetingIndex((prevIndex) => (prevIndex + 1) % greetings.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayedText, isTyping, greetingIndex]);

  return (
    <>
      <span className="font-LibertinusSerif-Italic text-2xl">{displayedText}</span>, {username}
    </>
  );
};

export default AnimatedGreeting;