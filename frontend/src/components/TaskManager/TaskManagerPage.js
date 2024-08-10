import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Alert } from 'react-bootstrap';
import { getTaskManagerData, insertTask, updateTask, deleteTask, getTasksDueToday } from '../../api/TaskManagerApi'; // Import API functions
import Notification from '../Common/Notification'; // Import Notification component
import './TaskManagerPage.css';

const TaskManagerPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [tasksDueToday, setTasksDueToday] = useState([]);
  const [formData, setFormData] = useState({
    taskid: '',
    task_name: '',
    task_list: '',
    task_sd: '',
    task_ed: '',
    assigned_to: ''
  });
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [notification, setNotification] = useState({});

  useEffect(() => {
    fetchTaskManagerData(); // Fetch initial data
    checkTasksDueToday();
  }, []);

  const fetchTaskManagerData = async () => {
    try {
      const { users, tasks, projects } = await getTaskManagerData();
      setUsers(users);
      setTasks(tasks);
      setProjects(projects);
    } catch (error) {
      console.error('Error fetching task manager data:', error);
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
      assigned_to: ''
    });
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
      if (isEditing) {
        await updateTask(formData.taskid, formData); // Update task
        setNotification({
          show: true,
          message: 'Task updated successfully!',
          variant: 'success'
        });
      } else {
        await insertTask(formData); // Insert new task
        setNotification({
          show: true,
          message: 'Task added successfully!',
          variant: 'success'
        });
      }

      fetchTaskManagerData(); // Refresh task list
      toggleForm();
    } catch (error) {
      console.error(`Error ${isEditing ? 'updating' : 'inserting'} task:`, error);
      setNotification({
        show: true,
        message: `An error occurred while ${isEditing ? 'updating' : 'inserting'} the task.`,
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
      assigned_to: task.assigned_to
    });
  };

  const handleDelete = async (taskid) => {
    try {
      await deleteTask(taskid); // Delete task
      setNotification({
        show: true,
        message: 'Task deleted successfully!',
        variant: 'success'
      });
      fetchTaskManagerData(); // Refresh task list
    } catch (error) {
      console.error('Error deleting task:', error);
      setNotification({
        show: true,
        message: 'An error occurred while deleting the task.',
        variant: 'danger'
      });
    }
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, show: false });
  };

  return (
    <div className="task-manager-page">
      <h1>Task Management</h1>

      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}

      <Button variant="primary" onClick={toggleForm} className="add-task-button">
        {isEditing ? 'Cancel Edit' : 'Add New Task'}
      </Button>

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

            <Form.Group controlId="formTaskStartDate">
              <Form.Label>Task Start Date</Form.Label>
              <Form.Control
                type="datetime-local"
                name="task_sd"
                value={formData.task_sd}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formTaskEndDate">
              <Form.Label>Task End Date</Form.Label>
              <Form.Control
                type="datetime-local"
                name="task_ed"
                value={formData.task_ed}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formAssignedTo">
              <Form.Label>Assigned To</Form.Label>
              <Form.Control
                as="select"
                name="assigned_to"
                value={formData.assigned_to}
                onChange={handleChange}
                required
              >
                <option value="">Select User</option>
                {users.map((user) => (
                  <option key={user.userid} value={user.userid}>
                    {user.username}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit">
              {isEditing ? 'Update Task' : 'Add New Task'}
            </Button>
          </Form>
        </div>
      )}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Task ID</th>
            <th>Task Name</th>
            <th>Task List</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Assigned To</th>
            <th>Actions</th>
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
              <td>{task.assigned_to}</td>
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

      <Notification
        show={notification.show}
        onClose={() => setNotification({ ...notification, show: false })}
        message={notification.message}
        variant={notification.variant}
      />
    </div>
  );
};

export default TaskManagerPage;
