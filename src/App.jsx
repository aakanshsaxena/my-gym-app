// src/App.jsx
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import WorkoutPrograms from './components/WorkoutPrograms';
import { workoutPrograms } from './components/WorkoutPrograms';

function App() {
  const user = { username: 'GymGoer123' };

  // Initial workout state
  const initialWorkoutState = {
    programStatus: 'none',
  };

  const [currentUserState, setCurrentUserState] = useState(initialWorkoutState);

  // Function to handle selecting a workout program
  const handleSelectProgram = useCallback((program) => {
    // A real app would have more complex logic to determine the workout for the day
    setCurrentUserState({
      programId: program.id,
      currentDay: 'Today', // This could be dynamic
      programStatus: 'workout',
      programName: program.name,
      workoutDetails: {
        name: `${program.name} - Day 1`,
        exercises: [
          { name: 'Squats', sets: '3', reps: '5' },
          { name: 'Bench Press', sets: '3', reps: '5' },
          { name: 'Barbell Rows', sets: '3', reps: '5' },
        ],
      },
    });
  }, []);

  // Function to handle starting a workout
  const handleStartWorkout = useCallback(() => {
    // Here you would add logic to navigate to a workout screen or start a timer
    alert('Workout Started!');
  }, []);

  // Function to handle skipping a workout
  const handleSkipWorkout = useCallback(() => {
    // Logic to handle skipping a workout, maybe set as a rest day
    setCurrentUserState({ programStatus: 'rest' });
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <div className="container mx-auto p-4 max-w-7xl flex flex-col flex-grow">
        <Header username={user.username} />
        <main className="mt-8">
          <Dashboard
            user={user}
            userWorkout={currentUserState}
            onStartWorkout={handleStartWorkout}
            onSkipWorkout={handleSkipWorkout}
          />
          <WorkoutPrograms onSelectProgram={handleSelectProgram} />
        </main>
      </div>
    </div>
  );
}

export default App;