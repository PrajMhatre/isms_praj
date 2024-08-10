// src/components/Dashboard/Dashboard.js
import React from 'react';

const Dashboard = ({ userRole }) => {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {userRole}!</p>
      {/* Add more dashboard content based on user role */}
    </div>
  );
};

export default Dashboard;
