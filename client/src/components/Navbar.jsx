// client/src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user }) => {
  return (
    <nav className="bg-gray-800 p-4 absolute top-0 left-0 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/dashboard" className="text-white text-xl font-bold">
          AI Coach
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/analyzer" className="text-gray-300 hover:text-white">
            Resume Analyzer
          </Link>
          <Link to="/jobs" className="text-gray-300 hover:text-white">
            Job Search
          </Link>
          <Link to="/interview" className="text-gray-300 hover:text-white">
            Interview Prep
          </Link>
          {user && (
            <>
              <img
                src={user.image}
                alt="profile"
                className="w-8 h-8 rounded-full"
              />
              <a
                href="http://localhost:5001/api/auth/logout"
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
              >
                Logout
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
