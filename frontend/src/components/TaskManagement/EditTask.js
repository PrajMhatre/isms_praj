import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

const EditTask = ({ taskId }) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    assignedTo: '',
  });

  useEffect(() => {
    // TODO: Fetch task details using taskId and populate form
    // Example fetchTask function:
    // fetchTask(taskId).then(data => setTask(data));
    // This is placeholder logic, replace with actual API call
    setTask({
      title: `Task ${taskId}`,
      description: `Description for Task ${taskId}`,
      assignedTo: `User ${taskId}`,
    });
  }, [taskId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement API call to update task
    console.log('Updating task:', task);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Enter task title" name="title" value={task.title} onChange={handleChange} required />
      </Form.Group>
      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={3} placeholder="Enter task description" name="description" value={task.description} onChange={handleChange} required />
      </Form.Group>
      <Form.Group controlId="assignedTo">
        <Form.Label>Assigned To</Form.Label>
        <Form.Control type="text" placeholder="Enter assigned person" name="assignedTo" value={task.assignedTo} onChange={handleChange} required />
      </Form.Group>
      <Button variant="primary" type="submit">
        Update Task
      </Button>
    </Form>
  );
};

export default EditTask;
