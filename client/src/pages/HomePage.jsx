// client/src/pages/HomePage.jsx
import React from 'react';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <h1 className="text-5xl font-bold text-blue-400">AI Career Coach</h1>
      <p className="mt-4 text-lg text-gray-300">
        Login to get started on your professional journey.
      </p>
      <a
        href={`${import.meta.env.VITE_API_URL}/auth/google`}
        className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
      >
        Login with Google
      </a>
    </div>
  );
};

export default HomePage;
