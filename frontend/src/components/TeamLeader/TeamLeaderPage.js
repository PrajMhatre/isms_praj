// src/components/TeamLeader/TeamLeaderPage.js

import React, { useState, useEffect } from 'react';
import { Table, Button, Alert } from 'react-bootstrap';
import { getTeamLeaderData, deleteTask } from '../../api/teamLeaderApi'; // Import API functions
import './TeamLeaderPage.css';

const TeamLeaderPage = () => {
  const [teamLeaderData, setTeamLeaderData] = useState({
    users: [],
    projects: [],
    tasks: []
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTeamLeaderData(); // Fetch data on component mount
  }, []);

  const fetchTeamLeaderData = async () => {
    try {
      const data = await getTeamLeaderData(); // Fetch data from API
      setTeamLeaderData(data);
    } catch (error) {
      console.error('Error fetching team leader data:', error);
      setError('Error fetching data');
    }
  };

  const handleDeleteTask = async (taskid) => {
    try {
      await deleteTask(taskid); // Send delete request to API
      fetchTeamLeaderData(); // Refresh data after deletion
    } catch (error) {
      console.error('Error deleting task:', error);
      setError('Error deleting task');
    }
  };

  return (
    <div className="team-leader-page">
      <h1>Team Leader Dashboard</h1>
      
      {/* Error message */}
      {error && <Alert variant="danger">{error}</Alert>}
      
      {/* Users Table */}
      <div className="table-section">
        <h3>Users</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Username</th>
              <th>Employee Name</th>
            </tr>
          </thead>
          <tbody>
            {teamLeaderData.users.map((user) => (
              <tr key={user.userid}>
                <td>{user.userid}</td>
                <td>{user.username}</td>
                <td>{user.employee_name}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      
      {/* Projects Table */}
      <div className="table-section">
        <h3>Projects</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            {teamLeaderData.projects.map((project) => (
              <tr key={project.project_name}>
                <td>{project.project_name}</td>
                <td>{new Date(project.project_sd).toLocaleDateString()}</td>
                <td>{new Date(project.project_ed).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      
      {/* Tasks Table */}
      <div className="table-section">
        <h3>Tasks</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Task ID</th>
              <th>Task Name</th>
              <th>Task List</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Report by Team Member</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {teamLeaderData.tasks.map((task) => (
              <tr key={task.taskid}>
                <td>{task.taskid}</td>
                <td>{task.task_name}</td>
                <td>{task.task_list}</td>
                <td>{new Date(task.task_sd).toLocaleDateString()}</td>
                <td>{new Date(task.task_ed).toLocaleDateString()}</td>
                <td>{task.report_by_teammember}</td>
                <td>
                  <Button variant="danger" onClick={() => handleDeleteTask(task.taskid)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default TeamLeaderPage;
