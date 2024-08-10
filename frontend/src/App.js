import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Common/Header';
import Footer from './components/Common/Footer';
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard/Dashboard';
import CreateTask from './components/TaskManagement/CreateTask';
import EditTask from './components/TaskManagement/EditTask';
import TaskList from './components/TaskManagement/TaskList';
import CreateProject from './components/ProjectManagement/CreateProject';
import EditProject from './components/ProjectManagement/EditProject';
import ProjectList from './components/ProjectManagement/ProjectList';
import AdminLogin from './components/Auth/AdminLogin';
import ITHODPage from './components/ITHOD/ITHODPage';
import TaskManagerPage from './components/TaskManager/TaskManagerPage';
import TeamMemberPage from './components/TeamMember/TeamMemberPage';
import TeamLeaderPage from './components/TeamLeader/TeamLeaderPage';
import AdminPage from './components/Admin/AdminPage';
import { handleLogin } from './auth';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');

  const handleUserLogin = (username, password, userType) => {
    handleLogin(username, password, userType, setIsAuthenticated, setUserRole);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole('');
  };

  return (
    <Router>
      <Header />
      <div className="container mt-4">
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Dashboard userRole={userRole} /> : <Login onLogin={handleUserLogin} />}
          />
          <Route path="/dashboard" element={<Dashboard userRole={userRole} />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/tasks/create" element={<CreateTask />} />
          <Route path="/tasks/edit/:id" element={<EditTask />} />
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/projects/create" element={<CreateProject />} />
          <Route path="/projects/edit/:id" element={<EditProject />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/ithod" element={<ITHODPage />} />
          <Route path="/taskmanager" element={<TaskManagerPage />} />
          <Route path="/teammember" element={<TeamMemberPage />} />
          <Route path="/teamleader" element={<TeamLeaderPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
