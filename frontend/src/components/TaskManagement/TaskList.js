import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // TODO: Fetch tasks from backend API
    // Example fetchTasks function:
    // fetchTasks().then(data => setTasks(data));
    // This is placeholder logic, replace with actual API call
    setTasks([
      { id: 1, title: 'Task 1', description: 'Description for Task 1' },
      { id: 2, title: 'Task 2', description: 'Description for Task 2' },
      // Add more tasks as needed
    ]);
  }, []);

  const handleEdit = (taskId) => {
    // TODO: Implement edit functionality
    console.log(`Editing task with id ${taskId}`);
  };

  const handleDelete = (taskId) => {
    // TODO: Implement delete functionality
    console.log(`Deleting task with id ${taskId}`);
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task, index) => (
          <tr key={task.id}>
            <td>{index + 1}</td>
            <td>{task.title}</td>
            <td>{task.description}</td>
            <td>
              <Button variant="warning" onClick={() => handleEdit(task.id)}>
                Edit
              </Button>
              <Button variant="danger" onClick={() => handleDelete(task.id)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TaskList;
