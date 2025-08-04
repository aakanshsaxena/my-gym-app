// src/App.jsx
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import WorkoutPrograms from './components/WorkoutPrograms';

function App() {
  const user = { username: 'GymGoer123' };

  const userWorkoutToday = {
    programId: 2,
    currentDay: 'Monday',
    programStatus: 'workout',
    programName: 'Advanced Powerlifting',
    workoutDetails: {
      name: 'Advanced Powerlifting - Day 1',
      exercises: [
        { name: 'Squats', sets: '3', reps: '5' },
        { name: 'Bench Press', sets: '3', reps: '5' },
        { name: 'Barbell Rows', sets: '3', reps: '5' },
      ],
    },
  };

  const currentUserState = userWorkoutToday;

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <div className="container mx-auto p-4 max-w-7xl flex flex-col flex-grow">
        <Header username={user.username} />
        <main className="mt-8">
          <Dashboard user={user} userWorkout={currentUserState} />
          <WorkoutPrograms />
        </main>
      </div>
    </div>
  );
}

export default App;