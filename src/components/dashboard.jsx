// src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';

const Dashboard = ({ user, userWorkout, onStartWorkout, onSkipWorkout }) => {
  const { programStatus, programName, workoutDetails } = userWorkout;
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const renderDashboardContent = () => {
    switch (programStatus) {
      case 'workout':
        return (
          <>
            <h1 className="text-5xl font-extrabold mb-2 text-yellow-400">
              Hello, {user.username}
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              Today is your <span className="font-semibold">{programName}</span> workout.
            </p>

            <div className="bg-gray-800 p-6 rounded-2xl shadow-lg mb-6">
              <h3 className="text-2xl font-bold mb-4">{workoutDetails.name}</h3>
              <ul className="space-y-4">
                {workoutDetails.exercises.map((exercise, index) => (
                  <li key={index} className="bg-gray-900 p-4 rounded-lg flex justify-between items-center">
                    <div>
                      <p className="text-lg font-medium">{exercise.name}</p>
                      <p className="text-sm text-gray-400 mt-1">
                        {exercise.sets} sets of {exercise.reps} reps
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-center space-x-4 mt-8">
              <button
                onClick={onStartWorkout}
                className="py-4 px-6 rounded-xl bg-yellow-500 text-gray-900 font-bold text-lg hover:bg-yellow-400 transition-colors duration-200"
              >
                Start Workout
              </button>
              <button
                onClick={onSkipWorkout}
                className="py-4 px-6 rounded-xl border border-gray-700 text-gray-400 font-bold text-lg hover:bg-gray-700 transition-colors duration-200"
              >
                Skip
              </button>
            </div>
          </>
        );
      case 'rest':
        return (
          <div className="flex flex-col items-center justify-center p-20 text-center">
            <svg
              className="h-20 w-20 text-green-500 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="text-5xl font-extrabold text-green-400">
              Rest Day
            </h2>
            <p className="mt-4 text-xl text-gray-300">
              Take a break, you've earned it!
            </p>
          </div>
        );
      case 'none':
      default:
        return (
          <div className="text-center">
            <h1 className="text-5xl font-extrabold text-yellow-400 mb-2">
              Hello, {user.username}
            </h1>
            <p className="text-xl text-gray-300 mb-4">
              {currentDateTime.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            <p className="text-lg text-gray-400 mb-8">
              {currentDateTime.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
            <p className="text-2xl text-gray-200">
              It's a great time to work out, please select a program from below.
            </p>
          </div>
        );
    }
  };

  return (
    <section className="bg-gray-900 p-8 rounded-2xl shadow-xl">
      {renderDashboardContent()}
    </section>
  );
};

export default Dashboard;