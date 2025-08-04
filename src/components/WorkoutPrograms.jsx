// src/components/WorkoutPrograms.jsx
import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const workoutPrograms = [
  { id: 1, name: 'Push/Pull/Legs (PPL)', description: 'A classic 6-day split for building muscle and strength.' },
  { id: 2, name: 'StrongLifts 5x5', description: 'A beginner-friendly program focused on compound lifts to build raw strength.' },
  { id: 3, name: 'Full Body HIIT', description: 'High-intensity interval training to burn fat and improve cardiovascular health.' },
  { id: 4, name: 'Bodyweight Mastery', description: 'Develop strength and control using only your bodyweight.' },
  { id: 5, name: 'GZCLP', description: 'A versatile program for beginners and intermediates to progress with strength.' },
  { id: 6, name: 'Upper/Lower Split', description: 'A 4-day split program, perfect for muscle growth and recovery.' },
  { id: 7, name: 'CrossFit', description: 'Constantly varied, high-intensity functional movements.' },
  { id: 8, name: 'Powerbuilding', description: 'Combines the best of powerlifting and bodybuilding for strength and size.' },
  { id: 9, name: 'Yoga for Flexibility', description: 'Improve your balance, flexibility, and mind-body connection.' },
  { id: 10, name: 'Running for Endurance', description: 'A structured running program for beginners to advanced runners.' },
];

const WorkoutPrograms = ({ onSelectProgram }) => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      const isAtStart = scrollContainer.scrollLeft <= 1;
      const isAtEnd = Math.ceil(scrollContainer.scrollLeft + scrollContainer.clientWidth) >= scrollContainer.scrollWidth;

      setCanScrollLeft(!isAtStart);
      setCanScrollRight(!isAtEnd);
    }
  };

  useEffect(() => {
    updateScrollState();
    window.addEventListener('resize', updateScrollState);
    return () => window.removeEventListener('resize', updateScrollState);
  }, []);

  const handleScroll = (direction) => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      const cardWidth = scrollContainer.querySelector('.workout-card').offsetWidth;
      const gap = 24;
      const scrollOffset = (cardWidth + gap) * direction;

      scrollContainer.scrollBy({
        left: scrollOffset,
        behavior: 'smooth',
      });

      setTimeout(updateScrollState, 500);
    }
  };

  return (
    <section className="mt-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-extrabold text-gray-200">
          Choose a Workout Program
        </h2>
        <div className="flex space-x-4">
          <button
            onClick={() => handleScroll(-1)}
            disabled={!canScrollLeft}
            className={`p-2 bg-gray-800 rounded-full transition-colors duration-200 ${
              canScrollLeft ? 'hover:bg-gray-700' : 'opacity-50 cursor-not-allowed'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => handleScroll(1)}
            disabled={!canScrollRight}
            className={`p-2 bg-gray-800 rounded-full transition-colors duration-200 ${
              canScrollRight ? 'hover:bg-gray-700' : 'opacity-50 cursor-not-allowed'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <motion.div
        ref={scrollRef}
        onScroll={updateScrollState}
        className="flex overflow-x-auto pb-4"
        style={{ scrollbarWidth: 'none', '-ms-overflow-style': 'none' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {workoutPrograms.map((program, index) => (
          <React.Fragment key={program.id}>
            <motion.div
              className="workout-card group flex-none w-1/4 h-48 bg-gray-700 rounded-lg p-6 shadow-xl transition-all duration-300 cursor-pointer relative overflow-hidden"
              onClick={() => onSelectProgram(program)}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              whileHover={{ scale: 1.05, y: -5, zIndex: 10 }}
            >
              <div className="group-hover:opacity-0 transition-opacity duration-300">
                <h3 className="text-xl font-bold mb-2">{program.name}</h3>
                <p className="text-sm text-gray-400">
                  Tap to select
                </p>
              </div>
              <div className="absolute inset-0 bg-gray-800/90 flex items-center justify-center p-6 text-center transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                <p className="text-base text-gray-200">{program.description}</p>
              </div>
            </motion.div>
            {index < workoutPrograms.length - 1 && (
              <div className="flex-none w-6" />
            )}
          </React.Fragment>
        ))}
      </motion.div>
    </section>
  );
};

export default WorkoutPrograms;