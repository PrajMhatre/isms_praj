import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Alert } from 'react-bootstrap';

import { getTeamMemberData, updateTaskReport } from '../../api/teamMemberApi';
import './TeamMemberPage.css';

const TeamMemberPage = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState('');
  const [report, setReport] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTeamMemberData();
  }, []);

  const fetchTeamMemberData = async () => {
    try {
      const { tasks, projects } = await getTeamMemberData();
      console.log('Fetched data:', { tasks, projects }); // Debugging log
      setTasks(tasks);
      setProjects(projects);
    } catch (error) {
      console.error('Error fetching team member data:', error);
      setError('Failed to fetch data');
    }
  };

  const handleReportChange = (e) => {
    setReport(e.target.value);
  };

  const handleUpdateReport = async (e) => {
    e.preventDefault();
    if (!selectedTaskId || !report) {
      setError('Please select a task and provide a report');
      return;
    }
    console.log('Updating report for task:', selectedTaskId, 'with report:', report); // Debugging log

    try {
      await updateTaskReport(selectedTaskId, { report_by_teammember: report });
      fetchTeamMemberData(); // Refresh data after update
      setReport('');
      setSelectedTaskId('');
    } catch (error) {
      console.error('Error updating task report:', error);
      setError('Failed to update report');
    }
  };

  return (
    <div className="team-member-page">
      <h1>Team Member Page</h1>
      
      {/* Error message */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Task report form */}
      <Form onSubmit={handleUpdateReport}>
        <Form.Group controlId="formTask">
          <Form.Label>Select Task</Form.Label>
          <Form.Control
            as="select"
            value={selectedTaskId}
            onChange={(e) => setSelectedTaskId(e.target.value)}
          >
            <option value="">Select a task</option>
            {tasks.map((task) => (
              <option key={task.taskid} value={task.taskid}>
                {task.task_name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formReport">
          <Form.Label>Report</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={report}
            onChange={handleReportChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Update Report
        </Button>
      </Form>

      {/* Display tasks */}
      <h2>Tasks</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Task ID</th>
            <th>Task Name</th>
            <th>Task List</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Report by Team Member</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.taskid}>
              <td>{task.taskid}</td>
              <td>{task.task_name}</td>
              <td>{task.task_list}</td>
              <td>{task.task_sd}</td>
              <td>{task.task_ed}</td>
              <td>{task.report_by_teammember}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Display projects */}
      <h2>Projects</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Start Date</th>
            <th>End Date</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <tr key={index}>
              <td>{project.project_sd}</td>
              <td>{project.project_ed}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TeamMemberPage;
