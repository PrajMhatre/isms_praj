import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Alert } from 'react-bootstrap';
import Notification from '../Common/Notification';
import { getITHODData, deleteTask, insertTask, updateTask,getTasksDueToday } from '../../api/ithodApi'; // Import API functions
import './ITHODPage.css';

const ITHODPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [tasksDueToday, setTasksDueToday] = useState([]);
  const [formData, setFormData] = useState({
    taskid: '',
    task_name: '',
    task_list: '',
    task_sd: '',
    task_ed: '',
    report_by_teammember: ''
  });
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState({});

  useEffect(() => {
    fetchITHODData(); // Fetch data on component mount
    checkTasksDueToday();
  }, []);

  const fetchITHODData = async () => {
    try {
      const data = await getITHODData(); // Fetch data from API
      setUsers(data.users);
      setProjects(data.projects);
      setTasks(data.tasks);
    } catch (error) {
      console.error('Error fetching IT HOD data:', error);
    }
  };

  const checkTasksDueToday = async () => {
    try {
      const tasksDue = await getTasksDueToday();
      if (tasksDue.length > 0) {
        setNotification({
          message: `Today is the last day to complete the task: ${tasksDue[0].task_name}`,
          type: 'warning'
        });
      }
    } catch (error) {
      console.error('Error fetching tasks due today:', error);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    setIsEditing(false);
    setFormData({
      taskid: '',
      task_name: '',
      task_list: '',
      task_sd: '',
      task_ed: '',
      report_by_teammember: ''
    });
    setError('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const taskData = {
        task_name: formData.task_name,
        task_list: formData.task_list,
        task_sd: formData.task_sd,
        task_ed: formData.task_ed,
        report_by_teammember: formData.report_by_teammember
      };

      if (isEditing) {
        await updateTask(formData.taskid, taskData); // Send update request to API
        setNotification({
          show: true,
          message: 'Task updated successfully!',
          variant: 'success'
        });
      } else {
        await insertTask(taskData); // Send new task data to API
        setNotification({
          show: true,
          message: 'Task added successfully!',
          variant: 'success'
        });
      }

      fetchITHODData(); // Refresh data after adding or updating task
      toggleForm();
    } catch (error) {
      setNotification({
        show: true,
        message: `Error ${isEditing ? 'updating' : 'creating'} task: ${error.message}`,
        variant: 'danger'
      });
    }
  };

  const handleEdit = (task) => {
    setIsEditing(true);
    setShowForm(true);
    setFormData({
      taskid: task.taskid,
      task_name: task.task_name,
      task_list: task.task_list,
      task_sd: task.task_sd,
      task_ed: task.task_ed,
      report_by_teammember: task.report_by_teammember
    });
  };

  const handleDelete = async (taskid) => {
    try {
      await deleteTask(taskid); // Send delete request to API
      fetchITHODData(); // Refresh data after deletion
      setNotification({
        show: true,
        message: 'Task deleted successfully!',
        variant: 'success'
      });
    } catch (error) {
      setNotification({
        show: true,
        message: 'Error deleting task: ' + error.message,
        variant: 'danger'
      });
    }
  };

  return (
    <div className="ithod-page">
      <h1>IT HOD Dashboard</h1>

      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}
      
      {/* Add New Task button */}
      <Button variant="primary" onClick={toggleForm} className="add-task-button">
        {isEditing ? 'Cancel Edit' : 'Add New Task'}
      </Button>

      {/* Form section */}
      {showForm && (
        <div className="form-section">
          <div className="form-header">
            <h3>{isEditing ? 'Edit Task' : 'Add New Task'}</h3>
            <span className="close-button" onClick={toggleForm}>
              &times;
            </span>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTaskName">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                type="text"
                name="task_name"
                value={formData.task_name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            
            <Form.Group controlId="formTaskList">
              <Form.Label>Task List</Form.Label>
              <Form.Control
                type="text"
                name="task_list"
                value={formData.task_list}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formTaskSD">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="task_sd"
                value={formData.task_sd}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formTaskED">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                name="task_ed"
                value={formData.task_ed}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {error && <Alert variant="danger">{error}</Alert>}

            <Button variant="primary" type="submit">
              {isEditing ? 'Update Task' : 'Add New Task'}
            </Button>
          </Form>
        </div>
      )}

      {/* Users Table section */}
      <h2>Users</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Username</th>
            <th>Employee Name</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.userid}>
              <td>{user.userid}</td>
              <td>{user.username}</td>
              <td>{user.employee_name}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Projects Table section */}
      <h2>Projects</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Start Date</th>
            <th>End Date</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.project_name}>
              <td>{project.project_name}</td>
              <td>{new Date(project.project_sd).toLocaleDateString()}</td>
              <td>{new Date(project.project_ed).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Tasks Table section */}
      <h2>Tasks</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Task ID</th>
            <th>Task Name</th>
            <th>Task List</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.taskid}>
              <td>{task.taskid}</td>
              <td>{task.task_name}</td>
              <td>{task.task_list}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(task)} className="me-2">
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(task.taskid)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Notification section */}
      <Notification
        show={notification.show}
        onClose={() => setNotification({ ...notification, show: false })}
        message={notification.message}
        variant={notification.variant}
      />
    </div>
  );
};

export default ITHODPage;
