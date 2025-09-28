// client/src/pages/DashboardPage.jsx
import React from 'react';

const DashboardPage = ({ user }) => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-white">
        Welcome, {user.displayName}!
      </h1>
      <p className="mt-2 text-gray-400">
        This is your dashboard. More features coming soon!
      </p>
    </div>
  );
};

export default DashboardPage;
